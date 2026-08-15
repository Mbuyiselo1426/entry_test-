# Part B: Design Document

**Marks:** 4 of 100 - the **Randomness** section below is read and marked. The
rest of this document is not scored, but it is read when we talk to you, so
answer it properly.

**Section 1: FreelanceBountyBoard**
**Section 2: DecentralisedRaffle**

Short, specific answers beat long vague ones. Three honest sentences score better
than a page of general security talk. If you ran out of time on something, say
so here - describing what you would have done still earns marks. Pretending it
is finished does not.

---

## WHY I BUILT IT THIS WAY

### 1. Data Structure Choices

- Where did you use a `mapping`, and where did you need an array instead?
- How did you record raffle entries so that a player who enters three times has
  three times the chance of winning?
- How did you count unique players separately from total entries?

[Write your response here]

---

### 2. Security Measures

- **Reentrancy:** show the order of operations in `approveAndPay`. Which line
  updates the status, and which line sends the ETH? Why that order?
- **Access control:** which functions are owner-only or employer-only, and what
  would go wrong without those checks?
- **Input validation:** what did you reject, and where?

[Write your response here]

---

### 3. Randomness - Be Honest Here (4 marks)

You were allowed to use block data for the raffle draw. This section is where
you show you understand what that costs.

- What exactly does your randomness depend on?
- **Who can manipulate it, and how?** Name the actor and the action.
- What would you use in production instead, and why is that better?

[Write your response here]
The raffle randomness depends on blockchain block data, such as the block timestamp and block hash.

A block validator/miner can influence some of this block data, so they could potentially manipulate the result to give themselves or someone else a better chance of winning.

In production, I would use Chainlink VRF instead. It provides a verifiable random number that is much harder to manipulate, making the raffle fairer and more secure.
---

### 4. Trade-offs & Future Improvements

- What did you not finish, or knowingly do the quick way?
- What would you add with another day? (dispute resolution, refunds, prize
  tiers, gas optimisation)

[Write your response here]
I kept the implementation simple so I could complete the main requirements. I did not implement a full dispute or refund system.

With another day, I would add a dispute resolution system, refunds if a bounty is cancelled, and different prize tiers for the raffle. I would also look for ways to reduce gas costs and make the contracts more efficient.
---

## REAL-WORLD DEPLOYMENT CONCERNS

> [!NOTE]
> These are **written questions only**. You are not deploying anything, and you
> do not need a wallet, a faucet or any test ETH to answer them. Reason it
> through in prose.

### 1. Gas Costs

- Which of your functions is the most expensive, and why?
- Roughly what would it cost a user at 20 gwei, with ETH at $3,000? (Use the
  same arithmetic as Part A Question 2.)
- Is that affordable for the users you would actually be building this for? If
  not, what would you change?

[Write your response here]

---

### 2. Scalability

**What happens when the raffle has 10,000 entries?**

- Which part of `selectWinner` gets slower or more expensive as the array grows?
- What breaks first?

[Write your response here]
The most expensive function is postBounty because it creates and stores a new bounty on the blockchain.

Using the same calculation from Part A Question 2, if the transaction uses about 100,000 gas:

100,000 × 20 gwei = 0.002 ETH

At $3,000 per ETH:

0.002 × $3,000 = $6

So the transaction would cost roughly $6.

For users with limited income, this may be too expensive. I would use a Layer 2 network with lower gas fees, or redesign some operations to reduce the amount of data stored directly on the blockchain.

---

### 3. User Experience

**How would you make this usable for someone who has never held a wallet?**

- What is the hardest step for a first-time user?
- If you *were* deploying this for real, which testnet would you try it on
  first, and how would a tester get test ETH? (Describe it - you are not doing
  it.)

[Write your response here]
The hardest step for a first-time user would be creating a wallet and getting test ETH.

I would make the app guide the user through creating or connecting a wallet and clearly explain each step. I would also make the transaction buttons and costs easy to understand.

For a real deployment, I would first use the Sepolia testnet. Testers could create a wallet, connect it to Sepolia, and use a Sepolia faucet to receive free test ETH. They could then use that ETH to test the contract without spending real money.
---

## MY LEARNING APPROACH 

### Resources I Used

Be specific. "The Cyfrin course" is not a resource; "Blockchain Basics, The
Oracle Problem" is. List 3-5.

[List your resources]
The Africa Blockchain Club assessment instructions and contract requirements.
Solidity documentation/examples to understand Solidity syntax and smart-contract concepts.
Remix IDE to write, compile, and test the Solidity contracts.
AI assistance to help me understand errors, security concepts, and how the contract requirements should be implemented.

---

### Challenges Faced

- The biggest thing you got stuck on
- How you got unstuck
- What you know now that you did not this morning

[Write down your challenges]
My biggest challenge was understanding how the different parts of a smart contract work together, especially payments, access control, and security.

I got unstuck by breaking the requirements into smaller functions and using Remix to compile and test my code. I also used AI to explain errors and concepts that I did not understand.

Today I learned more about how Solidity stores data, how ETH payments work in a contract, why the order of updating state before sending ETH matters, and why blockchain block data is not ideal for secure randomness.

---

### What I'd Learn Next

[Write your future learning goals]
Solidity and smart-contract development.
Smart-contract security and common attacks.
How to properly test contracts with Hardhat.
Chainlink VRF and secure randomness.
Gas optimisation and Layer 2 networks.
How to deploy a smart contract and connect it to a frontend.

---
