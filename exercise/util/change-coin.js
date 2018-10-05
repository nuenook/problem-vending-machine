const gCoinList = [10, 5, 2, 1]

const changeCoin = function (balance) {

    let changeCoinList = []
    while (balance > 0) {
        for (var i = 0; i < gCoinList.length; i++) {
            if (balance - gCoinList[i] >= 0) {
                changeCoinList.push(gCoinList[i])
                balance -= gCoinList[i]
                break
            }
        }
    }
    return changeCoinList
}

module.exports = changeCoin