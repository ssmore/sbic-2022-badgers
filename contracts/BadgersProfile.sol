// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BadgersProfile {

    struct Experience {
        string company;
        string position;
        string description;
        mapping[string => uint256[]] skillToBadgeMap;
    }

    struct User {
        string name,
        Experience[] experiences
    }
    
    mapping(address => User) public userMap;

    function createProfile(string displayName) public
    {
        User memory user = userMap[msg.sender];
        require(bytes(user) == 0, "USER_EXISTS");
        
        userMap[msg.sender] = User(displayName, 0);
    }

    function updateDisplayName(string displayName) public
    {
        User memory user = userMap[msg.sender];
        require(bytes(user) != 0, "USER_NOT_EXIST");
        
        user.name = displayName;
        userMap[msg.sender] = user;
    }

    function removeProfile() public
    {
        User memory user = userMap[msg.sender];
        require(bytes(user) != 0, "USER_NOT_EXIST");

        delete userMap[msg.sender];
    }

    function addExperience(string company, string position, string description) public 
    {
        User memory user = userMap[msg.sender];
        require(bytes(user) != 0, "USER_NOT_EXIST");

        Experience memory experience = Experience(company, position, description);
        
        if (bytes(user.experiences) == 0) {
            // User has no experiences, adding first experience
            Experience[] memory experiences;
        } else {
            Experience[] memory experiences = user.experiences;
        }

        experiences.push(experience);
        user.experiences = experiences;
    }

    function updateExperience(uint idx, string company, string position, string description) public 
    {
        User memory user = userMap[msg.sender];
        require(bytes(user) != 0, "USER_NOT_EXIST");

        Experience[] memory experiences = user.experiences;
        require((idx >= 0) && (idx < experiences.length), "INDEX_OUT_OF_RANGE");

        Experience memory experience = Experience(company, position, description);
        experiences[idx] = experience;
        user.experiences = experiences;
    }

    function removeExperience(uint idx) public 
    {
        User memory user = userMap[msg.sender];
        require(bytes(user) != 0, "USER_NOT_EXIST");

        Experience[] memory experiences = user.experiences;
        require((idx >= 0) && (idx < experiences.length), "INDEX_OUT_OF_RANGE");

        experiences[idx] = experiences[experiences.length-1];  // Order not preserved
        experiences.pop();
    }

    function addBadgeToExperience(address recipientAddress, uint expIdx, string skillName, int256 tokenId) public 
    {
        User memory sender = userMap[msg.sender];
        require(bytes(sender) != 0, "SENDER_NOT_REGISTERED");

        User memory recipient = userMap[recipientAddress];
        require(bytes(recipient) != 0, "RECIPIENT_NOT_EXIST");

        Experience[] memory experiences = recipient.experiences;
        require((expIdx >= 0) && (expIdx < experiences.length), "INDEX_OUT_OF_RANGE");

        Experience memory experience = experiences[expIdx];
        if (bytes(experience.skillToBadgeMap) == 0) {
            // User has no skill in this experience
            mapping[string => uint256[]] memory skillToBadgeMap;
        } else {
            mapping[string => uint256[]] memory skillToBadgeMap = experience.skillToBadgeMap;
        }

        if (bytes(skillToBadgeMap[skillName]) == 0) {
            // User has no badge in this experience
            uint256[] memory badges;
        } else {
            uint256[] memory badges = skillToBadgeMap[skillName];
        }

        badges.push(tokenId);
        skillToBadgeMap[skillName] = badges;
        experience.skillToBadgeMap = skillToBadgeMap;
        experiences[expIdx] = experience;
        recipient.experiences = experiences;
    }
    
}