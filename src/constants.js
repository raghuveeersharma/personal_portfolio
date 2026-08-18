import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { TbBrandLeetcode } from "react-icons/tb";

// Skills Section Logo's
import htmlLogo from "./assets/tech_logo/html.webp";
import cssLogo from "./assets/tech_logo/css.webp";
import javascriptLogo from "./assets/tech_logo/javascript.webp";
import reactjsLogo from "./assets/tech_logo/reactjs.webp";
import reduxLogo from "./assets/tech_logo/redux.webp";
import nextjsLogo from "./assets/tech_logo/nextjs.webp";
import tailwindcssLogo from "./assets/tech_logo/tailwindcss.webp";
import materialuiLogo from "./assets/tech_logo/materialui.webp";
import bootstrapLogo from "./assets/tech_logo/bootstrap.webp";
import nodejsLogo from "./assets/tech_logo/nodejs.webp";
import expressjsLogo from "./assets/tech_logo/express.webp";
import mysqlLogo from "./assets/tech_logo/mysql.webp";
import mongodbLogo from "./assets/tech_logo/mongodb.webp";
import cLogo from "./assets/tech_logo/c.webp";
import cppLogo from "./assets/tech_logo/cpp.webp";
import javaLogo from "./assets/tech_logo/java.webp";
import typescriptLogo from "./assets/tech_logo/typescript.webp";
import gitLogo from "./assets/tech_logo/git.webp";
import githubLogo from "./assets/tech_logo/github.webp";
import vscodeLogo from "./assets/tech_logo/vscode.webp";
import postmanLogo from "./assets/tech_logo/postman.webp";
import mcLogo from "./assets/tech_logo/mc.webp";
import vercelLogo from "./assets/tech_logo/vercel.webp";
import postgreLogo from "./assets/tech_logo/postgre.webp";

// Education Section Logo's
import chameli from "./assets/education_logo/chameli.webp";
import CITYSTAR from "./assets/education_logo/CITYSTAR.webp";

// Experience Section Logo's
// Placeholders — drop the real company logos into
// src/assets/experience_logo/ and swap these imports.
import bestpeersLogo from "./assets/experince_logo/bestpeers.webp";
import codemantraLogo from "./assets/experince_logo/code_mantra.webp";

// Project Section Logo's
import githubdetLogo from "./assets/work_logo/TextUtil.webp";
import csprepLogo from "./assets/work_logo/PassOp.webp";
import taskremLogo from "./assets/work_logo/eco.webp";
import npmLogo from "./assets/work_logo/BookStore.webp";
import webverLogo from "./assets/work_logo/Portfolio.webp";
import cmLogo from "./assets/work_logo/Todo.webp";
import LinkUP from "./assets/work_logo/LinkUP.webp";
import SchoolSathi from "./assets/work_logo/SchoolSathi.webp";
import SyncDoc from "./assets/work_logo/SyncDoc.webp";
import Vichar from "./assets/work_logo/Vichar.webp";
import Benoit from "./assets/work_logo/Benoit.webp";
import PistZerna from "./assets/work_logo/PistZerna.webp";

