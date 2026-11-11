import Icon from '../components/common/Icon';
import fymImg from '../assets/projects/fym/fym-800.webp';
import fymImgSmall from '../assets/projects/fym/fym-480.webp';
import fymImgSmaller from '../assets/projects/fym/fym-360.webp';
import fymImgLarge from '../assets/projects/fym/fym-1600.webp';
import tmdbLogo from '../assets/projects/external_logos/tmdb_api.svg';
import meetmeshImg from '../assets/projects/meetmesh/meetmesh-800.webp';
import meetmeshImgSmall from '../assets/projects/meetmesh/meetmesh-480.webp';
import meetmeshImgSmaller from '../assets/projects/meetmesh/meetmesh-360.webp';
import meetmeshImgLarge from '../assets/projects/meetmesh/meetmesh-1600.webp';
import biovisionImg from '../assets/projects/facial_recognition/biovision-800.webp';
import biovisionImgSmall from '../assets/projects/facial_recognition/biovision-480.webp';
import biovisionImgSmaller from '../assets/projects/facial_recognition/biovision-360.webp';
import biovisionImgLarge from '../assets/projects/facial_recognition/biovision-1600.webp';
import faceScanDashboard from '../assets/projects/facial_recognition/FaceScan-Dashboard.png';
import faceScanComparator from '../assets/projects/facial_recognition/FaceScan-Comparator.png';
import faceScanSearch from '../assets/projects/facial_recognition/FaceScan-Search.png';
import faceScanPersons from '../assets/projects/facial_recognition/FaceScan-Persons.png';
import faceScanWebcam from '../assets/projects/facial_recognition/FaceScan-WebCam.png';
import faceScanVideos from '../assets/projects/facial_recognition/FaceScan-Videos.png';
import faceScanStatistics from '../assets/projects/facial_recognition/FaceScan-Statistics.png';
import faceScanAdministration from '../assets/projects/facial_recognition/FaceScan-Administration.png';
import React from "react";

import gitPilotHome from '../assets/projects/gitpilot/inicio.webp';
import gitPilotIdentities from '../assets/projects/gitpilot/identidades.webp';
import gitPilotIdentitiesSmall from '../assets/projects/gitpilot/identidades-480.webp';
import gitPilotIdentitiesSmaller from '../assets/projects/gitpilot/identidades-360.webp';
import gitPilotSettings from '../assets/projects/gitpilot/configuracion.webp';
import gitPilotImport from '../assets/projects/gitpilot/importacion.webp';
import jotiImg from '../assets/projects/joti/joti-800.webp';
import jotiImgSmall from '../assets/projects/joti/joti-480.webp';
import jotiImgSmaller from '../assets/projects/joti/joti-360.webp';
import jotiLists from '../assets/projects/joti/lists.webp';
import jotiPages from '../assets/projects/joti/pages.webp';
import jotiNotes from '../assets/projects/joti/notes.webp';
import jotiCalendar from '../assets/projects/joti/calendar.webp';

