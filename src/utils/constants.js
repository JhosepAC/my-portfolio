import cvFile from '../assets/docs/JHOSEP_JAMIL-ARGOMEDO_CAMACHO-CV.pdf';

export const ASSETS = {
    CV_PATH: cvFile, CV_NAME: 'JHOSEP_ARGOMEDO-CV.pdf'
};

export const NAV_LINKS = [{id: 'home', key: 'nav.home', href: '#home'}, {
    id: 'skills', key: 'nav.skills', href: '#skills'
}, {id: 'projects', key: 'nav.projects', href: '#projects'}, {
    id: 'education', key: 'nav.education', href: '#education'
}, {id: 'contact', key: 'nav.contact-me', href: '#contact'}];

export const SOCIAL_ICONS = {
    github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .319.232.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    email: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
    instagram: "M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zm4.25 2.25a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 2a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm4.88-.88a1.38 1.38 0 1 1-2.76 0 1.38 1.38 0 0 1 2.76 0z",
    whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
};

export const SOCIAL_LINKS = [{
    id: 'github', name: 'GitHub', url: 'https://github.com/JhosepAC', color: '#ffffff'
}, {id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/jhosep-ac', color: '#0077b5'}, {
    id: 'email', name: 'Email', url: 'mailto:jhosepjamil@gmail.com', color: '#ea4335'
}, {id: 'instagram', name: 'Instagram', url: 'https://instagram.com/jh_slin', color: '#e4405f'}, {
    id: 'whatsapp', name: 'WhatsApp', url: 'https://wa.me/+51978777386', color: '#25D366'
}];

export const SKILLS_DATA = {
    languages: [{name: 'JavaScript', icon: 'javascript', color: '#f7df1e'}, {
        name: 'Python', icon: 'python', color: '#3776ab'
    }, {name: 'Flutter', icon: 'flutter', color: '#02569b'}, {
        name: 'C#', icon: 'csharp', color: '#239120'
    }, {name: 'C++', icon: 'cpp', color: '#00599c'}, {name: 'HTML5', icon: 'html', color: '#e34f26'}, {
        name: 'CSS3', icon: 'css', color: '#2965f1'
    },],
    databases: [{name: 'MySQL', icon: 'mysql', color: '#4479a1'}, {
        name: 'MariaDB', icon: 'mariadb', color: '#00526a'
    }, {name: 'SQL Server', icon: 'sqlserver', color: '#cc2927'}, {
        name: 'MongoDB', icon: 'mongodb', color: '#47a248'
    },],
    frameworks: [{name: 'Vue', icon: 'vue', color: '#42b883'}, {
        name: 'React', icon: 'react', color: '#61dafb'
    }, {name: 'Tailwind', icon: 'headlessui', color: '#66e3ff'}],
    tools: [{name: 'GitHub', icon: 'github', color: '#ffffff'}, {
        name: 'Git', icon: 'git', color: '#f05032'
    }, {name: 'Linux', icon: 'linux', color: '#fcc624'}, {
        name: 'Azure', icon: 'azure', color: '#0078d4'
    }, {name: 'Android Studio', icon: 'androidstudio', color: '#3ddc84'}, {
        name: 'Figma', icon: 'figma', color: '#a259ff'
    }, {name: 'WebStorm', icon: 'webstorm', color: '#00cdd7'}, {
        name: 'VS Code', icon: 'vscode', color: '#007acc'
    }, {name: 'Visual Studio', icon: 'visualstudio', color: '#5c2d91'}, {
        name: 'Rider', icon: 'rider', color: '#781919'
    },],
    others: [{
        name: 'Scrum', icon: 'simple-icons:scrumalliance', iconType: 'iconify', color: '#f15a24'
    }, {
        name: 'User Stories', icon: 'mdi:clipboard-text-outline', iconType: 'iconify', color: '#4caf50'
    }, {name: 'Agile', icon: 'mdi:sync', iconType: 'iconify', color: '#2196f3'}],
    softskills: [{
        id: 'communication', icon: 'mdi:chat-processing-outline', iconType: 'iconify', color: '#00d2ff'
    }, {
        id: 'teamwork', icon: 'mdi:account-group-outline', iconType: 'iconify', color: '#ff9a9e'
    }, {
        id: 'problemSolving', icon: 'mdi:lightbulb-on-outline', iconType: 'iconify', color: '#f6d365'
    }, {id: 'adaptability', icon: 'mdi:cached', iconType: 'iconify', color: '#a1c4fd'}, {
        id: 'timeManagement', icon: 'mdi:clock-outline', iconType: 'iconify', color: '#d4fc79'
    }, {id: 'creativity', icon: 'mdi:palette-outline', iconType: 'iconify', color: '#84fab0'}]
};

export const CONTACT_DATA = [{
    id: 'email', icon: 'mdi:email-outline', value: 'jhosepjamil@gmail.com', href: 'mailto:jhosepjamil@gmail.com'
}, {
    id: 'location', icon: 'mdi:map-marker-outline', value: 'Lima, Perú', href: null
}, {
    id: 'phone', icon: 'mdi:phone-outline', value: '+51 978 777 386', href: 'tel:+51978777386',
}];

export const CONTACT_CONFIG = {
    FORMSPREE_ENDPOINT: import.meta.env.VITE_FORMSPREE_ENDPOINT,
};

export const EDUCATION_DATA = [
    {
        id: 'ubiobio-2025',
        year: '2025',
        date: '28/02/2025',
        title: 'Ciclo de Vida del Desarrollo de Software Seguro',
        institution: 'Universidad del BíoBío',
        location: 'Chile - Perú',
        type: 'university',
        status: 'completed',
        iconType: 'university',
        certificate: 'https://certificate.url/ubiobio',
        color: '#f97316'
    },
    {
        id: 'mongodb-udemy-2024',
        year: '2024',
        date: '08/11/2024',
        title: 'Curso: Guía completa MongoDB',
        institution: 'Udemy',
        type: 'course',
        status: 'completed',
        iconType: 'course',
        color: '#10b981'
    },
    {
        id: 'mongodb-intro-2024',
        year: '2024',
        date: '10/06/2024',
        title: 'Curso: Introduction to MongoDB',
        institution: 'learn.mongodb.com',
        type: 'course',
        status: 'completed',
        iconType: 'course',
        color: '#10b981'
    },
    {
        id: 'scrum-2024',
        year: '2024',
        date: '29/04/2024',
        title: 'Curso: Scrum Fundamentals Certified',
        institution: 'SCRUMstudy',
        type: 'certification',
        status: 'completed',
        iconType: 'certificate',
        color: '#3b82f6'
    },
    {
        id: 'upc-2023',
        year: '2023',
        date: '13/03/2023',
        title: 'Ingeniería de Software',
        institution: 'Universidad Peruana de Ciencias Aplicadas',
        location: 'Lima, Perú',
        type: 'university',
        status: 'ongoing',
        iconType: 'university',
        color: '#8b5cf6',
        endDate: 'Actualidad'
    },
    {
        id: 'hacking-2022',
        year: '2022',
        date: '14/08/2022',
        title: 'Curso: Hacking Ético',
        institution: 'Escuela Americana de Innovación',
        type: 'course',
        status: 'completed',
        iconType: 'shield',
        color: '#ef4444'
    }
];