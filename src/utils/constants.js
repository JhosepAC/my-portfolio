import cvFile from '../assets/docs/JHOSEP_JAMIL-ARGOMEDO_CAMACHO-CV.pdf';

export const ASSETS = {
    CV_PATH: cvFile,
    CV_NAME: 'JHOSEP_ARGOMEDO-CV.pdf'
};

export const NAV_LINKS = [
    {id: 'home', key: 'nav.home'},
    {id: 'skills', key: 'nav.skills'},
    {id: 'projects', key: 'nav.projects'},
    {id: 'education', key: 'nav.education'},
    {id: 'contact', key: 'nav.contact-me'},
];

export const SOCIAL_ICONS = {
    github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .319.232.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
};

export const SOCIAL_LINKS = [
    {id: 'github', name: 'GitHub', url: 'https://github.com/JhosepAC'},
    {id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/jhosep-ac'}
];

export const SKILLS_DATA = {
    languages: [
        {name: 'JavaScript', icon: 'javascript', color: '#f7df1e'},
        {name: 'Python', icon: 'python', color: '#3776ab'},
        {name: 'Flutter', icon: 'flutter', color: '#02569b'},
        {name: 'C#', icon: 'csharp', color: '#239120'},
        {name: 'C++', icon: 'cpp', color: '#00599c'},
        {name: 'HTML5', icon: 'html', color: '#e34f26'},
        {name: 'CSS3', icon: 'css', color: '#2965f1'},
    ],
    databases: [
        {name: 'MySQL', icon: 'mysql', color: '#4479a1'},
        {name: 'MariaDB', icon: 'mariadb', color: '#00526a'},
        {name: 'SQL Server', icon: 'sqlserver', color: '#cc2927'},
        {name: 'MongoDB', icon: 'mongodb', color: '#47a248'},
    ],
    frameworks: [
        {name: 'Vue', icon: 'vue', color: '#42b883'},
        {name: 'React', icon: 'react', color: '#61dafb'},
        {name: 'Tailwind', icon: 'headlessui', color: '#66e3ff'}
    ],
    tools: [
        {name: 'GitHub', icon: 'github', color: '#ffffff'},
        {name: 'Git', icon: 'git', color: '#f05032'},
        {name: 'Linux', icon: 'linux', color: '#fcc624'},
        {name: 'Azure', icon: 'azure', color: '#0078d4'},
        {name: 'Android Studio', icon: 'androidstudio', color: '#3ddc84'},
        {name: 'Figma', icon: 'figma', color: '#a259ff'},
        {name: 'WebStorm', icon: 'webstorm', color: '#00cdd7'},
        {name: 'VS Code', icon: 'vscode', color: '#007acc'},
        {name: 'Visual Studio', icon: 'visualstudio', color: '#5c2d91'},
        {name: 'Rider', icon: 'rider', color: '#781919'},
    ],
    others: [
        {name: 'Scrum', icon: 'simple-icons:scrumalliance', iconType: 'iconify', color: '#f15a24'},
        {name: 'User Stories', icon: 'mdi:clipboard-text-outline', iconType: 'iconify', color: '#4caf50'},
        {name: 'Agile', icon: 'mdi:sync', iconType: 'iconify', color: '#2196f3'}
    ],
    softskills: [
        {id: 'communication', icon: 'mdi:chat-processing-outline', iconType: 'iconify', color: '#00d2ff'},
        {id: 'teamwork', icon: 'mdi:account-group-outline', iconType: 'iconify', color: '#ff9a9e'},
        {id: 'problemSolving', icon: 'mdi:lightbulb-on-outline', iconType: 'iconify', color: '#f6d365'},
        {id: 'adaptability', icon: 'mdi:cached', iconType: 'iconify', color: '#a1c4fd'},
        {id: 'timeManagement', icon: 'mdi:clock-outline', iconType: 'iconify', color: '#d4fc79'},
        {id: 'creativity', icon: 'mdi:palette-outline', iconType: 'iconify', color: '#84fab0'}
    ]
};