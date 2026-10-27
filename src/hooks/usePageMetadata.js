import { useEffect } from 'react';

// Vite serves a client-rendered app. Keep existing head tags synchronized on navigation.
export function usePageMetadata({ title, description, image, imageWidth, imageHeight, imageAlt, language, noIndex = false }) {
    useEffect(() => {
        const originalTitle = document.title;
        const canonical = document.querySelector('link[rel="canonical"]');
        const originalCanonical = canonical?.href;
        const site = originalCanonical ? new URL(originalCanonical).origin : window.location.origin;
        const url = new URL(window.location.pathname, site).href;
        const restored = [];
        const setMeta = (attribute, name, value) => {
            if (!value) return;
            const selector = `meta[${attribute}="${name}"]`;
            let element = document.querySelector(selector);
            const existed = !!element;
            const original = element?.getAttribute('content');
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.append(element);
            }
            element.setAttribute('content', value);
            restored.push(() => existed ? element.setAttribute('content', original ?? '') : element.remove());
        };
        document.title = title;
        if (canonical) canonical.href = url;
        setMeta('name', 'description', description);
        setMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');
        setMeta('name', 'googlebot', noIndex ? 'noindex, follow' : 'index, follow');
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:url', url);
        if (language) setMeta('property', 'og:locale', language.startsWith('es') ? 'es_PE' : 'en_US');
        setMeta('name', 'twitter:url', url);
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description);
        if (image) {
            const imageUrl = new URL(image, site).href;
            setMeta('property', 'og:image', imageUrl);
            setMeta('property', 'og:image:secure_url', imageUrl);
            setMeta('property', 'og:image:width', imageWidth ? String(imageWidth) : undefined);
            setMeta('property', 'og:image:height', imageHeight ? String(imageHeight) : undefined);
            setMeta('property', 'og:image:alt', imageAlt);
            const extension = new URL(imageUrl).pathname.split('.').pop().toLowerCase();
            setMeta('property', 'og:image:type', { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', avif: 'image/avif' }[extension]);
            setMeta('name', 'twitter:image', imageUrl);
            setMeta('name', 'twitter:image:alt', imageAlt);
        }
        return () => {
            document.title = originalTitle;
            if (canonical) canonical.href = originalCanonical;
            restored.forEach(restore => restore());
        };
    }, [title, description, image, imageWidth, imageHeight, imageAlt, language, noIndex]);
}
