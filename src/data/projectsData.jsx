import {SiCplusplus, SiCss3, SiFlutter, SiGit, SiHtml5, SiJavascript, SiKotlin, SiVuedotjs} from 'react-icons/si';
import ecoCropImg from '../../assets/projects/green_sprout_innovations-ecocrop.png';
import skillShareImg from '../../assets/projects/thinkup-skillshare.png';
import bookifyImg from '../../assets/projects/bookify-livria.png';

export const PROJECTS_DATA = [{
    id: 1,
    title: 'Green Sprout Innovations - EcoCrop',
    description: 'Landing page que presenta y comunica las funcionalidades, objetivos y beneficios de EcoCrop como solución digital para el control de plagas y la agricultura sostenible.',
    image: ecoCropImg,
    technologies: [
        {name: 'HTML5', icon: <SiHtml5/>, color: '#E34F26'},
        {name: 'CSS3', icon: <SiCss3/>, color: '#2965F1'},
        {name: 'JavaScript', icon: <SiJavascript/>, color: '#F7DF1E'},
        {name: 'Git', icon: <SiGit/>, color: '#F05032'},],
    github: 'https://github.com/GreenSprout-Innovations/greensprout-innovations.github.io',
    live: 'https://greensprout-innovations.github.io/',
    status: ''
}, {
    id: 2,
    title: 'ThinkUp SkillShare',
    description: 'Aplicación de red social educativa que conecta estudiantes con intereses académicos similares, facilitando la creación de grupos de estudio, la colaboración en tiempo real y el intercambio de recursos para potenciar el aprendizaje colaborativo.',
    image: skillShareImg,
    technologies: [
        {name: 'Flutter', icon: <SiFlutter/>, color: '#02569B'}, {
        name: 'Kotlin', icon: <SiKotlin/>, color: '#0095D5'},
        {name: 'C#', icon: <SiCplusplus/>, color: '#239120'},
        {name: 'Git', icon: <SiGit/>, color: '#F05032'},],
    github: 'https://github.com/orgs/ThinkUp-SkillShare/repositories',
    live: 'https://appdistribution.firebase.dev/i/2bb66c756dd609c3',
    status: ''
}, {
    id: 3,
    title: 'Bookify - Livria',
    description: 'Tienda digital de libros que permite comprar ejemplares físicos, ebooks y audiolibros, integrando una comunidad de lectores donde los usuarios pueden interactuar, chatear y compartir recomendaciones.',
    image: bookifyImg,
    technologies: [
        {name: 'Vue.js', icon: <SiVuedotjs/>, color: '#4FC08D'}, {
        name: 'C#', icon: <SiCplusplus/>, color: '#239120'},
        {name: 'Git', icon: <SiGit/>, color: '#F05032'},],
    github: 'https://github.com/Bookify-Livria/livria-web-app',
    live: 'https://livria.netlify.app/',
    status: ''
}];