export const SkillsInfo = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", logo: htmlLogo, logoW: 128, logoH: 128 },
      { name: "CSS", logo: cssLogo, logoW: 128, logoH: 128 },
      { name: "JavaScript", logo: javascriptLogo, logoW: 128, logoH: 128 },
      { name: "React JS", logo: reactjsLogo, logoW: 96, logoH: 96 },
      { name: "Redux", logo: reduxLogo, logoW: 128, logoH: 128 },
      { name: "Next JS", logo: nextjsLogo, logoW: 128, logoH: 128 },
      { name: "Tailwind CSS", logo: tailwindcssLogo, logoW: 128, logoH: 128 },
      { name: "Material UI", logo: materialuiLogo, logoW: 128, logoH: 111 },
      { name: "Bootstrap", logo: bootstrapLogo, logoW: 128, logoH: 128 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node JS", logo: nodejsLogo, logoW: 128, logoH: 128 },
      { name: "Express JS", logo: expressjsLogo, logoW: 128, logoH: 128 },
      { name: "MySQL", logo: mysqlLogo, logoW: 128, logoH: 126 },
      { name: "MongoDB", logo: mongodbLogo, logoW: 128, logoH: 128 },
      { name: "PostgreSQL", logo: postgreLogo, logoW: 128, logoH: 128 },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "C", logo: cLogo, logoW: 128, logoH: 128 },
      { name: "C++", logo: cppLogo, logoW: 128, logoH: 128 },
      { name: "Java", logo: javaLogo, logoW: 128, logoH: 128 },
      { name: "JavaScript", logo: javascriptLogo, logoW: 128, logoH: 128 },
      { name: "TypeScript", logo: typescriptLogo, logoW: 128, logoH: 128 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", logo: gitLogo, logoW: 128, logoH: 128 },
      { name: "GitHub", logo: githubLogo, logoW: 128, logoH: 128 },
      { name: "VS Code", logo: vscodeLogo, logoW: 128, logoH: 127 },
      { name: "Postman", logo: postmanLogo, logoW: 128, logoH: 128 },
      { name: "Compass", logo: mcLogo, logoW: 128, logoH: 128 },
      { name: "Vercel", logo: vercelLogo, logoW: 128, logoH: 128 },
    ],
  },
];

// ---- Skills: live MERN request journey --------------------------
// The five hops a single API call makes through the stack, in order.
// `icon` names a key in the ICONS map in components/skills/icons.js
// rather than importing a component here — this file stays data.
// Colours are per-node because the whole point of the visualiser is
// that each layer reads as a distinct technology; they are inline in
// the components and deliberately not @theme tokens (nothing outside
// this one block consumes them).
export const journeyNodes = [
  {
    id: "browser",
    label: "Browser",
    layer: "Client",
    icon: "device-laptop",
    color: "#9B9BAE",
    bg: "#111118",
    border: "#2A2A3F",
    packetColor: "#9B9BAE",
    requestLog: "User triggers GET /api/users/profile",
    responseLog: "Browser received response · rendering UI",
    detail: {
      headline: "Where the user experience lives.",
      bullets: [
        "React renders the UI from JSON response data",
        "Axios / fetch dispatches authenticated API calls",
        "State updates re-render components without page reload",
      ],
      years: "3 years",
      projects: ["School Management System", "Secret Vault", "Portfolio"],
    },
  },
  {
    id: "react",
    label: "React",
    layer: "UI Layer",
    icon: "brand-react",
    color: "#60A5FA",
    bg: "#0D1729",
    border: "#0D2545",
    packetColor: "#60A5FA",
    requestLog: "React dispatching fetch() with Bearer token",
    responseLog: "useState() updating — component re-rendering",
    detail: {
      headline:
        "Component-based UIs with hooks, context, and dynamic state.",
      bullets: [
        "Custom hooks for data fetching, auth state, and form handling",
        "Context API + useReducer for global state without Redux",
        "React Router for nested layouts and protected route guards",
      ],
      years: "3 years",
      projects: ["School Management System", "Secret Vault", "Portfolio"],
    },
  },
  {
    id: "node",
    label: "Node.js",
    layer: "Runtime",
    icon: "server",
    color: "#4ADE80",
    bg: "#0D1A0D",
    border: "#1A3A1A",
    packetColor: "#4ADE80",
    requestLog: "Node.js received request on :5000 · passing to Express",
    responseLog: "Node.js streaming response back to client",
    detail: {
      headline: "Server-side JS runtime — non-blocking I/O for fast APIs.",
      bullets: [
        "Event-driven architecture handling concurrent requests",
        "Environment config, middleware pipeline, and error handling",
        "File I/O, streams, and multipart upload handling (Multer)",
      ],
      years: "3 years",
      projects: ["School Management System", "Secret Vault"],
    },
  },
  {
    id: "express",
    label: "Express",
    layer: "API Layer",
    icon: "api",
    color: "#F59E0B",
    bg: "#1A1209",
    border: "#3A2A09",
    packetColor: "#F59E0B",
    requestLog: "Express routing to /users handler · validating JWT",
    responseLog: "Express sending 200 OK with JSON payload",
    detail: {
      headline: "REST API design with middleware, auth, and clean routing.",
      bullets: [
        "JWT-based auth middleware protecting private routes",
        "Role-based access control (Admin / Teacher / Student)",
        "Input validation with express-validator, rate limiting",
      ],
      years: "3 years",
      projects: ["School Management System", "Secret Vault"],
    },
  },
  {
    id: "mongo",
    label: "MongoDB",
    layer: "Database",
    icon: "database",
    color: "#4ADE80",
    bg: "#0D1A0D",
    border: "#1A3A1A",
    packetColor: "#4ADE80",
    requestLog: "MongoDB querying users collection · 2ms",
    responseLog: "MongoDB returned 1 document · 524 bytes",
    detail: {
      headline: "Document-oriented data modeling with Mongoose schemas.",
      bullets: [
        "Schema design with refs, virtuals, and pre/post hooks",
        "Aggregation pipelines for reports and analytics data",
        "Indexing strategies for query performance optimization",
      ],
      years: "2.5 years",
      projects: ["School Management System", "Secret Vault"],
    },
  },
];

