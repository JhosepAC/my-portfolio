import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/Terminal.css';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PROMPT = 'visitor@portfolio:~$';

const PROMPT_HTML = '<span class="term-user">visitor</span><span class="term-at">@</span><span class="term-host">portfolio</span>:<span class="term-path">~</span>$';

const escapeHtml = (str) =>
    str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

const formatOutput = (text) => {
    if (!text) return '';
    let html = escapeHtml(text);
    html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="term-url">$1</a>');
    return html;
};

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

const COMMAND_LIST = [
    'whoami', 'status', 'about', 'age', 'pwd', 'ls', 'skills', 'projects',
    'education', 'experience', 'contact', 'social', 'repo', 'version',
    'uptime', 'uname', 'banner', 'sudo', 'date', 'echo', 'help', 'clear', 'cls', 'exit', 'history',
];

const Terminal = () => {
    const bodyRef = useRef(null);
    const cmdHistory = useRef([]);
    const historyIndex = useRef(-1);
    const booted = useRef(false);
    const startTime = useRef(0);
    const { t } = useTranslation();

    const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scrollToBottom = (smooth = false) => {
        const body = bodyRef.current;
        if (!body) return;
        if (smooth && !isReducedMotion()) {
            body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
        } else {
            body.scrollTop = body.scrollHeight;
        }
    };

    // desplazamiento ligero mientras escribe — solo si está cerca del fondo
    const nudgeScroll = () => {
        const body = bodyRef.current;
        if (!body) return;
        const nearBottom = body.scrollHeight - body.scrollTop - body.clientHeight < 40;
        if (nearBottom) scrollToBottom(true);
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

        if (baseCmd === 'history') {
            if (cmdHistory.current.length === 0) return 'No hay historial aún.';
            return cmdHistory.current.map((c, i) => `${String(i + 1).padStart(2, ' ')}  ${c}`).join('\n');
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
            experience: t('terminal.experience'),
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

        // Delegación para enlaces: abre en otra pestaña aunque el estilo sea minimalista
        const handleLinkClick = (e) => {
            const anchor = e.target.closest('a.term-url');
            if (anchor) {
                e.preventDefault();
                window.open(anchor.href, '_blank', 'noopener,noreferrer');
            }
        };
        body.addEventListener('click', handleLinkClick);

        const runBoot = async () => {
            const loadingDiv = document.createElement('div');
            loadingDiv.style.color = '#7a8a88';
            body.appendChild(loadingDiv);

            const connectMsg = t('terminal.loading.connecting');
            loadingDiv.innerHTML = `${connectMsg} <a href="https://jhosep-ac.pages.dev/" target="_blank" rel="noopener noreferrer" class="term-url">https://jhosep-ac.pages.dev/</a>...<br>`;
            scrollToBottom();
            await delay(600);
            loadingDiv.innerHTML += `<span class="term-muted">${t('terminal.loading.tunnel')}</span><br>`;
            scrollToBottom(true);
            await delay(600);
            loadingDiv.innerHTML += `<span class="term-muted">${t('terminal.loading.installing')}</span><br><br>`;
            scrollToBottom(true);
            await delay(400);

            const progressContainer = document.createElement('div');
            progressContainer.style.color = '#d6c7a8';
            loadingDiv.appendChild(progressContainer);

            const stages = [
                { bar: '\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 10%', time: 350 },
                { bar: '\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591 30%', time: 450 },
                { bar: '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591 70%', time: 550 },
                { bar: '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 100%', time: 300 },
            ];

            for (const stage of stages) {
                progressContainer.textContent = stage.bar;
                nudgeScroll();
                await delay(stage.time);
            }

            const successMsg = document.createElement('div');
            successMsg.className = 'terminal-success';
            successMsg.style.marginTop = '10px';
            successMsg.textContent = t('terminal.success');
            loadingDiv.appendChild(successMsg);
            scrollToBottom(true);

            await delay(900);
            body.innerHTML = '';

            const header = document.createElement('div');
            header.style.color = '#7a8a88';
            header.style.marginBottom = '20px';
            header.style.fontSize = '13px';
            header.innerHTML = [
                `<span class="term-accent">${t('terminal.header.shell')}</span>`,
                `${t('terminal.header.env')} <a href="https://jhosep-ac.pages.dev/" target="_blank" rel="noopener noreferrer" class="term-url">https://jhosep-ac.pages.dev/</a>`,
                `<span class="term-muted">${t('terminal.header.tagline')}</span>`,
                '',
                `<span class="term-muted">${t('terminal.header.starting')}</span>`,
            ].join('<br>');
            body.appendChild(header);

            const historyContainer = document.createElement('div');
            historyContainer.id = 'terminal-history';
            historyContainer.style.display = 'flex';
            historyContainer.style.flexDirection = 'column';
            body.appendChild(historyContainer);

            await typeCommand('whoami', historyContainer);
            await typeCommand('status', historyContainer);

            const hint = document.createElement('div');
            hint.style.color = '#7a8a88';
            hint.style.fontSize = '13px';
            hint.style.marginBottom = '14px';
            hint.style.marginTop = '6px';
            hint.innerHTML = `Type <span class="term-key">help</span> to see all available commands — <span class="term-muted">Tab</span> autocompleta, <span class="term-muted">↑/↓</span> historial`;
            historyContainer.appendChild(hint);
            scrollToBottom(true);
            await delay(600);

            const activeRow = document.createElement('div');
            activeRow.id = 'terminal-active-row';
            activeRow.style.display = 'flex';
            activeRow.style.alignItems = 'center';
            activeRow.style.marginTop = '12px';
            activeRow.innerHTML = `
                <span class="terminal-prompt">${PROMPT_HTML}</span>
                <input type="text" id="terminal-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Terminal input"/>
            `;
            body.appendChild(activeRow);
            scrollToBottom(true);

            const terminalInput = document.getElementById('terminal-input');
            terminalInput?.focus({ preventScroll: true });

            // Desplazamiento ligero al escribir: cada input nudge suave
            const handleInput = () => nudgeScroll();
            terminalInput?.addEventListener('input', handleInput);

            const handleKeyDown = (e) => {
                // Ctrl+L / Cmd+L → clear
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
                    e.preventDefault();
                    historyContainer.innerHTML = '';
                    scrollToBottom();
                    return;
                }
                // Ctrl+C / Esc → cancela línea actual
                if ((e.ctrlKey && e.key.toLowerCase() === 'c') || e.key === 'Escape') {
                    terminalInput.value = '';
                    historyIndex.current = cmdHistory.current.length;
                    e.preventDefault();
                    return;
                }
                // Tab → autocompletar
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const current = terminalInput.value.trim().toLowerCase();
                    if (!current) return;
                    const matches = COMMAND_LIST.filter((c) => c.startsWith(current));
                    if (matches.length === 1) {
                        terminalInput.value = matches[0] + ' ';
                    } else if (matches.length > 1) {
                        const line = document.createElement('div');
                        line.className = 'terminal-line';
                        line.style.marginBottom = '10px';
                        const out = document.createElement('div');
                        out.className = 'terminal-output';
                        out.innerHTML = `<span class="term-muted">${matches.join('  ')}</span>`;
                        line.appendChild(out);
                        historyContainer.appendChild(line);
                        scrollToBottom(true);
                    }
                    return;
                }

                if (e.key === 'Enter') {
                    const rawInput = terminalInput.value;
                    const cleanInput = rawInput.trim();

                    if (cleanInput !== '') {
                        if (cmdHistory.current.length >= 80) cmdHistory.current.shift();
                        cmdHistory.current.push(rawInput);
                        historyIndex.current = cmdHistory.current.length;
                        executeCommand(cleanInput, rawInput, historyContainer);
                    } else {
                        const line = document.createElement('div');
                        line.className = 'terminal-line';
                        line.style.marginBottom = '14px';
                        const emptyRow = document.createElement('div');
                        emptyRow.style.display = 'flex';
                        emptyRow.style.alignItems = 'center';
                        const pSpan = document.createElement('span');
                        pSpan.className = 'terminal-prompt';
                        pSpan.innerHTML = PROMPT_HTML;
                        emptyRow.appendChild(pSpan);
                        line.appendChild(emptyRow);
                        historyContainer.appendChild(line);
                    }

                    terminalInput.value = '';
                    scrollToBottom(true);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (cmdHistory.current.length === 0) return;
                    if (historyIndex.current === -1) {
                        historyIndex.current = cmdHistory.current.length - 1;
                    } else if (historyIndex.current > 0) {
                        historyIndex.current--;
                    }
                    terminalInput.value = cmdHistory.current[historyIndex.current] ?? '';
                    requestAnimationFrame(() => {
                        terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                    });
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex.current === -1) return;
                    if (historyIndex.current < cmdHistory.current.length - 1) {
                        historyIndex.current++;
                        terminalInput.value = cmdHistory.current[historyIndex.current];
                    } else {
                        historyIndex.current = cmdHistory.current.length;
                        terminalInput.value = '';
                    }
                }
            };

            terminalInput?.addEventListener('keydown', handleKeyDown);
        };

        const typeCommand = async (cmd, container) => {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.style.marginBottom = '14px';

            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';

            const promptSpan = document.createElement('span');
            promptSpan.className = 'terminal-prompt';
            promptSpan.innerHTML = PROMPT_HTML;

            const cmdSpan = document.createElement('span');
            cmdSpan.className = 'terminal-cmd';

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
                nudgeScroll();
                await delay(50 + Math.random() * 40);
            }

            await delay(300);
            cursor.remove();

            const output = document.createElement('div');
            output.className = 'terminal-output';
            output.innerHTML = formatOutput(getCommandOutput(cmd, ''));
            line.appendChild(output);
            scrollToBottom(true);
            await delay(800);
        };

        const executeCommand = (input, rawInput, container) => {
            const parts = input.split(' ');
            const baseCmd = parts[0].toLowerCase();
            const args = parts.slice(1).join(' ');

            if (baseCmd === 'cls' || baseCmd === 'clear') {
                container.innerHTML = '';
                scrollToBottom();
                return;
            }

            const outputText = getCommandOutput(baseCmd, args);

            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.style.marginBottom = '14px';

            const promptRow = document.createElement('div');
            promptRow.style.display = 'flex';
            promptRow.style.alignItems = 'center';

            const pSpan = document.createElement('span');
            pSpan.className = 'terminal-prompt';
            pSpan.innerHTML = PROMPT_HTML;

            const cmdSpan = document.createElement('span');
            cmdSpan.className = 'terminal-cmd';
            cmdSpan.textContent = rawInput;

            promptRow.appendChild(pSpan);
            promptRow.appendChild(cmdSpan);
            line.appendChild(promptRow);

            if (outputText !== null && outputText !== undefined) {
                const outputDiv = document.createElement('div');
                outputDiv.className = 'terminal-output';
                outputDiv.innerHTML = formatOutput(outputText);
                line.appendChild(outputDiv);

                if (baseCmd === 'exit') {
                    const activeRow = document.getElementById('terminal-active-row');
                    if (activeRow) activeRow.style.display = 'none';
                }
            } else {
                const outputDiv = document.createElement('div');
                outputDiv.className = 'terminal-output terminal-error';
                outputDiv.innerHTML = formatOutput(t('terminal.unknown', { cmd: baseCmd }));
                line.appendChild(outputDiv);
            }

            container.appendChild(line);
            scrollToBottom(true);
        };

        runBoot();

        return () => {
            body.removeEventListener('click', handleLinkClick);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleContainerClick = (e) => {
        // No robar el click si es un enlace — debe abrir en otra pestaña
        if (e.target.closest('a.term-url')) return;
        const input = document.getElementById('terminal-input');
        input?.focus();
    };

    return (
        <div className="terminal-container" onClick={handleContainerClick}>
            <div className="terminal-header">
                <div className="window-buttons" aria-hidden="true">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <span className="terminal-title">jhosep@portfolio:~</span>
            </div>
            <div className="terminal-body" ref={bodyRef} role="log" aria-live="polite" aria-label="Terminal"></div>
        </div>
    );
};

export default Terminal;
