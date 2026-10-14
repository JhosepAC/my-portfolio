import {Icon} from '@iconify/react';
import fymImg from '../assets/projects/fym-800.webp';
import fymImgSmall from '../assets/projects/fym-480.webp';
import tmdbLogo from '../assets/projects/external_logos/tmdb_api.svg';
import skillshareLandingImg from '../assets/projects/thinkup-skillshare-landing_page-800.webp';
import skillshareLandingImgSmall from '../assets/projects/thinkup-skillshare-landing_page-480.webp';
import meetmeshImg from '../assets/projects/meet_mesh-800.webp';
import meetmeshImgSmall from '../assets/projects/meet_mesh-480.webp';
import facialRecognitionImg from '../assets/projects/facial_recognition-800.webp';
import facialRecognitionImgSmall from '../assets/projects/facial_recognition-480.webp';
import React from "react";

export const PROJECTS_DATA = [
    {
        id: 1,
        category: 'web',
        statusKey: 'in_development',
        title: 'SkillShare - Collaborative Learning Platform',
        image: skillshareLandingImg,
        imageSmall: skillshareLandingImgSmall,
        technologies: [
            {name: 'HTML5', icon: <Icon icon="simple-icons:html5"/>},
            {name: 'CSS3', icon: <Icon icon="simple-icons:css3"/>},
            {name: 'JavaScript', icon: <Icon icon="simple-icons:javascript"/>},
            {name: 'Git', icon: <Icon icon="simple-icons:git"/>},
            {name: 'Figma', icon: <Icon icon="simple-icons:figma"/>},
        ],
        github: 'https://github.com/ThinkUp-SkillShare/skillshare.github.io',
        live: 'https://thinkup-skillshare.github.io/skillshare.github.io/',
        labelTranslate: 'skillshare_landing'
    },
    {
        id: 2,
        category: 'web',
        statusKey: 'production',
        title: 'FyM - Find Your Movie',
        image: fymImg,
        imageSmall: fymImgSmall,
        technologies: [
            {name: 'Next.js', icon: <Icon icon="simple-icons:nextdotjs"/>},
            {name: 'React', icon: <Icon icon="simple-icons:react"/>},
            {name: 'TypeScript', icon: <Icon icon="simple-icons:typescript"/>},
            {name: 'Tailwind CSS', icon: <Icon icon="simple-icons:tailwindcss"/>},
            {
                name: 'TMDB API',
                icon: <img src={tmdbLogo} alt="TMDB" style={{width: '20px', height: '20px'}}/>
            },
            {name: 'Git', icon: <Icon icon="simple-icons:git"/>},
        ],
        github: 'https://github.com/JhosepAC/fym',
        live: 'https://fym-jac.vercel.app/',
        labelTranslate: 'fym'
    },
    {
        id: 3,
        category: 'web',
        statusKey: 'in_development',
        title: 'MeetMesh',
        image: meetmeshImg,
        imageSmall: meetmeshImgSmall,
        technologies: [
            {name: 'Next.js', icon: <Icon icon="simple-icons:nextdotjs"/>},
            {name: 'React', icon: <Icon icon="simple-icons:react"/>},
            {name: 'TypeScript', icon: <Icon icon="simple-icons:typescript"/>},
            {name: 'Tailwind CSS', icon: <Icon icon="simple-icons:tailwindcss"/>},
            {name: 'shadcn/ui', icon: <Icon icon="simple-icons:shadcnui"/>},
            {name: 'Supabase', icon: <Icon icon="simple-icons:supabase"/>},
            {name: 'Socket.IO', icon: <Icon icon="simple-icons:socketdotio"/>},
            {name: 'WebRTC', icon: <Icon icon="simple-icons:webrtc"/>},
            {name: 'WebGL', icon: <Icon icon="simple-icons:webgl"/>},
            {name: 'Git', icon: <Icon icon="simple-icons:git"/>},
        ],
        github: 'https://github.com/JhosepAC/videocall-app',
        live: 'https://meet-mesh.vercel.app',
        labelTranslate: 'meetmesh'
    },
    {
        id: 4,
        category: 'desktop',
        statusKey: 'in_development',
        title: 'BioVision Suite — Facial Biometric Platform',
        image: facialRecognitionImg,
        imageSmall: facialRecognitionImgSmall,
        technologies: [
            {name: 'Python', icon: <Icon icon="simple-icons:python"/>},
            {name: 'PySide6', icon: <Icon icon="simple-icons:qt"/>},
            {name: 'InsightFace', icon: <Icon icon="simple-icons:onnx"/>},
            {name: 'ONNX Runtime', icon: <Icon icon="simple-icons:onnx"/>},
            {name: 'OpenCV', icon: <Icon icon="simple-icons:opencv"/>},
            {name: 'FAISS', icon: <Icon icon="simple-icons:meta"/>},
            {name: 'SQLite', icon: <Icon icon="simple-icons:sqlite"/>},
            {name: 'SQLAlchemy', icon: <Icon icon="simple-icons:sqlalchemy"/>},
        ],
        github: 'https://github.com/JhosepAC/facial_recognition_suite',
        labelTranslate: 'biovision'
    }
];