import { watch, statSync } from 'fs';
import { execFile } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const N8N_DATA = process.env.N8N_USER_FOLDER || join(__dirname, '.n8n-data');
const EXPORT_SCRIPT = join(__dirname, 'export.mjs');

let debounce = null;
let lastExport = 0;
const MIN_INTERVAL = 5000;

function runExport() {
  const now = Date.now();
  if (now - lastExport < MIN_INTERVAL) return;
  lastExport = now;

  console.log(`[${new Date().toLocaleTimeString()}] Workflow change detected — exporting...`);
  execFile('node', [EXPORT_SCRIPT], (err, stdout, stderr) => {
    if (err) {
      console.error(`Export failed: ${stderr || err.message}`);
      return;
    }
    if (stdout.trim()) console.log(stdout.trim());
  });
}

function scheduleExport() {
  clearTimeout(debounce);
  debounce = setTimeout(runExport, 2000);
}

console.log('Watching n8n for workflow changes...');
console.log(`Database: ${N8N_DATA}/database.sqlite`);
console.log('Exports will auto-run when you save a workflow in the n8n UI.\n');

for (const file of ['database.sqlite', 'database.sqlite-wal']) {
  try {
    watch(join(N8N_DATA, file), scheduleExport);
  } catch {}
}

// Polling fallback — some OS/fs combos don't fire events for SQLite WAL writes
setInterval(() => {
  try {
    const { mtimeMs } = statSync(join(N8N_DATA, 'database.sqlite-wal'));
    if (mtimeMs > lastExport) scheduleExport();
  } catch {}
}, 10000);

process.on('SIGINT', () => process.exit(0));
