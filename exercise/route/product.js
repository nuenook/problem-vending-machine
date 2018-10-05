const express = require("express")

const repo_product = require('./../repository/repo_product')
const changeCoin = require('./../util/change-coin')

module.exports = function (app) {
    const router = express.Router()
    
    app.use('/product', router)
    router.get("/", async function (req, res) {
        try {
            let products = await repo_product.getAllProduct()
            return res.status(200).send(products)

        } catch (error) {
            res.status(400).send(error)
        }
    })

    router.get("/:productId", async function (req, res) {
        try {
            const product = await repo_product.getProductById(req.params.productId)
            return res.status(200).send(product)
        } catch (error) {
            return res.status(400).send(error)
        }
    })

    router.post("/buy", async function (req, res) {
        if (!req.body.coinList) {
            return res.status(400).send({ buyStatus: false, change: req.body.coinList, message: `no input coin` })
        }

        if (!req.body.productId) {
            return res.status(400).send({ buyStatus: false, change: req.body.coinList, message: `no product id` })
        }

        let total = req.body.coinList.reduce((a, b) => a + b, 0)
        try {
            const product = await repo_product.getProductById(req.body.productId)
            if (product.in_stock) {
                if (total >= product.price) {
                    total -= product.price
                    return res.status(200).send({ buyStatus: true, change: changeCoin(total), message: `you got ${product.name}` })
                }
                return res.status(200).send({ buyStatus: false, change: req.body.coinList, message: `sorry you money not enough` })
            }
            return res.status(200).send({ buyStatus: false, change: req.body.coinList, message: `${product.name} out of stock` })
        } catch (err) {
            return res.status(500).send({ buyStatus: false, change: req.body.coinList, message: err })
        }
    })
}
