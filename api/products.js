import express from 'express';
const router = express.Router()

router.get('/', (res) => {
    res.json('DENTRO DE PRODUTOS')
})

module.exports = router