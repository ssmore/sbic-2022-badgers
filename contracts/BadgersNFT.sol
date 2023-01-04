// Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BadgersNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _idCounter;

    mapping(uint256 => string) public titleMap;
    mapping(uint256 => string) public descMap;
    mapping(uint256 => address) public senderMap;
    mapping(uint256 => uint256) public dateMap;

    constructor() ERC721("BadgersNFT", "BDG") {}

    function safeMint(address to, string memory title, string memory uri, string memory desc, address sender, uint256 date) public onlyOwner {
        uint256 tokenId = _idCounter.current();
        _idCounter.increment();

        _safeMint(to, tokenId);

        titleMap[tokenId] = title;
        descMap[tokenId] = desc;
        senderMap[tokenId] = sender;
        dateMap[tokenId] = date;
        _setTokenURI(tokenId, uri);
    }

    function getTokensOfOwner(address owner) public view 
        returns (uint256[] memory)
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

    function getTokenDetails(uint256 tokenId) public view
        returns (string memory title, string memory _tokenURI, string memory desc, address sender, uint256 date)
    {
        return (titleMap[tokenId], super.tokenURI(tokenId), descMap[tokenId], senderMap[tokenId], dateMap[tokenId]);
    }
    
    // From Contracts Wizard https://docs.openzeppelin.com/contracts/4.x/wizard
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
}