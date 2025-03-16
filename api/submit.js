const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Настройка CORS
app.use(cors({
    origin: 'https://onlymyrep.github.io', // Разрешаем запросы только с этого домена
    methods: ['GET', 'POST', 'OPTIONS'], // Разрешаем только нужные методы
    allowedHeaders: ['Content-Type'], // Разрешаем только нужные заголовки
}));

app.use(bodyParser.json());

let dataStore = [];

app.post('/submit', (req, res) => {
    const data = req.body;
    dataStore.push(data); // Сохраняем данные
    console.log('Данные получены:', data);

    // Отправка письма
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Используем Gmail
        auth: {
            user: 'tfgryujhgh@gmail.com', // Ваш email
            pass: 'zzyf ffwf ljqv jjpm', // Пароль от email
        },
    });

    const mailOptions = {
        from: 'tfgryujhgh@gmail.com',
        to: 'mukashevilias@gmail.com', // Email получателя
        subject: 'Данные о расписании сотрудников',
        text: JSON.stringify(dataStore, null, 2), // Форматируем данные
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке письма:', error);
            res.status(500).send('Ошибка при отправке письма');
        } else {
            console.log('Письмо успешно отправлено:', info.response);
            dataStore = []; // Очищаем хранилище после отправки
            res.send('Данные успешно получены и письмо отправлено');
        }
    });
});

module.exports = app;


app.options('/submit', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://onlymyrep.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
});
