"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import MediaLibrary from "@/components/MediaLibrary";
import {
  Loader2,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Settings,
  Star,
  TrendingUp,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Save,
  Check,
  RefreshCw,
  MessageCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  BookOpen,
  Megaphone,
  DollarSign,
  Globe,
  X,
  ToggleLeft,
  ToggleRight,
  ImagePlus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewType =
  | "overview"
  | "leads"
  | "portfolio"
  | "testimonials"
  | "settings"
  | "blog"
  | "popups"
  | "pricing"
  | "media";
import { Project } from "../interface/Project";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ViewType>("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated") {
      fetch("/api/admin/analytics")
        .then(res => res.json())
        .then(data => setStats(data.summary));
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-primary-blue mb-4" size={48} />
        <p className="text-slate-400 animate-pulse">
          Cargando ecosistema Lener...
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex overflow-hidden">
      {/* Sidebar Premium */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 240 : 72 }}
        className="border-r border-slate-800/40 bg-[#020617] flex flex-col z-20"
      >
        <div className="p-5 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
            >
              LENER PANEL
            </motion.h2>
          )}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800/50 rounded-lg text-slate-500"
          >
            <LayoutDashboard size={20} />
          </button>
        </div>

        <nav className="flex-grow p-3 space-y-1">
          <NavItem
            icon={<TrendingUp size={18} />}
            label="Overview"
            active={activeView === "overview"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("overview")}
          />
          <NavItem
            icon={<MessageSquare size={18} />}
            label="Leads & Mensajes"
            active={activeView === "leads"}
            badge={stats?.newLeads > 0 ? stats.newLeads.toString() : undefined}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("leads")}
          />
          <NavItem
            icon={<Briefcase size={18} />}
            label="Portafolio"
            active={activeView === "portfolio"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("portfolio")}
          />
          <NavItem
            icon={<Star size={18} />}
            label="Testimonios"
            active={activeView === "testimonials"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("testimonials")}
          />
          <div className="my-3 border-t border-slate-800/40 mx-2" />
          <NavItem
            icon={<BookOpen size={18} />}
            label="Blog"
            active={activeView === "blog"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("blog")}
          />
          <NavItem
            icon={<Megaphone size={18} />}
            label="Popups"
            active={activeView === "popups"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("popups")}
          />
          <NavItem
            icon={<DollarSign size={18} />}
            label="Precios"
            active={activeView === "pricing"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("pricing")}
          />
          <div className="my-3 border-t border-slate-800/40 mx-2" />
          <NavItem
            icon={<Settings size={18} />}
            label="Configuración & SEO"
            active={activeView === "settings"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("settings")}
          />
          <div className="my-3 border-t border-slate-800/40 mx-2" />
          <NavItem
            icon={<ImagePlus size={18} />}
            label="Medios"
            active={activeView === "media"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("media")}
          />
        </nav>

        <div className="p-3 border-t border-slate-800/40">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 text-slate-500 hover:text-red-400 p-2.5 rounded-xl transition-all hover:bg-red-500/10"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800/40 flex items-center justify-between px-6 bg-slate-950/40 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold uppercase tracking-widest text-white/90">
              {activeView.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-green-500/5 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">
                Online
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold overflow-hidden">
              {session.user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        {/* Dynamic View Scroll Area */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar bg-slate-950/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === "overview" && <OverviewView />}
              {activeView === "leads" && <LeadsView />}
              {activeView === "portfolio" && <PortfolioView />}
              {activeView === "testimonials" && <TestimoniosView />}
              {activeView === "settings" && <SettingsView />}
              {activeView === "blog" && <BlogView />}
              {activeView === "popups" && <PopupsView />}
              {activeView === "pricing" && <PricingView />}
              {activeView === "media" && <MediaView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({ icon, label, active, badge, collapsed, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all relative group ${active
        ? "bg-white/10 text-white"
        : "text-slate-500 hover:bg-slate-800/30 hover:text-slate-200"
        }`}
    >
      <div
        className={`${active ? "text-primary-blue" : "group-hover:text-primary-blue"} transition-colors`}
      >
        {icon}
      </div>
      {!collapsed && (
        <span className="font-medium text-[13px] whitespace-nowrap tracking-tight">{label}</span>
      )}
      {!collapsed && badge && (
        <span className="ml-auto bg-primary-blue text-white text-[9px] px-1.5 py-0.5 rounded-md font-black">
          {badge}
        </span>
      )}
      {active && (
        <div className="absolute left-0 w-0.5 h-4 bg-primary-blue rounded-r-full" />
      )}
    </button>
  );
}

function OverviewView() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [seedState, setSeedState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [seedResults, setSeedResults] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const runSeed = async () => {
    setSeedState("loading");
    setSeedResults([]);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSeedResults(data.results || []);
        setSeedState("done");
      } else {
        setSeedState("error");
        setSeedResults([{ table: "error", inserted: 0, skipped: 0, error: data.error || "Error desconocido" }]);
      }
    } catch {
      setSeedState("error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary-blue" />
      </div>
    );

  const summary = analytics?.summary || {
    totalLeads: 0,
    newLeads: 0,
    totalViews: 0,
  };
  const chartData = analytics?.viewsByDay || [];

  const reversedChart = [...chartData].reverse();
  const maxVal = Math.max(...reversedChart.map((d: any) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Seed panel - only show while not done or while results are shown */}
      <div className="bg-gradient-to-r from-slate-900/80 to-blue-900/20 border border-blue-500/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Datos de ejemplo</span>
          </div>
          <p className="text-sm font-semibold text-slate-300">Cargar datos de ejemplo en Blog, Popup y Precios</p>
          <p className="text-[11px] text-slate-600 mt-0.5">Solo inserta registros que no existan. Es seguro ejecutarlo varias veces.</p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-2">
          <button
            onClick={runSeed}
            disabled={seedState === "loading"}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-500 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
          >
            {seedState === "loading" ? (
              <><Loader2 size={14} className="animate-spin" /> Insertando...</>
            ) : seedState === "done" ? (
              <><Check size={14} /> Completado</>
            ) : (
              <><Plus size={14} /> Cargar datos de ejemplo</>
            )}
          </button>
          {seedResults.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-end">
              {seedResults.map((r: any) => (
                <div key={r.table} className={`text-[9px] font-black px-2.5 py-1 rounded-full border uppercase ${r.error ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}>
                  {r.error
                    ? `${r.table}: ERROR`
                    : `${r.table}: +${r.inserted} / ${r.skipped} ya existían`
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Leads Totales"
          value={summary.totalLeads.toString()}
          subValue="Histórico"
        />
        <StatCard
          label="Nuevos Leads"
          value={summary.newLeads.toString()}
          subValue="Pendientes"
          highlight
        />
        <StatCard
          label="Visitas Totales"
          value={summary.totalViews.toString()}
          subValue="Páginas vistas"
        />
        <StatCard
          label="Tasa Conversión"
          value={`${((summary.totalLeads / (summary.totalViews || 1)) * 100).toFixed(1)}%`}
          subValue="Rendimiento"
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/40 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Actividad Reciente
            </h3>
            <div className="text-[10px] text-slate-600 font-bold uppercase">
              7 días
            </div>
          </div>
          <div className="h-48 flex items-end gap-2 px-2">
            {reversedChart.length > 0 ? (
              reversedChart.map((day: any, i: number) => (
                <div
                  key={i}
                  className="flex-grow flex flex-col items-center gap-2 group"
                >
                  <div className="relative w-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.count / maxVal) * 100}%` }}
                      className="w-full bg-primary-blue/20 group-hover:bg-primary-blue/50 rounded-t-md transition-colors cursor-pointer min-h-[2px]"
                    />
                  </div>
                  <span className="text-[9px] text-slate-600 font-bold uppercase">
                    {new Date(day.date).toLocaleDateString("es-ES", {
                      weekday: "short",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-700 italic text-xs tracking-tight">
                Esperando flujo de datos...
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/40 p-6 rounded-2xl">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
            Atajos de Control
          </h3>
          <div className="space-y-2">
            <ActionButton
              label="Ver mensajes"
              icon={<MessageSquare size={14} />}
            />
            <ActionButton label="Nuevo proyecto" icon={<Plus size={14} />} />
            <ActionButton
              label="Cambiar SEO"
              icon={<Search size={14} />}
            />
            <div className="pt-4 mt-4 border-t border-slate-800/40 opacity-50">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Server Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ label, icon }: any) {
  return (
    <button className="w-full flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-800/50 rounded-xl text-xs text-slate-400 hover:text-white hover:border-primary-blue/30 transition-all text-left group">
      <div className="text-slate-600 group-hover:text-primary-blue transition-colors">
        {icon}
      </div>
      <span className="font-bold tracking-tight">{label}</span>
    </button>
  );
}

function Last7Days() {
  return (
    <>
      <option>Últimos 7 días</option>
      <option>Últimos 30 días</option>
    </>
  );
}

import { useToast } from "@/components/ui/use-toast";

function LeadsView() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();

  const fetchLeads = (silent = false) => {
    if (!silent) setLoading(true);
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        if (silent && data.length > leads.length) {
          toast({
            title: "🔔 ¡Nuevo Lead!",
            description: `Has recibido un nuevo mensaje de ${data[0].name}`,
            variant: "default",
          });
        }
        setLeads(data);
        setTotalLeads(data.length);
        if (!silent) setLoading(false);
      })
      .catch(() => { if (!silent) setLoading(false); });
  };

  useEffect(() => {
    fetchLeads();

    // Polling cada 30 segundos para "notificaciones de entrada"
    const interval = setInterval(() => fetchLeads(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev: any) =>
          prev.map((l: any) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary-blue" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative flex-grow max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
            size={14}
          />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full bg-slate-900/60 border border-slate-800/60 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:ring-1 focus:ring-primary-blue/30 transition-all text-slate-400"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border border-slate-800/60 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">
            <Filter size={14} /> Filtrar
          </button>
          <div className="flex items-center gap-3 px-4 py-2 bg-primary-blue/5 rounded-xl border border-primary-blue/10">
            <span className="text-[10px] font-black text-primary-blue/60 uppercase tracking-widest">Registros:</span>
            <span className="text-xs font-black text-primary-blue">{totalLeads}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-[0.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800/40 bg-slate-950/40">
              <th className="px-5 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">Fecha</th>
              <th className="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">Lead / Identidad</th>
              <th className="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">Interés</th>
              <th className="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">Msj</th>
              <th className="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">Gestión</th>
              <th className="px-5 py-3 text-right text-[10px] font-black text-slate-600 uppercase tracking-widest">Canal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/10">
            {leads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((lead: any) => {
              const statusColors: any = {
                nuevo: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                contactado: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                en_negociacion: "text-purple-400 bg-purple-500/10 border-purple-500/20",
                ganado: "text-green-400 bg-green-500/10 border-green-500/20",
                perdido: "text-red-400 bg-red-500/10 border-red-500/20"
              };

              return (
                <tr key={lead.id} className="hover:bg-white/[0.01] transition-all group">
                  <td className="px-5 py-1 text-[10px] text-slate-600 font-bold">
                    {new Date(lead.created_at).toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-3 py-2">
                    <div className="max-w-[180px]">
                      <div className="text-[12px] font-black text-slate-300 truncate tracking-tight">{lead.name}</div>
                      <a href={`mailto:${lead.email}`} className="text-[10px] text-slate-600 hover:text-primary-blue transition-colors font-bold block truncate">
                        {lead.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-900/60 text-blue-300 rounded border border-slate-800/50 font-black uppercase tracking-tighter">
                      {lead.service_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => setSelectedMessage(lead.message)}
                      className="p-1 px-2.5 bg-slate-900 border border-slate-800 rounded text-slate-500 hover:text-white hover:border-primary-blue/30 transition-all text-[10px] font-black flex items-center gap-1.5 mx-auto"
                    >
                      <MessageSquare size={10} /> LEER
                    </button>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusColors[lead.status]?.split(' ')[1].replace('bg-', 'bg-').split('/')[0]}`} />
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`bg-slate-950/40 border border-slate-800/80 rounded py-1 px-2 text-[10px] font-black uppercase outline-none cursor-pointer transition-all hover:border-slate-700/50 focus:ring-1 focus:ring-primary-blue/20 ${statusColors[lead.status]?.split(' ')[0]}`}
                      >
                        <option value="nuevo">NUEVO</option>
                        <option value="contactado">CONTACTADO</option>
                        <option value="en_negociacion">NEGOCIANDO</option>
                        <option value="ganado">GANADO</option>
                        <option value="perdido">PERDIDO</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-5 py-2 text-right">
                    <a
                      href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 p-1 px-3 bg-green-500/5 border border-green-500/10 rounded text-green-500/60 hover:text-green-500 hover:bg-green-500/10 hover:border-green-500/30 transition-all text-[10px] font-black"
                    >
                      WHATSAPP <MessageCircle size={12} />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Leads */}
      {leads.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 py-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 disabled:opacity-20 hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Página {currentPage} de {Math.ceil(leads.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(Math.ceil(leads.length / itemsPerPage), p + 1))}
            disabled={currentPage === Math.ceil(leads.length / itemsPerPage)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 disabled:opacity-20 hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* MODAL PARA EL MENSAJE */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-slate-800 p-10 rounded-[1.5rem] w-full max-w-lg shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue">
                  <MessageSquare size={24} />
                </div>
                <button onClick={() => setSelectedMessage(null)} className="text-slate-500 hover:text-white transition-colors">
                  <RefreshCw size={20} className="rotate-45" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">Contenido del Lead</h3>
              <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-3xl text-slate-300 leading-relaxed italic">
                "{selectedMessage}"
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-full mt-8 py-4 bg-slate-800 text-slate-200 font-bold text-center rounded-2xl hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <span className="text-blue-300 text-center block">Cerrar mensaje</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PortfolioView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Landing Page",
    description: "",
    live_url: "",
    technologies: [] as string[],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchProjects = () => {
    setLoading(true);
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((data) => {
        const validProjects = Array.isArray(data) ? data : [];
        setProjects(validProjects as Project[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_published: !currentStatus }),
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este proyecto permanentemente?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      live_url: project.live_url || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies
        : typeof project.technologies === 'string'
          ? JSON.parse(project.technologies || '[]')
          : [],
    });
    setIsModalOpen(true);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !editingProject) return alert("Por favor, selecciona una imagen");

    setIsUploading(true);
    const data = new FormData();
    if (editingProject) data.append("id", editingProject.id.toString());
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("live_url", formData.live_url);
    data.append("technologies", JSON.stringify(formData.technologies));
    if (selectedFile) {
      data.append("image", selectedFile);
    } else if (editingProject) {
      data.append("current_image", editingProject.main_image);
    }

    try {
      const url = "/api/admin/portfolio";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: data,
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingProject(null);
        setFormData({
          title: "",
          category: "Landing Page",
          description: "",
          live_url: "",
          technologies: [],
        });
        setSelectedFile(null);
        fetchProjects();
      } else {
        alert("Error al procesar el proyecto");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading && projects.length === 0)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary-blue" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">
            Catálogo de Proyectos
          </h2>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setFormData({
              title: "",
              category: "Landing Page",
              description: "",
              live_url: "",
              technologies: [],
            });
            setSelectedFile(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
        >
          <Plus size={16} /> NUEVO PROYECTO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((project: any) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            category={project.category}
            image={project.main_image}
            technologies={project.technologies}
            status={project.is_published ? "Publicado" : "Oculto"}
            onToggleStatus={() => handleToggleStatus(project.id, project.is_published)}
            onEdit={() => handleOpenEdit(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}

        {currentPage === 1 && (
          <div
            onClick={() => {
              setEditingProject(null);
              setFormData({
                title: "",
                category: "Landing Page",
                description: "",
                live_url: "",
                technologies: [],
              });
              setSelectedFile(null);
              setIsModalOpen(true);
            }}
            className="border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-600 hover:border-slate-600 hover:text-slate-400 transition-all cursor-pointer group min-h-[150px]"
          >
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={20} />
            </div>
            <span className="font-bold text-[10px] tracking-widest uppercase">
              Añadir trabajo
            </span>
          </div>
        )}
      </div>

      {/* Pagination Portfolio */}
      {projects.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 py-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 disabled:opacity-20 hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Página {currentPage} de {Math.ceil(projects.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(Math.ceil(projects.length / itemsPerPage), p + 1))}
            disabled={currentPage === Math.ceil(projects.length / itemsPerPage)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 disabled:opacity-20 hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* MODAL CREAR PROYECTO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                  {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <RefreshCw size={24} className="rotate-45" />
                </button>
              </div>

              <form onSubmit={handleCreateOrUpdate} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Título del Proyecto
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Ej: E-commerce de Moda"
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Categoría
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none"
                    >
                      <option>Landing Page</option>
                      <option>Web Corporativa</option>
                      <option>E-commerce</option>
                      <option>SaaS / App</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe brevemente el resultado..."
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    URL en vivo
                  </label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) =>
                      setFormData({ ...formData, live_url: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Tecnologías Utilizadas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "MySQL", "PHP", "Laravel", "WordPress", "Framer Motion"].map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => {
                          const techs = formData.technologies.includes(tech)
                            ? formData.technologies.filter(t => t !== tech)
                            : [...formData.technologies, tech];
                          setFormData({ ...formData, technologies: techs });
                        }}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter border transition-all ${formData.technologies.includes(tech)
                          ? "bg-primary-blue/20 border-primary-blue text-primary-blue"
                          : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                          }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Otra tecnología..."
                      className="flex-grow bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-white focus:ring-1 focus:ring-primary-blue outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = (e.target as HTMLInputElement).value.trim();
                          if (val && !formData.technologies.includes(val)) {
                            setFormData({ ...formData, technologies: [...formData.technologies, val] });
                            (e.target as HTMLInputElement).value = '';
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Imagen del Proyecto
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-slate-950 border-2 border-dashed border-slate-800 p-8 rounded-2xl flex flex-col items-center justify-center text-slate-500 group-hover:border-primary-blue/50 transition-all">
                      {selectedFile ? (
                        <span className="text-primary-blue font-medium">
                          {selectedFile.name}
                        </span>
                      ) : (
                        <>
                          <Plus size={24} className="mb-2" />
                          <span className="text-xs uppercase font-bold tracking-widest">
                            Subir Imagen
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 bg-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-grow-[2] py-4 bg-primary-blue text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
                  >
                    {isUploading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Check size={20} />
                    )}
                    {isUploading ? "Procesando..." : editingProject ? "Guardar Cambios" : "Crear Proyecto"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TestimoniosView() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = () => {
    setLoading(true);
    fetch("/api/admin/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleStatus = async (id: number, currentApproved: boolean) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_approved: !currentApproved }),
      });
      if (res.ok) fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este testimonio permanentemente?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && testimonials.length === 0)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary-blue" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/40 border border-slate-800/40 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center text-left">
        <div className="w-12 h-12 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex items-center justify-center text-yellow-500">
          <Star size={24} fill="currentColor" />
        </div>
        <div className="flex-grow">
          <h2 className="text-sm font-black text-white uppercase tracking-widest mb-1">
            Reseñas y Feedback
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed max-w-xl">
            Gestiona la prueba social. Los testimonios reales con badges de resultados son los que más convierten.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-all">
          Solicitar Reseña
        </button>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <TestimonialItem
              key={t.id}
              author={t.client_name}
              text={t.quote}
              approved={t.is_approved}
              onToggle={() => handleToggleStatus(t.id, t.is_approved)}
              onDelete={() => handleDelete(t.id)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-slate-500 italic">
            No hay testimonios registrados aún.
          </div>
        )}
      </div>
    </div>
  );
}

// Defaults para todas las keys que usamos en la UI
const SETTINGS_DEFAULTS: Record<string, string> = {
  whatsapp_number: "",
  contact_email: "",
  seo_home_title: "",
  seo_home_description: "",
  social_facebook: "",
  social_instagram: "",
  social_linkedin: "",
  social_twitter: "",
  social_whatsapp: "",
};

function SettingsView() {
  // Usamos un Record en lugar de array para simplificar los accesos
  const [settings, setSettings] = useState<Record<string, string>>(SETTINGS_DEFAULTS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "ok" | "error">("idle");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data = await res.json();

      // data puede ser un array (DB rows) o un objeto
      const merged = { ...SETTINGS_DEFAULTS };
      if (Array.isArray(data)) {
        data.forEach((row: any) => {
          if (row.setting_key !== undefined) {
            merged[row.setting_key] = row.setting_value ?? "";
          }
        });
      } else if (typeof data === "object" && data !== null && !data.error) {
        Object.entries(data).forEach(([k, v]) => { merged[k] = String(v ?? ""); });
      }
      setSettings(merged);
    } catch (err: any) {
      setLoadError(err.message || "Error al cargar la configuración");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  const getVal = (key: string) => settings[key] ?? "";

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (saveStatus !== "idle") setSaveStatus("idle");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      // Enviamos cada key de forma SECUENCIAL para identificar exactamente cuál falla
      const errors: string[] = [];
      for (const [key, value] of Object.entries(settings)) {
        const res = await fetch("/api/admin/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const detail = body?.detail || body?.error || `HTTP ${res.status}`;
          console.error(`[Settings] Error guardando '${key}': ${detail}`);
          errors.push(`${key}: ${detail}`);
        }
      }

      if (errors.length === 0) {
        setSaveStatus("ok");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        console.error("[Settings] Errores al guardar:", errors);
        setSaveStatus("error");
        // Mostramos el primer error en la consola del navegador
        alert(`Error al guardar:\n${errors.slice(0, 3).join("\n")}`);
      }
    } catch (err: any) {
      console.error("[Settings] Error de red:", err);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };


  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary-blue" />
      </div>
    );

  if (loadError)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <X size={22} className="text-red-400" />
        </div>
        <p className="text-red-400 font-semibold text-sm">Error al cargar: {loadError}</p>
        <button onClick={fetchSettings} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700 transition-all">
          <RefreshCw size={13} /> Reintentar
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsCard title="Información de Contacto">
          <div className="space-y-4">
            <InputGroup
              label="WhatsApp Principal"
              value={getVal("whatsapp_number")}
              onChange={(v: string) => handleChange("whatsapp_number", v)}
            />
            <InputGroup
              label="Email de Negocio"
              value={getVal("contact_email")}
              onChange={(v: string) => handleChange("contact_email", v)}
            />
            <div className="pt-2">
              <label className="text-[10px] font-black text-slate-600 uppercase mb-2 block tracking-widest">
                Estado del Botón
              </label>
              <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Visible en todas las páginas
              </div>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="SEO & Indexación">
          <div className="space-y-4">
            <InputGroup
              label="Título Meta (Home)"
              value={getVal("seo_home_title")}
              onChange={(v: string) => handleChange("seo_home_title", v)}
            />
            <InputGroup
              label="Meta Descripción"
              value={getVal("seo_home_description")}
              onChange={(v: string) => handleChange("seo_home_description", v)}
            />
            <div className="pt-2">
              <label className="text-[10px] font-black text-slate-600 uppercase mb-2 block tracking-widest">
                Indexación Google
              </label>
              <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                <Check size={16} /> Activa y rastreable (Sitemap OK)
              </div>
            </div>
          </div>
        </SettingsCard>
      </div>

      {/* Redes Sociales */}
      <SettingsCard title="Redes Sociales">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#1877F2]/20 inline-flex items-center justify-center text-[#1877F2]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </span>
              Facebook
            </label>
            <input
              type="url"
              value={getVal("social_facebook")}
              onChange={e => handleChange("social_facebook", e.target.value)}
              //placeholder="https://facebook.com/tupagina"
              className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#E4405F]/20 inline-flex items-center justify-center text-[#E4405F]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </span>
              Instagram
            </label>
            <input
              type="url"
              value={getVal("social_instagram")}
              onChange={e => handleChange("social_instagram", e.target.value)}
              placeholder="https://instagram.com/tuperfil"
              className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#0A66C2]/20 inline-flex items-center justify-center text-[#0A66C2]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </span>
              LinkedIn
            </label>
            <input
              type="url"
              value={getVal("social_linkedin")}
              onChange={e => handleChange("social_linkedin", e.target.value)}
              placeholder="https://linkedin.com/company/tuempresa"
              className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-white/10 inline-flex items-center justify-center text-slate-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </span>
              X / Twitter
            </label>
            <input
              type="url"
              value={getVal("social_twitter")}
              onChange={e => handleChange("social_twitter", e.target.value)}
              placeholder="https://x.com/tuperfil"
              className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#25D366]/20 inline-flex items-center justify-center text-[#25D366]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </span>
              Número WhatsApp (para links de contacto)
            </label>
            <input
              type="text"
              value={getVal("social_whatsapp")}
              onChange={e => handleChange("social_whatsapp", e.target.value)}
              placeholder="https://wa.me/34600000000"
              className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none transition-all"
            />
          </div>
        </div>
        <p className="text-[10px] text-slate-700 mt-4">💡 Estas URLs se usan en el footer, botones de compartir del blog y otros elementos de la web.</p>
      </SettingsCard>

      <div className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl">
        <div>
          {saveStatus === "ok" && (
            <span className="flex items-center gap-2 text-green-400 text-xs font-bold">
              <Check size={14} /> Configuración guardada correctamente
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-2 text-red-400 text-xs font-bold">
              <X size={14} /> Error al guardar. Verifica la conexión.
            </span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-3 px-6 py-3 font-black uppercase tracking-widest text-[10px] rounded-lg shadow-lg transition-all disabled:opacity-50 ${saveStatus === "ok"
            ? "bg-green-600 text-white shadow-green-500/20"
            : saveStatus === "error"
              ? "bg-red-600 text-white shadow-red-500/20"
              : "bg-primary-blue text-white shadow-blue-500/10 hover:scale-[1.02] active:scale-95"
            }`}
        >
          {isSaving ? (
            <RefreshCw className="animate-spin" size={14} />
          ) : saveStatus === "ok" ? (
            <Check size={14} />
          ) : saveStatus === "error" ? (
            <X size={14} />
          ) : (
            <Save size={14} />
          )}
          {isSaving ? "Guardando..." : saveStatus === "ok" ? "¡Guardado!" : saveStatus === "error" ? "Error" : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
}


// --- MICRO UI COMPONENTS ---

function StatCard({ label, value, subValue, highlight }: any) {
  return (
    <div className={`bg-slate-900/40 border p-4 rounded-xl transition-all group ${highlight ? "border-primary-blue/20 bg-primary-blue/5" : "border-slate-800/60"}`}>
      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 group-hover:text-primary-blue transition-colors">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-xl font-black text-white">{value}</h4>
      </div>
      <p className="text-slate-700 text-[9px] font-bold mt-1 uppercase tracking-tighter">
        {subValue}
      </p>
    </div>
  );
}

function RecentLead({ name, service, time, color }: any) {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-slate-800/30 rounded-2xl transition-all cursor-pointer">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <div className="flex-grow">
        <p className="text-sm font-bold text-white leading-none mb-1">{name}</p>
        <p className="text-[10px] text-slate-500 font-medium">{service}</p>
      </div>
      <span className="text-[10px] text-slate-600 font-bold uppercase">
        {time}
      </span>
    </div>
  );
}

function ProjectCard({ title, category, status, image, technologies, onToggleStatus, onEdit, onDelete }: any) {
  // Asegurarnos de que technologies sea un array
  const techList = Array.isArray(technologies)
    ? technologies
    : typeof technologies === 'string'
      ? JSON.parse(technologies || '[]')
      : [];

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 hover:border-primary-blue/30 transition-all group flex flex-col">
      <div className="w-full h-32 bg-slate-950 rounded-lg mb-4 relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-transparent" />
        )}
        <div className="absolute top-2 right-2">
          <div className={`w-2 h-2 rounded-full ${status === "Publicado" ? "bg-green-500" : "bg-yellow-500"} shadow-lg`} />
        </div>
      </div>
      <div className="flex-grow">
        <span className="text-[9px] font-black text-primary-blue uppercase tracking-tighter mb-1 block">
          {category}
        </span>
        <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">
          {title}
        </h4>
        <div className="flex flex-wrap gap-1 mb-4">
          {techList.slice(0, 3).map((tech: string, i: number) => (
            <span key={i} className="text-[8px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded-md font-bold uppercase">
              {tech}
            </span>
          ))}
          {techList.length > 3 && (
            <span className="text-[8px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded-md font-bold uppercase">
              +{techList.length - 3}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-slate-800/40">
        <div className="flex gap-4">
          <button
            onClick={onToggleStatus}
            className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            <div className={`w-1 h-1 rounded-full ${status === "Publicado" ? "bg-green-500" : "bg-yellow-500"}`} />
            {status === "Publicado" ? "Ocultar" : "Publicar"}
          </button>
          <button
            onClick={onEdit}
            className="text-[9px] font-black text-slate-500 hover:text-primary-blue uppercase tracking-widest transition-colors flex items-center gap-1"
          >
            <Edit size={10} /> Editar
          </button>
        </div>
        <button
          onClick={onDelete}
          className="text-slate-600 hover:text-red-500 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

function TestimonialItem({ author, text, approved, onToggle, onDelete }: any) {
  return (
    <div className={`bg-slate-900/30 border p-5 rounded-xl text-left break-inside-avoid transition-all ${approved ? "border-slate-800/50" : "border-yellow-500/20 bg-yellow-500/5"}`}>
      {!approved && (
        <div className="mb-3 text-[9px] font-black text-yellow-500 uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
          Revisión
        </div>
      )}
      <div className="flex items-center gap-0.5 mb-3 text-yellow-500/80">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={10} className="fill-current" />
        ))}
      </div>
      <p className="text-slate-400 italic text-xs leading-relaxed mb-4">
        "{text}"
      </p>
      <div className="flex justify-between items-center pt-3 border-t border-slate-800/40">
        <span className="font-black text-slate-300 text-[10px] uppercase tracking-tighter">{author}</span>
        <div className="flex gap-3">
          <button
            onClick={onToggle}
            className={`text-[9px] font-black uppercase transition-colors ${approved ? "text-slate-600 hover:text-white" : "text-green-500 hover:text-white"}`}
          >
            {approved ? "Ocultar" : "Aprobar"}
          </button>
          <button
            onClick={onDelete}
            className="text-[9px] font-black text-slate-800 hover:text-red-500 uppercase transition-colors"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsCard({ title, children }: any) {
  return (
    <div className="bg-slate-900/30 border border-slate-800/50 p-6 rounded-xl h-full text-left">
      <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-3">
        <div className="w-0.5 h-3 bg-primary-blue" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function InputGroup({ label, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none transition-all"
      />
    </div>
  );
}

// ================================================================
// BLOG VIEW — CRUD completo de posts
// ================================================================
function BlogView() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", category: "Diseño Web",
    image: "", author: "Lener Studio", is_published: false,
  });

  const categories = ["Diseño Web", "SEO", "Marketing Digital", "Casos de Éxito", "Tutoriales"];

  const fetchPosts = () => {
    setLoading(true);
    fetch("/api/admin/blog")
      .then(r => r.json())
      .then(d => { setPosts(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchPosts(); }, []);

  const openCreate = () => {
    setEditingPost(null);
    setForm({ title: "", excerpt: "", content: "", category: "Diseño Web", image: "", author: "Lener Studio", is_published: false });
    setIsModalOpen(true);
  };

  const openEdit = (p: any) => {
    setEditingPost(p);
    setForm({ title: p.title, excerpt: p.excerpt, content: p.content || "", category: p.category, image: p.image || "", author: p.author, is_published: !!p.is_published });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editingPost ? "PUT" : "POST";
    const body = editingPost ? { ...form, id: editingPost.id } : form;
    const res = await fetch("/api/admin/blog", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setIsModalOpen(false); fetchPosts(); }
    else alert("Error al guardar el post");
    setSaving(false);
  };

  const togglePublish = async (id: number, current: boolean) => {
    await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_published: !current }) });
    fetchPosts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este post permanentemente?")) return;
    await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    fetchPosts();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary-blue" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Artículos del Blog</h2>
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
          <Plus size={16} /> NUEVO ARTÍCULO
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800/40 bg-slate-950/40">
              <th className="px-5 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">Título</th>
              <th className="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">Categoría</th>
              <th className="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">Autor</th>
              <th className="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">Estado</th>
              <th className="px-5 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/10">
            {posts.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-600 italic text-sm">No hay artículos aún. Crea el primero.</td></tr>
            )}
            {posts.map((p: any) => (
              <tr key={p.id} className="hover:bg-white/[0.01] transition-all group">
                <td className="px-5 py-3">
                  <div className="max-w-xs">
                    <div className="text-sm font-bold text-slate-200 truncate">{p.title}</div>
                    <div className="text-[10px] text-slate-600 truncate mt-0.5">{p.excerpt}</div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-black uppercase">{p.category}</span>
                </td>
                <td className="px-3 py-3 text-[11px] text-slate-500 font-bold">{p.author}</td>
                <td className="px-3 py-3 text-center">
                  <button onClick={() => togglePublish(p.id, p.is_published)} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase border transition-all ${p.is_published ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${p.is_published ? "bg-green-500" : "bg-yellow-500"}`} />
                    {p.is_published ? "Publicado" : "Borrador"}
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all"><Edit size={13} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-600 hover:text-red-400 rounded-lg transition-all"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Blog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-slate-900 border border-slate-800 p-8 rounded-[2rem] w-full max-w-3xl shadow-2xl overflow-y-auto max-h-[92vh]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter">{editingPost ? "Editar Artículo" : "Nuevo Artículo"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X size={22} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Título *</label>
                  <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Título del artículo..." className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Categoría</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none">
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Autor</label>
                    <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Imagen de portada</label>
                  <div className="flex gap-2">
                    <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://... o usa la Biblioteca" className="flex-1 bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                    <button type="button" onClick={() => setShowMediaPicker(true)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5">
                      <ImagePlus size={14} /> Biblioteca
                    </button>
                  </div>
                  {form.image && (
                    <div className="mt-2 relative h-28 w-full rounded-xl overflow-hidden border border-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  )}
                  {/* Media Picker Modal */}
                  <AnimatePresence>
                    {showMediaPicker && (
                      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMediaPicker(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-5xl shadow-2xl overflow-hidden" style={{ maxHeight: "85vh" }}>
                          <MediaLibrary
                            mode="picker"
                            onSelect={url => {
                              setForm({ ...form, image: url });
                              setShowMediaPicker(false);
                            }}
                            onClose={() => setShowMediaPicker(false)}
                          />
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Extracto (visible en el listado del blog) *</label>
                  <textarea required rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Descripción corta y atractiva del artículo..." className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Contenido del artículo</label>
                  <MarkdownEditor
                    value={form.content}
                    onChange={val => setForm({ ...form, content: val })}
                    minRows={14}
                    placeholder="Escribe el artículo aquí. Usa ## para secciones, ### para subtítulos, **negrita**, - listas..."
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div onClick={() => setForm({ ...form, is_published: !form.is_published })} className={`w-11 h-6 rounded-full border-2 flex items-center transition-all ${form.is_published ? "bg-green-500/20 border-green-500" : "bg-slate-800 border-slate-700"}`}>
                    <div className={`w-4 h-4 rounded-full mx-0.5 transition-all ${form.is_published ? "translate-x-5 bg-green-400" : "bg-slate-600"}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Publicar inmediatamente</span>
                </label>
                <div className="flex gap-4 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">Cancelar</button>
                  <button type="submit" disabled={saving} className="flex-[2] py-3.5 bg-primary-blue text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                    {saving ? "Guardando..." : editingPost ? "Guardar Cambios" : "Crear Artículo"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================================================================
// POPUPS VIEW — CRUD de popups de marketing
// ================================================================
function PopupsView() {
  const [popups, setPopups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", subtitle: "", cta_text: "Ver oferta",
    cta_url: "/#contacto", trigger_type: "exit_intent", trigger_delay: 0, is_active: false,
  });

  const fetchPopups = () => {
    setLoading(true);
    fetch("/api/admin/popups")
      .then(r => r.json())
      .then(d => { setPopups(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchPopups(); }, []);

  const openCreate = () => {
    setEditingPopup(null);
    setForm({ title: "", subtitle: "", cta_text: "Ver oferta", cta_url: "/#contacto", trigger_type: "exit_intent", trigger_delay: 0, is_active: false });
    setIsModalOpen(true);
  };

  const openEdit = (p: any) => {
    setEditingPopup(p);
    setForm({ title: p.title, subtitle: p.subtitle || "", cta_text: p.cta_text, cta_url: p.cta_url, trigger_type: p.trigger_type, trigger_delay: p.trigger_delay, is_active: !!p.is_active });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editingPopup ? "PUT" : "POST";
    const body = editingPopup ? { ...form, id: editingPopup.id } : form;
    const res = await fetch("/api/admin/popups", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setIsModalOpen(false); fetchPopups(); }
    else alert("Error al guardar el popup");
    setSaving(false);
  };

  const toggleActive = async (id: number, current: boolean) => {
    await fetch("/api/admin/popups", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_active: !current }) });
    fetchPopups();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este popup?")) return;
    await fetch(`/api/admin/popups?id=${id}`, { method: "DELETE" });
    fetchPopups();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary-blue" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Popups de Marketing</h2>
          <p className="text-[10px] text-slate-700 mt-1">Solo puede haber un popup activo a la vez para no saturar la experiencia.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
          <Plus size={16} /> NUEVO POPUP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popups.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-600 italic">No hay popups configurados aún.</div>
        )}
        {popups.map((p: any) => (
          <div key={p.id} className={`bg-slate-900/40 border rounded-2xl p-6 flex flex-col gap-4 transition-all ${p.is_active ? "border-green-500/30 bg-green-500/5" : "border-slate-800/60"}`}>
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase border mb-3 ${p.is_active ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-slate-800 text-slate-500 border-slate-700"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${p.is_active ? "bg-green-500 animate-pulse" : "bg-slate-600"}`} />
                  {p.is_active ? "Activo" : "Inactivo"}
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">{p.title}</h3>
                {p.subtitle && <p className="text-[11px] text-slate-500 mt-1">{p.subtitle}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-slate-950/50 p-2 rounded-lg">
                <span className="text-slate-600 font-black uppercase block mb-0.5">Disparador</span>
                <span className="text-slate-300 font-bold">{p.trigger_type === "exit_intent" ? "Exit Intent" : p.trigger_type === "delay" ? `${p.trigger_delay}s delay` : "Scroll"}</span>
              </div>
              <div className="bg-slate-950/50 p-2 rounded-lg">
                <span className="text-slate-600 font-black uppercase block mb-0.5">CTA</span>
                <span className="text-slate-300 font-bold truncate block">{p.cta_text}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-slate-800/40">
              <button onClick={() => toggleActive(p.id, p.is_active)} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase border justify-center transition-all ${p.is_active ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20" : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"}`}>
                {p.is_active ? "Desactivar" : "Activar"}
              </button>
              <button onClick={() => openEdit(p)} className="p-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition-all"><Edit size={13} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 px-3 bg-slate-800 hover:bg-red-500/20 text-slate-600 hover:text-red-400 rounded transition-all"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-slate-900 border border-slate-800 p-8 rounded-[2rem] w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter">{editingPopup ? "Editar Popup" : "Nuevo Popup"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X size={22} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Título principal *</label>
                  <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="¿Te vas sin pedir presupuesto?" className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Subtítulo</label>
                  <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Oferta o propuesta de valor..." className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Texto del botón *</label>
                    <input required value={form.cta_text} onChange={e => setForm({ ...form, cta_text: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">URL del botón *</label>
                    <input required value={form.cta_url} onChange={e => setForm({ ...form, cta_url: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Disparador</label>
                    <select value={form.trigger_type} onChange={e => setForm({ ...form, trigger_type: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none">
                      <option value="exit_intent">Exit Intent</option>
                      <option value="delay">Delay (segundos)</option>
                      <option value="scroll">Scroll 50%</option>
                    </select>
                  </div>
                  {form.trigger_type === "delay" && (
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Delay (seg)</label>
                      <input type="number" min={0} max={60} value={form.trigger_delay} onChange={e => setForm({ ...form, trigger_delay: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                    </div>
                  )}
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setForm({ ...form, is_active: !form.is_active })} className={`w-11 h-6 rounded-full border-2 flex items-center transition-all ${form.is_active ? "bg-green-500/20 border-green-500" : "bg-slate-800 border-slate-700"}`}>
                    <div className={`w-4 h-4 rounded-full mx-0.5 transition-all ${form.is_active ? "translate-x-5 bg-green-400" : "bg-slate-600"}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Activar popup</span>
                </label>
                <div className="flex gap-4 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">Cancelar</button>
                  <button type="submit" disabled={saving} className="flex-[2] py-3.5 bg-primary-blue text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                    {saving ? "Guardando..." : editingPopup ? "Guardar Cambios" : "Crear Popup"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================================================================
// PRICING VIEW — CRUD de planes de precios
// ================================================================
function PricingView() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [form, setForm] = useState({
    name: "", description: "", price: "", features: [] as string[],
    cta_text: "Contratar", cta_url: "/#contacto",
    is_popular: false, is_published: true, display_order: 0,
  });

  const fetchPlans = () => {
    setLoading(true);
    fetch("/api/admin/pricing")
      .then(r => r.json())
      .then(d => { setPlans(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchPlans(); }, []);

  const openCreate = () => {
    setEditingPlan(null);
    setForm({ name: "", description: "", price: "", features: [], cta_text: "Contratar", cta_url: "/#contacto", is_popular: false, is_published: true, display_order: plans.length + 1 });
    setFeatureInput("");
    setIsModalOpen(true);
  };

  const openEdit = (p: any) => {
    setEditingPlan(p);
    setForm({ name: p.name, description: p.description || "", price: p.price, features: Array.isArray(p.features) ? p.features : [], cta_text: p.cta_text, cta_url: p.cta_url, is_popular: !!p.is_popular, is_published: !!p.is_published, display_order: p.display_order });
    setFeatureInput("");
    setIsModalOpen(true);
  };

  const addFeature = () => {
    const v = featureInput.trim();
    if (v && !form.features.includes(v)) {
      setForm({ ...form, features: [...form.features, v] });
      setFeatureInput("");
    }
  };

  const removeFeature = (i: number) => {
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editingPlan ? "PUT" : "POST";
    const body = editingPlan ? { ...form, id: editingPlan.id } : form;
    const res = await fetch("/api/admin/pricing", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setIsModalOpen(false); fetchPlans(); }
    else alert("Error al guardar el plan");
    setSaving(false);
  };

  const togglePublish = async (id: number, current: boolean) => {
    await fetch("/api/admin/pricing", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_published: !current }) });
    fetchPlans();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este plan de precios?")) return;
    await fetch(`/api/admin/pricing?id=${id}`, { method: "DELETE" });
    fetchPlans();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary-blue" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Planes de Precios</h2>
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
          <Plus size={16} /> NUEVO PLAN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-600 italic">No hay planes configurados. Crea el primero.</div>
        )}
        {plans.map((p: any) => (
          <div key={p.id} className={`bg-slate-900/40 border rounded-2xl p-6 flex flex-col gap-4 transition-all relative ${p.is_popular ? "border-blue-500/40 bg-blue-500/5" : "border-slate-800/60"} ${!p.is_published ? "opacity-60" : ""}`}>
            {p.is_popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[9px] font-black px-3 py-1 rounded-full uppercase">⭐ Popular</div>}
            <div>
              <h3 className="text-base font-bold text-white">{p.name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{p.description}</p>
              <div className="mt-3 text-3xl font-black text-white">{p.price}€</div>
            </div>
            <ul className="space-y-2 flex-grow">
              {(Array.isArray(p.features) ? p.features : []).map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Check size={12} className="text-blue-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 pt-3  border-t border-slate-800/40">
              <button onClick={() => togglePublish(p.id, p.is_published)} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase border transition-all rounded-full justify-center ${p.is_published ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
                {p.is_published ? "Publicado" : "Oculto"}
              </button>
              <button onClick={() => openEdit(p)} className="p-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition-all"><Edit size={13} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 px-3 bg-slate-800 hover:bg-red-500/20 text-slate-600 hover:text-red-400 rounded transition-all"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Plan */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-slate-900 border border-slate-800 p-8 rounded-[2rem] w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter">{editingPlan ? "Editar Plan" : "Nuevo Plan"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X size={22} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Nombre del Plan *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Plan Starter" className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Precio (€) *</label>
                    <input required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="497" className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Descripción</label>
                  <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Ideal para..." className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Texto CTA</label>
                    <input value={form.cta_text} onChange={e => setForm({ ...form, cta_text: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">URL CTA</label>
                    <input value={form.cta_url} onChange={e => setForm({ ...form, cta_url: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Características incluidas</label>
                  <div className="flex gap-2 mb-3">
                    <input value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }} placeholder="Ej: SEO avanzado..." className="flex-grow bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none" />
                    <button type="button" onClick={addFeature} className="px-4 bg-primary-blue text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-all"><Plus size={16} /></button>
                  </div>
                  <ul className="space-y-2">
                    {form.features.map((f, i) => (
                      <li key={i} className="flex items-center justify-between bg-slate-950/50 border border-slate-800 px-3 py-2 rounded-lg text-sm text-slate-300">
                        <span className="flex items-center gap-2"><Check size={12} className="text-blue-400" />{f}</span>
                        <button type="button" onClick={() => removeFeature(i)} className="text-slate-600 hover:text-red-400 transition-colors"><X size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div onClick={() => setForm({ ...form, is_popular: !form.is_popular })} className={`w-10 h-5 rounded-full border-2 flex items-center transition-all ${form.is_popular ? "bg-yellow-500/20 border-yellow-500" : "bg-slate-800 border-slate-700"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full mx-0.5 transition-all ${form.is_popular ? "translate-x-5 bg-yellow-400" : "bg-slate-600"}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">Más popular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div onClick={() => setForm({ ...form, is_published: !form.is_published })} className={`w-10 h-5 rounded-full border-2 flex items-center transition-all ${form.is_published ? "bg-green-500/20 border-green-500" : "bg-slate-800 border-slate-700"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full mx-0.5 transition-all ${form.is_published ? "translate-x-5 bg-green-400" : "bg-slate-600"}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">Publicado</span>
                  </label>
                </div>
                <div className="flex gap-4 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">Cancelar</button>
                  <button type="submit" disabled={saving} className="flex-[2] py-3.5 bg-primary-blue text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                    {saving ? "Guardando..." : editingPlan ? "Guardar Cambios" : "Crear Plan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================================================================
// MEDIA VIEW — Biblioteca de medios completa
// ================================================================
function MediaView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Biblioteca de Medios</h2>
        <p className="text-[10px] text-slate-700">Imágenes almacenadas en <code className="text-slate-500">/public/uploads</code></p>
      </div>
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
        <MediaLibrary mode="library" />
      </div>
    </div>
  );
}
