import React, { useCallback } from "react";
import { Editor, BubbleMenu } from "@tiptap/react";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Unlink,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code,
  Heading1,
  Heading2,
  SaveIcon,
  Sparkles,
  SparklesIcon,
} from "lucide-react";
import { chatSession } from "@/configs/AIModel";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import AiICON from "@/components/ui/ai-icon";

interface EditorExtensionsProps {
  editor: Editor | null;
}

interface MenuButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const EditorExtensions: React.FC<EditorExtensionsProps> = ({ editor }) => {
  const searchAI = useAction(api.myActions.search);
  const saveNotesToDb = useMutation(api.notes.saveNotes);
  const { user } = useUser();
  const fileId = useParams().fileId;
  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e instanceof Error ? e.message : "An error occurred");
    }
  }, [editor]);

  if (!editor) return null;

  const MenuButton: React.FC<MenuButtonProps> = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? "text-blue-500" : "text-gray-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );

  // Handle AI button click
  const handleAIClick = async () => {
    toast("Searching Answers..");

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    const result = await searchAI({
      query: selectedText,
      fileId: fileId as string,
    });
    const unformattedResult = JSON.parse(result);
    let answer = "";
    unformattedResult &&
      unformattedResult.forEach((item: any) => {
        answer = answer + item.pageContent;
      });
    const maxLength = 1500;
    console.log("Answer from DB:", answer);

    // const prompt = `
    // Please provide a formatted answer based on the following:

    // Question: ${selectedText}

    // Content to use as answer: ${answer}

    // Requirements:
    // - Return only the answer content, don't return the question again.
    // - Use HTML formatting (excluding html/head/body tags)
    // - Maximum response length: ${maxLength} characters
    // - Format using: <h2>, <p>, <ul>/<li>, <strong>, <em> tags as appropriate
    // - Include relevant examples if available
    // - If technical terms are used, provide brief explanations

    // If the content use as answer is not relevant or empty, respond with:
    // "Warning: The PDF does not contain the answer to this question!<br/>Here's a general answer based on available knowledge:"
    // `.trim();

    const prompt =
      "For question: " +
      selectedText +
      " and with the given content as answer, please give appropriate answer in HTML format with proper formatting and without html, head, and body tags. Also don't return the question, just provide the answer. The answer content is: " +
      answer +
      "If the answer content is blank, respond with with a warning: The PDF does not contain the answer to this question! <br/> From the web: give the answer by yourself with proper formatting.";

    try {
      const aiAnswer = await chatSession.sendMessage(prompt);

      // Append the answer to the editor at current cursor position
      console.log("AI Answer formatted:", aiAnswer.response.text());

      editor
        .chain()
        .focus()
        .insertContentAt(
          editor.state.selection.to,
          "<p><strong>Answer: </strong>" +
            aiAnswer.response.text().replace("```html", "").replace("```", "")
        )
        .run();

      // const existingFileText = editor.getHTML();
      // editor.commands.setContent(
      //   existingFileText +
      //     "<p><strong>Answer: </strong>" +
      //     aiAnswer.response.text().replace("```html", "").replace("```", "") +
      //     "</p>"
      // );
      saveNotes();
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes("503") &&
        error.message.includes("overloaded")
      ) {
        toast.error("AI is currently unavailable. Please try again later.");
      } else {
        // Handle other types of errors
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const saveNotes = async () => {
    await saveNotesToDb({
      notes: editor.getHTML(),
      fileId: fileId as string,
      createdBy: user?.primaryEmailAddress?.emailAddress || "",
    });
  };

  return (
    <>
      {/* Bubble Menu */}
      <BubbleMenu
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // Only show menu when text is selected
          const hasSelection = from !== to;
          const isEmptyTextBlock =
            state.doc.textBetween(from, to, " ").length === 0;
          return hasSelection && !isEmptyTextBlock;
        }}
        tippyOptions={{
          duration: 100,
          placement: "top",
        }}
        className="flex gap-1 rounded-full bg-gray-800 opacity-95 rounded-xl shadow-xl hover:cursor-pointer"
      >
        <button onClick={() => handleAIClick()} className=" gap-2 p-2 px-3">
          <span className="text-white">Ask AI</span>
        </button>
      </BubbleMenu>

      {/* Main Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border rounded-t-lg bg-white h-auto shadow-sm">
        <div className="flex gap-1 items-center border-r pr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <Bold size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <Italic size={18} />
          </MenuButton>
          <MenuButton onClick={setLink} isActive={editor.isActive("link")}>
            <LinkIcon size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <Unlink size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive("highlight")}
          >
            <Highlighter size={18} />
          </MenuButton>
        </div>

        <div className="flex gap-1 items-center border-r pr-2">
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
          >
            <Heading1 size={18} />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 size={18} />
          </MenuButton>
        </div>

        <div className="flex gap-1 items-center border-r pr-2">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
          >
            <AlignLeft size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
          >
            <AlignCenter size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
          >
            <AlignRight size={18} />
          </MenuButton>
        </div>

        <div className="flex gap-1 items-center border-r pr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          >
            <List size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          >
            <ListOrdered size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
          >
            <Quote size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
          >
            <Code size={18} />
          </MenuButton>
        </div>

        <div className="flex gap-1 items-center border-r pr-2">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo size={18} />
          </MenuButton>
        </div>
        <div className="flex mx-2 gap-2 items-center ">
          <Button
            variant="outline"
            onClick={() => {
              saveNotes();
              toast("Notes saved!");
            }}
          >
            <SaveIcon />
          </Button>
          <button className="relative inline-flex h-8 overflow-hidden rounded-lg p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-white px-3 py-1 text-sm font-medium backdrop-blur-3xl"
              onClick={() => handleAIClick()}
            >
              <span> Ask AI</span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default EditorExtensions;
