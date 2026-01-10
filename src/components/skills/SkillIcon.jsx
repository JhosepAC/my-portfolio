import React from 'react';
import {Icon} from '@iconify/react';

const DEVICON_MAP = {
    css: 'devicon-css3-plain',
    javascript: 'devicon-javascript-plain',
    flutter: 'devicon-flutter-plain',
    python: 'devicon-python-plain',
    csharp: 'devicon-csharp-plain',
    cpp: 'devicon-cplusplus-plain',
    java: 'devicon-java-plain',
    mysql: 'devicon-mysql-plain',
    mariadb: 'devicon-mariadb-plain',
    sqlserver: 'devicon-microsoftsqlserver-plain',
    azure: 'devicon-azure-plain',
    vue: 'devicon-vuejs-plain',
    github: 'devicon-github-original',
    figma: 'devicon-figma-plain',
    vscode: 'devicon-vscode-plain',
    visualstudio: 'devicon-visualstudio-plain',
    headlessui: 'devicon-tailwindcss-plain',
    linux: 'devicon-linux-plain',
    mongodb: 'devicon-mongodb-plain',
    webstorm: 'devicon-webstorm-plain',
    androidstudio: 'devicon-androidstudio-plain',
    react: 'devicon-react-plain',
    rider: 'devicon-rider-plain',
    html: 'devicon-html5-plain',
    git: 'devicon-git-plain'
};

const SkillIcon = ({name, color, iconType = 'devicon'}) => {
    const iconStyle = {color, fontSize: '2.5rem'};

    if (iconType === 'iconify') {
        return <Icon icon={name} className="skill-icon" style={iconStyle}/>;
    }

    const className = `${DEVICON_MAP[name] || 'devicon-devicon-plain'} skill-icon`;

    return <i className={className} style={iconStyle}/>;
};

export default SkillIcon;