export const PROJECTS_DATA = [
    {
        id: 6,
        slug: 'joti',
        name: 'Joti',
        title: 'Joti',
        image: jotiImg,
        imageSmall: jotiImgSmall,
        imageSmaller: jotiImgSmaller,
        imageLarge: jotiLists,
        imageWidth: 800,
        imageHeight: 638,
        imageLargeWidth: 1108,
        imageLargeHeight: 884,
        metadata: { type: 'web', year: '2026' },
        category: 'web',
        statusKey: 'in_development',
        gallery: [
            { src: jotiLists, width: 1108, height: 884, altKey: 'caseStudy.jotilistsAlt', captionKey: 'caseStudy.jotilistsCaption' },
            { src: jotiPages, width: 1108, height: 884, altKey: 'caseStudy.jotipagesAlt', captionKey: 'caseStudy.jotipagesCaption' },
            { src: jotiNotes, width: 1108, height: 884, altKey: 'caseStudy.jotinotesAlt', captionKey: 'caseStudy.jotinotesCaption' },
            { src: jotiCalendar, width: 1108, height: 884, altKey: 'caseStudy.joticalendarAlt', captionKey: 'caseStudy.joticalendarCaption' },
        ],
        technologies: [
            {name: 'Next.js', icon: <Icon icon="simple-icons:nextdotjs"/>},
            {name: 'React', icon: <Icon icon="simple-icons:react"/>},
            {name: 'TypeScript', icon: <Icon icon="simple-icons:typescript"/>},
            {name: 'Tailwind CSS', icon: <Icon icon="simple-icons:tailwindcss"/>},
            {name: 'Convex', icon: <Icon icon="mdi:sync"/>},
            {name: 'Tiptap', icon: <Icon icon="mdi:clipboard-text-outline"/>},
            {name: 'Sharp', icon: <Icon icon="mdi:palette-outline"/>},
            {name: 'Turborepo', icon: <Icon icon="mdi:cached"/>},
        ],
        github: 'https://github.com/JhosepAC/joti',
        labelTranslate: 'joti'
    },
    {
        id: 5,
        slug: 'gitpilot',
        name: 'GitPilot',
        title: 'GitPilot',
        image: gitPilotIdentities,
        imageSmall: gitPilotIdentitiesSmall,
        imageSmaller: gitPilotIdentitiesSmaller,
        imageWidth: 900,
        imageHeight: 600,
        metadata: { type: 'desktop', year: '2026' },
        category: 'desktop',
        statusKey: 'in_development',
        gallery: [
            { src: gitPilotHome, width: 900, height: 600, altKey: 'caseStudy.gitPilotHomeAlt', captionKey: 'caseStudy.gitPilotHomeCaption' },
            { src: gitPilotIdentities, width: 900, height: 600, altKey: 'caseStudy.gitPilotIdentitiesAlt', captionKey: 'caseStudy.gitPilotIdentitiesCaption' },
            { src: gitPilotSettings, width: 900, height: 600, altKey: 'caseStudy.gitPilotSettingsAlt', captionKey: 'caseStudy.gitPilotSettingsCaption' },
            { src: gitPilotImport, width: 900, height: 600, altKey: 'caseStudy.gitPilotImportAlt', captionKey: 'caseStudy.gitPilotImportCaption' },
        ],
        technologies: [
            {name: 'Rust', icon: <Icon icon="simple-icons:rust"/>},
            {name: 'Tauri', icon: <Icon icon="simple-icons:tauri"/>},
            {name: 'React', icon: <Icon icon="simple-icons:react"/>},
            {name: 'TypeScript', icon: <Icon icon="simple-icons:typescript"/>},
            {name: 'SQLite', icon: <Icon icon="simple-icons:sqlite"/>},
            {name: 'Git', icon: <Icon icon="simple-icons:git"/>},
        ],
        github: 'https://github.com/JhosepAC/gitpilot',
        release: 'https://github.com/JhosepAC/gitpilot/releases/tag/v1.0.0',
        labelTranslate: 'gitpilot'
    },
    {
        id: 4,
        slug: 'biovision-suite',
        name: 'BioVision Suite',
        imageWidth: 800,
        imageHeight: 462,
        metadata: { type: 'desktop' },
        gallery: [
            { src: faceScanDashboard, width: 1800, height: 1054, altKey: 'caseStudy.bioVisionDashboardAlt', captionKey: 'caseStudy.bioVisionDashboardCaption' },
            { src: faceScanComparator, width: 1792, height: 1035, altKey: 'caseStudy.bioVisionComparatorAlt', captionKey: 'caseStudy.bioVisionComparatorCaption' },
            { src: faceScanPersons, width: 1797, height: 1052, altKey: 'caseStudy.bioVisionPersonsAlt', captionKey: 'caseStudy.bioVisionPersonsCaption' },
            { src: faceScanSearch, width: 1786, height: 1057, altKey: 'caseStudy.bioVisionSearchAlt', captionKey: 'caseStudy.bioVisionSearchCaption' },
            { src: faceScanWebcam, width: 1784, height: 1050, altKey: 'caseStudy.bioVisionWebcamAlt', captionKey: 'caseStudy.bioVisionWebcamCaption' },
            { src: faceScanVideos, width: 1786, height: 1049, altKey: 'caseStudy.bioVisionVideosAlt', captionKey: 'caseStudy.bioVisionVideosCaption' },
            { src: faceScanStatistics, width: 1798, height: 1049, altKey: 'caseStudy.bioVisionStatisticsAlt', captionKey: 'caseStudy.bioVisionStatisticsCaption' },
            { src: faceScanAdministration, width: 1797, height: 1056, altKey: 'caseStudy.bioVisionAdministrationAlt', captionKey: 'caseStudy.bioVisionAdministrationCaption' },
        ],
        category: 'desktop',
        statusKey: 'in_development',
        title: 'BioVision Suite — Facial Biometric Platform',
        image: biovisionImg,
        imageSmall: biovisionImgSmall,
        imageSmaller: biovisionImgSmaller,
        imageLarge: biovisionImgLarge,
        imageLargeWidth: 1600,
        imageLargeHeight: 924,
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
    },
    {
        id: 3,
        slug: 'meetmesh',
        name: 'MeetMesh',
        imageWidth: 800,
        imageHeight: 439,
        metadata: { type: 'web' },
        gallery: [],
        category: 'web',
        statusKey: 'in_development',
        title: 'MeetMesh',
        image: meetmeshImg,
        imageSmall: meetmeshImgSmall,
        imageSmaller: meetmeshImgSmaller,
        imageLarge: meetmeshImgLarge,
        imageLargeWidth: 1600,
        imageLargeHeight: 878,
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
        id: 2,
        slug: 'fym',
        name: 'FyM',
        imageWidth: 800,
        imageHeight: 409,
        metadata: { type: 'web' },
        gallery: [],
        category: 'web',
        statusKey: 'production',
        title: 'FyM - Find Your Movie',
        image: fymImg,
        imageSmall: fymImgSmall,
        imageSmaller: fymImgSmaller,
        imageLarge: fymImgLarge,
        imageLargeWidth: 1600,
        imageLargeHeight: 818,
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
    }
];

// Presentation and case studies share these records. Editorial copy lives in i18n.
// Optional metadata: role, year, duration, collaboration. Only add confirmed facts.
// Gallery entries: { src, width, height, altKey, captionKey? } (translation keys).
export const getProjectBySlug = (slug) => PROJECTS_DATA.find(project => project.slug === slug);

const TECHNOLOGY_GROUPS = {
    interface: ['HTML5', 'CSS3', 'JavaScript', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PySide6', 'Tiptap'],
    native: ['Rust', 'Tauri'],
    realtime: ['Socket.IO', 'WebRTC', 'WebGL'],
    data: ['TMDB API', 'Supabase', 'SQLite', 'SQLAlchemy', 'Convex'],
    vision: ['Python', 'InsightFace', 'ONNX Runtime', 'OpenCV', 'FAISS'],
    tools: ['Git', 'Figma', 'Sharp', 'Turborepo'],
};

export const groupTechnologies = (technologies) => Object.entries(TECHNOLOGY_GROUPS)
    .map(([key, names]) => ({ key, items: technologies.filter(tech => names.includes(tech.name)) }))
    .concat({ key: 'other', items: technologies.filter(tech => !Object.values(TECHNOLOGY_GROUPS).flat().includes(tech.name)) })
    .filter(group => group.items.length);