// Supporting tools — a lower-weight row *below* the visualiser card,
// never inside it.
export const journeyTools = [
  { label: "Git", icon: "brand-git", color: "#F97316", bg: "#1A1209", border: "#3A2009" },
  { label: "GitHub", icon: "brand-github", color: "#9B9BAE", bg: "#111118", border: "#2A2A3F" },
  { label: "Tailwind CSS", icon: "palette", color: "#7DD3FC", bg: "#0D1A29", border: "#0D3050" },
  { label: "Framer Motion", icon: "windmill", color: "#A78BFA", bg: "#1A1228", border: "#2A1A48" },
  { label: "Postman", icon: "arrows-right-left", color: "#F97316", bg: "#1A1209", border: "#3A2009" },
  { label: "Docker", icon: "brand-docker", color: "#60A5FA", bg: "#0D1729", border: "#0D2545" },
  { label: "VS Code", icon: "code", color: "#60A5FA", bg: "#0D1729", border: "#0D2545" },
  { label: "Socket.io", icon: "broadcast", color: "#2DD4BF", bg: "#0D1A1A", border: "#0D3030" },
];

// ---- Hero (About section) ---------------------------------------
// The four phrases the hero types out, each aimed at a different
// reader: generalist recruiter, backend lead, frontend lead, CTO.
// react-type-animation reads this flat — string, hold, clear, pause.
export const heroRoles = [
  "full-stack MERN apps",
  1800,
  "",
  300,
  "REST APIs & backends",
  1800,
  "",
  300,
  "React interfaces",
  1800,
  "",
  300,
  "scalable Node.js services",
  1800,
  "",
  300,
];

// TODO: confirm these before the next deploy — see the note in the
// hero spec. Three is the ceiling; a fourth crowds the row.
export const heroStats = [
  { value: "1+", label: "years exp" },
  { value: "10+", label: "projects" },
];

export const heroSocials = [
  {
    label: "GitHub",
    icon: FiGithub,
    href: import.meta.env.VITE_GITHUB_URL,
  },
  {
    label: "LinkedIn",
    icon: FiLinkedin,
    href: import.meta.env.VITE_LINKEDIN_URL,
  },
  {
    label: "Email",
    icon: FiMail,
    href: import.meta.env.VITE_EMAIL_URL,
  },
];


export const socialLinks = [
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: import.meta.env.VITE_LINKEDIN_URL,
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: import.meta.env.VITE_INSTAGRAM_URL,
  },
  {
    label: "GitHub",
    icon: FaGithub,
    href: import.meta.env.VITE_GITHUB_URL,
  },
  {
    label: "LeetCode",
    icon: TbBrandLeetcode,
    href: import.meta.env.VITE_LEETCODE_URL,
  },
];

// Colour-coded per technology so the row reads as crafted rather
// than as a generic tag list.
export const heroStack = [
  { label: "MongoDB", text: "#4ADE80", bg: "#111D11", border: "#1A3A1A" },
  { label: "Express.js", text: "#F59E0B", bg: "#1A1209", border: "#3A2A09" },
  { label: "React", text: "#60A5FA", bg: "#0D1729", border: "#0D2545" },
  { label: "Node.js", text: "#4ADE80", bg: "#0D1A0D", border: "#1A3A1A" },
];

