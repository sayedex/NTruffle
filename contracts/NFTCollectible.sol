pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract NFTCollectible is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    bytes32 public root;
    uint public end;
      //0xbe397a59186c9bf19dc618484690d99bfabf988ce2a5fc2e25ff5823d66bfa1b

    Counters.Counter private _tokenIds;
    bool public revealed = false;

   //token info
  
    struct TokenInfo {
        IERC20 paytoken;
        uint256 costvalue;
    }
   
  //allow token for minting 
    TokenInfo[] public AllowedCrypto;

    uint public constant MAX_SUPPLY = 100;
    uint256 public  PRICE = 0.0000000000000001 ether;
    uint256 public  MAX_PER_MINT = 5;

    string public baseTokenURI;

    constructor(string memory baseURI,bytes32 _root) ERC721("NFT Collectible", "NFTC") {
        setBaseURI(baseURI);
        root = _root;
      
    }

    function reserveNFTs() public onlyOwner {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(10) < MAX_SUPPLY, "Not enough NFTs left to reserve");

        for (uint i = 0; i < 10; i++) {
              uint newTokenID = _tokenIds.current();
             _safeMint(msg.sender, newTokenID);
             _tokenIds.increment();
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

//set when it will star
  function endTimer(uint period) public onlyOwner {
            end=period;
        }
//check countdown end or not
  function Countdown() public view returns (bool) {
 if(block.timestamp >=end){
return true;
 }else return false;

  }

//how much timeleft for starting NFT sale         
function timeLeft() public view returns(uint){
        return end-block.timestamp;
}


//only owner can call this function

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

//only owner can call this function

     function SetMaxmint(uint256 _newMax) public onlyOwner{
     MAX_PER_MINT = _newMax;
      }

//only owner can call this function
     function SetNewPrice(uint256 _PRICE) public onlyOwner{
       PRICE = _PRICE;
      }

  function changeRevealed(bool _revealed) public onlyOwner {
        revealed = _revealed;
    }

//return Token URL
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI_ = _baseURI();

        if (revealed) {
            return bytes(baseURI_).length > 0 ? string(abi.encodePacked(baseURI_, Strings.toString(tokenId), ".json")) : "";
    } else {
          return string(abi.encodePacked(baseURI_, "hidden.json"));
        }
    }

//add Token for minting...
 function addCurrency(
        IERC20 _paytoken,
        uint256 _costvalue
    ) public onlyOwner {
        AllowedCrypto.push(
            TokenInfo({
                paytoken: _paytoken,
                costvalue: _costvalue
            })
        );
    }

    function mintNFTs(uint _count,bytes32[] calldata proof,uint _pid) public  payable{
        require(Countdown(),"not started Yet");
        TokenInfo storage tokens = AllowedCrypto[_pid];
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        uint256 cost;
        cost = tokens.costvalue;
        require(isValid(proof, keccak256(abi.encodePacked(msg.sender))), "Not a part of Allowlist");
        uint totalMinted = _tokenIds.current();
        require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs left!");
        require(_count >0 && _count <= MAX_PER_MINT, "Cannot mint specified number of NFTs.");
        //require(msg.value >= PRICE.mul(_count), "Not enough ether to purchase NFTs.");
        if (msg.sender != owner()) {
            require(msg.value == cost * _count, "Not enough balance to complete transaction.");
            }

          for (uint256 i = 1; i <= _count; i++) {
                paytoken.transferFrom(msg.sender, address(this), cost);
                uint newTokenID = _tokenIds.current();
                _safeMint(msg.sender, newTokenID);
                 _tokenIds.increment();
            }
    }







    //check is addresss is valid or not
  function isValid(bytes32[] calldata proof, bytes32 leaf) public view returns (bool) {
        return MerkleProof.verify(proof, root, leaf);
    }

    function tokensOfOwner(address _owner) external view returns (uint[] memory) {

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

}



