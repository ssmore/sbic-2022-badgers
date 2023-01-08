# Badgers

## Summary ##

Badgers is a decentralized application that allows users to issue and display badges which serve as indicators of professional skills and experiences. Badgers aims to create a future of work where only skills matter. By leveraging blockchain technology, Badgers hopes to create reliable, transparent and dynamic professional profiles for the workers of tomorrow - helping them get the best jobs and opportunities in a truly unbiased manner.

## Installation ##

1. Clone the repo
2. Install NPM packages
```
npm install
```
3. Enter your enviroment variables in .env in the frontend folder
```
REACT_APP_API_KEY=ENTER ALCHEMY KEY
REACT_APP_PRIVATE_KEY=ENTER CONTRACT CREATOR's WALLET PRIVATE KEY
```
4. To Start Server:
```
npm start
```

5. Navigate to ```localhost:3000``` to utilize the app

## Badgers Overview ##

### Product Overview ###

Badgers is a decentralized application (dApp) which facilitates the public display of NFTs with the aim of creating a visual profile of users’ professional lives. Badgers has four key features - namely Badgers Profile, Badges Wall, Badgers Reviews and Badgers Analytics.

Badgers Profile

The Badgers Profile is a page that showcases the professional history and attributes of the user/subject. The page is largely similar in content to the Web2 alternatives of today, except with minimal qualitative elaboration. Key information which can be populated in the Badgers Profile are companies which the subject has worked for and the roles undertaken within these companies. There could be an optional simple 1-2 liner description of these roles, with an enforced character limitation, but otherwise, there should be minimal subjective personal inputs. This is also the only portion which can be actively managed by the subject.

One key aspect of the Badgers Profile is its anonymity. This design decision was taken in response to the increasing focus of companies on ESG objectives - with a major aspect being fair and nondiscriminatory hiring. Today, most enterprises concentrate their efforts on mechanisms such as tracking of the gender ratios of hires and creating highly-specific recruitment campaigns such as those focusing on back-to-work mothers or older workers. Badgers believes that a better way to ensure fair hiring is to remove all unnecessary consideration variables. This includes variables such as the name, race, religion, gender, nationality, amongst others. These variables are actively displayed on Web2 platforms today - and their effects on the biasing of processes such as gathering recruitment leads, interviewing, etc. are well established (Kroll et al., 2021). By leveraging a Web3 wallet connection, Badgers profiles can be afforded full anonymity on the platform - while not compromising the verifiability and traceability of the content attributed to these profiles. The Badgers platform itself is unable to identify profiles definitively - unlike anonymization mechanisms in Web2 where the service provider needs to maintain a mapping of the profile to the user’s actual identity. Subjects can share their specific Badgers Profile URL or handle to allow certain people visibility of their identities - for example to conclude a job offer, or to enable a colleague to issue a badge to their Badgers Profile. As will be outlined later, functionality extensions such as voice masking or metaverse interviews can ensure full end-to-end anonymity and preserve the integrity of the interview process.

Badges Wall

The Badges Wall is essentially the blank canvas on which the subject’s badges - which are essentially NFTs - can be embellished. Badgers badges are soulbound tokens which cannot be transferred. This means once a contact issues a badge to the subject, he/she cannot remove it from his/her Wall until it eventually expires. Even upon expiry, the issuance and expiry of the badge is recorded in the blockchain for all of perpetuity - forming a rich repository of the entire badging history of the subject. Issuance of tokens can only be done by people with a Badgers account. This process is intentionally made simple to minimize the administrative load of badge issuance, and consists of only a few pieces of mandatory information such as recipient’s account, hard/soft skills badge, description, and optional fields such as uploading an image. 

There are two types of Badgers badges - namely Permanent Badges and Refreshable Badges. 

<<insert image>>

In the Permanent Badges category, there could be various types of issuers. Obvious ones would be educational institutions which can issue official badges that are tied to permanent accreditations or degrees which they confer. Another possibility would be companies which can issue badges to celebrate certain achievements such as long service or the winning of a hackathon. These Permanent Badges are usually issued by legitimate organizations, and represent a possible monetization lever for Badgers.

Refreshable Badges, on the other hand, are usually issued between individuals. They can also be segregated by type. The most basic categories would be Hard Skills and Soft Skills. Hard Skills would include skills of a technical nature (e.g., programming, product management, vendor assessment, etc.) and also linguistic ones. Soft Skills would be personal qualities such as collaborativeness, leadership, etc. These Refreshable Badges - as the name suggests - require periodic refreshing through deliberate action taken by the issuer. For example, the issuer may be prompted a quick question such as “Rate Sam’s PowerPoint skills from 0 to 10” every 2 weeks, or individuals could perform skills refreshes through potential partners like Udemy or LeetCode. Once the question is answered or the user has gone through some form of online skills evaluation, the token automatically refreshes until the next prompt. Therefore, they are the key means through which the dynamism of a subject’s Badgers Profile is maintained. It is also through this same mechanism that Badgers facilitate the measurement and tracking of specific skills which the subject wishes to develop.

Badgers Reviews

The Testimonials section of the Badgers Reviews feature can be viewed as an extension of the Badges Wall feature, in that it is a display of the qualitative inputs from the badge creation process. These metadata of the badges enable profile visitors a deeper and more nuanced view of the qualities of the subject beyond the initial "birds eye view" afforded by the visually expansive Badges Wall. 

A second section in the Badgers Reviews feature is the Skills section. This is where basic visualizations and analytics (for example the aggregation of badges according to their specifications - such as "John has 4 endorsements of their Powerpoint skills"). These basic statistics are laid out in a straightforward and intuitive manner through data visualizations - the main objective of which is to allow a visitor an instant appreciation of the main professional strengths of the subject. While this is useful for cursory research of professional contacts, deeper analytics need to be had for more critical use cases such as recruitment. This can be found in Badgers Analytics.

Badgers Analytics
 
The final feature, and the only paid feature in the Badgers minimum viable product, is Badgers Analytics. Badgers Analytics is a dashboard consisting of data views and visualizations which can allow a paying user (e.g., a recruiter or hiring manager) a detailed view of the entire badging history of the subject. Some example views could include the most frequently refreshed token during a specific time period with a certain employer, prematurely expired tokens, skills rating inputs over time (from the question prompts which enable the tokens to refresh), and many others. These data views help provide greater depth to the subject’s professional profile than would be possible with the static view of the Badges Wall. These insights would, of course, not be required for most use cases. They would, however, be of immense value for a company when making final assessments of a candidate before offering a job. The subject would also be able to access these views (for free) and use it for his/her developmental discussions with his/her superior.






