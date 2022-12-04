module.exports = {
    async listProducts(req, res) {
        try {
            res.status(200).json('Get products successfully')
        } catch (error) {
            console.log(error)
            return res.status(500).json('server error')
        }
    }
}

