import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

const BTN = ({ onClick, active, title, children }) => (
    <button
        type="button"
        title={title}
        onClick={onClick}
        style={{
            padding: '3px 7px',
            border: 'none',
            borderRadius: 3,
            background: active ? '#dbeafe' : 'none',
            color: active ? '#1d4ed8' : '#374151',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'inherit',
            lineHeight: 1.4,
        }}
    >
        {children}
    </button>
);

const SEP = () => (
    <span style={{ width: 1, background: '#e5e7eb', margin: '3px 4px', alignSelf: 'stretch', display: 'inline-block' }} />
);

export default function RichEditor({ value, onChange, invalid }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
        ],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    if (!editor) return null;

    return (
        <div style={{
            border: `1px solid ${invalid ? '#ef4444' : '#d1d5db'}`,
            borderRadius: 4,
            overflow: 'hidden',
            background: '#fff',
        }}>
            {/* Toolbar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
                padding: '4px 6px',
                background: '#f9fafb',
                borderBottom: '1px solid #e5e7eb',
            }}>
                <BTN onClick={() => editor.chain().focus().undo().run()} title="Отменить">↩</BTN>
                <BTN onClick={() => editor.chain().focus().redo().run()} title="Повторить">↪</BTN>
                <SEP />
                <BTN
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    title="Жирный"
                ><b>B</b></BTN>
                <BTN
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    title="Курсив"
                ><i>I</i></BTN>
                <BTN
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive('underline')}
                    title="Подчёркнутый"
                ><u>U</u></BTN>
                <SEP />
                <BTN
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                    title="Заголовок"
                >H2</BTN>
                <BTN
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                    title="Подзаголовок"
                >H3</BTN>
                <SEP />
                <BTN
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    title="Список"
                >• —</BTN>
                <BTN
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    title="Нумерованный список"
                >1.</BTN>
                <SEP />
                <BTN
                    onClick={() => {
                        const url = window.prompt('URL ссылки:');
                        if (url) editor.chain().focus().setLink({ href: url }).run();
                    }}
                    active={editor.isActive('link')}
                    title="Ссылка"
                >🔗</BTN>
                <BTN
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    title="Очистить форматирование"
                >✕</BTN>
            </div>

            {/* Editor area */}
            <EditorContent
                editor={editor}
                style={{ minHeight: 120 }}
            />

            <style>{`
                .tiptap {
                    padding: 8px 10px;
                    outline: none;
                    font-size: 13px;
                    color: #111827;
                    line-height: 1.6;
                    min-height: 120px;
                }
                .tiptap p { margin: 0 0 6px; }
                .tiptap p:last-child { margin-bottom: 0; }
                .tiptap ul, .tiptap ol { padding-left: 20px; margin: 4px 0; }
                .tiptap h2 { font-size: 15px; font-weight: 700; margin: 8px 0 4px; }
                .tiptap h3 { font-size: 13px; font-weight: 700; margin: 6px 0 3px; }
                .tiptap a { color: #2563eb; text-decoration: underline; }
            `}</style>
        </div>
    );
}
