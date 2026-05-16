import {
    SiCplusplus,
    SiCss3,
    SiFlutter,
    SiGit,
    SiHtml5,
    SiJavascript,
    SiKotlin,
    SiReact,
    SiVuedotjs,
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
} from 'react-icons/si';
import ecoCropImg from '../assets/projects/green_sprout_innovations-ecocrop.png';
import skillShareImg from '../assets/projects/thinkup-skillshare.png';
import bookifyImg from '../assets/projects/bookify-livria.png';
import fymImg from '../assets/projects/fym.png';
import tmdbLogo from '../assets/projects/external_logos/tmdb_api.svg';
import React from "react";

export const PROJECTS_DATA = [{
    id: 1,
    category: 'web',
    statusKey: 'production',
    title: 'Green Sprout Innovations - EcoCrop',
    image: ecoCropImg,
    technologies: [
        {name: 'HTML5', icon: <SiHtml5/>, color: '#E34F26'},
        {name: 'CSS3', icon: <SiCss3/>, color: '#2965F1'},
        {name: 'JavaScript', icon: <SiJavascript/>, color: '#F7DF1E'},
        {name: 'Git', icon: <SiGit/>, color: '#F05032'},],
    github: 'https://github.com/GreenSprout-Innovations/greensprout-innovations.github.io',
    live: 'https://greensprout-innovations.github.io/',
    labelTranslate: 'ecocrop'
}, {
    id: 2,
    category: 'mobile',
    statusKey: 'production',
    title: 'ThinkUp - SkillShare',
    image: skillShareImg,
    technologies: [
        {name: 'Flutter', icon: <SiFlutter/>, color: '#02569B'}, {
        name: 'Kotlin', icon: <SiKotlin/>, color: '#0095D5'},
        {name: 'C#', icon: <SiCplusplus/>, color: '#239120'},
        {name: 'Git', icon: <SiGit/>, color: '#F05032'},],
    github: 'https://github.com/orgs/ThinkUp-SkillShare/repositories',
    live: 'https://appdistribution.firebase.dev/i/2bb66c756dd609c3',
    labelTranslate: 'skillshare'
}, {
    id: 3,
    category: 'web',
    statusKey: 'active',
    title: 'Bookify - Livria',
    image: bookifyImg,
    technologies: [
        {name: 'Vue.js', icon: <SiVuedotjs/>, color: '#4FC08D'}, {
        name: 'C#', icon: <SiCplusplus/>, color: '#239120'},
        {name: 'Git', icon: <SiGit/>, color: '#F05032'},],
    github: 'https://github.com/Bookify-Livria/livria-web-app',
    live: 'https://livria.netlify.app/',
    labelTranslate: 'livria'
}, {
    id:  4,
    category: 'web',
    statusKey: 'production',
    title: 'FyM - Find Your Movie',
    image: fymImg,
    technologies: [
        {name: 'Next.js', icon: <SiNextdotjs/>, color: '#000000'},
        {name: 'React', icon: <SiReact/>, color: '#0095D5'},
        {name: 'TypeScript', icon: <SiTypescript/>, color: '#239120'},
        {name: 'Tailwind CSS', icon: <SiTailwindcss/>, color: '#38B2AC'},
        {
            name: 'TMDB API',
            icon: <img src={tmdbLogo} alt="TMDB" style={{ width: '20px', height: '20px' }} />,
            color: '#79caac'
        },
        {name: 'Git', icon: <SiGit/>, color: '#F05032'},
    ],
    github: 'https://github.com/JhosepAC/fym',
    live: 'https://fym-jac.vercel.app/',
    labelTranslate: 'fym'
}];