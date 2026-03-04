import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Elementos de fondo / decoración */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Contenido principal */}
            <div className="relative z-10 flex flex-col items-center max-w-xl">
                <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-900 border border-slate-800 shadow-2xl relative shadow-blue-500/10">
                    <AlertCircle size={44} className="text-blue-500 animate-pulse relative z-10" />
                    <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-ping"></div>
                </div>

                <h1 className="text-8xl md:text-9xl font-black mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 leading-none">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-200">
                    Página no encontrada
                </h2>

                <p className="text-slate-400 mb-10 text-base md:text-lg leading-relaxed px-4">
                    Lo sentimos, el enlace o el archivo que buscas no existe. Es posible que haya sido movido, eliminado o que la dirección (URL) sea incorrecta.
                </p>

                <Link
                    href="/"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                >
                    <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <Home size={20} className="relative z-10" />
                    <span className="relative z-10 text-sm md:text-base tracking-wide uppercase">Volver al sitio web principal</span>
                </Link>
            </div>
        </div>
    );
}