export const heroResume =
  import.meta.env.VITE_RESUME_URL;

// Newest first — the timeline renders in array order.
export const experiences = [
  {
    id: 0,
    img: codemantraLogo,
    imgW: 1200,
    imgH: 675,
    company: "Code Mantra, Indore",
    role: "React JS Intern",
    type: "Internship",
    date: "June 2023 - july 2023",
    desc: "My first hands-on experience with professional frontend development. I built responsive, reusable React components from Figma designs, wired them to REST APIs, and handled application state with hooks and the Context API. Along the way I picked up client-side routing with React Router, form handling and validation, cross-browser and mobile fixes, and the everyday habits of working on a team — Git workflow, pull requests, and acting on code review feedback.",
    skills: [
      "React JS",
      "JavaScript",
      "HTML",
      "CSS",
      "Context API",
      "React Router",
      "Git",
    ],
  },
   {
    id: 1,
    img: bestpeersLogo,
    imgW: 200,
    imgH: 200,
    company: "BestPeers Infosystem, Indore",
    role: "MERN Stack Developer",
    type: "Full-time",
    date: "Sept 2025 - Present",
    desc: "Working as a full-time MERN stack developer, building and maintaining production web applications end to end. I design and consume REST APIs with Node.js and Express, model data in MongoDB, and build responsive, component-driven interfaces in React. Day to day this includes implementing authentication and role-based access with JWT, writing reusable hooks and shared UI components, optimising queries and render performance, and collaborating with designers and QA in an Agile workflow with code reviews and Git-based branching.",
    skills: [
      "React JS",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "JWT",
      "Tailwind CSS",
      "Git",
      "TypeScript",
      "Sql",
    ],
  },
];

export const education = [
  {
    id: 0,
    img: chameli,
    imgW: 256,
    imgH: 203,
    school: "Chameli Devi Group of Institutions, Indore",
    date: "Sept 2021 - May 2025",
    desc: "I have completed my Bachelor's degree in Information Technology (B.Tech) from rgpv University, Bhopal. During my time at rgpv University, I gained a strong foundation in programming, software development, and computer science principles. I have studied courses such as Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, and Software Engineering. I actively participated in various workshops and technical events, which enhanced my skills and knowledge.",
    degree: "Bachelor of Technology - BTECH (Information Technology)",
  },
  {
    id: 1,
    img: CITYSTAR,
    imgW: 256,
    imgH: 183,
    school: "City Star Convent Higher Secondary School, Indore",
    date: "May 2020 - March 2021",
    desc: "I completed my class 12 education from City Star Convent Higher Secondary School, Indore, under the State board, where I studied Physics, Chemistry, and Mathematics (PCM) with Computer Science.",
    degree: "State Board(XII) - PCM",
  },
  {
    id: 2,
    img: CITYSTAR,
    imgW: 256,
    imgH: 183,
    school: "City Star Convent Higher Secondary School, Indore",
    date: "May 2018 - March 2019",
    desc: "I completed my class 10 education from City Star Convent Higher Secondary School, Indore, under the State board, where I studied Science with Computer.",
    degree: "State Board(X)",
  },
];

