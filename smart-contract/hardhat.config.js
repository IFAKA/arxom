require('@nomiclabs/hardhat-waffle')
require('dotenv').config({ path: '.env' })

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  solidity: '0.8.9',
  networks: {
    rinkeby: {
      url: process.env.NEXT_PUBLIC_RINKEBY_NODE_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },
}