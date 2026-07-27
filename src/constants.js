import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

// Skills Section Logo's
import htmlLogo from "./assets/tech_logo/html.png";
import cssLogo from "./assets/tech_logo/css.png";
import javascriptLogo from "./assets/tech_logo/javascript.png";
import reactjsLogo from "./assets/tech_logo/reactjs.png";
import reduxLogo from "./assets/tech_logo/redux.png";
import nextjsLogo from "./assets/tech_logo/nextjs.png";
import tailwindcssLogo from "./assets/tech_logo/tailwindcss.png";
import materialuiLogo from "./assets/tech_logo/materialui.png";
import bootstrapLogo from "./assets/tech_logo/bootstrap.png";
import nodejsLogo from "./assets/tech_logo/nodejs.png";
import expressjsLogo from "./assets/tech_logo/express.png";
import mysqlLogo from "./assets/tech_logo/mysql.png";
import mongodbLogo from "./assets/tech_logo/mongodb.png";
import cLogo from "./assets/tech_logo/c.png";
import cppLogo from "./assets/tech_logo/cpp.png";
import javaLogo from "./assets/tech_logo/java.png";
import typescriptLogo from "./assets/tech_logo/typescript.png";
import gitLogo from "./assets/tech_logo/git.png";
import githubLogo from "./assets/tech_logo/github.png";
import vscodeLogo from "./assets/tech_logo/vscode.png";
import postmanLogo from "./assets/tech_logo/postman.png";
import mcLogo from "./assets/tech_logo/mc.png";
import vercelLogo from "./assets/tech_logo/vercel.png";
import postgreLogo from "./assets/tech_logo/postgre.png";

// Education Section Logo's
import chameli from "./assets/education_logo/chameli.png";
import CITYSTAR from "./assets/education_logo/CITYSTAR.jpeg";

// Experience Section Logo's
// Placeholders — drop the real company logos into
// src/assets/experience_logo/ and swap these imports.
import bestpeersLogo from "./assets/experince_logo/bestpeers.jpeg";
import codemantraLogo from "./assets/experince_logo/code_mantra.png";

// Project Section Logo's
import githubdetLogo from "./assets/work_logo/TextUtil.png";
import csprepLogo from "./assets/work_logo/PassOp.png";
import taskremLogo from "./assets/work_logo/eco.png";
import npmLogo from "./assets/work_logo/BookStore.png";
import webverLogo from "./assets/work_logo/Portfolio.png";
import cmLogo from "./assets/work_logo/Todo.png";
import LinkUP from "./assets/work_logo/LinkUP.png";
import SchoolSathi from "./assets/work_logo/SchoolSathi.png";
import SyncDoc from "./assets/work_logo/SyncDoc.png";

