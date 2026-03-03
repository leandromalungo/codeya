export interface Course {
    id: number;
    title: string;
    description: string;
    long_description?: string;
    learning_objectives?: string;
    category: string;
    type: 'free' | 'premium';
    thumbnail: string;
    instructor: string;
    difficulty: string;
    duration: string;
    external_url?: string;
    progress?: number;
    content?: string;
}

export const staticCourses: Course[] = [
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
    }
];

export const staticTracks = [
    {
        id: 1,
        title: "Especialista em IA para Criadores",
        description: "A trilha definitiva para quem quer dominar a criação de conteúdo com auxílio de inteligência artificial.",
        thumbnail: "https://picsum.photos/seed/track1/800/450",
        courses: staticCourses // Contains both courses for MVP sake
    }
];
