import iconSets from '../../assets/icons/iconify-subset.json';

/**
 * Minimal local Iconify renderer. The icon bodies are generated from the
 * @iconify-json packages by scripts/generate-iconify-subset.mjs, so rendering
 * never depends on a runtime request to api.iconify.design.
 */
export default function Icon({ icon, width, height, className, style, ...props }) {
    const separator = icon?.indexOf(':') ?? -1;
    const prefix = separator > 0 ? icon.slice(0, separator) : '';
    const name = separator > 0 ? icon.slice(separator + 1) : icon;
    const set = iconSets[prefix];
    const data = set?.icons?.[name];
    const label = props['aria-label'];

    if (!data) {
        return <span className={className} style={style} aria-hidden="true" />;
    }

    return (
        <span
            {...props}
            className={className}
            style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1, ...style }}
            role={label ? 'img' : undefined}
            aria-hidden={label ? undefined : true}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width ?? '1em'}
                height={height ?? width ?? '1em'}
                viewBox={`0 0 ${set.width} ${set.height}`}
                focusable="false"
                dangerouslySetInnerHTML={{ __html: data.body }}
            />
        </span>
    );
}
