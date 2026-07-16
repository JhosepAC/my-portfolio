import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/Terminal.css';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PROMPT = 'visitor@portfolio:~$';

const HARD_CODED = {
    whoami: 'Jhosep Argomedo',
    age: '14/02/2006',
    pwd: '/home/visitor/portfolio',
    version: 'v2.5.0-release (beta)',
    repo: 'https://github.com/JhosepAC/my-portfolio',
    sudo: [
        'Nice try, but you do not have sudo privileges on this portfolio.',
        'This incident has been reported. \uD83D\uDC6E',
        '',
        'Hint: sudo is not available. This is a themed terminal.',
    ].join('\n'),
};

const Terminal = () => {
    const bodyRef = useRef(null);
    const cmdHistory = useRef([]);
    const historyIndex = useRef(-1);
    const booted = useRef(false);
    const startTime = useRef(0);
    const { t } = useTranslation();

    const scrollToBottom = () => {
        const body = bodyRef.current;
        if (body) body.scrollTop = body.scrollHeight;
    };

    const getCommandOutput = (baseCmd, args) => {
        if (HARD_CODED[baseCmd]) {
            return HARD_CODED[baseCmd];
        }

        if (baseCmd === 'date') {
            return new Date().toLocaleString('es-PE', { dateStyle: 'full', timeStyle: 'medium' });
        }

        if (baseCmd === 'echo') {
            return args || '';
        }

        if (baseCmd === 'uptime') {
            const diff = Date.now() - startTime.current;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const s = seconds % 60;
            const m = minutes % 60;
            const h = hours;
            const parts = [];
            if (h > 0) parts.push(`${h}h`);
            if (m > 0) parts.push(`${m}m`);
            parts.push(`${s}s`);
            return `Session uptime: ${parts.join(' ')}`;
        }

        const translatable = {
            status: t('hero.status'),
            about: t('terminal.about'),
            ls: t('terminal.ls'),
            skills: t('terminal.skills'),
            projects: t('terminal.projects'),
            education: t('terminal.education'),
            contact: t('terminal.contact'),
            social: t('terminal.social'),
            uname: t('terminal.uname'),
            banner: t('terminal.banner'),
            help: t('terminal.help'),
            exit: t('terminal.exit'),
        };

        if (translatable[baseCmd]) {
            return translatable[baseCmd];
        }

        return null;
    };

    useEffect(() => {
        if (booted.current) return;
        booted.current = true;
        startTime.current = Date.now();

        const body = bodyRef.current;
        if (!body) return;

        const runBoot = async () => {
            const loadingDiv = document.createElement('div');
            loadingDiv.style.color = '#8b949e';
            body.appendChild(loadingDiv);

            const connectMsg = t('terminal.loading.connecting');
            loadingDiv.innerHTML = `${connectMsg} <span style="color: #58a6ff;">https://jhosep-ac.pages.dev/</span>...<br>`;
            await delay(600);
            loadingDiv.innerHTML += `${t('terminal.loading.tunnel')}<br>`;
            await delay(600);
            loadingDiv.innerHTML += `${t('terminal.loading.installing')}<br><br>`;
            await delay(400);

            const progressContainer = document.createElement('div');
            progressContainer.style.color = '#58a6ff';
            loadingDiv.appendChild(progressContainer);

            const stages = [
                { bar: '\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 10%', time: 350 },
                { bar: '\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591 30%', time: 450 },
                { bar: '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591 70%', time: 550 },
                { bar: '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 100%', time: 300 },
            ];

            for (const stage of stages) {
                progressContainer.textContent = stage.bar;
                await delay(stage.time);
            }

            const successMsg = document.createElement('div');
            successMsg.style.color = '#27c93f';
            successMsg.style.marginTop = '10px';
            successMsg.textContent = t('terminal.success');
            loadingDiv.appendChild(successMsg);

            await delay(900);
            body.innerHTML = '';

            const header = document.createElement('div');
            header.style.color = '#8b949e';
            header.style.marginBottom = '20px';
            header.style.fontSize = '13px';
            header.innerHTML = [
                t('terminal.header.shell'),
                `${t('terminal.header.env')} <span style="color: #58a6ff;">https://jhosep-ac.pages.dev/</span>`,
                t('terminal.header.tagline'),
                '',
                t('terminal.header.starting'),
            ].join('<br>');
            body.appendChild(header);

            const historyContainer = document.createElement('div');
            historyContainer.style.display = 'flex';
            historyContainer.style.flexDirection = 'column';
            body.appendChild(historyContainer);

            await typeCommand('whoami', historyContainer);
            await typeCommand('status', historyContainer);

            const activeRow = document.createElement('div');
            activeRow.id = 'terminal-active-row';
            activeRow.style.display = 'flex';
            activeRow.style.alignItems = 'center';
            activeRow.style.marginTop = '12px';
            activeRow.innerHTML = `
                <span class="terminal-prompt">${PROMPT}</span>
                <input type="text" id="terminal-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            `;
            body.appendChild(activeRow);
            scrollToBottom();

            const terminalInput = document.getElementById('terminal-input');
            terminalInput?.focus();

            const handleKeyDown = (e) => {
                if (e.key === 'Enter') {
                    const rawInput = terminalInput.value;
                    const cleanInput = rawInput.trim();

                    if (cleanInput !== '') {
                        cmdHistory.current.push(rawInput);
                        historyIndex.current = cmdHistory.current.length;
                        executeCommand(cleanInput, rawInput, historyContainer);
                    } else {
                        const line = document.createElement('div');
                        line.style.marginBottom = '14px';
                        const emptyRow = document.createElement('div');
                        emptyRow.style.display = 'flex';
                        emptyRow.style.alignItems = 'center';
                        const pSpan = document.createElement('span');
                        pSpan.className = 'terminal-prompt';
                        pSpan.textContent = PROMPT;
                        emptyRow.appendChild(pSpan);
                        line.appendChild(emptyRow);
                        historyContainer.appendChild(line);
                    }

                    terminalInput.value = '';
                    scrollToBottom();
                } else if (e.key === 'ArrowUp') {
                    if (cmdHistory.current.length > 0 && historyIndex.current > 0) {
                        historyIndex.current--;
                        terminalInput.value = cmdHistory.current[historyIndex.current];
                        setTimeout(() => {
                            terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                        }, 0);
                    }
                    e.preventDefault();
                } else if (e.key === 'ArrowDown') {
                    if (historyIndex.current < cmdHistory.current.length - 1) {
                        historyIndex.current++;
                        terminalInput.value = cmdHistory.current[historyIndex.current];
                    } else {
                        historyIndex.current = cmdHistory.current.length;
                        terminalInput.value = '';
                    }
                    e.preventDefault();
                }
            };

            terminalInput?.addEventListener('keydown', handleKeyDown);
        };

        const typeCommand = async (cmd, container) => {
            const line = document.createElement('div');
            line.style.marginBottom = '14px';

            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';

            const promptSpan = document.createElement('span');
            promptSpan.className = 'terminal-prompt';
            promptSpan.textContent = PROMPT;

            const cmdSpan = document.createElement('span');
            cmdSpan.style.color = '#f0f6fc';
            cmdSpan.style.fontWeight = '500';

            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';

            row.appendChild(promptSpan);
            row.appendChild(cmdSpan);
            row.appendChild(cursor);
            line.appendChild(row);
            container.appendChild(line);
            scrollToBottom();

            await delay(400);

            for (const char of cmd) {
                cmdSpan.textContent += char;
                scrollToBottom();
                await delay(50 + Math.random() * 40);
            }

            await delay(300);
            cursor.remove();

            const output = document.createElement('div');
            output.className = 'terminal-output';
            output.textContent = getCommandOutput(cmd, '');
            line.appendChild(output);
            scrollToBottom();
            await delay(800);
        };

        const executeCommand = (input, rawInput, container) => {
            const parts = input.split(' ');
            const baseCmd = parts[0].toLowerCase();
            const args = parts.slice(1).join(' ');

            if (baseCmd === 'cls' || baseCmd === 'clear') {
                container.innerHTML = '';
                return;
            }

            const outputText = getCommandOutput(baseCmd, args);

            const line = document.createElement('div');
            line.style.marginBottom = '14px';

            const promptRow = document.createElement('div');
            promptRow.style.display = 'flex';
            promptRow.style.alignItems = 'center';

            const pSpan = document.createElement('span');
            pSpan.className = 'terminal-prompt';
            pSpan.textContent = PROMPT;

            const cmdSpan = document.createElement('span');
            cmdSpan.style.color = '#f0f6fc';
            cmdSpan.style.fontWeight = '500';
            cmdSpan.textContent = rawInput;

            promptRow.appendChild(pSpan);
            promptRow.appendChild(cmdSpan);
            line.appendChild(promptRow);

            if (outputText !== null && outputText !== undefined) {
                const outputDiv = document.createElement('div');
                outputDiv.className = 'terminal-output';
                outputDiv.textContent = outputText;
                line.appendChild(outputDiv);

                if (baseCmd === 'exit') {
                    const activeRow = document.getElementById('terminal-active-row');
                    if (activeRow) activeRow.style.display = 'none';
                }
            } else {
                const outputDiv = document.createElement('div');
                outputDiv.className = 'terminal-output';
                outputDiv.textContent = t('terminal.unknown', { cmd: baseCmd });
                line.appendChild(outputDiv);
            }

            container.appendChild(line);
        };

        runBoot();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleContainerClick = () => {
        const input = document.getElementById('terminal-input');
        input?.focus();
    };

    return (
        <div className="terminal-container" onClick={handleContainerClick}>
            <div className="terminal-header">
                <div className="window-buttons">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <span className="terminal-title">jhosep@portfolio:~</span>
            </div>
            <div className="terminal-body" ref={bodyRef}></div>
        </div>
    );
};

export default Terminal;
