const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

// https://127.0.0.1:7545
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8")

  //create a contract factory - used to deploy contract
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet)
  console.log("Deploying, please wait...")
  const contract = await contractFactory.deploy() // await -  stop here wait for the contract to deploy
  //console.log(contract);
  await contract.deployTransaction.wait(1)

  const currentFavoriteNumber = await contract.retrieve()
  console.log(`current favorite number: ${currentFavoriteNumber.toString()}`)
  const txResponse = await contract.store("7")
  const txReceipt = await txResponse.wait(1)
  const updatedFavoriteNumber = await contract.retrieve()
  console.log(`Updated favorite number: ${updatedFavoriteNumber}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