export const projects = [
  {
    id: 0,
    title: "Benoit",
    description:
      "Benoit is a modern marketing website for a cafe in Indore, designed with a moody editorial aesthetic that combines dark chrome styling with warm, cinematic photography. The website features smooth scroll-based motion where images transition from soft focus to sharp focus, along with a responsive menu, cart system, contact form, accessibility-focused interactions, and a polished component architecture.",
    image: Benoit,
    imgW: 1200,
    imgH: 626,
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Radix UI",
      "Zod",
      "Lucide React",
      "React Server Components",
      "App Router",
      "PWA",
      "Accessibility",
    ],
    github: "https://github.com/raghuveeersharma/Benoit-Cafe",
    webapp: "https://benoitcoffee.vercel.app/",
  },
  {
  id: 1,
  title: "Пист & Зёрна",
  description:
    "Пист & Зёрна is a modern bilingual specialty coffee shop marketing website designed as a scroll-driven portfolio showcase. The site supports Russian and English with fully statically prerendered routes, localized content and metadata, responsive navigation, animated interactions, product-focused menu sections, accessible forms, and a carefully designed visual system combining bold typography with warm coffee-inspired aesthetics.",

  image: PistZerna,
  imgW: 1200,
  imgH: 626,

  tags: [
    "Next.js",
    "React",
    "TypeScript",
    "App Router",
    "React Server Components",
    "Tailwind CSS",
    "Framer Motion",
    "React Hook Form",
    "Zod",
    "Radix UI",
    "Lucide React",
    "next/font",
    "i18n",
    "SEO",
  ],

  github: "https://github.com/raghuveeersharma/PistZerna-Cafe",

  webapp: "https://pist-zerna.vercel.app/en",
},
  {
    id: 2,
    title: "SchoolSathi",
    description:
      "SchoolSathi is a modern multi-tenant School Management System (SaaS) that streamlines school administration through a comprehensive dashboard. It provides modules for student admissions, staff management, attendance, classes, timetables, examinations, payroll, fees, notifications, and academic lifecycle management with secure authentication and a scalable architecture.",
    image: SchoolSathi,
    imgW: 1200,
    imgH: 651,
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Material UI",
      "React Query",
      "Axios",
      "JWT",
      "Zod",
      "Cloudinary",
    ],
    github:
      "https://github.com/raghuveeersharma/SchoolSathi-frontend/tree/main",
    webapp: "https://school-sathi-frontend.vercel.app/",
  },
  {
    id: 3,
    title: "GymFlow",
    description:
      "GymFlow is a modern multi-tenant gym management platform that helps gym owners efficiently manage members, membership plans, payments, attendance, and business analytics from a single dashboard. It features secure authentication, role-based access, real-time dashboard insights, and a scalable architecture built with modern frontend technologies for a seamless management experience.",
    image: "GymFlow",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Tailwind CSS",
      "shadcn/ui",
      "React Hook Form",
      "Zod",
      "Axios",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    github: "https://github.com/raghuveeersharma/gymflow-fe",
    webapp: "https://gymflow-fe.vercel.app/",
  },
  {
    id: 4,
    title: "SyncDocs",
    description:
      "LocalFirst Docs is a collaborative document editor built with a local-first architecture, enabling users to create, edit, and collaborate on documents even without an internet connection. Powered by CRDT-based synchronization, it provides deterministic conflict resolution, real-time collaboration, version history, AI-assisted writing, and seamless offline-to-online synchronization while ensuring secure role-based access control.",
    image: SyncDoc,
    imgW: 1200,
    imgH: 651,
    tags: [
      "Next.js",
      "TypeScript",
      "Yjs",
      "PartyKit",
      "TipTap",
      "IndexedDB",
      "Drizzle ORM",
      "Neon PostgreSQL",
      "Auth.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Groq AI",
      "Playwright",
      "Vitest",
    ],
    github: "https://github.com/raghuveeersharma/SyncDocs",
    webapp: "https://sync-docs-tau.vercel.app",
  },
  {
    id: 5,
    title: "LinkUP",
    description:
      "LinkUP is a modern, user-friendly web application designed to simplify social connection and communication. It enables users to create accounts, manage profiles, connect with others, and engage in meaningful digital interactions. Whether it's networking, sharing updates, or building an online presence, LinkUP makes it effortless and intuitive.",
    image: LinkUP,
    imgW: 1200,
    imgH: 635,
    tags: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "React Query",
      "JWT",
      "daisyui",
    ],
    github: "https://github.com/raghuveeersharma/LinkUP",
    webapp:
      "https://link-up-git-master-raghuveer-sharmas-projects.vercel.app/",
  },
  {
    id: 6,
    title: "EcoRecycle",
    description:
      "EcoRecycle is an intelligent web application designed to promote sustainable waste management by leveraging AI-powered object detection and location-based recycling center recommendations.",
    image: taskremLogo,
    imgW: 1200,
    imgH: 632,
    tags: [
      "React JS",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "TensorFlow.js",
      "GoMaps.pro API",
      "Leaflet.js",
    ],
    github: "https://github.com/raghuveeersharma/EcoRecycle",
    webapp: "https://eco-recycle-rho.vercel.app/",
  },
  {
  id: 7,
  title: "Vichar",
  description:
    "Vichar is a modern multi-tenant note-taking application with a local-first architecture that enables users to create, organize, and manage rich-text notes securely. It features per-note AES-256 encryption, AI-powered writing assistance, offline-first synchronization with IndexedDB, installable PWA support, folder organization, secure JWT cookie authentication, and seamless online/offline note management.",

  image: Vichar,
  imgW: 1669,
  imgH: 967,

  tags: [
    "React 19",
    "Vite",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "Tailwind CSS",
    "daisyUI",
    "TipTap",
    "IndexedDB",
    "PWA",
    "JWT",
    "Google Gemini",
    "Axios",
    "AES-256 Encryption",
  ],

  github: "https://github.com/raghuveeersharma/vichar",

  webapp: "https://vichar-three.vercel.app/",
},
  {
    id: 8,
    title: "PassOP",
    description:
      "PassOp is a responsive web application built with React.js that enables users to securely store and manage their website credentials, including usernames, passwords, and URLs, directly in their browser using local storage. Passwords are encrypted using AES encryption (CryptoJS) before being stored, providing a basic layer of security. To access or copy stored credentials, users are required to enter a master password.",
    image: csprepLogo,
    imgW: 1200,
    imgH: 636,
    tags: [
      "React JS",
      "HTML",
      "Tailwind CSS",
      "Lord-icons",
      "JavaScript",
      "CryptoJS",
    ],
    github: "https://github.com/raghuveeersharma/password_manager",
    webapp: "https://password-manager-five-tan.vercel.app/",
  },
  {
    id: 9,
    title: "E-BookStore",
    description:
      "E-BookStore web application using the MERN stack. The platform includes user authentication with login and logout functionality, and features protected routes that are accessible only to logged-in users. Books data is stored in MongoDB Atlas and fetched dynamically to display a collection of titles with details like name, author, and price.",
    image: npmLogo,
    imgW: 1200,
    imgH: 641,
    tags: [
      "React JS",
      "Node.js",
      "MongoDB",
      "Express",
      "Context-API",
      "Tailwind CSS",
    ],
    github: "https://github.com/raghuveeersharma/BookStoreWeb",
    webapp: "https://book-store-web-flame.vercel.app/",
  },
  {
    id: 10,
    title: "TextUtils",
    description:
      "A text Editor built on React.js, it can manipulate text like Convert to upper case, to lower case, Remove extra spaces, Copy to clipboard, Clear text, and Dark mode.",
    image: githubdetLogo,
    imgW: 1200,
    imgH: 636,
    tags: ["HTML", "CSS", "JavaScript", "React JS", "Tailwind CSS"],
    github: "https://github.com/raghuveeersharma/Text_Util/tree/master",
    webapp: "https://raghuveeersharma.github.io/Text_Util",
  },
  {
    id: 11,
    title: "Portfolio Website",
    description:
      "Responsive portfolio showcasing my work. I use react-animation in it, and it is fully responsive.",
    image: webverLogo,
    imgW: 1200,
    imgH: 643,
    tags: [
      "JavaScript",
      "React JS",
      "Tailwind CSS",
      "react-router-dom",
      "react-animation",
    ],
    github: "https://github.com/raghuveeersharma/Portfolio",
    webapp: "https://raghuveeersharma.github.io/Portfolio/",
  },
  {
    id: 12,
    title: "Todo App",
    description:
      "A simple todo app built on MERN stack. It saves users tasks in the database, and users can perform CRUD operations on tasks. The UI is fully responsive.",
    image: cmLogo,
    imgW: 845,
    imgH: 758,
    tags: ["React JS", "HTML", "CSS", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/raghuveeersharma/TODO_FRONTEND",
    webapp: "https://todo-frontend-sigma-opal.vercel.app/",
  },
];