import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const mockDbPath = path.join(process.cwd(), 'scratch', 'local_kv_db.json');
const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      let data = null;
      if (isKvConfigured) {
        data = await kv.get('trip_schedule');
      } else {
        if (fs.existsSync(mockDbPath)) {
          const content = fs.readFileSync(mockDbPath, 'utf8');
          try {
            data = JSON.parse(content);
          } catch (e) {
            console.error('Failed to parse local DB JSON:', e);
          }
        }
      }
      res.status(200).json({ source: isKvConfigured ? 'kv' : 'local_file', data });
    } else if (req.method === 'POST') {
      const { tripSchedule } = req.body;
      if (!tripSchedule) {
        res.status(400).json({ error: 'Missing tripSchedule in body' });
        return;
      }

      if (isKvConfigured) {
        await kv.set('trip_schedule', tripSchedule);
      } else {
        const dir = path.dirname(mockDbPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(mockDbPath, JSON.stringify(tripSchedule, null, 2), 'utf8');
      }
      res.status(200).json({ success: true, source: isKvConfigured ? 'kv' : 'local_file' });
    } else {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
