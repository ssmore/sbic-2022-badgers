import { ethers } from "ethers";

require("dotenv").config()
const PROFILE_CONTRACT_ADDRESS = process.env.PROFILE_CONTRACT_ADDRESS;

const contract = require("../../contracts/artifacts/BadgersProfile.json");  // TODO: Deploy contract via Remix and get artifact
const abi = contract.abi;

const signer ; // TODO

async function getContract() {
    const profileContract = new ethers.Contract(PROFILE_CONTRACT_ADDRESS, abi, signer);
    return profileContract;
}

async function createProfile(contract, displayName, image) {
    const txn = await contract.createProfile(displayName, image);
    const txnReceipt = await txn.wait();
    
    return txnReceipt.status == 1;
}

async function addExperience(contract, company, title, startDate, endDate, category, image, description) {
    const txn = await contract.addExperience(company, title, startDate, endDate, category, image, description);
    const txnReceipt = await txn.wait();
    
    return txnReceipt.status == 1;
}

async function getExperiencesOfUser(contract, user) {
    const details = await contract.getExperiencesOfUser(user);

    companies = details[0];
    titles = details[1];
    startDates = details[2];
    endDates = details[3];
    categories = details[4];
    images = details[5];
    descriptions = details[6];

    let experiences = [];
    for (let idx = 0; idx < companies.length; idx++) {
        let badges = await contract.getBadgesOfExperience(user, idx);
        badges = badges.map(b => parseInt(b, 10));
        badges = await Promise.all(badges.map(async (b) => await getTokenDetails(await getNFTContract(), b)));

        let experience = {
            "company": companies[idx],
            "title": titles[idx],
            "startDate": (new Date (parseInt(startDates[idx], 10))).toISOString(),
            "endDate": (new Date (parseInt(endDates[idx], 10))).toISOString(),
            "category": categories[idx],
            "image": images[idx],
            "description": descriptions[idx],
            "badges": badges
        };
        experiences.push(experience);
    }
    return experiences;
}

async function addBadgeToExperience(contract, user, expIdx, tokenId) {
    const txn = await contract.addBadgeToExperience(user, expIdx, tokenId);
    const txnReceipt = await txn.wait();
    
    return txnReceipt.status == 1;
}

async function addReview(contract, recipient, image, desc) {
    const txn = await contract.addReview(recipient, image, desc);
    const txnReceipt = await txn.wait();
    
    return txnReceipt.status == 1;
}

async function getReviewsOfUser(contract, user) {
    const details = await contract.getReviewsOfUser(user);

    reviewers = details[0];
    images = details[1];
    descriptions = details[2];

    let reviews = [];
    for (let idx = 0; idx < reviewers.length; idx++) {
        let review = {
            "reviewer": reviewers[idx],
            "image": images[idx],
            "description": descriptions[idx]
        };
        reviews.push(review);
    }
    return reviews;
}
