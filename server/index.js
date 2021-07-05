const express = require('express');
const connectDB = require('./db')

const app = express();
connectDB();

app.use(express.json({ extended: true }));

const port = process.env.port || 4000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/menus', require('./routes/menu'));
app.use('/api/cursos', require('./routes/cursos'));
app.use('/api/post', require('./routes/post'));

app.listen(port, '0.0.0.0', () => {
    console.log(`### servidor funcionando ${port} ###`)
});