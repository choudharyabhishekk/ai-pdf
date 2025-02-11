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
  Sparkle,
  Loader,
  BotMessageSquare,
  Sparkles,
} from "lucide-react";
import { chatSession } from "@/configs/AIModel";
import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

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

  const handleAIClick = async () => {
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
    // console.log("answer:", answer);

    const prompt =
      "For question: " +
      selectedText +
      " and with the given content as answer, please give appropriate answer in HTML format with proper formatting and without html, head, and body tags. Also don't return the question, just provide the answer. The answer content is: " +
      answer;
    const aiAnswer = await chatSession.sendMessage(prompt);
    console.log("AI Answer:", aiAnswer.response.text());
    const existingFileText = editor.getHTML();
    editor.commands.setContent(
      existingFileText +
        "<p><strong>Answer: </strong>" +
        aiAnswer.response.text() +
        "</p>"
    );
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
          trigger: "mouseup",
        }}
        className="flex gap-1 rounded-full bg-white rounded-xl shadow-sm hover:cursor-pointer"
      >
        <Button
          variant="ghost"
          className="rounded-pill border hover:cursor-pointer"
          onClick={() => handleAIClick()}
        >
          <Sparkles size="10" />
          Ask AI
        </Button>
      </BubbleMenu>

      {/* Main Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border rounded-lg bg-white shadow-sm">
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
        <div className="flex gap-2 items-center ">
          <Button
            variant="secondary"
            className="rounded-pill border"
            onClick={() => handleAIClick()}
          >
            Ask AI
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditorExtensions;
