import React from "react";

/**
 * Convierte markdown simplificado a JSX con los mismos estilos
 * que se muestran en la página pública del artículo.
 * Soporta: ## H2, ### H3, **negrita**, *cursiva*, - listas, --- separador, | tablas, párrafos.
 */
export function renderMarkdown(content: string): React.ReactNode[] {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i].trim();

        if (!line) { i++; continue; }

        if (line.startsWith("## ")) {
            elements.push(
                <h2 key={`h2-${i}`} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-5 leading-tight">
                    {line.replace("## ", "")}
                </h2>
            );
        } else if (line.startsWith("### ")) {
            elements.push(
                <h3 key={`h3-${i}`} className="text-xl font-bold text-blue-400 mt-8 mb-4">
                    {line.replace("### ", "")}
                </h3>
            );
        } else if (line.startsWith("- ") || line.startsWith("* ")) {
            const items: string[] = [];
            while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
                items.push(lines[i].trim().replace(/^[-*] /, ""));
                i++;
            }
            elements.push(
                <ul key={`ul-${i}`} className="space-y-2 my-5 pl-4">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span dangerouslySetInnerHTML={{
                                __html: item
                                    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>")
                                    .replace(/\*(.*?)\*/g, "<em>$1</em>")
                            }} />
                        </li>
                    ))}
                </ul>
            );
            continue;
        } else if (line.startsWith("---")) {
            elements.push(<hr key={`hr-${i}`} className="my-10 border-gray-800" />);
        } else if (line.startsWith("|")) {
            const tableLines: string[] = [];
            while (i < lines.length && lines[i].trim().startsWith("|")) {
                if (!lines[i].includes("---")) tableLines.push(lines[i].trim());
                i++;
            }
            if (tableLines.length > 0) {
                const headers = tableLines[0].split("|").filter(c => c.trim()).map(c => c.trim());
                const rows = tableLines.slice(1).map(r => r.split("|").filter(c => c.trim()).map(c => c.trim()));
                elements.push(
                    <div key={`table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-gray-800">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-900">
                                    {headers.map((h, hi) => (
                                        <th key={hi} className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {rows.map((row, ri) => (
                                    <tr key={ri} className="hover:bg-slate-900/50">
                                        {row.map((cell, ci) => (
                                            <td key={ci} className="px-4 py-3 text-gray-300">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            }
            continue;
        } else {
            const html = line
                .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em class='text-gray-400 italic'>$1</em>");
            elements.push(
                <p key={`p-${i}`} className="text-gray-300 leading-relaxed my-4"
                    dangerouslySetInnerHTML={{ __html: html }} />
            );
        }

        i++;
    }

    return elements;
}
