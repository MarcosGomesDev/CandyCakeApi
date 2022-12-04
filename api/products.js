import express from 'express';
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.status(200).json('Get products successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).json('server error')
    }
})

module.exports = router
