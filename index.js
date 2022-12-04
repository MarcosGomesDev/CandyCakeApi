import express from 'express';

import products from './api/products'

const app = express()

app.use('/api/product', products)

app.listen(3003, () => {
    console.log('server on')
})

