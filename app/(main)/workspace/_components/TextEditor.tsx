"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorExtensions from "./EditorExtensions";

import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
export default function TextEditor({ fileId }: { fileId: string }) {
  const fetchNotes = useQuery(api.notes.getNotes, {
    fileId: fileId,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Highlight.configure({
        multicolor: false,
      }),
      Placeholder.configure({
        placeholder: "Start asking questions from PDF & Make Notes 💯📝...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-[71vh] p-5",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(fetchNotes || "");
    }
  }, [fetchNotes]);

  return (
    <div>
      <EditorExtensions editor={editor} />
      <EditorContent
        className="overflow-scroll border border-t-0 shadown-sm rounded-b-lg"
        editor={editor}
      />
    </div>
  );
}
