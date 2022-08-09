// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./NFTCollection.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Marketplace is ERC721URIStorage,
ReentrancyGuard {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;



    // Index of auctions
    uint256 public index = 0;

    // Structure to define auction properties
    struct Auction {
        uint256 index; // Auction Index
        address addressNFTCollection; // Address of the ERC721 NFT Collection contract
        address addressPaymentToken; // Address of the ERC20 Payment Token contract
        uint256 nftId; // NFT Id
        address creator; // Creator of the Auction
        address payable currentBidOwner; // Address of the highest bider
        uint256 currentBidPrice; // Current highest bid for the auction
        uint256 BuyNowprice; // user don't need to bid..
        uint256 endAuction; // Timestamp for the end day&time of the auction
        uint256 bidCount; // Number of bid placed on the auction
        bool sold;
    }

    // Array will all auctions
    Auction[] private allAuctions;

    event NewAuction(
        uint256 index,
        address addressNFTCollection,
        address addressPaymentToken,
        uint256 nftId,
        address mintedBy,
        address currentBidOwner,
        uint256 currentBidPrice,
        uint256 BuyNowprice,
        uint256 endAuction,
        uint256 bidCount,
        bool sold
    );
    event NewBidOnAuction(uint256 auctionIndex, uint256 newBid,uint256 nftId);
    event NFTClaimed(uint256 auctionIndex, uint256 nftId, address claimedBy);
    event TokensClaimed(uint256 auctionIndex, uint256 nftId, address claimedBy);
    event Nftselltotopbidder(uint256 auctionIndex, uint256 nftId, address claimedBy,uint256 price,bool sold);
    event NFTRefunded(uint256 auctionIndex, uint256 nftId, address claimedBy);
    event BuyPriceSell(uint256 auctionIndex,uint256 Pirce,bool sold,uint256 nftId);
    event Updatebuyprice(uint256 auctionIndex,uint256 newpirce,uint256 nftId);
    event MintnewNFT(uint256 tokenId,address mintaddress,string metaUrl);


constructor() ERC721("Metaverse Tokens", "METT") {}
    /**
     * Check if a specific address is
     * a contract address
     * @param _addr: address to verify
     */
    function isContract(address _addr) private view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(_addr)
        }
        return size > 0;
    }



 /* Mints a token and lists it in the marketplace */
    function createToken(string calldata tokenURI) public {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();
      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      emit MintnewNFT(newTokenId,msg.sender,tokenURI);
    }


    function createAuction(
        address _addressNFTCollection,
        address _addressPaymentToken,
        uint256 _nftId,
        uint256 _endAuction,
        uint256 _Buynowprice
    ) external returns (uint256) {
        //Check is addresses are valid
        require(
            isContract(_addressNFTCollection),
            "Invalid NFT Collection contract address"
        );
        require(
            isContract(_addressPaymentToken),
            "Invalid Payment Token contract address"
        );

        // Check if the endAuction time is valid
        require(_endAuction > block.timestamp, "Invalid end date for auction");

        // Check if the initial bid price is > 0
        // require(_initialBid > 0, "Invalid initial bid price");

        // Get NFT collection contract
        NFTCollection nftCollection = NFTCollection(_addressNFTCollection);

        // Make sure the sender that wants to create a new auction
        // for a specific NFT is the owner of this NFT
        require(
            nftCollection.ownerOf(_nftId) == msg.sender,
            "Caller is not the owner of the NFT"
        );

        // Make sure the owner of the NFT approved that the MarketPlace contract
        // is allowed to change ownership of the NFT
        require(
            nftCollection.getApproved(_nftId) == address(this),
            "Require NFT ownership transfer approval"
        );
        
        // Lock NFT in Marketplace contract
        require(nftCollection.transferNFTFrom(msg.sender, address(this), _nftId));
   // 
      

        //Casting from address to address payable
        address payable currentBidOwner = payable(address(0));
        // Create new Auction object
        Auction memory newAuction = Auction({
            index: index,
            addressNFTCollection: _addressNFTCollection,
            addressPaymentToken: _addressPaymentToken,
            nftId: _nftId,
            creator: msg.sender,
            currentBidOwner: currentBidOwner,
            currentBidPrice: 0,
            BuyNowprice:_Buynowprice,
            endAuction: _endAuction,
            bidCount: 0,
            sold:false
        });

        //update list
        allAuctions.push(newAuction);

        // increment auction sequence
        index++;

        // Trigger event and return index of new auction
           emit NewAuction(
            index,
            _addressNFTCollection,
            _addressPaymentToken,
            _nftId,
            msg.sender,
            currentBidOwner,
            0,
            _Buynowprice,
            _endAuction,
            0,
            false
        );
        return index;
    }


