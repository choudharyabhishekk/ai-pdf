import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const pdfUrl =
  "https://vivid-puffin-316.convex.cloud/api/storage/9c21d20c-9e1c-4c3b-a6bb-bc9d0ef14cf9";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Load PDF file
    const response: Response = await fetch(pdfUrl);
    const data: Blob = await response.blob();

    const loader: WebPDFLoader = new WebPDFLoader(data);
    const docs: { pageContent: string }[] = await loader.load();

    // merge into a single string
    let pdfContent: string = "";
    docs.forEach((doc: { pageContent: string }) => {
      pdfContent += doc.pageContent;
    });

    // Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
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
