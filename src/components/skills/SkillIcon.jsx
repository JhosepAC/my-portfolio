const SkillIcon = ({ name, color }) => {
    const iconClass = {
        css: 'devicon-css3-plain',
        javascript: 'devicon-javascript-plain',
        python: 'devicon-python-plain',
        c: 'devicon-c-plain',
        cpp: 'devicon-cplusplus-plain',
        java: 'devicon-java-plain',
        mysql: 'devicon-mysql-plain',
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
        html: 'devicon-html5-plain',
        git: 'devicon-git-plain'
    };

    return (
        <i
            className={`${iconClass[name] || 'devicon-devicon-plain'} skill-icon`}
            style={{ color: color }}
        ></i>
    );
};

export default SkillIcon;