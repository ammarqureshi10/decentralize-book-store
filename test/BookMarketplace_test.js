const BookMarketPlace = artifacts.require("BookMarketPlace");
const { assert } = require("chai");
const truffleAssert = require("truffle-assertions");
contract("BookMarketPlace", (accounts)=>{

    let contractInstance;
    before(async()=>{
        contractInstance = await BookMarketPlace.new();
    })


    xdescribe("test sellBook function", ()=>{

        it("seller can list a book",async()=>{
            const res = await contractInstance.sellBook("50 Rules of Love","100",
            {from: accounts[0]});
            assert.equal(res.logs[0].args.id, 1);
        })
    })
    
    describe("test buyRequest function ", ()=>{
        it("buyer can not offer on un-listed book", async()=>{
             await truffleAssert.reverts(
                contractInstance.buyRequest(1, 100, {from: accounts[0]}),
                "buyRequest: book not listed"
            )
        })

        xit("buyer can offer desired value", async()=>{
            await contractInstance.sellBook("50 Rules of Love","100",
            {from: accounts[0]});

            await contractInstance.buyRequest(1, 90, {from: accounts[1]});
            const res = await contractInstance.checkRequests(1);
            assert.equal(res[0].offerAmount, 90);
        })
        xit("buyer only purchase book at owner price", async()=>{
            const res = await contractInstance.buyRequest(1, 100, {from: accounts[2]});
            assert.equal(res.logs[0].args.by, accounts[2]);
        })
    })

})