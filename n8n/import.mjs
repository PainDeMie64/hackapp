import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const N8N_URL = process.env.N8N_URL || 'http://localhost:5679';
const EMAIL = process.env.N8N_EMAIL || 'admin@hackapp.dev';
const PASSWORD = process.env.N8N_PASSWORD || 'HackApp2026!';

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

async function getExistingWorkflows(cookie) {
  const res = await fetch(`${N8N_URL}/rest/workflows`, {
    headers: { Cookie: cookie }
  });
  const data = await res.json();
  return data.data || [];
}

async function importWorkflow(cookie, workflow, existingId) {
  const url = existingId
    ? `${N8N_URL}/rest/workflows/${existingId}`
    : `${N8N_URL}/rest/workflows`;
  const method = existingId ? 'PATCH' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { Cookie: cookie, 'Content-Type': 'application/json' },
    body: JSON.stringify(workflow)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to ${existingId ? 'update' : 'create'} workflow: ${err}`);
  }
  return res.json();
}

async function main() {
  const cookie = await login();
  const existing = await getExistingWorkflows(cookie);

  const files = readdirSync(__dirname).filter(f => f.endsWith('.workflow.json'));

  for (const file of files) {
    const workflow = JSON.parse(readFileSync(join(__dirname, file), 'utf-8'));
    const match = existing.find(w => w.name === workflow.name);

    if (match) {
      await importWorkflow(cookie, { ...workflow, id: match.id }, match.id);
      console.log(`Updated: "${workflow.name}" (id: ${match.id})`);
    } else {
      const result = await importWorkflow(cookie, workflow, null);
      console.log(`Created: "${workflow.name}" (id: ${result.data?.id})`);
    }
  }

  console.log(`\nDone — imported ${files.length} workflow(s) from n8n/*.workflow.json`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
