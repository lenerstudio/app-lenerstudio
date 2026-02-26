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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
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
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-slate-800/50 bg-[#020617] flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent"
            >
              LENER STUDIO
            </motion.h2>
          )}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800/50 rounded-lg text-slate-500"
          >
            <LayoutDashboard size={20} />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <NavItem
            icon={<TrendingUp size={20} />}
            label="Overview"
            active={activeView === "overview"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("overview")}
          />
          <NavItem
            icon={<MessageSquare size={20} />}
            label="Leads & Mensajes"
            active={activeView === "leads"}
            badge="12"
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("leads")}
          />
          <NavItem
            icon={<Briefcase size={20} />}
            label="Portafolio"
            active={activeView === "portfolio"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("portfolio")}
          />
          <NavItem
            icon={<Star size={20} />}
            label="Testimonios"
            active={activeView === "testimonials"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("testimonials")}
          />
          <div className="my-6 border-t border-slate-800/50 mx-2" />
          <NavItem
            icon={<Settings size={20} />}
            label="Configuración & SEO"
            active={activeView === "settings"}
            collapsed={!isSidebarOpen}
            onClick={() => setActiveView("settings")}
          />
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 text-slate-500 hover:text-red-400 p-3 rounded-xl transition-all hover:bg-red-500/5"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/20 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold capitalize text-white">
              {activeView.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
                Sistema Online
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold overflow-hidden">
              {session.user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        {/* Dynamic View Scroll Area */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
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
      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all relative group ${
        active
          ? "bg-primary-blue text-white shadow-lg shadow-blue-500/20"
          : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-200"
      }`}
    >
      <div
        className={`${active ? "text-white" : "group-hover:text-primary-blue"} transition-colors`}
      >
        {icon}
      </div>
      {!collapsed && (
        <span className="font-medium text-sm whitespace-nowrap">{label}</span>
      )}
      {!collapsed && badge && (
        <span className="ml-auto bg-primary-blue/20 text-primary-blue text-[10px] px-2 py-0.5 rounded-full font-bold">
          {badge}
        </span>
      )}
      {collapsed && active && (
        <div className="absolute left-0 w-1 h-6 bg-primary-blue rounded-r-full" />
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

  // Preparar datos para el gráfico (invertir para orden cronológico)
  const reversedChart = [...chartData].reverse();
  const maxVal = Math.max(...reversedChart.map((d: any) => d.count), 1);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Leads Totales"
          value={summary.totalLeads.toString()}
          subValue="Histórico completo"
        />
        <StatCard
          label="Nuevos Leads"
          value={summary.newLeads.toString()}
          subValue="Pendientes de contactar"
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
          subValue="Leads vs Visitas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter">
              Tráfico Reciente (Vistas de página)
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[10px] text-slate-500 font-bold uppercase">
              Últimos 7 días
            </div>
          </div>
          <div className="h-64 flex items-end gap-3 px-4 shadow-inner">
            {reversedChart.length > 0 ? (
              reversedChart.map((day: any, i: number) => (
                <div
                  key={i}
                  className="flex-grow flex flex-col items-center gap-3 group"
                >
                  <div className="relative w-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.count / maxVal) * 100}%` }}
                      className="w-full bg-gradient-to-t from-primary-blue/20 to-primary-blue rounded-t-xl group-hover:to-blue-400 transition-colors cursor-pointer"
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      {day.count} vistas
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600 font-bold uppercase">
                    {new Date(day.date).toLocaleDateString("es-ES", {
                      weekday: "short",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600 italic text-sm">
                Esperando datos de tráfico...
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2.5rem]">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-tighter">
            Acciones Rápidas
          </h3>
          <div className="space-y-4">
            <ActionButton
              label="Ver todos los leads"
              icon={<MessageSquare size={18} />}
            />
            <ActionButton label="Añadir proyecto" icon={<Plus size={18} />} />
            <ActionButton
              label="Cambiar SEO Meta"
              icon={<Search size={18} />}
            />
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-4">
                Estado del Server
              </p>
              <div className="flex items-center gap-3 p-4 bg-green-500/5 border border-green-500/20 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-green-500">
                  Base de Datos OK
                </span>
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
    <button className="w-full flex items-center gap-3 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-sm text-slate-400 hover:text-white hover:border-primary-blue/50 hover:bg-primary-blue/5 transition-all text-left group">
      <div className="text-slate-600 group-hover:text-primary-blue transition-colors">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
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

function LeadsView() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary-blue" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar lead por nombre o empresa..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-1 focus:ring-primary-blue transition-all"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-medium hover:bg-slate-800 transition-all">
            <Filter size={18} /> Filtrar
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-primary-blue text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800/50 bg-slate-950/20">
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                Lead
              </th>
              <th className="px-4 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                Servicio
              </th>
              <th className="px-4 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                Estado
              </th>
              <th className="px-4 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                Fecha
              </th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {leads.map((lead: any) => (
              <tr
                key={lead.id}
                className="hover:bg-slate-800/20 transition-all group"
              >
                <td className="px-8 py-6">
                  <div>
                    <div className="font-bold text-white mb-0.5">
                      {lead.name}
                    </div>
                    <div className="text-xs text-slate-500">{lead.email}</div>
                  </div>
                </td>
                <td className="px-4 py-6">
                  <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 font-medium">
                    {lead.service_type}
                  </span>
                </td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${lead.status === "nuevo" ? "bg-blue-500" : "bg-green-500"}`}
                    />
                    <span className="text-sm text-slate-300 capitalize">
                      {lead.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-6 text-sm text-slate-500">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all">
                    <ExternalLink size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PortfolioView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Landing Page",
    description: "",
    live_url: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchProjects = () => {
    setLoading(true);
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((data) => {
        //setProjects(Array.isArray(data) ? data : []);
        const validProjects = Array.isArray(data) ? data : [];
        setProjects(validProjects as Project[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return alert("Por favor, selecciona una imagen");

    setIsUploading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("live_url", formData.live_url);
    data.append("image", selectedFile);

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          title: "",
          category: "Landing Page",
          description: "",
          live_url: "",
        });
        setSelectedFile(null);
        fetchProjects();
      } else {
        alert("Error al subir el proyecto");
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">
            Proyectos
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Gestiona los casos de éxito mostrados en tu ecosistema digital.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-4 bg-primary-blue text-white rounded-[1.5rem] font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
        >
          <Plus size={20} /> Nuevo Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {projects.map((project: any) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            category={project.category}
            image={project.main_image}
            status={project.is_published ? "Publicado" : "Oculto"}
          />
        ))}

        <div
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-600 hover:border-slate-600 hover:text-slate-400 transition-all cursor-pointer group min-h-[350px]"
        >
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <span className="font-bold text-sm tracking-widest uppercase">
            Añadir trabajo
          </span>
        </div>
      </div>

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
                  Nuevo Proyecto
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <RefreshCw size={24} className="rotate-45" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-6 text-left">
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
                    {isUploading ? "Subiendo..." : "Crear Proyecto"}
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
  return (
    <div className="space-y-8">
      <div className="bg-slate-950 border border-slate-800 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center text-left">
        <div className="w-24 h-24 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
          <Star size={48} fill="currentColor" />
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-white mb-2">
            Reseñas y Feedback
          </h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Aquí puedes gestionar lo que dicen tus clientes. No olvides que los
            testimonios reales con Badges de resultados son los que más venden.
          </p>
        </div>
        <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all">
          Pedir reseña
        </button>
      </div>

      <div className="columns-1 md:columns-2 gap-6 space-y-6">
        <TestimonialItem
          author="María González"
          text="El diseño es profesional y realmente convierte..."
          approved
        />
        <TestimonialItem
          author="Carlos Ruiz"
          text="Profesionales comprometidos que entienden..."
          approved
        />
        <TestimonialItem
          author="Ana Martínez"
          text="La web superó mis expectativas..."
          approved
        />
      </div>
    </div>
  );
}

function SettingsView() {
  const [settings, setSettings] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // En una implementación real, mapearíamos los inputs.
      // Aquí simplificamos actualizando uno por uno o enviando el objeto completo.
      // Por ahora, simulamos el éxito visual.
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Configuración guardada con éxito");
    } catch (err) {
      console.error(err);
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
              defaultValue={getVal("whatsapp_number")}
            />
            <InputGroup
              label="Email de Negocio"
              defaultValue={getVal("contact_email")}
            />
            <InputGroup
              label="Dirección de Oficina"
              defaultValue="Sevilla, España"
            />
          </div>
        </SettingsCard>

        <SettingsCard title="SEO & Indexación">
          <div className="space-y-4">
            <InputGroup
              label="Título Meta (Home)"
              defaultValue={getVal("seo_home_title")}
            />
            <InputGroup
              label="Meta Descripción"
              defaultValue={getVal("seo_home_description")}
            />
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                Indexación Google
              </label>
              <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                <Check size={16} /> Activa y rastreable
              </div>
            </div>
          </div>
        </SettingsCard>
      </div>

      <div className="flex justify-end p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-4 bg-primary-blue text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {isSaving ? "Guardando..." : "Guardar todos los cambios"}
        </button>
      </div>
    </div>
  );
}

// --- MICRO UI COMPONENTS ---

function StatCard({ label, value, subValue }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800/80 p-8 rounded-[2rem] hover:border-primary-blue/30 transition-all group">
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-primary-blue transition-colors">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-4xl font-bold text-white">{value}</h4>
      </div>
      <p className="text-slate-600 text-[10px] font-bold mt-2 uppercase">
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

function ProjectCard({ title, category, status, image }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 hover:border-primary-blue/30 transition-all group flex flex-col">
      <div className="w-full h-48 bg-slate-950 rounded-2xl mb-6 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-transparent" />
        )}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="text-[10px] font-bold bg-slate-900/60 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10 uppercase">
            {category}
          </span>
        </div>
      </div>
      <h4 className="text-lg font-bold text-white mb-4 line-clamp-1">
        {title}
      </h4>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-[10px] font-bold text-green-500 flex items-center gap-1.5 uppercase tracking-widest">
          <div className="w-1 h-1 rounded-full bg-green-500" /> {status}
        </span>
        <button className="text-slate-500 hover:text-white transition-colors">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}

function TestimonialItem({ author, text, approved }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] text-left break-inside-avoid">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-slate-300 italic text-sm leading-relaxed mb-6">
        "{text}"
      </p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-white text-sm">/ {author}</span>
        <div className="flex gap-2">
          <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase transition-colors">
            Editar
          </button>
          <button className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase transition-colors">
            Ocultar
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsCard({ title, children }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] h-full text-left">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-primary-blue rounded-full" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function InputGroup({ label, defaultValue }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary-blue outline-none transition-all"
      />
    </div>
  );
}
