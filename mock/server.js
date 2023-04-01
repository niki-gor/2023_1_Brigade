/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());
app.use(cookie());
app.use(cors({
    origin: ['http://localhost:9000', 'http://127.0.0.1:5500'],
    credentials: true,
}));

const users = {
    'd.dorofeev@mail.ru': {
        id: 0,
        username: 'Dmitri',
        email: 'd.dorofeev@mail.ru',
        nickname: '',
        status: '',
        password: 'password123',
    },
    's.volodin@mail.ru': {
        id: 1,
        username: 'Sergei',
        email: 's.volodin@mail.ru',
        nickname: '',
        status: '',
        password: 'password123',
    },
    'aleksandr.tsvetkov@mail.ru': {
        id: 2,
        username: 'Alexander',
        email: 'aleksandr.tsvetkov@mail.ru',
        nickname: '',
        status: '',
        password: 'password123',
    },
    'a.ostapenko@mail.ru': {
        id: 3,
        username: 'Alexander',
        email: 'a.ostapenko@mail.ru',
        nickname: '',
        status: '',
        password: 'password123',
    },
};
const ids = {};

app.post('/signup', (req, res) => {
    const { password } = req.body;
    const { email } = req.body;
    const { username } = req.body;
    if (
        !password
        || !email
        || !username
		|| !password.match(/^\S{4,}$/)
		|| !email.match(/@/)
    ) {
        return res.status(400).json({ error: 'Не валидные данные пользователя' });
    }
    if (users[email]) {
        return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    const id = uuid();
    const user = {
        id,
        username,
        email,
        nickname: '',
        status: '',
        password,
    };

    ids[id] = email;
    users[email] = user;

    res.cookie('podvorot', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.status(201).json({ id });
});

app.post('/login', (req, res) => {
    const { password } = req.body;
    const { email } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(404).json({ error: 'Не верный E-Mail и/или пароль' });
    }

    const id = uuid();
    ids[id] = email;

    res.cookie('podvorot', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.status(200).json({ id });
});

app.get('/auth', (req, res) => {
    const id = req.cookies.podvorot;
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }

    res.json(users[email]);
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
