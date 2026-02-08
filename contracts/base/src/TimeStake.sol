// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TimeStake {
    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 weight;
    }

    mapping(address => Stake) public stakes;
    uint256 public totalWeightedStake;
    uint256 public rewardRate = 100;

    event Staked(address indexed user, uint256 amount, uint256 weight);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);

    function stake() external payable {
        Stake storage userStake = stakes[msg.sender];
        if (userStake.amount > 0) {
            uint256 timeStaked = block.timestamp - userStake.startTime;
            userStake.weight = userStake.amount * timeStaked;
            totalWeightedStake -= userStake.weight;
        }
        userStake.amount += msg.value;
        userStake.startTime = block.timestamp;
        userStake.weight = userStake.amount;
        totalWeightedStake += userStake.weight;
        emit Staked(msg.sender, msg.value, userStake.weight);
    }

    function unstake() external {
        Stake storage userStake = stakes[msg.sender];
        uint256 timeStaked = block.timestamp - userStake.startTime;
        uint256 weight = userStake.amount * timeStaked;
        uint256 reward = (weight * rewardRate) / 10000;
        totalWeightedStake -= weight;
        uint256 total = userStake.amount + reward;
        userStake.amount = 0;
        userStake.weight = 0;
        emit Unstaked(msg.sender, total, reward);
    }

    function calculateReward(address user) external view returns (uint256) {
        Stake storage userStake = stakes[user];
        uint256 timeStaked = block.timestamp - userStake.startTime;
        uint256 weight = userStake.amount * timeStaked;
        return (weight * rewardRate) / 10000;
    }
}
