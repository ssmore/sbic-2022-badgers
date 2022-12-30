// Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BadgersNFT is ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _idCounter;

    mapping(uint256 => string) public skillNameMap;

    constructor() ERC721("BadgersNFT", "BDG") {}

    function mint(address recipient, string memory skillName, string memory _tokenURI) public
        returns (uint256)
    {
        _idCounter.increment();
        uint256 tokenId = _idCounter.current();
        
        _safeMint(recipient, tokenId);

        skillNameMap[tokenId] = skillName;
        _setTokenURI(tokenId, _tokenURI);
        return tokenId;
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

    function getSkillName(uint256 tokenId) public view
        returns (string memory)
    {
        return skillNameMap[tokenId];
    }

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