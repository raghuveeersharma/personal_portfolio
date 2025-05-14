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

// Project Section Logo's
import githubdetLogo from "./assets/work_logo/TextUtil.png";
import csprepLogo from "./assets/work_logo/PassOp.png";
import taskremLogo from "./assets/work_logo/eco.png";
import npmLogo from "./assets/work_logo/BookStore.png";
import webverLogo from "./assets/work_logo/Portfolio.png";
import cmLogo from "./assets/work_logo/Todo.png";

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

export const education = [
  {
    id: 0,
    img: chameli,
    school: "Chameli Devi Group of Institutions, Indore",
    date: "Sept 2022 - July 2024",
    grade: "6.5 CGPA",
    desc: "I have completed my Bachelor's degree in Information Technology (B.Tech) from rgpv University, Bhopal. During my time at rgpv University, I gained a strong foundation in programming, software development, and computer science principles. I have studied courses such as Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, and Software Engineering. I actively participated in various workshops and technical events, which enhanced my skills and knowledge.",
    degree: "Bachelor of Technology - BTECH (Information Technology)",
  },
  {
    id: 1,
    img: CITYSTAR,
    school: "City Star Convent Higher Secondary School, Indore",
    date: "Apr 2017 - March 2018",
    grade: "67.6%",
    desc: "I completed my class 12 education from City Star Convent Higher Secondary School, Indore, under the State board, where I studied Physics, Chemistry, and Mathematics (PCM) with Computer Science.",
    degree: "State Board(XII) - PCM",
  },
  {
    id: 2,
    img: CITYSTAR,
    school: "City Star Convent Higher Secondary School, Indore",
    date: "Apr 2015 - March 2016",
    grade: "69.2%",
    desc: "I completed my class 10 education from City Star Convent Higher Secondary School, Indore, under the State board, where I studied Science with Computer.",
    degree: "State Board(X) - Science",
  },
];

export const projects = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
    id: 3,
    title: "TextUtils",
    description:
      "A text Editor built on React.js, it can manipulate text like Convert to uuper case,to lower case, Remove extra spaces, Copy to clipboard, Clear text, and Dark mode.",
    image: githubdetLogo,
    tags: ["HTML", "CSS", "JavaScript", "React JS", "Tailwind CSS"],
    github: "https://github.com/raghuveeersharma/Text_Util/tree/master",
    webapp: "https://raghuveeersharma.github.io/Text_Util",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Responsive portfolio showcasing my work.I use react-animation in it, and it is fully responsive.",
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
    id: 5,
    title: "Todo App",
    description:
      "A simple todo app built on MERN stack. It saves users tasks in database and user can perform CURD operations too on tasks, The UI of it is fully responsive.",
    image: cmLogo,
    tags: ["React JS", "HTML", "CSS", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/raghuveeersharma/TODO_FRONTEND",
    webapp: "https://todo-frontend-sigma-opal.vercel.app/",
  },
];
