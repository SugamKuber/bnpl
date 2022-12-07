const hre = require("hardhat");

async function main() {
  const Solpay = await hre.ethers.getContractFactory("Solpay");
  const solpay = await Solpay.deploy();

  await solpay.deployed();

  console.log("Greeter deployed to:", solpay.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
