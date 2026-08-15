# Part B: Test Scenarios Guide

**Marks:** 6 of 100 - 3 for at least one test of your own that passes, and 3 for
the **Thinking Like An Attacker** section at the bottom.

The auto-marker already runs its own test suite against your contracts. This
section is about whether *you* can think like a tester.

**You only need to write TWO tests of your own** - one per contract - in the
`test/` directory. There is a worked example in `test/example.test.js` you can
copy from. Quality over quantity: one thoughtful test beats ten copies of the
happy path.

Run them with:

```bash
npx hardhat test
```

---

## Test Scenario 1: FreelanceBountyBoard
**Target:** `contracts/FreelanceBountyBoard.sol`

### 1.1 The test I wrote

- **Test file and name:**
- **What it checks:**
- **Steps:**
- **Expected result:**
- **Does it pass?** [yes / no / partly]

### 1.2 A scenario I did NOT have time to test

Describe one thing that could go wrong with this contract that neither you nor
the auto-marker checked. You do not have to write the code - just show you can
see the gap.

[Write your response here]
Test file and name: test/FreelanceBountyBoard.test.js — allows a registered freelancer with the correct skill to apply for a bounty.

What it checks: It checks that a freelancer can apply when their registered skill matches the bounty's required skill.

Steps: Register the freelancer with the skill "solidity", create a bounty requiring "solidity", apply for the bounty, and check that the application was recorded.

Expected result: The application is recorded and hasApplied() returns true.

Does it pass? No — I was unable to run the test successfully because of the Hardhat/module configuration error.

---

## Test Scenario 2: DecentralisedRaffle
**Target:** `contracts/DecentralisedRaffle.sol`

### 2.1 The test I wrote

- **Test file and name:**
- **What it checks:**
- **Steps:**
- **Expected result:**
- **Does it pass?** [yes / no / partly]

### 2.2 The hard one

Testing a raffle is awkward because the winner changes every run. **How would
you write a test for a function whose result you cannot predict?** What can you
assert that is true no matter who wins?

(Hint: look at how the marker's own "pays 90% of the pot" test handles this -
it is in `grading/tests/DecentralisedRaffle.grading.test.js` and you are welcome
to read it.)

[Write your response here]
Test file and name: test/DecentralisedRaffle.test.js — allows a player to enter the raffle with the minimum entry fee.

What it checks: It checks that the player's entry is recorded correctly.
Steps: Deploy the raffle, send 0.01 ETH to enterRaffle(), and check the player's entry count and total number of entries.

Expected result: The player's entry count is 1 and the total number of entries is 1.
Does it pass? No — I was unable to run the test successfully because of the Hardhat/module configuration error.

I would not test for a specific winner because the winner is random. I would instead check things that must always be true, such as the winner being one of the players who entered and the winner receiving 90% of the raffle pot.

---

## Thinking Like An Attacker (3 marks)

Pick **one** of your two contracts. If you wanted to steal from it or break it,
what would you try first?

- **Contract:**
- **My attack:**
- **Does it work against my implementation?** [yes / no / not sure]
- **If it works, what would fix it?**

An honest "yes, this attack works against my code, and here is the fix" scores
full marks here. Claiming your contract is perfect scores nothing.

[Write your response here]
Contract: DecentralisedRaffle
My attack: I would try to influence the raffle result by controlling when selectWinner() is called, because the contract uses the block timestamp as part of its random number.

Does it work against my implementation? Yes. The owner can choose when to call selectWinner(), which can influence the timestamp used for the random result.

If it works, what would fix it? I would use Chainlink VRF in a real application because it provides a more secure and unpredictable random number.

---

## Checklist

- [ ] At least one test of my own in `test/`
- [ ] `npx hardhat test` runs without crashing
- [ ] I filled in the attacker section above
