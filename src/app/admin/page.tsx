"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewType =
  | "overview"
  | "leads"
  | "portfolio"
  | "testimonials"
  | "settings";
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
          <div className="my-4 border-t border-slate-800/40 mx-2" />
          <NavItem
            icon={<Settings size={18} />}
            label="Configuración & SEO"
            active={activeView === "settings"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("settings")}
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

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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

function SettingsView() {
  const [settings, setSettings] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSettings = () => {
    setLoading(true);
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.setting_key === key ? { ...s, setting_value: value } : s))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Guardar cada setting que haya cambiado. 
      // Para optimizar se podría enviar todo en un solo batch si el API lo soporta.
      // Por ahora usamos el endpoint PATCH que ya existe para cada uno en paralelo.
      const promises = settings.map((s) =>
        fetch("/api/admin/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: s.setting_key, value: s.setting_value }),
        })
      );

      await Promise.all(promises);
      alert("Configuración guardada con éxito");
    } catch (err) {
      console.error(err);
      alert("Error al guardar la configuración");
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

  const getVal = (key: string) =>
    settings.find((s) => s.setting_key === key)?.setting_value || "";

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

      <div className="flex justify-end p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-3 px-6 py-3 bg-primary-blue text-white font-black uppercase tracking-widest text-[10px] rounded-lg shadow-lg shadow-blue-500/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="animate-spin" size={14} />
          ) : (
            <Save size={14} />
          )}
          {isSaving ? "Guardando..." : "Guardar Cambios"}
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
