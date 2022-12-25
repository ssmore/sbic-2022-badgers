// Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BadgersNFT is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _idCounter;

    constructor() ERC721("BadgersNFT", "BDG") {}

    function mint(address recipient) public
        returns (uint256)
    {
        _idCounter.increment();
        uint256 tokenId = _idCounter.current();
        
        _safeMint(recipient, tokenId);
        return tokenId;
    }

    function getTokensOfOwner(address owner) public 
        returns (uint256[])
    {
        uint256 num_tokens = balanceOf(owner);
        require(num_tokens > 0, "NO_TOKEN_IN_POSSESSION");
        
        uint256[] memory tokenIds = new uint256[](num_tokens); 
        for (uint256 idx = 0; idx < num_tokens; idx++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, idx);
            tokenIds[idx] = tokenId;
        }
        
        return tokenIds;
    }
    
}