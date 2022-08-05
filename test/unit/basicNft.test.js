const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", function () {
          let basicNFT, deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["basicNFT"])
              basicNFT = await ethers.getContract("BasicNFT")
          })

          it("Allows users to mint an NFT, and updates appropriately", async function () {
              const txResponse = await basicNFT.mintNft()
              await txResponse.wait(1)
              const tokenURI = await basicNFT.tokenURI(0)
              const tokenCounter = await basicNFT.getTokenCounter()

              assert.equal(tokenCounter.toString(), "1")
              assert.equal(tokenURI, await basicNFT.TOKEN_URI())
          })
      })
