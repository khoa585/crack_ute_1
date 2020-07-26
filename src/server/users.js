const express = require('express')
const router = express.Router();
const ModelNews = require('../contrus/index');
const { check } = require('../commons/checkuser')
router.post('/', async (req, res) => {
    const { usename, password } = req.body
    const inf = {
        usename: usename,
        password: password
    }
    const data = await ModelNews.Login(inf)
    if (data === 'fail') {
        res.json({
            status: 'KT TK OR MK'
        })
    } else {
        const result = await check(data)
        res.json({
            status: 'success',
            data: result
        })
    }
})
router.get('/getSchedule', async (req, res) => {
    const cookie = res.user
    const data = await ModelNews.getSchedule(cookie)
    res.json({
        data: data
    })
})
router.get('/getScore', async (req, res) => {
    const cookie = res.user
    const data = await ModelNews.getSCORES(cookie)
    res.json({
        data: data
    })
})
module.exports = router;
