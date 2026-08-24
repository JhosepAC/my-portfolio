import React from 'react';
import {Icon} from '@iconify/react';

const ICONIFY_MAP = {
    css: 'devicon:css3',
    javascript: 'devicon:javascript',
    typescript: 'devicon:typescript',
    flutter: 'devicon:flutter',
    python: 'devicon:python',
    csharp: 'devicon:csharp',
    java: 'devicon:java',
    mysql: 'devicon:mysql',
    mariadb: 'devicon:mariadb',
    sqlserver: 'devicon:microsoftsqlserver',
    azure: 'devicon:azure',
    vue: 'devicon:vuejs',
    nextjs: 'devicon:nextjs',
    nodejs: 'devicon:nodejs',
    github: 'devicon:github',
    figma: 'devicon:figma',
    headlessui: 'devicon:tailwindcss',
    linux: 'devicon:linux',
    mongodb: 'devicon:mongodb',
    androidstudio: 'devicon:androidstudio',
    react: 'devicon:react',
    html: 'devicon:html5',
    git: 'devicon:git',
    supabase: 'devicon:supabase',
    firebase: 'devicon:firebase'
};

const SkillIcon = ({name, iconType}) => {
    const iconStyle = {fontSize: '2.5rem', lineHeight: 1};

    const iconId = iconType === 'iconify' ? name : ICONIFY_MAP[name] || 'devicon:devicon';

    return <Icon icon={iconId} className="skill-icon" style={iconStyle}/>;
};

export default SkillIcon;