export const SkillsInfo = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", logo: htmlLogo },
      { name: "CSS", logo: cssLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "React JS", logo: reactjsLogo },
      { name: "Redux", logo: reduxLogo },
      { name: "Next JS", logo: nextjsLogo },
      { name: "Tailwind CSS", logo: tailwindcssLogo },
      { name: "Material UI", logo: materialuiLogo },
      { name: "Bootstrap", logo: bootstrapLogo },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node JS", logo: nodejsLogo },
      { name: "Express JS", logo: expressjsLogo },
      { name: "MySQL", logo: mysqlLogo },
      { name: "MongoDB", logo: mongodbLogo },
      { name: "PostgreSQL", logo: postgreLogo },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "C", logo: cLogo },
      { name: "C++", logo: cppLogo },
      { name: "Java", logo: javaLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "TypeScript", logo: typescriptLogo },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", logo: gitLogo },
      { name: "GitHub", logo: githubLogo },
      { name: "VS Code", logo: vscodeLogo },
      { name: "Postman", logo: postmanLogo },
      { name: "Compass", logo: mcLogo },
      { name: "Vercel", logo: vercelLogo },
    ],
  },
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
    href: "https://github.com/raghuveeersharma",
  },
  {
    label: "LinkedIn",
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/raghuveer-sharma-810124252/",
  },
  {
    label: "Email",
    icon: FiMail,
    href: "mailto:sharmaraghu157@gmail.com",
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
  "https://drive.google.com/file/d/1jQzcFIlcEWLyNvn6_CbqHX3kI9e8BO0m/view?usp=drivesdk";

// Newest first — the timeline renders in array order.
export const experiences = [
  {
    id: 0,
    img: codemantraLogo,
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
    school: "Chameli Devi Group of Institutions, Indore",
    date: "Sept 2022 - July 2024",
    desc: "I have completed my Bachelor's degree in Information Technology (B.Tech) from rgpv University, Bhopal. During my time at rgpv University, I gained a strong foundation in programming, software development, and computer science principles. I have studied courses such as Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, and Software Engineering. I actively participated in various workshops and technical events, which enhanced my skills and knowledge.",
    degree: "Bachelor of Technology - BTECH (Information Technology)",
  },
  {
    id: 1,
    img: CITYSTAR,
    school: "City Star Convent Higher Secondary School, Indore",
    date: "Apr 2017 - March 2018",
    desc: "I completed my class 12 education from City Star Convent Higher Secondary School, Indore, under the State board, where I studied Physics, Chemistry, and Mathematics (PCM) with Computer Science.",
    degree: "State Board(XII) - PCM",
  },
  {
    id: 2,
    img: CITYSTAR,
    school: "City Star Convent Higher Secondary School, Indore",
    date: "Apr 2015 - March 2016",
    desc: "I completed my class 10 education from City Star Convent Higher Secondary School, Indore, under the State board, where I studied Science with Computer.",
    degree: "State Board(X) - Science",
  },
];

export const projects = [
  {
    id: 0,
    title: "SchoolSathi",
    description:
      "SchoolSathi is a modern multi-tenant School Management System (SaaS) that streamlines school administration through a comprehensive dashboard. It provides modules for student admissions, staff management, attendance, classes, timetables, examinations, payroll, fees, notifications, and academic lifecycle management with secure authentication and a scalable architecture.",
    image: SchoolSathi,
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
    id: 1,
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
    id: 2,
    title: "SyncDocs",
    description:
      "LocalFirst Docs is a collaborative document editor built with a local-first architecture, enabling users to create, edit, and collaborate on documents even without an internet connection. Powered by CRDT-based synchronization, it provides deterministic conflict resolution, real-time collaboration, version history, AI-assisted writing, and seamless offline-to-online synchronization while ensuring secure role-based access control.",
    image: SyncDoc,
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
    id: 3,
    title: "LinkUP",
    description:
      "LinkUP is a modern, user-friendly web application designed to simplify social connection and communication. It enables users to create accounts, manage profiles, connect with others, and engage in meaningful digital interactions. Whether it's networking, sharing updates, or building an online presence, LinkUP makes it effortless and intuitive.",
    image: LinkUP,
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
    id: 4,
    title: "EcoRecycle",
    description:
      "EcoRecycle is an intelligent web application designed to promote sustainable waste management by leveraging AI-powered object detection and location-based recycling center recommendations.",
    image: taskremLogo,
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
    id: 5,
    title: "PassOP",
    description:
      "PassOp is a responsive web application built with React.js that enables users to securely store and manage their website credentials, including usernames, passwords, and URLs, directly in their browser using local storage. Passwords are encrypted using AES encryption (CryptoJS) before being stored, providing a basic layer of security. To access or copy stored credentials, users are required to enter a master password.",
    image: csprepLogo,
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
    id: 6,
    title: "E-BookStore",
    description:
      "E-BookStore web application using the MERN stack. The platform includes user authentication with login and logout functionality, and features protected routes that are accessible only to logged-in users. Books data is stored in MongoDB Atlas and fetched dynamically to display a collection of titles with details like name, author, and price.",
    image: npmLogo,
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
    id: 7,
    title: "TextUtils",
    description:
      "A text Editor built on React.js, it can manipulate text like Convert to upper case, to lower case, Remove extra spaces, Copy to clipboard, Clear text, and Dark mode.",
    image: githubdetLogo,
    tags: ["HTML", "CSS", "JavaScript", "React JS", "Tailwind CSS"],
    github: "https://github.com/raghuveeersharma/Text_Util/tree/master",
    webapp: "https://raghuveeersharma.github.io/Text_Util",
  },
  {
    id: 8,
    title: "Portfolio Website",
    description:
      "Responsive portfolio showcasing my work. I use react-animation in it, and it is fully responsive.",
    image: webverLogo,
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
    id: 9,
    title: "Todo App",
    description:
      "A simple todo app built on MERN stack. It saves users tasks in the database, and users can perform CRUD operations on tasks. The UI is fully responsive.",
    image: cmLogo,
    tags: ["React JS", "HTML", "CSS", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/raghuveeersharma/TODO_FRONTEND",
    webapp: "https://todo-frontend-sigma-opal.vercel.app/",
  },
];