import React from 'react';
import {Icon} from '@iconify/react';

const ICONIFY_MAP = {
    css: 'devicon:css3',
    javascript: 'devicon:javascript',
    flutter: 'devicon:flutter',
    python: 'devicon:python',
    csharp: 'devicon:csharp',
    java: 'devicon:java',
    mysql: 'devicon:mysql',
    mariadb: 'devicon:mariadb',
    sqlserver: 'devicon:microsoftsqlserver',
    azure: 'devicon:azure',
    vue: 'devicon:vuejs',
    github: 'devicon:github',
    figma: 'devicon:figma',
    headlessui: 'devicon:tailwindcss',
    linux: 'devicon:linux',
    mongodb: 'devicon:mongodb',
    androidstudio: 'devicon:androidstudio',
    react: 'devicon:react',
    html: 'devicon:html5',
    git: 'devicon:git'
};

const SkillIcon = ({name, color, iconType}) => {
    const iconStyle = {color, fontSize: '2.5rem', lineHeight: 1};

    const iconId = iconType === 'iconify' ? name : ICONIFY_MAP[name] || 'devicon:devicon';

    return <Icon icon={iconId} className="skill-icon" style={iconStyle}/>;
};

export default SkillIcon;