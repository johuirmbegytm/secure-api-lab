const express = require('express');
// Імпортуємо наші дані

const { users, documents, employees } = require('./data');
const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---
const loggingMiddleware = (req, res, next) => {
  // Отримуємо поточний час, HTTP метод та URL запиту
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  // Виводимо інформацію в консоль
  console.log(`[${timestamp}] ${method} ${url}`);

  // ВАЖЛИВО: передаємо управління наступному middleware
  // Якщо не викликати next(), обробка запиту "зависне" на цьому місці

  next();
};


app.use(express.json());

// Глобально застосовуємо middleware для логування
// Цей рядок має бути ПЕРЕД усіма маршрутами

app.use(loggingMiddleware);

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

// --- МАРШРУТИ ДЛЯ РЕСУРСІВ --

app.get('/documents', authMiddleware, (req, res) => {
  res.status(200).json(documents);
});


app.post('/documents', authMiddleware, (req, res) => {
  const { title, content } = req.body;

  // Перевірка, чи передані всі необхідні поля

  if (!title || !content) {
    return res.status(400).json({ message: 'Bad Request. Fields "title" and "content" are required.' });
  }

  const newDocument = {
    id: Date.now(),
    title,
    content,
  };

  documents.push(newDocument);
  res.status(201).json(newDocument);
});

app.delete('/documents/:id', authMiddleware, (req, res) => {
    // Отримуємо id з параметрів маршруту
    const documentId = parseInt(req.params.id);
    const documentIndex = documents.findIndex(doc => doc.id === documentId);

    // Якщо документ з таким id не знайдено
    if (documentIndex === -1) {
        return res.status(404).json({ message: 'Document not found' });
    }

    // Видаляємо документ з масиву
    documents.splice(documentIndex, 1);

    // Відповідаємо статусом 204 No Content, тіло відповіді буде порожнім
    res.status(204).send();
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
