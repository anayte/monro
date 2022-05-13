const express = require("express");
const router = express.Router();

router.get('/users', (req, res) => {
    
    res.send('Esto es users');
});

module.exports = router; 