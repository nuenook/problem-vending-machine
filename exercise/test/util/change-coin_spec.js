const changeCoin = require("../../util/change-coin")
const expect = require("chai").expect;

const balance_0 = 0
const change_0 = []
const balance_3 = 3
const change_3 = [2, 1]
const balance_100 = 100
const change_100 = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
const balance_12 = 12
const change_12 = [2, 10]
const balance_7 = 7
const change_7 = [2, 5]
const balance_101 = 101
const change_101 = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1]
describe("changing the coin test", () => {
    
    it("balance: 0, no change", () => {
        changeCoinList = changeCoin(balance_0)
        expect(changeCoinList.sort()).to.deep.equal(change_0.sort())
    })

    it("balance: 100, changes [10 10 10 10 10 10 10 10 10 10]", () => {
        changeCoinList = changeCoin(balance_100)
        expect(changeCoinList.sort()).to.deep.equal(change_100.sort())
    })

    it("balance: 3, changes [2, 1]", () => {
        changeCoinList = changeCoin(balance_3)
        expect(changeCoinList.sort()).to.deep.equal(change_3.sort())
    })

    it("balance: 12, changes [2, 5, 5]", () => {
        changeCoinList = changeCoin(balance_12)
        expect(changeCoinList.sort()).to.deep.equal(change_12.sort())
    })

    it("balance: 7, changes [2, 5]", () => {
        changeCoinList = changeCoin(balance_7)
        expect(changeCoinList.sort()).to.deep.equal(change_7.sort())
    })

    it("balance: 101, change [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1]", () => {
        changeCoinList = changeCoin(balance_101)
        expect(changeCoinList.sort()).to.deep.equal(change_101.sort())
    })

})