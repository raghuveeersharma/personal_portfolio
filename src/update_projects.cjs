const fs = require('fs');

let content = fs.readFileSync('constants.js', 'utf8');

// Insert import if not exists
if (!content.includes('import Ironhaus from "./assets/work_logo/Ironhaus.webp";')) {
    content = content.replace(
        'import BadoniyaConstructions from "./assets/work_logo/BadoniyaConstructions.webp";',
        'import BadoniyaConstructions from "./assets/work_logo/BadoniyaConstructions.webp";\nimport Ironhaus from "./assets/work_logo/Ironhaus.webp";'
    );
}

// Find the position to insert
const ecoRecycleStr = `  {
    id: 7,
    title: "EcoRecycle",`;

const newProjectStr = `  {
    id: 7,
    title: "IRONHAUS",
    description:
      "IRONHAUS is a cinematic, conversion-focused website for a boutique strength and conditioning gym in Brooklyn. The platform features an immersive landing page with animated statistics, training programs, coaches, timetable, pricing, gallery, testimonials, BMI calculator, FAQ, and contact form, along with dedicated booking, program, and trainer pages. Built with a strong focus on performance, accessibility, responsive interactions, and smooth motion-driven user experiences.",
    image: Ironhaus,
    imgW: 1200,
    imgH: 651,
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "App Router",
      "Tailwind CSS",
      "Framer Motion",
      "Server Actions",
      "Dynamic Routing",
      "Responsive Design",
      "Accessibility",
      "SEO",
    ],
    github: "https://github.com/raghuveeersharma/ironhaus",
    webapp: "https://ironhaus.vercel.app/",
  },
`;

if (content.includes(ecoRecycleStr)) {
    let before = content.substring(0, content.indexOf(ecoRecycleStr));
    let after = content.substring(content.indexOf(ecoRecycleStr));
    
    // Increment IDs in the 'after' portion
    after = after.replace(/id:\s*(\d+)/g, (match, idStr) => {
        return `id: ${parseInt(idStr) + 1}`;
    });
    
    content = before + newProjectStr + after;
    fs.writeFileSync('constants.js', content);
    console.log("Successfully updated projects array.");
} else {
    console.error("Could not find EcoRecycle string to insert before.");
}
