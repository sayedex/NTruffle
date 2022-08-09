// SPDX-License-Identifier: MIT
//develop by TRDC Devs
//website:http://trstake.com/
pragma solidity ^0.8;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

     
    contract StakingRewards {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    IERC20 public rewardsToken;
    IERC20 public stakingToken;
    uint256 public rewardRate;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    address  public  admin;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    constructor(address _stakingToken, address _rewardsToken,uint256 _speed) {
        rewardRate = _speed;
         admin = msg.sender;
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    
    
    }


modifier onlyOwner(){
    require(msg.sender == admin ,"you are not admin");
    _;
}
function setnewOwner(address _newadmin) external onlyOwner{
admin = _newadmin;

}
function setnew(uint256 _newspeed) external onlyOwner{
rewardRate=_newspeed;
}
 function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner {
        require(tokenAddress != address(stakingToken), "Cannot withdraw the staking token");
        IERC20(tokenAddress).safeTransfer(admin, tokenAmount);
    
}


    function rewardPerToken() public view returns (uint256) {
        if (_totalSupply == 0) {
            return 0;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / _totalSupply);
    }

    function earned(address account) public view returns (uint256) {
        return
            ((_balances[account] *
                (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account];
    }
    //this is optional function
    function Totalstakes(address account) public view returns(uint256) {
    return _balances[account];

}




    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    function stake(uint256 _amount) external updateReward(msg.sender) {
        require(_amount > 0, "Cannot stake 0");
        _totalSupply += _amount;
        _balances[msg.sender] += _amount;
        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
        emit Staked(msg.sender, _amount);

    }

    function withdraw(uint256 _amount) external updateReward(msg.sender) {
        _totalSupply -= _amount;
        _balances[msg.sender] -= _amount;
        stakingToken.safeTransfer(msg.sender, _amount);
        emit Withdrawn(msg.sender, _amount);

    }

    function getReward() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
     if (reward > 0) {
            rewards[msg.sender] = 0;
      rewardsToken.safeTransfer(msg.sender,reward);
      emit RewardPaid(msg.sender, reward);
    
        }}
    
     function Totalfullstake() public view returns(uint256) {
        return _totalSupply;

    }

  /* ========== EVENTS ========== */
    event Staked(address indexed user, uint256 _amount);
    event Withdrawn(address indexed user, uint256 _amount);
    event RewardPaid(address indexed user, uint256 reward);
}

