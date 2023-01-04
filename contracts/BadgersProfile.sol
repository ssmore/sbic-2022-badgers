// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BadgersProfile {

    struct Review {
        address reviewer;
        string image;
        string description;
    }

    struct Experience {
        string company;
        string title;
        uint256 startDate;
        uint256 endDate;
        string category;
        uint256[] badges;
        string image;
        string description;
    }

    struct User {
        string name;
        string image;
        Experience[] experiences;
        Review[] reviews;
    }
    
    mapping(address => User) public userMap;

    function createProfile(string memory displayName, string memory imageURI) public
    {
        User storage user = userMap[msg.sender];
        require(bytes(user.name).length == 0, "USER_EXISTS");

        user.name = displayName;
        user.image = imageURI;
        userMap[msg.sender] = user;
    }

    function addExperience(string memory company, string memory title, uint256 startDate, 
                            uint256 endDate, string memory category, string memory image, 
                            string memory description) public 
    {
        User storage user = userMap[msg.sender];
        require(bytes(user.name).length != 0, "USER_NOT_EXIST");

        Experience memory experience = Experience(company, title, startDate, endDate, category, new uint256[](0), image, description);
        
        Experience[] storage experiences = user.experiences;
        experiences.push(experience);
        user.experiences = experiences;
    }

    function getExperiencesOfUser(address userAddress) public view
        returns (string[] memory companies, string[] memory titles, uint256[] memory startDates, 
                    uint256[] memory endDates, string[] memory categories, string[] memory images, 
                    string[] memory descriptions)
    {
        User memory user = userMap[userAddress];
        require(bytes(user.name).length != 0, "USER_NOT_EXIST");

        uint256 arrLength = user.experiences.length;
        string[] memory _companies = new string[](arrLength);
        string[] memory _titles = new string[](arrLength);
        uint256[] memory _startDates = new uint256[](arrLength);
        uint256[] memory _endDates = new uint256[](arrLength);
        string[] memory _categories = new string[](arrLength);
        string[] memory _images = new string[](arrLength);
        string[] memory _descriptions = new string[](arrLength);

        for (uint idx = 0; idx < user.experiences.length; idx++) {
            Experience memory experience = user.experiences[idx];
            _companies[idx] = experience.company;
            _titles[idx] = experience.title;
            _startDates[idx] = experience.startDate;
            _endDates[idx] = experience.endDate;
            _categories[idx] = experience.category;
            _images[idx] = experience.image;
            _descriptions[idx] = experience.description;
        }

        return (_companies, _titles, _startDates, _endDates, _categories, _images, _descriptions);
    }

    function addBadgeToExperience(address recipientAddress, uint expIdx, uint256 tokenId) public 
    {
        User memory sender = userMap[msg.sender];
        require(bytes(sender.name).length != 0, "SENDER_NOT_REGISTERED");

        User storage recipient = userMap[recipientAddress];
        require(bytes(recipient.name).length != 0, "RECIPIENT_NOT_EXIST");

        Experience[] storage experiences = recipient.experiences;
        require((expIdx >= 0) && (expIdx < experiences.length), "INDEX_OUT_OF_RANGE");

        Experience storage experience = experiences[expIdx];
        uint256[] storage badges = experience.badges;

        badges.push(tokenId);
        experience.badges = badges;
        experiences[expIdx] = experience;
        recipient.experiences = experiences;
    }

    function getBadgesOfExperience(address userAddress, uint256 expIdx) public view
        returns (uint256[] memory tokenIds)
    {
        User storage user = userMap[userAddress];
        require(bytes(user.name).length != 0, "USER_NOT_EXIST");

        Experience[] storage experiences = user.experiences;
        require((expIdx >= 0) && (expIdx < experiences.length), "INDEX_OUT_OF_RANGE");

        return user.experiences[expIdx].badges;
    }

    function addReview(address recipient, string memory image, string memory description) public 
    {
        User storage user = userMap[recipient];
        require(bytes(user.name).length != 0, "USER_NOT_EXIST");

        Review memory review = Review(msg.sender, image, description);
        
        Review[] storage reviews = user.reviews;
        reviews.push(review);
        user.reviews = reviews;
    }

    function getReviewsOfUser(address userAddress) public view
        returns (address[] memory reviewers, string[] memory images, string[] memory descriptions)
    {
        User storage user = userMap[userAddress];
        require(bytes(user.name).length != 0, "USER_NOT_EXIST");

        uint256 arrLength = user.reviews.length;
        address[] memory _reviewers = new address[](arrLength);
        string[] memory _images = new string[](arrLength);
        string[] memory _descriptions = new string[](arrLength);

        for (uint idx = 0; idx < user.reviews.length; idx++) {
            Review memory review = user.reviews[idx];
            _reviewers[idx] = review.reviewer;
            _images[idx] = review.image;
            _descriptions[idx] = review.description;
        }

        return (_reviewers, _images, _descriptions);
    }
    
}