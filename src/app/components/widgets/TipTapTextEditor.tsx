import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TipTapTextEditor({
  content,
  callback,
}: {
  content?: string;
  callback: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "border rounded-lg border-gray-400 p-3 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    injectCSS: false,
    editable: true,
    onUpdate({ editor }) {
        if(editor.isEmpty) {
            callback("");
            return;
        }
        const html = editor.getHTML()
        callback(html);
    },
    content: content ?? "<p>Hello! 🌎️</p>",
  });

  return (
    <div className="relative">
      <EditorContent editor={editor} />
    </div>
  );
}
