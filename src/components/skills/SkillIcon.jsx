import React from 'react';
import {Icon} from '@iconify/react';

const ICONIFY_MAP = {
    css: 'devicon:css3-plain',
    javascript: 'devicon:javascript-plain',
    flutter: 'devicon:flutter-plain',
    python: 'devicon:python-plain',
    csharp: 'devicon:csharp-plain',
    java: 'devicon:java-plain',
    mysql: 'devicon:mysql-plain',
    mariadb: 'devicon:mariadb-plain',
    sqlserver: 'devicon:microsoftsqlserver-plain',
    azure: 'devicon:azure-plain',
    vue: 'devicon:vuejs-plain',
    github: 'devicon:github-original',
    figma: 'devicon:figma-plain',
    headlessui: 'devicon:tailwindcss-plain',
    linux: 'devicon:linux-plain',
    mongodb: 'devicon:mongodb-plain',
    androidstudio: 'devicon:androidstudio-plain',
    react: 'devicon:react-plain',
    html: 'devicon:html5-plain',
    git: 'devicon:git-plain'
};

const SkillIcon = ({name, color, iconType}) => {
    const iconStyle = {color, fontSize: '2.5rem', lineHeight: 1};

    const iconId = iconType === 'iconify' ? name : ICONIFY_MAP[name] || 'devicon:devicon-plain';

    return <Icon icon={iconId} className="skill-icon" style={iconStyle}/>;
};

export default SkillIcon;