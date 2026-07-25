import fs from 'fs/promises';
import path from 'path';

const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production';
const dbPath = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
  ? path.join('/tmp', 'portfolio_db.json')
  : path.join(process.cwd(), 'portfolio_db.json');

// Initialize database file if it doesn't exist
async function initDb() {
  try {
    await fs.access(dbPath);
  } catch (error) {
    await fs.writeFile(dbPath, JSON.stringify({ visitors: [], messages: [] }, null, 2));
  }
}

// Generate unique ID
const generateId = () => Date.now() + Math.random().toString(36).substring(2, 9);

export async function addVisitor({ ip, country, city }) {
  await initDb();
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  const visitor = { id: generateId(), ip, country, city, visited_at: new Date().toISOString() };
  data.visitors.push(visitor);
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  return visitor;
}

export async function addMessage({ name, email, message, projectType, budget }) {
  await initDb();
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  const msg = { id: generateId(), name, email, message, projectType: projectType || 'General Inquiry', budget: budget || 'Not specified', sent_at: new Date().toISOString() };
  data.messages.push(msg);
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  return msg;
}

export async function getVisitors() {
  await initDb();
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  return data.visitors.sort((a, b) => new Date(b.visited_at) - new Date(a.visited_at)).slice(0, 50);
}

export async function getMessages() {
  await initDb();
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  return data.messages.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at)).slice(0, 50);
}
