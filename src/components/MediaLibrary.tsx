"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
    Upload, Search, Copy, Check, Trash2, Image as ImageIcon,
    X, FolderOpen, LayoutGrid, List, RefreshCw, Loader2
} from "lucide-react";

interface MediaFile {
    name: string;
    url: string;
    size: number;
    createdAt: string;
}

interface MediaLibraryProps {
    /** Modo "picker": muestra botón seleccionar en vez de "Copiar URL" */
    mode?: "library" | "picker";
    /** Callback cuando se selecciona una imagen en modo picker */
    onSelect?: (url: string) => void;
    /** Cerrar el modal en modo picker */
    onClose?: () => void;
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("es-ES", {
        day: "2-digit", month: "short", year: "numeric"
    });
}

function isPdf(url: string) {
    return url.toLowerCase().endsWith(".pdf");
}

/** Miniatura: imagen normal o icono PDF si es PDF */
function FileThumbnail({ url, name, className }: { url: string; name: string; className?: string }) {
    if (isPdf(url)) {
        return (
            <div className={`flex flex-col items-center justify-center bg-[#1a0000] ${className ?? "w-full h-full"}`}>
                {/* Adobe PDF Logo SVG */}
                <svg viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow">
                    <rect width="56" height="64" rx="6" fill="#CC0000" />
                    <text x="28" y="36" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial,sans-serif">PDF</text>
                    <rect x="8" y="44" width="40" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
                </svg>
                <span className="text-[9px] text-red-300/70 mt-1.5 font-mono truncate max-w-full px-1">{name.split("/").pop()}</span>
            </div>
        );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={name} className={`object-cover ${className ?? "w-full h-full"}`} loading="lazy" />;
}

export default function MediaLibrary({ mode = "library", onSelect, onClose }: MediaLibraryProps) {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [filtered, setFiltered] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<MediaFile | null>(null);
    const [copiedName, setCopiedName] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [dragOver, setDragOver] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const fetchFiles = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/media");
            const data = await res.json();
            const list = Array.isArray(data) ? data : [];
            setFiles(list);
            setFiltered(list);
        } catch {
            setFiles([]);
            setFiltered([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchFiles(); }, [fetchFiles]);

    useEffect(() => {
        const q = search.toLowerCase().trim();
        setFiltered(q ? files.filter(f => f.name.toLowerCase().includes(q)) : files);
    }, [search, files]);

    async function handleUpload(fileList: FileList | null) {
        if (!fileList || fileList.length === 0) return;
        setUploading(true);
        const form = new FormData();
        for (const file of Array.from(fileList)) form.append("files", file);

        try {
            await fetch("/api/admin/media", { method: "POST", body: form });
            await fetchFiles();
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete(file: MediaFile) {
        if (!confirm(`¿Eliminar "${file.name}" permanentemente?`)) return;
        setDeleting(file.name);
        try {
            await fetch(`/api/admin/media?name=${encodeURIComponent(file.name)}`, { method: "DELETE" });
            if (selected?.name === file.name) setSelected(null);
            await fetchFiles();
        } finally {
            setDeleting(null);
        }
    }

    function copyUrl(url: string, name: string) {
        navigator.clipboard.writeText(window.location.origin + url);
        setCopiedName(name);
        setTimeout(() => setCopiedName(null), 2000);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragOver(false);
        handleUpload(e.dataTransfer.files);
    }

    const isPickerMode = mode === "picker";

    return (
        <div className={`flex flex-col bg-slate-950 ${isPickerMode ? "" : "min-h-[70vh]"}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <FolderOpen size={16} className="text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-wider">
                            {isPickerMode ? "Seleccionar imagen" : "Biblioteca de medios"}
                        </h2>
                        <p className="text-[10px] text-slate-600">{files.length} archivo{files.length !== 1 ? "s" : ""} · /public/uploads</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* View mode toggle */}
                    <div className="flex bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                        <button onClick={() => setViewMode("grid")} className={`p-2 transition-all ${viewMode === "grid" ? "bg-slate-800 text-white" : "text-slate-600 hover:text-slate-400"}`}>
                            <LayoutGrid size={15} />
                        </button>
                        <button onClick={() => setViewMode("list")} className={`p-2 transition-all ${viewMode === "list" ? "bg-slate-800 text-white" : "text-slate-600 hover:text-slate-400"}`}>
                            <List size={15} />
                        </button>
                    </div>

                    {/* Refresh */}
                    <button onClick={fetchFiles} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all">
                        <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                    </button>

                    {/* Upload button */}
                    <button
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
                    >
                        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                        {uploading ? "Subiendo..." : "Subir archivos"}
                    </button>

                    {isPickerMode && onClose && (
                        <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all">
                            <X size={15} />
                        </button>
                    )}
                </div>
            </div>

            {/* Toolbar: search + filters */}
            <div className="flex items-center gap-3 px-6 py-3 border-b border-slate-800/50">
                <div className="relative flex-1 max-w-xs">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por nombre..."
                        className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-700 outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>
                <span className="text-[10px] text-slate-700">
                    {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Main area: gallery + sidebar */}
            <div className="flex flex-1 overflow-hidden min-h-0" style={{ minHeight: 480 }}>
                {/* Gallery */}
                <div
                    className={`flex-1 overflow-y-auto p-4 transition-all ${dragOver ? "bg-blue-500/5 border-2 border-dashed border-blue-500/40" : ""}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-4">
                            <Loader2 className="animate-spin text-blue-400" size={32} />
                            <p className="text-slate-600 text-sm">Cargando archivos...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                                <ImageIcon size={28} className="text-slate-700" />
                            </div>
                            <div className="text-center">
                                <p className="text-slate-500 text-sm font-semibold">
                                    {search ? "Sin resultados para tu búsqueda" : "No hay imágenes aún"}
                                </p>
                                <p className="text-slate-700 text-xs mt-1">
                                    {search ? "Intenta con otro término" : "Arrastra aquí tus imágenes o usa el botón Subir"}
                                </p>
                            </div>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                            {filtered.map(file => (
                                <div
                                    key={file.name}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelected(selected?.name === file.name ? null : file)}
                                    onKeyDown={e => e.key === "Enter" && setSelected(selected?.name === file.name ? null : file)}
                                    className={`relative aspect-square rounded-xl overflow-hidden border group transition-all cursor-pointer ${selected?.name === file.name
                                        ? "border-blue-500 ring-2 ring-blue-500/40 scale-[1.02]"
                                        : "border-slate-800 hover:border-slate-600"
                                        }`}
                                >
                                    <FileThumbnail url={file.url} name={file.name} className="w-full h-full object-cover" />
                                    {/* Hover overlay */}
                                    <div className={`absolute inset-0 bg-blue-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ${selected?.name === file.name ? "!opacity-100 bg-blue-600/60" : ""}`}>
                                        {selected?.name === file.name && (
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                                                <Check size={14} className="text-blue-600" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Delete button — válido dentro de div, no de button */}
                                    <button
                                        onClick={e => { e.stopPropagation(); handleDelete(file); }}
                                        className="absolute top-1 right-1 w-6 h-6 rounded-lg bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 z-10"
                                    >
                                        {deleting === file.name ? <Loader2 size={10} className="animate-spin" /> : <X size={10} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* List view */
                        <div className="space-y-1">
                            {filtered.map(file => (
                                <div
                                    key={file.name}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelected(selected?.name === file.name ? null : file)}
                                    onKeyDown={e => e.key === "Enter" && setSelected(selected?.name === file.name ? null : file)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all group cursor-pointer ${selected?.name === file.name
                                        ? "border-blue-500 bg-blue-500/10"
                                        : "border-transparent hover:border-slate-800 hover:bg-slate-900/40"
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-800 shrink-0 flex items-center justify-center">
                                        <FileThumbnail url={file.url} name={file.name} className="w-full h-full" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-semibold text-slate-300 truncate">{file.name}</div>
                                        <div className="text-[10px] text-slate-600 mt-0.5">{formatBytes(file.size)} · {formatDate(file.createdAt)}</div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <button
                                            onClick={e => { e.stopPropagation(); copyUrl(file.url, file.name); }}
                                            className="px-2.5 py-1 bg-slate-800 text-slate-400 hover:text-white rounded-lg text-[10px] font-bold transition-all"
                                        >
                                            {copiedName === file.name ? "✓ Copiado" : "Copiar URL"}
                                        </button>
                                        <button
                                            onClick={e => { e.stopPropagation(); handleDelete(file); }}
                                            className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    {selected?.name === file.name && (
                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Drop hint */}
                    {dragOver && (
                        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
                            <div className="bg-blue-600/90 backdrop-blur-sm text-white px-8 py-6 rounded-2xl text-lg font-bold shadow-2xl">
                                📁 Suelta tus imágenes aquí
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar — detail panel for selected image */}
                <div className={`w-64 border-l border-slate-800 shrink-0 flex flex-col transition-all ${selected ? "opacity-100" : "opacity-40"}`}>
                    {selected ? (
                        <>
                            {/* Preview */}
                            <div className="p-4 border-b border-slate-800">
                                <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={selected.url} alt={selected.name} className="w-full h-full object-contain" />
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                                <div>
                                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Nombre</label>
                                    <p className="text-xs text-slate-300 break-all">{selected.name}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Tamaño</label>
                                    <p className="text-xs text-slate-300">{formatBytes(selected.size)}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Subida</label>
                                    <p className="text-xs text-slate-300">{formatDate(selected.createdAt)}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">URL de la imagen</label>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <input
                                            readOnly
                                            value={`${typeof window !== "undefined" ? window.location.origin : ""}${selected.url}`}
                                            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-[10px] text-slate-400 outline-none font-mono truncate"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-4 border-t border-slate-800 space-y-2">
                                {isPickerMode ? (
                                    <button
                                        onClick={() => { onSelect?.(selected.url); }}
                                        className="w-full py-3 bg-primary-blue text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                                    >
                                        <Check size={14} />
                                        Usar esta imagen
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => copyUrl(selected.url, selected.name)}
                                        className="w-full py-3 bg-primary-blue text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                                    >
                                        {copiedName === selected.name
                                            ? <><Check size={14} /> URL Copiada</>
                                            : <><Copy size={14} /> Copiar URL</>
                                        }
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(selected)}
                                    className="w-full py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={13} />
                                    {deleting === selected.name ? "Eliminando..." : "Eliminar archivo"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                                <ImageIcon size={20} className="text-slate-700" />
                            </div>
                            <p className="text-slate-700 text-xs">Selecciona una imagen para ver sus detalles</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Hidden file input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => handleUpload(e.target.files)}
            />
        </div>
    );
}
