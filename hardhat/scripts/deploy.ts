import { ethers } from "hardhat";

const account = "0xa2A0e2EeFb70709c6c4bE488Cc6514fd7b550797";


async function main() {
  const BWVFactory = await ethers.getContractFactory("BlackWayToken");
  const contract = await BWVFactory.deploy();

  await contract.deployed();

  console.log(`BWV Token deployed to ${contract.address}`);

  console.log(`Balance of ${account} is ${await contract.balanceOf(account)}`);
  await contract.mint(account, 1_000_000_000_000_000_000_000);
  console.log(`Balance of ${account} is ${await contract.balanceOf(account)}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
