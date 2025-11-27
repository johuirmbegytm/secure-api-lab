const express = require('express');
// Імпортуємо наші дані

const { users, documents, employees } = require('./data');
const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---
const authMiddleware = (req, res, next) => {
  const login = req.headers['x-login'];
  const password = req.headers['x-password'];

  const user = users.find(u => u.login === login && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed. Please provide valid credentials in headers X-Login and X-Password.' });
  }
  req.user = user;
  next();
};
const adminOnlyMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });

  }
  next();
};

app.use(express.json());

// --- МАРШРУТИ ДЛЯ РЕСУРСІВ --

app.get('/documents', authMiddleware, (req, res) => {
  res.status(200).json(documents);
});


app.post('/documents', authMiddleware, (req, res) => {
  const newDocument = req.body;
  newDocument.id = Date.now();
  documents.push(newDocument);
  res.status(201).json(newDocument);
});

app.get('/employees', authMiddleware, adminOnlyMiddleware, (req, res) => {
  res.status(200).json(employees);
});

// --- КІНЕЦЬ МАРШРУТІВ ---

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// server.js




// --- КІНЕЦЬ MIDDLEWARE ---
// --- МАРШРУТИ ДЛЯ РЕСУРСІВ ---
// ... тут будуть ваші маршрути, які ми оновимо на наступному кроці
