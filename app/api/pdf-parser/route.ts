import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // get PDF file URL
    const requestUrl = req.url;
    const { searchParams } = new URL(requestUrl);
    const pdfUrl = searchParams.get("pdfUrl");
    if (!pdfUrl) {
      throw new Error("PDF URL is missing");
    }
    console.log(pdfUrl);

    // Load PDF file
    const response: Response = await fetch(pdfUrl);
    const data: Blob = await response.blob();

    const loader: WebPDFLoader = new WebPDFLoader(data);
    const docs: { pageContent: string }[] = await loader.load();

    // merge into a single string
    let pdfContent: string = "";
    docs.forEach((doc: { pageContent: string }) => {
      pdfContent = pdfContent + doc.pageContent;
    });

    // Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      // earlier this was 1000
      chunkSize: 500,
      chunkOverlap: 20,
    });
    const output = await splitter.createDocuments([pdfContent]);

    //convert to a list of strings
    let outputList: string[] = [];
    output.forEach((doc: { pageContent: string }) => {
      outputList.push(doc.pageContent);
    });

    // return the result
    return NextResponse.json({ result: outputList });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process the PDF file", details: error },
      { status: 500 }
    );
  }
}
