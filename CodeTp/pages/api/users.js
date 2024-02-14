import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
  return open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database
  });
}
async function initializeDb() {
    const db = await openDb();
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );`);
    console.log('La table users a été initialisée.');
  }

// Décommentez la ligne suivante pour exécuter l'initialisation au démarrage
// initializeDb();

export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === 'POST') {
    // Code vulnérable aux injections SQL
    const name = req.body.name;
    await db.exec(`INSERT INTO users (name) VALUES ('${name}')`);
    res.status(200).json({ message: 'Utilisateur ajouté' });
  } else if (req.method === 'GET') {
    const users = await db.all('SELECT * FROM users');
    res.status(200).json(users);
  }
}
