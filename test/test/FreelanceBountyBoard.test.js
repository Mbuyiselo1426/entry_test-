import { expect } from "chai";
import { ethers } from "hardhat";

describe("FreelanceBountyBoard - My Test", function () {
  let board;
  let employer;
  let freelancer;

  beforeEach(async function () {
    [employer, freelancer] = await ethers.getSigners();

    board = await ethers.deployContract("FreelanceBountyBoard");
    await board.waitForDeployment();
  });

  it("allows a registered freelancer with the correct skill to apply for a bounty", async function () {
    // 1. Register freelancer
    await board
      .connect(freelancer)
      .registerFreelancer("solidity");

    // 2. Employer posts a bounty requiring Solidity
    const reward = ethers.parseEther("1");

    await board
      .connect(employer)
      .postBounty("Build a smart contract", "solidity", {
        value: reward
      });

    // 3. Freelancer applies
    await board
      .connect(freelancer)
      .applyForBounty(1);

    // 4. Check that the application was recorded
    expect(
      await board.hasApplied(1, freelancer.address)
    ).to.equal(true);
  });
});