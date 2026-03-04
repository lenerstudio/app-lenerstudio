"use client";

import { useRef, useState } from "react";
import { renderMarkdown } from "@/lib/renderMarkdown";

interface MarkdownEditorProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    minRows?: number;
}

interface ToolbarButton {
    label: string;
    title: string;
    action: (textarea: HTMLTextAreaElement, value: string, onChange: (v: string) => void) => void;
}

// Inserta texto en la posición del cursor o envuelve la selección
function insertAtCursor(
    textarea: HTMLTextAreaElement,
    value: string,
    onChange: (v: string) => void,
    prefix: string,
    suffix = "",
    placeholder = "texto"
) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const newVal = `${before}${prefix}${selected}${suffix}${after}`;
    onChange(newVal);

    // Restaurar foco y selección justo después del render
    setTimeout(() => {
        textarea.focus();
        const newStart = start + prefix.length;
        const newEnd = newStart + selected.length;
        textarea.setSelectionRange(newStart, newEnd);
    }, 0);
}

// Inserta en nueva línea
function insertLine(
    textarea: HTMLTextAreaElement,
    value: string,
    onChange: (v: string) => void,
    text: string
) {
    const start = textarea.selectionStart;
    const before = value.slice(0, start);
    const after = value.slice(start);

    // Si no estamos al inicio de línea, añadir salto
    const prefix = before.length > 0 && !before.endsWith("\n") ? "\n" : "";
    const newVal = `${before}${prefix}${text}\n${after}`;
    onChange(newVal);

    setTimeout(() => {
        textarea.focus();
        const pos = before.length + prefix.length + text.length + 1;
        textarea.setSelectionRange(pos, pos);
    }, 0);
}

const TOOLBAR: (ToolbarButton | "separator")[] = [
    {
        label: "H2",
        title: "Título de sección (##)",
        action: (ta, val, onChange) => insertLine(ta, val, onChange, "## Título de sección"),
    },
    {
        label: "H3",
        title: "Subtítulo (###)",
        action: (ta, val, onChange) => insertLine(ta, val, onChange, "### Subtítulo"),
    },
    "separator",
    {
        label: "B",
        title: "Negrita (**texto**)",
        action: (ta, val, onChange) => insertAtCursor(ta, val, onChange, "**", "**", "negrita"),
    },
    {
        label: "I",
        title: "Cursiva (*texto*)",
        action: (ta, val, onChange) => insertAtCursor(ta, val, onChange, "*", "*", "cursiva"),
    },
    "separator",
    {
        label: "— Lista",
        title: "Lista con viñetas",
        action: (ta, val, onChange) =>
            insertLine(ta, val, onChange, "- Elemento\n- Elemento\n- Elemento"),
    },
    {
        label: "⊟ Tabla",
        title: "Insertar tabla",
        action: (ta, val, onChange) =>
            insertLine(
                ta, val, onChange,
                "| Columna 1 | Columna 2 |\n|-----------|----------|\n| Dato | Dato |"
            ),
    },
    "separator",
    {
        label: "─── Separador",
        title: "Línea separadora (---)",
        action: (ta, val, onChange) => insertLine(ta, val, onChange, "---"),
    },
    {
        label: "💡 Callout",
        title: "Párrafo destacado en negrita",
        action: (ta, val, onChange) =>
            insertLine(ta, val, onChange, "**💡 Tip: escribe aquí tu consejo destacado**"),
    },
];

export default function MarkdownEditor({
    value,
    onChange,
    placeholder = "Escribe el contenido del artículo en markdown...",
    minRows = 16,
}: MarkdownEditorProps) {
    const [tab, setTab] = useState<"edit" | "preview">("edit");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => setTab("edit")}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${tab === "edit"
                                ? "bg-primary-blue text-white"
                                : "text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        ✏️ Editar
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab("preview")}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${tab === "preview"
                                ? "bg-primary-blue text-white"
                                : "text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        👁 Vista Previa
                    </button>
                </div>
                <span className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">
                    Markdown
                </span>
            </div>

            {/* Toolbar — solo visible en modo editar */}
            {tab === "edit" && (
                <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-slate-800 bg-slate-900/60">
                    {TOOLBAR.map((item, idx) =>
                        item === "separator" ? (
                            <div key={idx} className="w-px h-4 bg-slate-700 mx-1" />
                        ) : (
                            <button
                                key={idx}
                                type="button"
                                title={item.title}
                                onClick={() => {
                                    if (textareaRef.current) {
                                        item.action(textareaRef.current, value, onChange);
                                    }
                                }}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-black text-slate-400 hover:text-white hover:bg-slate-800 transition-all uppercase tracking-tight border border-transparent hover:border-slate-700"
                            >
                                {item.label}
                            </button>
                        )
                    )}
                </div>
            )}

            {/* Content area */}
            {tab === "edit" ? (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={minRows}
                    className="w-full bg-transparent text-slate-300 text-sm leading-relaxed p-4 outline-none resize-y font-mono placeholder:text-slate-700"
                    style={{ minHeight: `${minRows * 1.6}rem` }}
                    spellCheck={false}
                />
            ) : (
                <div
                    className="min-h-64 p-6 overflow-y-auto bg-gray-950"
                    style={{ minHeight: `${minRows * 1.6}rem` }}
                >
                    {value.trim() ? (
                        <div className="max-w-none">
                            {renderMarkdown(value)}
                        </div>
                    ) : (
                        <p className="text-slate-700 italic text-sm text-center py-16">
                            El artículo estará vacío. Escribe algo en el editor para ver la vista previa.
                        </p>
                    )}
                </div>
            )}

            {/* Footer con referencia de sintaxis */}
            {tab === "edit" && (
                <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/40">
                    <p className="text-[9px] text-slate-700 font-mono">
                        <span className="text-slate-600">## H2</span>
                        {" · "}
                        <span className="text-slate-600">### H3</span>
                        {" · "}
                        <span className="text-slate-600">**negrita**</span>
                        {" · "}
                        <span className="text-slate-600">*cursiva*</span>
                        {" · "}
                        <span className="text-slate-600">- lista</span>
                        {" · "}
                        <span className="text-slate-600">| col |</span>
                        {" · "}
                        <span className="text-slate-600">---</span>
                    </p>
                </div>
            )}
        </div>
    );
}
