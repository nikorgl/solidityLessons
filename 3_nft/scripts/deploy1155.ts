import * as fs from "fs";
import * as path from "path";
import { ethers } from "hardhat";
import { IPFS_URI_1155 } from "../const";

async function main() {
  const [acc] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("Token1155");
  const token = await Token.deploy(IPFS_URI_1155);
  await token.deployed();

  console.log("Token deployed to:", token.address);
  fs.appendFileSync(".env", `\nTOKEN1155_ADDR=${token.address}`);

  for (let i = 1; i <= 2; i++) {
    await token.mint(acc.address, i, 1);
    console.log(`Minted ${i}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
