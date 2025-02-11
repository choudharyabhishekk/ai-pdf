import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.CONVEX_GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("Missing API key");
    }
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    // Log the embeddings instance
    console.log("Embeddings instance:", embeddings);
    return "Completed Embedding";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.CONVEX_GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("Missing API key");
    }

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const results = await vectorStore.similaritySearch(args.query, 1);

    const filteredResults = results.filter((q) => {
      const metadataString = Object.values(q.metadata).join("");
      return metadataString === args.fileId;
    });

    console.log("filteredResults id", filteredResults);
    return JSON.stringify(filteredResults);

    // if (filteredResults.length === 0) {
    //   return { message: "No matching results found." };
    // }

    return JSON.stringify(filteredResults);
  },
});
