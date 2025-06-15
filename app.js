const express = require('express');
const app = express();
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'kost9nyt',
    host: 'localhost',
    database: 'project',
    port: 5432,
});

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware для парсинга тела запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', async (req, res) => {
    try {
        // Получение комментариев из базы данных
        const comments = await pool.query(`
            SELECT users.name, comments.comment, comments.created_at 
            FROM comments 
            JOIN users ON comments.user_id = users.id 
            ORDER BY comments.created_at DESC
        `);
        res.render('index', { comments: comments.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading comments');
    }
});

// Route for the Norway page
app.get('/norway', (req, res) => {
    res.render('norway');
});

const PurchaseManager = require('./PurchaseManager');
const purchaseManager = new PurchaseManager();

app.get('/buytickets', (req, res) => {
  const allTickets = purchaseManager.users.flatMap(user =>
    user.tickets.map(ticket => ({
      user: user.name,
      name: ticket.name,
      id: ticket.id
    }))
  );

  res.render('buytickets', { allTickets });
});

app.post('/buytickets', (req, res) => {
  const { name, ticket, quantity } = req.body;
  const result = purchaseManager.buyTicket(name, ticket, Number(quantity));
  res.json(result);
});

// Route для добавления комментариев
app.post('/add-comment', async (req, res) => {
    const { name, email, comment } = req.body;
    try {
        // Проверка существующего пользователя
        let user = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            user = await pool.query(
                'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
                [name, email]
            );
        }
        const userId = user.rows[0].id;

        // Добавление комментария
        await pool.query(
            'INSERT INTO comments (user_id, comment) VALUES ($1, $2)',
            [userId, comment]
        );

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving comment');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});