import fs from 'fs/promises';
import path from 'path';

const dbPath = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
  ? path.join('/tmp', 'portfolio_db.json')
  : path.join(process.cwd(), 'portfolio_db.json');

// Determine which database driver to use based on Environment Variables
function getDbEngine() {
  if (process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL?.startsWith('postgres') || process.env.VERCEL_POSTGRES_HOST) {
    return 'postgres';
  }
  if (process.env.MONGODB_URI) {
    return 'mongodb';
  }
  return 'json';
}

// Generate unique ID
const generateId = () => Date.now() + Math.random().toString(36).substring(2, 9);

// ==========================================
// 1. MONGODB ATLAS ENGINE
// ==========================================
let mongoClientPromise = null;
async function getMongoDb() {
  if (!mongoClientPromise) {
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI);
    mongoClientPromise = client.connect();
  }
  const client = await mongoClientPromise;
  return client.db(process.env.MONGODB_DB_NAME || 'portfolio');
}

// ==========================================
// 2. POSTGRESQL (VERCEL POSTGRES / SUPABASE / NEON) ENGINE
// ==========================================
let postgresInitialized = false;
async function initPostgres() {
  if (postgresInitialized) return;
  const { sql } = await import('@vercel/postgres');
  if (process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    process.env.POSTGRES_URL = process.env.DATABASE_URL;
  }
  await sql`
    CREATE TABLE IF NOT EXISTS visitors (
      id VARCHAR(255) PRIMARY KEY,
      ip VARCHAR(255),
      country VARCHAR(255),
      city VARCHAR(255),
      visited_at VARCHAR(255)
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      message TEXT,
      project_type VARCHAR(255),
      budget VARCHAR(255),
      sent_at VARCHAR(255)
    );
  `;
  postgresInitialized = true;
}

// ==========================================
// 3. LOCAL JSON FILE ENGINE (FALLBACK)
// ==========================================
async function initJsonDb() {
  try {
    await fs.access(dbPath);
  } catch (error) {
    await fs.writeFile(dbPath, JSON.stringify({ visitors: [], messages: [] }, null, 2));
  }
}

// ==========================================
// EXPORTED DATA FUNCTIONS
// ==========================================

export async function addVisitor({ ip, country, city }) {
  const engine = getDbEngine();
  const visitor = {
    id: generateId(),
    ip: ip || 'Unknown',
    country: country || 'Unknown',
    city: city || 'Unknown',
    visited_at: new Date().toISOString()
  };

  if (engine === 'mongodb') {
    try {
      const db = await getMongoDb();
      await db.collection('visitors').insertOne({ ...visitor });
      return visitor;
    } catch (err) {
      console.error('MongoDB error in addVisitor, falling back to JSON:', err);
    }
  }

  if (engine === 'postgres') {
    try {
      await initPostgres();
      const { sql } = await import('@vercel/postgres');
      await sql`
        INSERT INTO visitors (id, ip, country, city, visited_at)
        VALUES (${visitor.id}, ${visitor.ip}, ${visitor.country}, ${visitor.city}, ${visitor.visited_at});
      `;
      return visitor;
    } catch (err) {
      console.error('Postgres error in addVisitor, falling back to JSON:', err);
    }
  }

  // Fallback: JSON File
  await initJsonDb();
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  data.visitors.push(visitor);
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  return visitor;
}

export async function addMessage({ name, email, message, projectType, budget }) {
  const engine = getDbEngine();
  const msg = {
    id: generateId(),
    name,
    email,
    message,
    projectType: projectType || 'General Inquiry',
    budget: budget || 'Not specified',
    sent_at: new Date().toISOString()
  };

  if (engine === 'mongodb') {
    try {
      const db = await getMongoDb();
      await db.collection('messages').insertOne({ ...msg });
      return msg;
    } catch (err) {
      console.error('MongoDB error in addMessage, falling back to JSON:', err);
    }
  }

  if (engine === 'postgres') {
    try {
      await initPostgres();
      const { sql } = await import('@vercel/postgres');
      await sql`
        INSERT INTO messages (id, name, email, message, project_type, budget, sent_at)
        VALUES (${msg.id}, ${msg.name}, ${msg.email}, ${msg.message}, ${msg.projectType}, ${msg.budget}, ${msg.sent_at});
      `;
      return msg;
    } catch (err) {
      console.error('Postgres error in addMessage, falling back to JSON:', err);
    }
  }

  // Fallback: JSON File
  await initJsonDb();
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  data.messages.push(msg);
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  return msg;
}

export async function getVisitors() {
  const engine = getDbEngine();

  if (engine === 'mongodb') {
    try {
      const db = await getMongoDb();
      const visitors = await db.collection('visitors')
        .find({}, { projection: { _id: 0 } })
        .sort({ visited_at: -1 })
        .limit(50)
        .toArray();
      return visitors;
    } catch (err) {
      console.error('MongoDB error in getVisitors, falling back to JSON:', err);
    }
  }

  if (engine === 'postgres') {
    try {
      await initPostgres();
      const { sql } = await import('@vercel/postgres');
      const { rows } = await sql`
        SELECT id, ip, country, city, visited_at FROM visitors
        ORDER BY visited_at DESC LIMIT 50;
      `;
      return rows;
    } catch (err) {
      console.error('Postgres error in getVisitors, falling back to JSON:', err);
    }
  }

  // Fallback: JSON File
  await initJsonDb();
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  return data.visitors.sort((a, b) => new Date(b.visited_at) - new Date(a.visited_at)).slice(0, 50);
}

export async function getMessages() {
  const engine = getDbEngine();

  if (engine === 'mongodb') {
    try {
      const db = await getMongoDb();
      const messages = await db.collection('messages')
        .find({}, { projection: { _id: 0 } })
        .sort({ sent_at: -1 })
        .limit(50)
        .toArray();
      return messages;
    } catch (err) {
      console.error('MongoDB error in getMessages, falling back to JSON:', err);
    }
  }

  if (engine === 'postgres') {
    try {
      await initPostgres();
      const { sql } = await import('@vercel/postgres');
      const { rows } = await sql`
        SELECT id, name, email, message, project_type as "projectType", budget, sent_at FROM messages
        ORDER BY sent_at DESC LIMIT 50;
      `;
      return rows;
    } catch (err) {
      console.error('Postgres error in getMessages, falling back to JSON:', err);
    }
  }

  // Fallback: JSON File
  await initJsonDb();
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  return data.messages.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at)).slice(0, 50);
}
