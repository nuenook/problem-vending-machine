let gCoinList = []
const gDefaultCoinList = [10, 5, 2, 1]

$(document).ready(function () {
    createProductList()
    $('.clickToTotal').click(function () {
        gCoinList.push(parseInt($(this).attr("data-id")))
        $('#totalAmount').html(gCoinList.reduce((a, b) => a + b, 0))
        updateButtonBuy()
    })

    $('.clickToCancel').click(function () {
        if (gCoinList.length > 0) {
            let changeMessage = "Change <br>"
            gDefaultCoinList.forEach(c => {
                numCoin = countCoin(gCoinList, c)
                if (numCoin > 0)
                    changeMessage += `${c} baht: ${numCoin} coin${numCoin == 1 ? '' : 's'} <br>`

            })
            $('#successModalTitle').html('Thank you !')
            $('#successModalBody').html(changeMessage)
            $('#successModal').modal('toggle')
            setTotalZero()
        }
    })
})

var setTotalZero = function () {
    $('#totalAmount').html(0)
    gCoinList = []
    updateButtonBuy()
}

const countCoin = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

var buyProduct = function (product_id) {

    callAjax("post", location.origin + "/product/buy", { productId: product_id, coinList: gCoinList }).then(buyResult => {

        if (buyResult) {
            let changeMessage = "Change <br>"
            gDefaultCoinList.forEach(c => {
                numCoin = countCoin(buyResult.change, c)
                if (numCoin > 0)
                    changeMessage += `${c} baht: ${numCoin} coin${numCoin == 1 ? '' : 's'} <br>`

            })
            $('#successModalTitle').html(buyResult.message)
            $('#successModalBody').html(changeMessage)
            $('#successModal').modal('toggle')
            setTotalZero()
        } else {
            $('#errorModalBody').html(buyResult.message)
            $('#errorModal').modal('toggle')
            setTotalZero()
        }
    }).catch(error => {
        $('#errorModalBody').html(error)
        $('#errorModal').modal('toggle')
    })
}

var updateButtonBuy = function () {
    $(".clickToBuy").each(function () {
        if (gCoinList.reduce((a, b) => a + b, 0) >= parseInt($(this).attr("data-price")))
            $('#' + this.id).prop('disabled', false)
        else
            $('#' + this.id).prop('disabled', true)
    });
}

var createProductList = function () {
    callAjax("get", location.origin + "/product/").then(productResults => {
        productResults.forEach(eachProduct => {
            $('#showAllproduct').append(`<div class="col-md-6 mb-3">
            <div class="card" ><img class="card-img-top" style="width: 220px; height: 96px; margin: 0 auto;" src="${eachProduct.image}" alt="${eachProduct.name}" />
              <div class="card-body">
                <h4 class="card-title">
                  <p>${eachProduct.name}</p>
                </h4>
                <div class="row">
                    <button id="product_${eachProduct.id}" data-price="${eachProduct.price}" 
                        class="${eachProduct.in_stock ? 'clickToBuy' : ''} btn ${eachProduct.in_stock ? 'btn-success' : 'btn-danger'} 
                        text-center" href="#" style="max-width: 120px; margin: 0 auto;" ${eachProduct.in_stock ? '' : 'disabled'} onclick="buyProduct(${eachProduct.id})">
                            ${eachProduct.in_stock ? 'Buy ' + eachProduct.price + '฿' : ' Out of stock '}
                    </button>
                </div>
              </div>
            </div>
          </div>`)
        })
        updateButtonBuy()
        $('#showAllproduct').easyPaginate({
            paginateElement: '.col-md-6',
            elementsPerPage: 4,
            effect: 'climb'
        });

        $("a.first, a.prev, a.page, a.next, a.last").click(function () { updateButtonBuy() })
    })
}

function callAjax(httpMethod, url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: httpMethod,
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                resolve(result);
            }, error: function (err) {
                reject(err);
            }
        })
    })
}
