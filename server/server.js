const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Разрешаем CORS-запросы

// Хранилище данных
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

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
