import {Icon} from '@iconify/react';
// import ecoCropImg from '../assets/projects/green_sprout_innovations-ecocrop.png';
// import skillShareImg from '../assets/projects/thinkup-skillshare.png';
import fymImg from '../assets/projects/fym.png';
import tmdbLogo from '../assets/projects/external_logos/tmdb_api.svg';
import skillshareLandingImg from '../assets/projects/thinkup-skillshare-landing_page.webp';
import React from "react";

export const PROJECTS_DATA = [
// {
//     id: 1,
//     category: 'web',
//     statusKey: 'completed',
//     title: 'Green Sprout Innovations - EcoCrop',
//     image: ecoCropImg,
//     technologies: [
//         {name: 'HTML5', icon: <Icon icon="simple-icons:html5"/>, color: '#E34F26'},
//         {name: 'CSS3', icon: <Icon icon="simple-icons:css3"/>, color: '#2965F1'},
//         {name: 'JavaScript', icon: <Icon icon="simple-icons:javascript"/>, color: '#F7DF1E'},
//         {name: 'Git', icon: <Icon icon="simple-icons:git"/>, color: '#F05032'},],
//     github: 'https://github.com/GreenSprout-Innovations/greensprout-innovations.github.io',
//     live: 'https://greensprout-innovations.github.io/',
//     labelTranslate: 'ecocrop'
// },
// {
//     id: 2,
//     category: 'mobile',
//     statusKey: 'completed',
//     title: 'ThinkUp - SkillShare',
//     image: skillShareImg,
//     technologies: [
//         {name: 'Flutter', icon: <Icon icon="simple-icons:flutter"/>, color: '#02569B'}, {
//         name: 'Kotlin', icon: <Icon icon="simple-icons:kotlin"/>, color: '#0095D5'},
//         {name: 'C#', icon: <Icon icon="simple-icons:cplusplus"/>, color: '#239120'},
//         {name: 'Git', icon: <Icon icon="simple-icons:git"/>, color: '#F05032'},],
//     github: 'https://github.com/orgs/ThinkUp-SkillShare/repositories',
//     live: 'https://appdistribution.firebase.dev/i/2bb66c756dd609c3',
//     labelTranslate: 'skillshare'
// },
{
    id: 3,
    category: 'web',
    statusKey: 'maintenance',
    title: 'SkillShare - Collaborative Learning Platform',
    image: skillshareLandingImg,
    technologies: [
        {name: 'HTML5', icon: <Icon icon="simple-icons:html5"/>, color: '#E34F26'},
        {name: 'CSS3', icon: <Icon icon="simple-icons:css3"/>, color: '#2965F1'},
        {name: 'JavaScript', icon: <Icon icon="simple-icons:javascript"/>, color: '#F7DF1E'},
        {name: 'Git', icon: <Icon icon="simple-icons:git"/>, color: '#F05032'},
        {name: 'Figma', icon: <Icon icon="simple-icons:figma"/>, color: '#F24E1E'},
    ],
    github: 'https://github.com/ThinkUp-SkillShare/skillshare.github.io',
    live: 'https://thinkup-skillshare.github.io/skillshare.github.io/',
    labelTranslate: 'skillshare_landing'
},
{
    id:  4,
    category: 'web',
    statusKey: 'completed',
    title: 'FyM - Find Your Movie',
    image: fymImg,
    technologies: [
        {name: 'Next.js', icon: <Icon icon="simple-icons:nextdotjs"/>, color: '#000000'},
        {name: 'React', icon: <Icon icon="simple-icons:react"/>, color: '#0095D5'},
        {name: 'TypeScript', icon: <Icon icon="simple-icons:typescript"/>, color: '#239120'},
        {name: 'Tailwind CSS', icon: <Icon icon="simple-icons:tailwindcss"/>, color: '#38B2AC'},
        {
            name: 'TMDB API',
            icon: <img src={tmdbLogo} alt="TMDB" style={{ width: '20px', height: '20px' }} />,
            color: '#79caac'
        },
        {name: 'Git', icon: <Icon icon="simple-icons:git"/>, color: '#F05032'},
    ],
    github: 'https://github.com/JhosepAC/fym',
    live: 'https://fym-jac.vercel.app/',
    labelTranslate: 'fym'
}];