//this is call when we create listed own collection..
    function owncreateAuction(
        address _addressPaymentToken,
        uint256 _nftId,
        uint256 _endAuction,
        uint256 _Buynowprice
    ) external returns (uint256) {
        //Check is addresses are valid
        require(
            isContract(_addressPaymentToken),
            "Invalid Payment Token contract address"
        );

        // Check if the endAuction time is valid
        require(_endAuction > block.timestamp, "Invalid end date for auction");

        // Check if the initial bid price is > 0
        // require(_initialBid > 0, "Invalid initial bid price");

        // Make sure the sender that wants to create a new auction
        // for a specific NFT is the owner of this NFT
        require(
            ownerOf(_nftId) == msg.sender,
            "Caller is not the owner of the NFT"
        );
        require(
            getApproved(_nftId) == address(this),
            "Require NFT ownership transfer approval"
        );
        
        // Lock NFT in Marketplace contract
        require(transferNFTFrom(msg.sender, address(this), _nftId));
   // 
      

        //Casting from address to address payable
        address payable currentBidOwner = payable(address(0));
        // Create new Auction object
        Auction memory newAuction = Auction({
            index: index,
            addressNFTCollection: address(this),
            addressPaymentToken: _addressPaymentToken,
            nftId: _nftId,
            creator: msg.sender,
            currentBidOwner: currentBidOwner,
            currentBidPrice: 0,
            BuyNowprice:_Buynowprice,
            endAuction: _endAuction,
            bidCount: 0,
            sold:false
        });

        //update list
        allAuctions.push(newAuction);

        // increment auction sequence
        index++;

        // Trigger event and return index of new auction
           emit NewAuction(
            index,
            address(this),
            _addressPaymentToken,
            _nftId,
            msg.sender,
            currentBidOwner,
            0,
            _Buynowprice,
            _endAuction,
            0,
            false
        );
        return index;
    }









    /**
     * Check if an auction is open
     * @param _auctionIndex Index of the auction
     */
    function isOpen(uint256 _auctionIndex) public view returns (bool) {
        Auction storage auction = allAuctions[_auctionIndex];
        if (block.timestamp >= auction.endAuction) return false;
        return true;
    }

    function transferNFTFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual returns (bool) {
        safeTransferFrom(from, to, tokenId);
        return true;
    }



    /**
     * Return the address of the current highest bider
     * for a specific auction
     * @param _auctionIndex Index of the auction
     */
    function getCurrentBidOwner(uint256 _auctionIndex)
        public
        view
        returns (address)
    {
        require(_auctionIndex < allAuctions.length, "Invalid auction index");
        return allAuctions[_auctionIndex].currentBidOwner;
    }

    /**
     * Return the current highest bid price
     * for a specific auction
     * @param _auctionIndex Index of the auction
     */
    function getCurrentBid(uint256 _auctionIndex)
        public
        view
        returns (uint256)
    {
        require(_auctionIndex < allAuctions.length, "Invalid auction index");
        return allAuctions[_auctionIndex].currentBidPrice;
    }


   // is sell done
  function isSelldone(uint256 _auctionIndex)
        public
        view
        returns (bool)
    {
          Auction storage auction = allAuctions[_auctionIndex];
        return auction.sold;
    }




    /**
     * Place new bid on a specific auction
     * @param _auctionIndex Index of auction
     * @param _newBid New bid price
     */
    function bid(uint256 _auctionIndex, uint256 _newBid)
        external
        returns (bool)
    {
        require(_auctionIndex < allAuctions.length, "Invalid auction index");
        Auction storage auction = allAuctions[_auctionIndex];

        // check if auction is still open
        require(isOpen(_auctionIndex), "Auction is not open");

        // check if new bid price is higher than the current one
        require(
            _newBid > auction.currentBidPrice,
            "New bid price must be higher than the current bid"
        );

        // check if new bider is not the owner
        require(
            msg.sender != auction.creator,
            "Creator of the auction cannot place new bid"
        );

        // get ERC20 token contract
        ERC20 paymentToken = ERC20(auction.addressPaymentToken);

        // new bid is better than current bid!

        // transfer token from new bider account to the marketplace account
        // to lock the tokens
        require(
            paymentToken.transferFrom(msg.sender, address(this), _newBid),
            "Tranfer of token failed"
        );

        // new bid is valid so must refund the current bid owner (if there is one!)
        if (auction.bidCount > 0) {
            paymentToken.transfer(
                auction.currentBidOwner,
                auction.currentBidPrice
            );
        }

        // update auction info
        address payable newBidOwner = payable(msg.sender);
        auction.currentBidOwner = newBidOwner;
        auction.currentBidPrice = _newBid;
        auction.bidCount++;

        // Trigger public event
       emit NewBidOnAuction(_auctionIndex, _newBid,auction.nftId);
        return true;
    }

    /**
     * Function used by the winner of an auction
     * to withdraw his NFT.
     * When the NFT is withdrawn, the creator of the
     * auction will receive the payment tokens in his wallet
     * @param _auctionIndex Index of auction
     */
    

  function DirectBuy(uint256 _auctionIndex,uint256 _price) external nonReentrant{

   require(_auctionIndex < allAuctions.length, "Invalid auction index");

        // Check if the auction is closed
    require(!isSelldone(_auctionIndex),"NFT sold");
       // require(!isOpen(_auctionIndex), "Auction is still open");
        //price !=0
        require(_price!=0,"zero price not allow");
         // Get auction
        Auction storage auction = allAuctions[_auctionIndex];
            NFTCollection nftCollection = NFTCollection(
            auction.addressNFTCollection
        );
       require(auction.currentBidPrice<=_price,"You can't buy this..Top bidder can buy");
        // get ERC20 token contract
        ERC20 paymentToken = ERC20(auction.addressPaymentToken);
       require(auction.BuyNowprice==_price,"price not same");
       require(nftCollection.transferNFTFrom(
                address(this),
                msg.sender,
                auction.nftId
               
            ),"Nft trsanfer failed");

        require(
            paymentToken.transferFrom(msg.sender,auction.creator, _price),
            "Tranfer of token failed"
        );

        // Transfer locked token from the marketplace
        // contract to the auction creator address
        require(
            paymentToken.transfer(auction.currentBidOwner, auction.currentBidPrice)
        );
        auction.sold = true;

emit BuyPriceSell(
_auctionIndex,
_price,
true,
auction.nftId
);
  }

    function claimNFT(uint256 _auctionIndex) external {
        require(_auctionIndex < allAuctions.length, "Invalid auction index");
        ///is sold
        require(!isSelldone(_auctionIndex),"NFT sold");
        // Check if the auction is closed
        require(!isOpen(_auctionIndex), "Auction is still open");

        // Get auction
        Auction storage auction = allAuctions[_auctionIndex];

        // Check if the caller is the winner of the auction
        require(
            auction.currentBidOwner == msg.sender,
            "NFT can be claimed only by the current bid owner"
        );

        // Get NFT collection contract
        NFTCollection nftCollection = NFTCollection(
            auction.addressNFTCollection
        );
        // Transfer NFT from marketplace contract
        // to the winner address
        require(
            nftCollection.transferNFTFrom(
                address(this),
                auction.currentBidOwner,
                _auctionIndex
            )
        );

        // Get ERC20 Payment token contract
        ERC20 paymentToken = ERC20(auction.addressPaymentToken);
        // Transfer locked token from the marketplace
        // contract to the auction creator address
        require(
            paymentToken.transfer(auction.creator, auction.currentBidPrice)
        );

        emit NFTClaimed(_auctionIndex, auction.nftId, msg.sender);
    }

    /**
     * Function used by the creator of an auction
     * to withdraw his tokens when the auction is closed
     * When the Token are withdrawn, the winned of the
     * auction will receive the NFT in his walled
     * @param _auctionIndex Index of the auction
     */

    function claimToken(uint256 _auctionIndex) external {
        require(_auctionIndex < allAuctions.length, "Invalid auction index"); // XXX Optimize

        // Check if the auction is closed
        require(!isOpen(_auctionIndex), "Auction is still open");
        
        require(!isSelldone(_auctionIndex),"NFT sold");
        // Get auction
        Auction storage auction = allAuctions[_auctionIndex];

        // Check if the caller is the creator of the auction
        require(
            auction.creator == msg.sender,
            "Tokens can be claimed only by the creator of the auction"
        );

        // Get NFT Collection contract
        NFTCollection nftCollection = NFTCollection(
            auction.addressNFTCollection
        );
        // Transfer NFT from marketplace contract
        // to the winned of the auction
        nftCollection.transferFrom(
            address(this),
            auction.currentBidOwner,
            auction.nftId
        );

        // Get ERC20 Payment token contract
        ERC20 paymentToken = ERC20(auction.addressPaymentToken);
        // Transfer locked tokens from the market place contract
        // to the wallet of the creator of the auction
        paymentToken.transfer(auction.creator, auction.currentBidPrice);

        emit TokensClaimed(_auctionIndex, auction.nftId, msg.sender);
    }



   // this function will allow you to sell ur nft to highest bidder

  function SellTokenToBider(uint256 _auctionIndex) external nonReentrant {

        require(_auctionIndex < allAuctions.length, "Invalid auction index"); // XXX Optimize
         
        require(!isSelldone(_auctionIndex),"NFT sold");
        // Get auction
        Auction storage auction = allAuctions[_auctionIndex];
         require(auction.currentBidPrice!=0,"zero price not allow");
        // Check if the caller is the creator of the auction
        require(
            auction.creator == msg.sender,
            "Tokens can be claimed only by the creator of the auction"
        );

        // Get NFT Collection contract
        NFTCollection nftCollection = NFTCollection(
            auction.addressNFTCollection
        );
        // Transfer NFT from marketplace contract
        // to the winned of the auction
        nftCollection.transferFrom(
            address(this),
            auction.currentBidOwner,
            auction.nftId
        );

        // Get ERC20 Payment token contract
        ERC20 paymentToken = ERC20(auction.addressPaymentToken);
        // Transfer locked tokens from the market place contract
        // to the wallet of the creator of the auction
        paymentToken.transfer(auction.creator, auction.currentBidPrice);
        auction.sold = true;  
        emit Nftselltotopbidder(
    _auctionIndex,
         auction.nftId,
       msg.sender,
       auction.currentBidPrice,
       true);
    }





  function Updateauctionprice(uint256 _auctionIndex,uint256 _price) external nonReentrant {

        require(_auctionIndex < allAuctions.length, "Invalid auction index"); // XXX Optimize
         
        require(!isSelldone(_auctionIndex),"NFT sold");
        // Get auction
        Auction storage auction = allAuctions[_auctionIndex];
         require(_price!=0,"zero price not allow");
        require(_price>auction.BuyNowprice,"price need big from old");
        // Check if the caller is the creator of the auction
        require(
            auction.creator == msg.sender,
            "Tokens can be claimed only by the creator of the auction"
        );

        auction.BuyNowprice = _price;  
        emit Updatebuyprice(_auctionIndex,_price,auction.nftId);
    }


    /**
     * Function used by the creator of an auction
     * to get his NFT back in case the auction is closed
     * but there is no bider to make the NFT won't stay locked
     * in the contract
     * @param _auctionIndex Index of the auction
     */
    function refund(uint256 _auctionIndex) external nonReentrant {
        require(_auctionIndex < allAuctions.length, "Invalid auction index");

        // Check if the auction is closed
        require(!isOpen(_auctionIndex), "Auction is still open");
        // Check if the auction is sold or not..
        require(!isSelldone(_auctionIndex),"NFT sold");
        // Get auction
        Auction storage auction = allAuctions[_auctionIndex];

        // Check if the caller is the creator of the auction
        require(
            auction.creator == msg.sender,
            "Tokens can be claimed only by the creator of the auction"
        );

        require(
            auction.currentBidOwner == address(0),
            "Existing bider for this auction"
        );

        // Get NFT Collection contract
        NFTCollection nftCollection = NFTCollection(
            auction.addressNFTCollection
        );
        // Transfer NFT back from marketplace contract
        // to the creator of the auction
        nftCollection.transferFrom(
            address(this),
            auction.creator,
            auction.nftId
        );
        emit NFTRefunded(_auctionIndex, auction.nftId, msg.sender);
    }




    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual  returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
