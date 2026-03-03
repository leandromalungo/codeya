import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

// In-memory data store
let users: any[] = [
  { id: 1, name: "Admin Codeya", email: "admin@codeya.com", role: "admin", onboarding_completed: 1, interests: "[]", knowledge_level: "" },
  { id: 2, name: "João Silva", email: "joao@example.com", role: "user", onboarding_completed: 0, interests: "[]", knowledge_level: "" }
];

let courses: any[] = [
  {
    id: 1,
    title: "IA Generativa para Negócios",
    description: "Domine o uso de IAs para otimizar processos e aumentar a produtividade da sua empresa.",
    long_description: "Este curso completo leva você do zero ao avançado na implementação de soluções de IA em ambientes corporativos. Aprenda a automatizar tarefas, analisar dados e criar estratégias baseadas em modelos de linguagem.",
    learning_objectives: JSON.stringify(["Automatizar fluxos de trabalho", "Implementar chatbots personalizados", "Análise preditiva de mercado"]),
    category: "IA",
    type: "premium",
    thumbnail: "https://picsum.photos/seed/biz/800/450",
    instructor: "Dr. Alan Turing",
    difficulty: "Intermediário",
    duration: "12h",
    external_url: null,
    content: JSON.stringify([
      {
        module: "Fundamentos",
        lessons: [
          { title: "O que é IA Generativa?", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "15min" },
          { title: "Modelos de Linguagem (LLMs)", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "20min" }
        ]
      },
      {
        module: "Aplicação Prática",
        lessons: [
          { title: "ChatGPT no RH", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "25min" },
          { title: "Automação com Make.com", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "40min" }
        ]
      }
    ])
  },
  {
    id: 2,
    title: "Prompt Engineering 101",
    description: "Aprenda a arte de conversar com IAs e obter os melhores resultados.",
    long_description: "Curso introdutório sobre como estruturar comandos (prompts) para obter respostas precisas e criativas de modelos como GPT-4 e Claude.",
    learning_objectives: JSON.stringify(["Estrutura de um prompt perfeito", "Técnicas de Few-shot", "Evitando alucinações"]),
    category: "IA",
    type: "free",
    thumbnail: "https://picsum.photos/seed/prompt/800/450",
    instructor: "Google Cloud",
    difficulty: "Iniciante",
    duration: "2h",
    external_url: "https://www.cloudskillsboost.google/course_templates/536",
    content: null
  }
];

let tracks: any[] = [
  {
    id: 1,
    title: "Especialista em IA para Criadores",
    description: "A trilha definitiva para quem quer dominar a criação de conteúdo com auxílio de inteligência artificial.",
    thumbnail: "https://picsum.photos/seed/track1/800/450"
  }
];

let track_courses: any[] = [
  { track_id: 1, course_id: 1, position: 1 },
  { track_id: 1, course_id: 2, position: 2 }
];

let enrollments: any[] = [];
let certificates: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/courses", (req, res) => {
    try {
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/courses/:id", (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = courses.find(c => c.id === courseId);
      if (course) {
        res.json(course);
      } else {
        res.status(404).json({ error: "Course not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/tracks", (req, res) => {
    try {
      const tracksWithCourses = tracks.map((track) => {
        const trackCourseIds = track_courses
          .filter(tc => tc.track_id === track.id)
          .sort((a, b) => a.position - b.position)
          .map(tc => tc.course_id);

        const trackCoursesData = trackCourseIds.map(id => courses.find(c => c.id === id)).filter(Boolean);

        return { ...track, courses: trackCoursesData };
      });
      res.json(tracksWithCourses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/user/:id/onboarding", (req, res) => {
    try {
      const { interests, knowledge_level } = req.body;
      const userId = parseInt(req.params.id);
      const userIndex = users.findIndex(u => u.id === userId);

      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          interests: JSON.stringify(interests),
          knowledge_level,
          onboarding_completed: 1
        };
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/user/:id/dashboard", (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      let user = users.find(u => u.id === userId);

      if (!user) {
        user = {
          id: userId,
          name: "Visitante",
          onboarding_completed: 0,
          role: 'user'
        };
      }

      const userEnrollments = enrollments
        .filter(e => e.user_id === userId)
        .map(e => {
          const course = courses.find(c => c.id === e.course_id);
          return { ...course, progress: e.progress, status: e.status };
        })
        .filter(e => e.id !== undefined);

      const enrolledCourseIds = enrollments.filter(e => e.user_id === userId).map(e => e.course_id);
      const recommended = courses
        .filter(c => !enrolledCourseIds.includes(c.id))
        .slice(0, 3);

      res.json({ user, enrollments: userEnrollments, recommended });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/admin/stats", (req, res) => {
    try {
      const totalUsers = users.length;
      const totalCourses = courses.length;
      const totalEnrollments = enrollments.length;

      const courseEnrollmentCounts = courses.map(course => {
        const count = enrollments.filter(e => e.course_id === course.id).length;
        return { title: course.title, enrollments: count };
      }).sort((a, b) => b.enrollments - a.enrollments).slice(0, 5);

      res.json({
        totalUsers: { count: totalUsers },
        totalCourses: { count: totalCourses },
        totalEnrollments: { count: totalEnrollments },
        popularCourses: courseEnrollmentCounts,
        revenue: 12500
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
