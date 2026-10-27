export const projectPath = (slug) => `/proyectos/${slug}`;

export function isExternalProjectUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return false;
    try {
        const url = new URL(value);
        return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password;
    } catch {
        return false;
    }
}
