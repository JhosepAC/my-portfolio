import {Icon} from '@iconify/react';
// import ecoCropImg from '../assets/projects/green_sprout_innovations-ecocrop.png';
// import skillShareImg from '../assets/projects/thinkup-skillshare.png';
import fymImg from '../assets/projects/fym.webp';
import tmdbLogo from '../assets/projects/external_logos/tmdb_api.svg';
import skillshareLandingImg from '../assets/projects/thinkup-skillshare-landing_page.webp';
import meetmeshImg from '../assets/projects/meet_mesh.webp';
import React from "react";

export const PROJECTS_DATA = [
// {
//     id: 1,
//     category: 'web',
//     statusKey: 'production',
//     title: 'Green Sprout Innovations - EcoCrop',
//     image: ecoCropImg,
//     technologies: [
//         {name: 'HTML5', icon: <Icon icon="simple-icons:html5"/>},
//         {name: 'CSS3', icon: <Icon icon="simple-icons:css3"/>},
//         {name: 'JavaScript', icon: <Icon icon="simple-icons:javascript"/>},
//         {name: 'Git', icon: <Icon icon="simple-icons:git"/>},],
//     github: 'https://github.com/GreenSprout-Innovations/greensprout-innovations.github.io',
//     live: 'https://greensprout-innovations.github.io/',
//     labelTranslate: 'ecocrop'
// },
// {
//     id: 2,
//     category: 'mobile',
//     statusKey: 'production',
//     title: 'ThinkUp - SkillShare',
//     image: skillShareImg,
//     technologies: [
//         {name: 'Flutter', icon: <Icon icon="simple-icons:flutter"/>}, {
//         name: 'Kotlin', icon: <Icon icon="simple-icons:kotlin"/>},
//         {name: 'C#', icon: <Icon icon="simple-icons:cplusplus"/>},
//         {name: 'Git', icon: <Icon icon="simple-icons:git"/>},],
//     github: 'https://github.com/orgs/ThinkUp-SkillShare/repositories',
//     live: 'https://appdistribution.firebase.dev/i/2bb66c756dd609c3',
//     labelTranslate: 'skillshare'
// },
{
    id: 3,
    category: 'web',
    statusKey: 'production',
    title: 'SkillShare - Collaborative Learning Platform',
    image: skillshareLandingImg,
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
    id:  4,
    category: 'web',
    statusKey: 'production',
    title: 'FyM - Find Your Movie',
    image: fymImg,
    technologies: [
        {name: 'Next.js', icon: <Icon icon="simple-icons:nextdotjs"/>},
        {name: 'React', icon: <Icon icon="simple-icons:react"/>},
        {name: 'TypeScript', icon: <Icon icon="simple-icons:typescript"/>},
        {name: 'Tailwind CSS', icon: <Icon icon="simple-icons:tailwindcss"/>},
        {
            name: 'TMDB API',
            icon: <img src={tmdbLogo} alt="TMDB" style={{ width: '20px', height: '20px' }} />
        },
        {name: 'Git', icon: <Icon icon="simple-icons:git"/>},
    ],
    github: 'https://github.com/JhosepAC/fym',
    live: 'https://fym-jac.vercel.app/',
    labelTranslate: 'fym'
},
    {
        id:  5,
        category: 'web',
        statusKey: 'in_development',
        title: 'MeetMesh',
        image: meetmeshImg,
        technologies: [
            { name: 'Next.js', icon: <Icon icon="simple-icons:nextdotjs"/> },
            { name: 'React', icon: <Icon icon="simple-icons:react"/> },
            { name: 'TypeScript', icon: <Icon icon="simple-icons:typescript"/> },
            { name: 'Tailwind CSS', icon: <Icon icon="simple-icons:tailwindcss"/> },
            { name: 'shadcn/ui', icon: <Icon icon="simple-icons:shadcnui"/> },
            { name: 'Supabase', icon: <Icon icon="simple-icons:supabase"/> },
            { name: 'Socket.IO', icon: <Icon icon="simple-icons:socketdotio"/> },
            { name: 'WebRTC', icon: <Icon icon="simple-icons:webrtc"/> },
            { name: 'WebGL', icon: <Icon icon="simple-icons:webgl"/> },
            { name: 'Git', icon: <Icon icon="simple-icons:git"/> },
        ],
        github: 'https://github.com/JhosepAC/videocall-app',
        live: 'https://meet-mesh.vercel.app',
        labelTranslate: 'meetmesh'
    }
];