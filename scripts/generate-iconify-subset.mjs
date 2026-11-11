import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep this list in sync with the icon names used by the app. Generating a
// local subset avoids requesting the Iconify API at runtime.
const ICONS = {
  devicon: [
    'androidstudio', 'azure', 'csharp', 'css3', 'figma', 'firebase', 'flutter',
    'git', 'github', 'html5', 'java', 'javascript', 'mariadb',
    'microsoftsqlserver', 'mongodb', 'mysql', 'nextjs', 'nodejs', 'python',
    'react', 'supabase', 'tailwindcss', 'typescript', 'vuejs',
  ],
  'simple-icons': [
    'css3', 'figma', 'git', 'github', 'html5', 'javascript', 'meta', 'nextdotjs',
    'onnx', 'opencv', 'python', 'qt', 'react', 'rust', 'scrumalliance',
    'shadcnui', 'socketdotio', 'sqlalchemy', 'sqlite', 'supabase', 'tailwindcss',
    'tauri', 'typescript', 'webrtc', 'webgl',
  ],
  mdi: [
    'account-group-outline', 'cached', 'chat-processing-outline', 'check',
    'clipboard-text-outline', 'clock-outline', 'content-copy', 'download',
    'email-outline', 'lightbulb-on-outline', 'linux', 'map-marker-outline',
    'open-in-new', 'palette-outline', 'phone-outline', 'sync',
  ],
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = {};

for (const [prefix, names] of Object.entries(ICONS)) {
  const source = JSON.parse(
    await readFile(resolve(root, `node_modules/@iconify-json/${prefix}/icons.json`), 'utf8'),
  );
  const icons = {};

  for (const name of names) {
    const icon = source.icons[name];
    if (!icon) throw new Error(`Missing icon ${prefix}:${name}`);
    icons[name] = icon;
  }

  output[prefix] = {
    width: source.width,
    height: source.height,
    icons,
  };
}

const target = resolve(root, 'src/assets/icons/iconify-subset.json');
await mkdir(dirname(target), { recursive: true });
await writeFile(target, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${target}`);
