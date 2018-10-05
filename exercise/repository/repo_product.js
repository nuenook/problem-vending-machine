var mockProducts = require('./../repository/product-mock.json')

var getAllProduct = function () {
    return new Promise(resolve => {
        resolve(mockProducts.data)
    })
}

var getProductById = function (productId) {
    return new Promise((resolve, reject) => {
        let products = mockProducts
        if (productId) {
            let product = products.data.find(s => s.id == productId)
            if (product)
                resolve(product)
            else
            reject({ message: "product not found" })
        } else {
            reject({ message: "no productId" })
        }
    })
}

module.exports = {
    getAllProduct: getAllProduct,
    getProductById: getProductById
}