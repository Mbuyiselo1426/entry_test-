import { expect } from "chai";
import { ethers } from "hardhat";

describe("DecentralisedRaffle - My Test", function () {
  let raffle;
  let player;

  beforeEach(async function () {
    [player] = await ethers.getSigners();

    raffle = await ethers.deployContract("DecentralisedRaffle");
    await raffle.waitForDeployment();
  });

  it("allows a player to enter the raffle with the minimum entry fee", async function () {
    const minimumEntry = ethers.parseEther("0.01");

    await raffle.connect(player).enterRaffle({
      value: minimumEntry
    });

    expect(
      await raffle.getEntryCount(player.address)
    ).to.equal(1);

    expect(
      await raffle.getPlayerCount()
    ).to.equal(1);
  });
});