import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Link as LinkIcon,
  Minus,
  Strikethrough,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-sage-deep underline" } }),
      Placeholder.configure({ placeholder: placeholder ?? "Commencez à écrire..." }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose-editor min-h-[280px] max-h-[520px] overflow-y-auto px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  // Sync external value changes (e.g. switching between articles)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-input rounded-md bg-ivory overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const Btn = ({
    onClick,
    active,
    disabled,
    label,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    label: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`p-2 rounded hover:bg-cream disabled:opacity-40 disabled:cursor-not-allowed ${
        active ? "bg-sage-deep text-ivory hover:bg-sage-deep" : ""
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-card px-2 py-1.5">
      <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Gras">
        <Bold className="h-4 w-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italique">
        <Italic className="h-4 w-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} label="Barré">
        <Strikethrough className="h-4 w-4" />
      </Btn>
      <div className="w-px h-5 bg-border mx-1" />
      <Btn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        label="Titre H2"
      >
        <Heading2 className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
        label="Titre H3"
      >
        <Heading3 className="h-4 w-4" />
      </Btn>
      <div className="w-px h-5 bg-border mx-1" />
      <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Liste à puces">
        <List className="h-4 w-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Liste numérotée">
        <ListOrdered className="h-4 w-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Citation">
        <Quote className="h-4 w-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} label="Séparateur">
        <Minus className="h-4 w-4" />
      </Btn>
      <div className="w-px h-5 bg-border mx-1" />
      <Btn
        onClick={() => {
          const prev = editor.getAttributes("link").href as string | undefined;
          const url = window.prompt("URL du lien", prev ?? "https://");
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
        active={editor.isActive("link")}
        label="Lien"
      >
        <LinkIcon className="h-4 w-4" />
      </Btn>
      <div className="ml-auto flex items-center gap-0.5">
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} label="Annuler">
          <Undo2 className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} label="Rétablir">
          <Redo2 className="h-4 w-4" />
        </Btn>
      </div>
    </div>
  );
}
