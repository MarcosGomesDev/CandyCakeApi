module.exports = {
    async listcategories(req, res) {
        try {
            res.status(200).json('Get categories successfully')
        } catch (error) {
            console.log(error)
            return res.status(500).json('server error')
        }
    }
}

