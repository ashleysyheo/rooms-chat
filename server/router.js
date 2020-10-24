const express = require('express');
const router = express.Router();

// set router 
router.get('/', (req, res) => {
    res.send('server is running');
});

module.exports = router;