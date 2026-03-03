import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  Search,
  PlayCircle,
  BarChart3,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Star,
  Clock,
  Award,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { InfiniteLogo, LoadingOverlay } from "./components/InfiniteLogo";
import { staticCourses, staticTracks, Course } from "./data";
// --- Components ---


const Sidebar = ({ isMobileOpen, setIsMobileOpen }: { isMobileOpen: boolean, setIsMobileOpen: (v: boolean) => void }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Search, label: "Explorar Cursos", path: "/catalog" },
    { icon: BookOpen, label: "Cursos Gratuitos", path: "/catalog?type=free" },
    { icon: PlayCircle, label: "Cursos Premium", path: "/catalog?type=premium" },
    { icon: BarChart3, label: "Trilhas", path: "/tracks" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-[100dvh] bg-white border-r border-black/5 flex flex-col z-50 transition-all duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'w-64'}
      `}>
        <div className={`flex items-center gap-3 p-6 mb-8 ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}>
          <InfiniteLogo size={isCollapsed ? 28 : 32} className="shrink-0" />
          <span className={`text-xl font-display font-bold tracking-tighter transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:hidden' : ''}`}>codeya</span>
          {isMobileOpen && (
            <button onClick={() => setIsMobileOpen(false)} className="md:hidden ml-auto p-2 -mr-2 text-black/60 hover:text-black">
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = (location.pathname + location.search) === item.path ||
              (item.path === '/catalog' && location.pathname === '/catalog' && location.search === '');
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 py-3 rounded-xl transition-all duration-200 ${isCollapsed ? 'md:justify-center md:px-0 px-4' : 'px-4'
                  } ${isActive
                    ? "bg-black text-white shadow-lg shadow-black/10"
                    : "text-black/60 hover:bg-black/5 hover:text-black"
                  }`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                <span className={`font-medium text-sm whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:hidden' : ''}`}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-black/5 space-y-2 bg-white">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden md:flex items-center gap-3 py-3 w-full text-black/40 hover:text-black transition-colors rounded-xl hover:bg-black/5 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
            title={isCollapsed ? 'Expandir' : 'Recolher'}
          >
            {isCollapsed ? <ChevronRight size={20} className="shrink-0" /> : <ChevronLeft size={20} className="shrink-0" />}
            <span className={`font-medium text-sm whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : ''}`}>Recolher</span>
          </button>
          <button
            className={`flex items-center gap-3 py-3 w-full text-black/60 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50 ${isCollapsed ? 'md:justify-center md:px-0 px-4' : 'px-4'}`}
            title={isCollapsed ? 'Sair' : undefined}
          >
            <LogOut size={20} className="shrink-0" />
            <span className={`font-medium text-sm whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:hidden' : ''}`}>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const CourseCard = ({ course }: { course: Course }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all group"
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 left-3 flex gap-2">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${course.type === 'free' ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'
          }`}>
          {course.type === 'free' ? 'Gratuito' : 'Premium'}
        </span>
        {course.type === 'free' && (
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-wider border border-black/10">
            Externo
          </span>
        )}
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 text-[10px] font-bold text-black/40 uppercase tracking-widest mb-2">
        <span>{course.category}</span>
        <span>•</span>
        <span>{course.difficulty}</span>
        <span>•</span>
        <span>{course.duration}</span>
      </div>
      <h3 className="text-lg leading-tight mb-2 group-hover:text-black transition-colors">{course.title}</h3>
      <p className="text-sm text-black/60 line-clamp-2 mb-4">{course.description}</p>

      {course.progress !== undefined ? (
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase">
            <span>Progresso</span>
            <span>{course.progress}%</span>
          </div>
          <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-1000"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <Link
            to={`/learn/${course.id}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white rounded-xl text-sm font-bold mt-4 hover:bg-black/90 transition-colors"
          >
            Continuar <ChevronRight size={16} />
          </Link>
        </div>
      ) : (
        <Link
          to={`/course/${course.id}`}
          className="flex items-center justify-center gap-2 w-full py-3 border border-black text-black rounded-xl text-sm font-bold mt-2 hover:bg-black hover:text-white transition-all"
        >
          Ver Detalhes
        </Link>
      )}
    </div>
  </motion.div>
);

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ interests: [] as string[], knowledge_level: "" });

  const handleFinish = () => {
    fetch("/api/user/2/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => onComplete());
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-10 max-w-xl w-full shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <InfiniteLogo size={40} />
          <h2 className="text-2xl font-display font-bold">Bem-vindo à Codeya</h2>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl">Qual seu principal objetivo?</h3>
            <div className="grid grid-cols-1 gap-3">
              {["Transição de Carreira", "Aumentar Produtividade", "Criar Conteúdo", "Empreendedorismo"].map(opt => (
                <button
                  key={opt}
                  onClick={() => { setData({ ...data, interests: [opt] }); setStep(2); }}
                  className="p-4 border border-black/10 rounded-2xl text-left hover:bg-black hover:text-white transition-all font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl">Qual seu nível de conhecimento em IA?</h3>
            <div className="grid grid-cols-1 gap-3">
              {["Iniciante (Nunca usei)", "Básico (Uso ChatGPT)", "Intermediário (Uso várias ferramentas)", "Avançado (Desenvolvedor/Expert)"].map(opt => (
                <button
                  key={opt}
                  onClick={() => { setData({ ...data, knowledge_level: opt }); handleFinish(); }}
                  className="p-4 border border-black/10 rounded-2xl text-left hover:bg-black hover:text-white transition-all font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};


const CourseDetail = () => {
  const { id } = useParams();
  const course = staticCourses.find(c => c.id === parseInt(id || ""));

  if (!course) return <div className="p-10 text-center">Curso não encontrado.</div>;

  const objectives = JSON.parse(course.learning_objectives || "[]");
  const modules = JSON.parse(course.content || "[]");

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="relative h-[300px] md:h-[400px] rounded-[30px] md:rounded-[40px] overflow-hidden">
        <img src={course.thumbnail} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
            <span className="px-3 md:px-4 py-1 bg-white text-black rounded-full text-[10px] md:text-xs font-bold uppercase">{course.category}</span>
            <span className="px-3 md:px-4 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] md:text-xs font-bold uppercase">{course.difficulty}</span>
          </div>
          <h1 className="text-3xl md:text-5xl text-white mb-2 md:mb-4 leading-tight">{course.title}</h1>
          <p className="text-white/70 text-base md:text-xl max-w-2xl line-clamp-2 md:line-clamp-none">{course.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl mb-6">Sobre o Curso</h2>
            <p className="text-black/70 leading-relaxed text-lg">{course.long_description}</p>
          </section>

          <section>
            <h2 className="text-2xl mb-6">O que você vai aprender</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectives.map((obj: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-black/5">
                  <div className="mt-1 p-1 bg-emerald-100 text-emerald-600 rounded-full">
                    <ChevronRight size={14} />
                  </div>
                  <span className="font-medium">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-6">Conteúdo do Curso</h2>
            <div className="space-y-4">
              {modules.map((mod: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl border border-black/5 overflow-hidden">
                  <div className="p-6 bg-black/5 font-bold flex justify-between items-center">
                    <span>Módulo {i + 1}: {mod.module}</span>
                    <span className="text-xs text-black/40">{mod.lessons.length} aulas</span>
                  </div>
                  <div className="divide-y divide-black/5">
                    {mod.lessons.map((lesson: any, j: number) => (
                      <div key={j} className="p-6 flex items-center justify-between hover:bg-black/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <PlayCircle size={18} className="text-black/40" />
                          <span className="text-sm font-medium">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-black/40">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-xl sticky top-10">
            <div className="text-3xl font-display font-bold mb-6">
              {course.type === 'free' ? 'Gratuito' : 'R$ 497,00'}
            </div>

            {course.type === 'free' ? (
              <a
                href={course.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-emerald-500 text-white rounded-2xl text-center font-bold hover:bg-emerald-600 transition-colors mb-4"
              >
                Acessar Curso Externo
              </a>
            ) : (
              <button className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/90 transition-colors mb-4">
                Comprar Agora
              </button>
            )}

            <p className="text-xs text-center text-black/40 mb-8">Garantia de 7 dias • Acesso vitalício</p>

            <div className="space-y-4 pt-6 border-t border-black/5">
              <div className="flex items-center gap-3 text-sm">
                <BarChart3 size={16} className="text-black/40" />
                <span>Nível {course.difficulty}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <PlayCircle size={16} className="text-black/40" />
                <span>{course.duration} de conteúdo</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-black/40" />
                <span>Instrutor: {course.instructor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tracks = () => {
  const tracks = staticTracks;

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl mb-2">Trilhas de Aprendizado</h1>
        <p className="text-black/60 text-sm md:text-base">Caminhos estruturados para você dominar uma nova habilidade do zero ao profissional.</p>
      </header>

      <div className="space-y-12 md:space-y-16">
        {tracks.map(track => (
          <section key={track.id} className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center bg-white p-6 md:p-8 rounded-[30px] md:rounded-[40px] border border-black/5">
              <div className="w-full md:w-1/3 aspect-video rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
                <img src={track.thumbnail} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 space-y-3 md:space-y-4 w-full">
                <h2 className="text-2xl md:text-3xl">{track.title}</h2>
                <p className="text-black/60 text-base md:text-lg">{track.description}</p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest">{track.courses.length} Cursos</span>
                  <div className="h-1 w-1 bg-black/20 rounded-full" />
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest">~24h totais</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-black/5 -z-10 hidden md:block" />
              {track.courses.map((course: any, i: number) => (
                <div key={course.id} className="relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                    {i + 1}
                  </div>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

const Catalog = () => {
  const [filter, setFilter] = useState('all');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFilter = queryParams.get('type');

  const filtered = staticCourses.filter(c => {
    const matchesCategory = filter === 'all' || c.category.toLowerCase() === filter.toLowerCase();
    const matchesType = !typeFilter || c.type === typeFilter;
    return matchesCategory && matchesType;
  });

  return (
    <div className="space-y-8 md:space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between items-center text-center md:text-left gap-4 md:gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl mb-2">
            {typeFilter === 'free' ? 'Cursos Gratuitos' : typeFilter === 'premium' ? 'Cursos Premium' : 'Catálogo de Cursos'}
          </h1>
          <p className="text-black/60 text-sm md:text-base">Explore nossa curadoria de conteúdos {typeFilter ? typeFilter : 'gratuitos e premium'}.</p>
        </div>
        <div className="flex justify-center md:justify-start gap-1 bg-white p-1 rounded-2xl border border-black/5 self-center md:self-auto w-full min-w-0 max-w-full sm:w-auto">
          {['all', 'IA', 'Marketing', 'Conteúdo'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 min-w-0 sm:px-6 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-sm font-bold transition-all truncate text-center flex-1 sm:flex-none ${filter === f ? "bg-black text-white" : "text-black/60 hover:bg-black/5"
                }`}
            >
              {f === 'all' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-black/40">
            Nenhum curso encontrado para este filtro.
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-[100dvh] bg-surface relative">
        <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-black/5 sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <InfiniteLogo size={24} />
              <span className="text-xl font-display font-bold tracking-tighter">codeya</span>
            </div>
            <button onClick={() => setIsMobileOpen(true)} className="p-2 -mr-2 text-black/60 hover:text-black">
              <Menu size={24} />
            </button>
          </header>
          <main className="flex-1 p-4 md:p-10 w-full max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/catalog" element={
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <Catalog />
                  </motion.div>
                } />
                <Route path="/course/:id" element={
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <CourseDetail />
                  </motion.div>
                } />
                <Route path="/tracks" element={
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <Tracks />
                  </motion.div>
                } />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}
