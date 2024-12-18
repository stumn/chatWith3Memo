// routes.js
const express = require('express');
const router = express.Router();
const { fetchPosts, fetchPosts_everybody } = require('./dbOperations');

// ログインページHTML
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// チャットページHTML
router.get('/:randomString/chat', (req, res) => {
    res.sendFile(__dirname + '/public/chat-room.html');
});

// チャットページ用CSS
router.get('/style.css', (_, res) => {
    res.header('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/style.css');
});

// ドキュメントページHTML
router.get('/:randomString/document', (req, res) => {
    res.sendFile(__dirname + '/public/document.html');
});

// ドキュメントページ用CSS
router.get('/document.css', (_, res) => {
    res.header('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/document.css');
});

// ドキュメントページ用 DBアクセスAPI
router.get('/api/:randomString/messages', async (req, res) => {
    try {
        const apiString = req.params.randomString;

        const mine = await fetchPosts(apiString);
        const everybody = await fetchPosts_everybody();

        const data = { mine, everybody };

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages in API' });
    }
});

module.exports = router;
