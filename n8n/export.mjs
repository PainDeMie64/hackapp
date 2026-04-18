import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const N8N_URL = process.env.N8N_URL || 'http://localhost:5679';
const EMAIL = 'admin@hackapp.dev';
const PASSWORD = 'HackApp2026!';

async function login() {
  const res = await fetch(`${N8N_URL}/rest/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD })
  });
  const cookie = res.headers.getSetCookie?.().find(c => c.startsWith('n8n-auth='));
  if (!cookie) throw new Error('Login failed — is n8n running?');
  return cookie.split(';')[0];
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function cleanWorkflow(workflow) {
  const { id, createdAt, updatedAt, versionId, active, ...clean } = workflow;
  if (clean.nodes) {
    clean.nodes = clean.nodes.map(({ createdAt, updatedAt, ...node }) => node);
  }
  return clean;
}

async function main() {
  const cookie = await login();

  const res = await fetch(`${N8N_URL}/rest/workflows`, {
    headers: { Cookie: cookie }
  });
  const list = await res.json();
  const workflows = list.data || [];

  if (workflows.length === 0) {
    console.log('No workflows found in n8n.');
    return;
  }

  for (const summary of workflows) {
    const detail = await fetch(`${N8N_URL}/rest/workflows/${summary.id}`, {
      headers: { Cookie: cookie }
    });
    const full = await detail.json();
    const workflow = full.data || full;

    const clean = cleanWorkflow(workflow);
    const filename = `${slugify(clean.name)}.workflow.json`;
    const filepath = join(__dirname, filename);

    writeFileSync(filepath, JSON.stringify(clean, null, 2) + '\n');
    console.log(`Exported: "${clean.name}" → n8n/${filename}`);
  }

  console.log(`\nDone — exported ${workflows.length} workflow(s) to n8n/*.workflow.json`);
  console.log('Now commit and push to share with your team.');
}

main().catch(e => { console.error(e.message); process.exit(1); });
