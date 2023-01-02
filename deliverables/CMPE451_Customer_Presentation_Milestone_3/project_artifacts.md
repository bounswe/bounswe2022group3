# Project Artifacts
- [Project Artifacts](#project-artifacts)
  - [Manuals](#manuals)
    - [User Manual](#user-manual)
      - [Introduction](#introduction)
      - [Getting Started](#getting-started)
      - [Features](#features)
      - [Using the Platform](#using-the-platform)
      - [Troubleshooting](#troubleshooting)
      - [Technical Specifications](#technical-specifications)
    - [System Manual](#system-manual)
      - [Running with Docker](#running-with-docker)
      - [Database](#database)
      - [Semantic Search Engine](#semantic-search-engine)
      - [Annotation Server](#annotation-server)
      - [Backend](#backend)
        - [Setting up the environment](#setting-up-the-environment)
      - [Frontend](#frontend)
        - [Setting up the environment](#setting-up-the-environment-1)
        - [Building and running](#building-and-running)
      - [Mobile](#mobile)
  - [Software Requirements Specification (SRS)](#software-requirements-specification-srs)
    - [Glossary](#glossary)
    - [Functional Requirements](#functional-requirements)
      - [User Requirements](#user-requirements)
      - [System Requirements](#system-requirements)
    - [Non-Functional Requirements](#non-functional-requirements)
  - [Software design documents (using UML)](#software-design-documents-using-uml)
    - [Use-Case Diagrams](#use-case-diagrams)
    - [Class Diagrams](#class-diagrams)
    - [Sequence Diagrams](#sequence-diagrams)
  - [User scenarios and mockups](#user-scenarios-and-mockups)
    - [Scenario 1](#scenario-1)
      - [The User, Persona](#the-user-persona)
      - [User Goals](#user-goals)
      - [Preconditions](#preconditions)
      - [Scenario, Actions](#scenario-actions)
      - [Acceptance Criteria](#acceptance-criteria)
    - [Mockup 1](#mockup-1)
      - [Web Mockup](#web-mockup)
      - [Mobile Mockup](#mobile-mockup)
    - [Scenario 2](#scenario-2)
      - [The User - Persona](#the-user---persona)
      - [User Goals](#user-goals-1)
      - [Preconditions](#preconditions-1)
      - [Scenario Actions](#scenario-actions-1)
      - [Acceptance Criteria](#acceptance-criteria-1)
    - [Mockup 2](#mockup-2)
      - [Web Mockup](#web-mockup-1)
      - [Mobile Mockup](#mobile-mockup-1)
    - [Scenario 3](#scenario-3)
      - [The User, Persona ](#the-user-persona-)
      - [User Goals](#user-goals-2)
      - [Preconditions](#preconditions-2)
      - [Scenario Actions](#scenario-actions-2)
      - [Acceptance Criteria](#acceptance-criteria-2)
    - [Mockup 3](#mockup-3)
      - [Web Mockup](#web-mockup-2)
      - [Mobile Mockup](#mobile-mockup-2)
  - [Project plan](#project-plan)


## Manuals

### User Manual

#### Introduction
- Welcome to the Bucademy!
- This manual provides instructions on how to use the platform and its various features.
- Please read this manual carefully before using the platform.

#### Getting Started
- To start using the platform, you will need to create an account.
- Go to the platform's website and click on the "Join The Platform" button.
- Fill out the registration form and click "Submit".
- Once your account is created, log in to the platform using your email address and password.
#### Features
The platform has several features that you can use:
- Home page: This is the home page of the platform. It displays existing spaces on the platform that you can browse and search.
- My spaces: This is your dashboard. You can view and reach the spaces you created and joined. It is reachable from homepage once you log in.
- Spaces: Our platform built upon learning spaces. You can create your space or join to any space you want. After getting into a space, you can see many other features of our platform.
- Profile: This is where you can view and edit your personal information. You can view it using the profile button on the top bar.
- Activities: You can view the activites of yourself and the users you follow using the bell on the top bar such as "Ahmet created a new resource", "Ali started a new discussion" etc. 
- Resources: Once you get in to a space, resources page welcomes you. You can see every resource created on the space from this page. You can also create resource yourself, using "+" buttons under the topics.
- Discussion: Inside the space, on the left bar, discussions page is accessible. You can interact with people, discuss about resources etc. in there.
- Events: Inside the space, on the left bar, events page is accessible. Space members create events to meet-up with other members and do an event, mostly related to space context, like climbing trip. Any space member can create an event and invite other members using discussions.
- Notes: To create a note, you must visit a resource, on top left, you would see "Add New Note" button which would allow you to create a note about the resource you were visiting. To view all the notes you created, use the left bar, notes page is accessible there. Notes page displays the notes you created for the related space.

#### Using the Platform
To use the platform, follow these steps:
- Log in to the platform using your email address and password.
- Click on the space that you want to view.
- Join the space and access all the features described above.

#### Troubleshooting
If you encounter any issues while using the platform, try the following:
- Check the platform's website for updates and known issues.
- Make sure that you are using the latest version of the platform.
- Check your internet connection.
- If the issue persists, contact the platform's support team for assistance.
#### Technical Specifications
The platform has the following technical specifications:
- Supported operating systems: Windows 10, macOS 10.13 and higher
- Minimum hardware requirements: 4 GB RAM, 2 GHz processor
- Supported browsers: Google Chrome, Mozilla Firefox, Microsoft Edge
- Internet connection: broadband recommended

### System Manual

#### Running with Docker
#### Database
```bash
docker run --net host -it -d --name mongo mongo:latest 
```
#### Semantic Search Engine
1. Go to the [semantic_search_server](https://github.com/bounswe/bounswe2022group3/tree/master/app/semantic_search_server) folder
2. Build the docker image with `docker build -t semantic:latest .`
3. Run the container with `docker run --name semanticsearch -d -p 9060:9060 semantic`

#### Annotation Server
1. Go to the [annotation_server](https://github.com/bounswe/bounswe2022group3/tree/master/app/annotation_server) folder.
2. Create a `.env` file **in the `src` folder** with the following content
```bash
DB=mongodb://localhost:27017/annotation
PORT=4000
FRONTEND_URL = http://localhost:8008
JWT_AC_KEY = verysecretvalue_ac
JWT_REF_KEY = verysecretvalue_ref
```
3. Build the docker image with `docker build -t annotation:latest .`
4. Run the container with `docker run --name annotation -d --net host annotation:latest`

#### Backend
##### Setting up the environment
1. Go to the server **folder**
2. Create a `.env` file in `src/` folder with the following variables
```bash
PORT=5000
GMAIL_USERNAME=bucademy@gmail.com
GMAIL_PASSWORD=<EMAIL_PASSWORD>
JWT_AC_KEY = verysecretvalue_ac
JWT_REF_KEY = verysecretvalue_ref
FRONTEND_URL = http://localhost:8008
DB=mongodb://localhost:27017/bucademy
SEMANTIC_SEARCH_SERVER_URL=http://localhost:9060
```
3. Build the docker image with `docker build -t server:latest .`
4. Run the container with `docker run --net host -it -d --name server server:latest`

#### Frontend
##### Setting up the environment
1. Go to the client folder
2. Update the `API_URL` variable in `next.config.json` file. In our case, set it to `http://localhost:5000`
2. Update the `ANNOTATION_API_URL` variable in `next.config.json` file. In our case, set it to `http://localhost:4000`
##### Building and running 
```bash
docker build -t client:latest .
docker run --net host --name front client:latest
```
Go to localhost:8008 in your browser

#### Mobile
1. First of all, you must have flutter installed in your machine. Since installation process varies between different operating systems, you can check out the [installation documentation](https://docs.flutter.dev/get-started/install)
2. Similarly, you must install [Android Studio](https://developer.android.com/studio) and launch an emulator
3. Go to the [mobile][https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile] folder
4. After making sure the emulator is running, run `flutter run`



## Software Requirements Specification (SRS)

### Glossary
- **Account Activation**: Confirmation of an account registration.
- **Achievements**: A record of completed sections and/or learning spaces of a user.
- **Activities**: A record of operations done by a user (e.g. Taken notes, saved notes, following a user, joining in a learning space, etc.).
- **Admin User:** The type of user, who is responsible for the moderation of the system.
- **Annotation**: Resource referring to some other resource.
- **Badge:** The thing users gain when they complete some topics of learning spaces, or achieve the basic system milestones.
- **Banning a user:** Taking away a user's access to the platform.
- **Bio**: “About me” section of a user.
- **Topic:** A part of a learning space that consists of learning space resources, if a user completes a topic, that has a badge  they will receive a badge
- **Comment**: A text typed down by users when they reply, mention or thread messages.
- **Communication channel**: A platform users can use to get in touch.
- **Learning Space**: Structured educational resource that is uploaded by lecturers.
- **Learning Space Resource:** A part of a learning space that consists of a part of the learning space material. It can be only text or supported with audiovisual media.
- **Discussion:** A forum-like post inside learning spaces that is used to ask questions or exchange information.
- **Event**: Planned organization in which the attendees are users of this platform.
- **Feedback:** A text consisting of thoughts of joined learners of a learning space about that learning space.
- **Geolocation**: The actual location(latitude and longitude) of the user.
- **Interests**: A user's preferred topics and learning spaces.
- **Interface**: The graphical platform provided by this application to supply users with ease of use.
- **Knowledge**: A user's previous experience consisting of given learning spaces if the user is a lecturer and completed learning spaces if the user is learner.
- **Learner**: The type of user that is joined in a learning space.
- **Lecturer**: ~~Users that can create learning spaces and have admin privileges on the learning spaces they created, such as uploading resources, creating events and creating polls.~~
- **Note Taking**: The act of recording information.
- **Meeting**: An assembly of users, created by users.
- **Organizer**: The creator of an event.
- **Poll**: A collection of opinions on a chosen matter, taken by learners, created and given by lecturers.
- **Popularity**: A degree of positive and negative opinions on a lecturer, a learning space, or other resource in the application.
- **Prerequisite Learning space**: A learning space that is required to take another learning space.
- **Profile Page**: A page of a user giving information about that user.
- **Public Profile**: A profile page that every user of the application can view.
- **Private Profile**: A profile page that is only visible to that user's followers.
- **Rating:**  A point from 1 to 5, of a learning space or a user that has created learning spaces.
- **Recommendation**: The component of the application that can provide suggestions according to a user's past activities, interests, and followings.
- **Reputation**: Degree of a lecturer's past achievements, experience and influence on others.
- **Users**: People who are registered to the application and using it.
- **Semantic resources**: Resources that have correlation between their meaning.
- **Tag**: Identification labels of topics and learning spaces.
- **Topic:** A label that describes which category a learning space belongs to. 

### Functional Requirements
#### User Requirements
<details>
  <summary><b>1.1 Account Features</b></summary>
  
* 1.1.1 Registration 	
    *  1.1.1.1. Users shall be able to register using a valid and unique email address, a username, and a password as defined in the security section.
        *  1.1.1.1.1.  Users who are registered by providing their emails shall confirm their accounts via the link sent in the confirmation email.
    *  1.1.1.2. Users shall be able to register using their Google account.
* 1.1.2 Log In
    * 1.1.2.1. Users shall be able to log into their account using their email and password combination.
    * 1.1.2.2. Users shall be able to log into their account using their Google account (if they have previously completed 1.1.1.2.).
    * 1.1.2.3.  If a user enters their password wrong three times while logging in their password will be invalidated. They will receive a warning email containing a link to reset their password.
    * 1.1.2.4. Users shall be able to reset their password via email verification.
* 1.1.3 Log Out
    * 1.1.3.1 Users shall be able to log out of their account.
</details>

<details>
  <summary><b>1.2. Profile</b></summary>
  
* 1.2.1. Users shall have their own profiles.
* 1.2.2. Users shall be able to use the features of their profile page. (described in 2.1.2.)
</details>

<details>
  <summary><b>1.3. User Actions</b></summary>

- 1.3.1. Users shall be able to block other users. (described in 3.3.6)
    - 1.3.1.1 Blocked users shall not be able to view the blocking user’s profile, join to their learning spaces, and comment on discussion posts they have created.
- 1.3.2. Users shall be able to follow other users. (described in 2.1.3)
- 1.3.3. Users shall be able to use the discussion channel of the learning spaces they joined in. (described in 2.2.)
    - 1.3.3.1. Users shall be able to open a discussion post to ask questions.
    - 1.3.3.2. Users shall be able to make a comment to an existing discussion post.
- 1.3.4. Users shall be able to use note taking features.
    - 1.3.4.1. Users shall be able to create notes.
    - 1.3.4.2. Users shall be able to save notes in their profile page.
    - 1.3.4.3. Users shall be able to view their saved notes on their profile page.
        - 1.3.4.3.1. Users should be able to sort notes according to date.
        - 1.3.4.3.2. Users should be able to filter notes by learning space name.
    - 1.3.4.4. Users shall be able to delete or edit their notes.
    - 1.3.4.5. Users shall be able to connect, annotate and tag notes.
    - 1.3.4.6. Users shall be able to share their notes with other users.
- 1.3.5. Users shall be able to use the search engine (described in 2.5.)
- 1.3.6. Users shall be able to use the annotation features. (described in 2.6.)
    - 1.3.6.1. User shall select a portion of the text to annotate.
    - 1.3.6.2. User should be able to turn on and off annotation visibility.
- 1.3.7. Users shall be able to join to any learning space they want to.
- 1.3.8. Users shall be able to open a learning space in any subject and they don't need to provide any document regarding their experience on the topic.
    - 1.3.8.1. Lecturers shall be able to create polls, allowed to be filled by the students joined in their learning space. The anonymity and/or the obligation of the poll shall be decided by the lecturer and declared to the students.
    - 1.3.8.5. Users shall be able to create topics and resources for their learning space and any other learning space as well.
    - 1.3.8.6. Users shall be able to delete topics and resources under their learning space.
    - 1.3.8.7. Users shall be able to delete topics and resources they created for any learning space.
- 1.3.9. Users shall be able to delete their accounts.
- 1.3.10. Users shall be able to change their password.
- 1.3.11. Users shall be able to join the attendance list of the event that they would like to participate, for their joined classes, in the case that quota is not full.
- 1.3.12. Users shall be able to give feedback, consisting of a compulsory rating point between one to five and an optional text explaining their thoughts, to the classes they have joined in.
- 1.3.13. Users shall be able to comment on the learning space topics, to discuss about the resource.
- 1.3.14. Guest users shall be able to view available learning spaces on the site and their details like title, description and rating.
- 1.3.15. Event creation
    - 1.3.15.1. Learners shall be able to organize and schedule events.
    - 1.3.15.2. The scope of an event depends on the organizer's initiative. It can be face-to-face or online.
    - 1.3.15.3. The organizer shall have the right to edit details (date/time, title, description, location, quota) of the event.
    - 1.3.15.4. The organizer shall have the right to cancel the event.

</details>

<details>
  <summary><b>1.4. Admin User</b></summary>

* 1.4.1. Admins shall be able to ban users for inappropriate behaviors.
* 1.4.2. Admins shall be able to delete inappropriate comments and articles.
</details>

#### System Requirements
<details>
  <summary><b>2.1. Profile Page</b></summary>

* 2.1.1. The system shall keep a profile page for every user registered that can also be edited by the user.
* 2.1.2. The profile page shall have the following sections:
	* 2.1.2.1. Bio
		* 2.1.2.1.1. The system shall keep a bio section in the profile page written by the user.
	* 2.1.2.2. Achievements
		* 2.1.2.2.1. The system shall keep an achievement section for each user.
		* 2.1.2.2.2. The system shall keep a predefined list of badges that can be earned by a user.
		* 2.1.2.2.3. Users will gain a badge when one the following occurs: a learner completes a learning space, a learner completes one topic of the learning space, a lecturer opens a new learning space, a lecturer arranges an event, and lecturer creates a quiz.
		* 2.1.2.2.4. The system shall allow a lecturer to add more badges to the badge list of the learning space they created.
		* 2.1.2.2.5. Achievement page shall be updated when a user gains a badge.
	* 2.1.2.3. Interests
		* 2.1.2.3.1. The system shall keep an interests section in the profile page.
		* 2.1.2.3.2. The system shall keep a predefined list for the possible interests a user may have.
			* 2.1.2.3.2.1. The system shall promote users to choose from this list to define their interests.
			* 2.1.2.3.2.2. Interests section shall be created based on the selections of a user from this list.
	* 2.1.2.4. Activities
		* 2.1.2.4.1. The system shall keep an activities section for each user.
		* 2.1.2.4.2. Activities page shall be visible to the users that follow the owner of the profile page.
		* 2.1.2.4.3. The system shall update the activities page when at least one of the following happens: a learner joins a meeting, a learner completes a learning space or a section of it, a learner joins in a new learning space or a learner drops a learning space.
		* 2.1.2.4.4. The system shall update the activities page when at least one of the following happens: if a user is also a lecturer in a learning space, the lecturer arranges a meeting or joins one, the lecturer opens a new learning space or the lecturer opens a quiz for one learning space.
	* 2.1.2.5. Monitoring
		* 2.1.2.5.1. The system shall keep track of the learner process in a learning space showing the following features: how many sections of a learning space completed so far, the remaining sections of the learning space and how many quizzes the learner have attended so far for each learning space.
		* 2.1.2.5.2. The system shall keep a monitoring page section for every learning space that the learner takes.
		* 2.1.2.5.3. If a learner drops a learning space, their monitoring record shall be deleted.
		* 2.1.2.5.4. If a user is also a lecturer, the following statistics shall be kept by the system about each learning space that the user gives: how many users have joined in the learning space, how many users have completed the learning space, how many users have dropped the learning space and how many users have attended which quizzes of a learning space.
	* 2.1.2.6. Knowledge
		* 2.1.2.6.1. The system shall keep a knowledge section in the profile page.
		* 2.1.2.6.2. The system shall keep a predefined list for the possible knowledge a user may have.
			* 2.1.2.6.2.1. The system shall promote users to choose from this list to define their knowledge.
			* 2.1.2.6.2.2. Knowledge page shall be created based on the selections of a user from this list.
	* 2.1.2.7. Rating
		* 2.1.2.7.1. The system shall keep a rating point between one to five for each user that is a lecturer.
			* 2.1.2.7.1.2. System shall keep the total number of ratings that are given to all learning spaces of the lecturer by the users. The rating point shall be the average of these ratings.
	* 2.1.2.8. Notes
		* 2.1.2.8.1. The system shall keep a notes section in the profile page.
		* 2.1.2.8.2. System shall keep all the notes that user has taken during any coure that user has joined to.
		* 2.1.2.8.3. The system shall categorize notes according to learning spaces that they were taken in.
* 2.1.3. Following
	* 2.1.3.1. The system shall keep records of user profiles that are followed by the user.
	* 2.1.3.2. The system shall allow a follower of a user to see the following features of a profile: achievements, monitoring, interests, knowledge, bio ,notes ,annotations and activities.

* 2.1.4. Privacy
    * 2.1.4.1. Users shall be able to change their privacy settings. A user shall have a public or a private profile. (described in 3.3.6.)
</details>

<details>
  <summary><b>2.2. Communication Channel</b></summary>

* 2.2.1. The system shall provide an interface such that users can ask and answer questions.
* 2.2.2. The system shall provide a discussion section for any type of user inside a learning space.
	* 2.2.2.1. The system should support replying, mentioning and threaded messages to create a comment.
* 2.2.3. The system should support sharing resources and files.
</details>

<details>
  <summary><b>2.3. Note Taking</b></summary>

- 2.3.1 The system shall provide a notes section in profile.
- 2.3.2 The system shall support viewing notes of public and followed users on their profiles. Similarly notes reached by shared links should be visible if only the sharing end is public or followed.
- 2.3.3 The system shall provide registered learners the ability to connect, annotate and tag notes.

</details>

<details>
  <summary><b>2.4. Recommendations</b></summary>

* 2.4.1. The system shall provide a list of recommended learning spaces to learners.
	* 2.4.1.1 The learning spaces in the list shall either have semantically similar names to the learning spaces that the learner has completed previously or have tags that match with the learner's interests.
</details>

<details>
  <summary><b>2.5. Search Engine</b></summary>

* 2.5.1. For any search, the result shall be broadscale in the sense that the results for any search should include those items that would be returned for another search with nearly synonymous keywords.
* 2.5.2. Learning spaces shall be searched by entering keywords.
* 2.5.3. The search results for learning spaces should adapt to the user, i.e. the default ranking of the results should reflect the user's behavior on the website.
	* 2.5.3.1. The learning spaces that are similar to the user's previous learning spaces should be ranked higher than other learning spaces.
	* 2.5.3.2. The learning spaces that are about a topic in which the user has shown interest should be ranked higher than other learning spaces.
	* 2.5.3.3. The learning spaces that are similar to those that are taken by the users that the user follows should be ranked higher than other learning spaces.
* 2.5.4. The title and the first post of discussions in the communication channel shall be searched by entering keywords. Those results shall be ranked according to date.
* 2.5.5. The notes belonging to a user shall be searchable.
* 2.5.6. It shall be possible to sort the results from newest to oldest or oldest to newest.
* 2.5.7. The system shall provide filtering of search results.
	* 2.5.7.1. The system shall provide filtering on the learning space results according to the availability of in-person meetings.
	* 2.5.7.2. The system shall provide filtering on the discussion channel search results according to topic.
	* 2.5.7.3. The system shall provide filtering on the results according to date.
</details>

<details>
  <summary><b>2.6. Annotation</b></summary>

* 2.6.1. The system shall support annotating with text, images and URI.
	* 2.6.1.1. The system shall support external links in the case that users provide URI.
* 2.6.2. The system shall support links that relate to semantic resources about the resource.
* 2.6.3. The system shall provide a mechanism such that annotation can be applied to any note or learning space resource.
* 2.6.4. The system shall highlight annotated text portions to emphasize annotation.
</details>

<details>
  <summary><b>2.7. Notifications</b></summary>

* 2.7.1. The system shall provide in-app and push notifications.
* 2.6.2. The system shall send notifications to the users if any of the following happens: a learning space they have created has a new user joined, an event is created and/or cancelled in a learning space they are joined in, another users follows or requests to follow them, and a user they have sent following request accepts their request. 
</details>

### Non-Functional Requirements
<details>
  <summary><b>3.1. Accessibility and Availability</b></summary>

* 3.1.1. The platform shall be accessed via both a native Android application and a web application.
	* 3.1.1.1 The web application of the platform shall support modern browsers (Chrome, Firefox, Safari, Opera, Edge).
	* 3.1.1.2 The web application of the platform should be responsive.
* 3.1.2. The platform language shall be English.
* 3.1.3 The platform should support [UTF-8](https://en.wikipedia.org/wiki/UTF-8) character encoding.
</details>

<details>
  <summary><b>3.2. Security</b></summary>

* 3.2.1. Emails shall be valid and unique.
* 3.2.2. Passwords should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.
* 3.2.3. The system shall encrypt passwords with the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm using a randomly generated salt. Passwords' hashes and their respective salts shall be stored in the database.
* 3.2.4. Users shall not be able to perform actions that are not in the scope of their roles.
	* 3.2.4.1 Users shall not be able to access or modify the data of other users.
	* 3.2.4.2. API endpoints shall be protected with access tokens.
		* 3.2.4.2.1. New access tokens shall be generated in exchange for either user credentials or an unexpired refresh token.
* 3.2.5. Some actions, such as account activation or password change, should be allowed only via email confirmation.
* 3.2.6. The platform shall use the [HTTPS Protocol](https://en.wikipedia.org/wiki/HTTPS).
* 3.2.7. All input provided by a user should be validated in order to mitigate attacks like [SQL injection](https://en.wikipedia.org/wiki/SQL_injection).
</details>

<details>
  <summary><b>3.3. Privacy</b></summary>

* 3.3.1. The platform shall comply with the rules specified by [KVKK](https://www.kvkk.gov.tr/) and [GDPR](https://gdpr.eu/).
* 3.3.2. Users shall agree to the Terms of Service and Privacy Policy while registering.
* 3.3.3. Processing personal data outside the purpose of collection shall be prohibited.
* 3.3.4. A user's personal data shall be deleted as soon as it fulfills its purpose for collection.
* 3.3.5. If personal data is to be used, the user shall be asked for their consent clearly.
* 3.3.6. The system shall have two options for the visibility setting of a user profile:
    * 3.3.6.1. Public Profile: The system shall allow other users to see a user's profile if the user opts to choose the public profile option.
    * 3.3.6.2. Private Profile: The system shall not allow other non-follower users to see a user's profile if the user opts to choose the private profile.
</details>

<details>
  <summary><b>3.4. Performance and Reliability</b></summary>

* 3.4.1. The platform shall respond to any request in at most 5 seconds.
* 3.4.2. The platform shall support at least 100 simultaneous user actions. 
* 3.4.3. The platform shall support at least 10000 user accounts. 
* 3.4.4. Database backup should be generated each week.
* 3.4.5. In case of failure, the platform should be back online in at most 2 hours.
* 3.4.6. The platform should have an uptime of at least 99%.
</details>

<details>
  <summary><b>3.5. Standards</b></summary>

* 3.5.1. Annotations shall be compliant with the [W3C Web Annotation Data Model](https://www.w3.org/TR/annotation-model/) and follow [W3C standards](https://www.w3.org/standards/).
* 3.5.2. Implementation of geolocation shall obey the guidelines of [W3C GeoInfo](https://www.w3.org/wiki/GeoInfo).
</details>


## Software design documents (using UML)

### <ins>Use-Case Diagrams</ins>
Use case diagrams can be viewed [here](https://github.com/bounswe/bounswe2022group3/wiki/Use-Case-Diagrams).
### <ins>Class Diagrams</ins>
Class diagrams can be viewed [here](https://github.com/bounswe/bounswe2022group3/wiki/Class-Diagrams).
### <ins>Sequence Diagrams</ins>
Sequence diagrams can be viewed [here](https://github.com/bounswe/bounswe2022group3/wiki/Sequence-Diagrams).

## User scenarios and mockups

### Scenario 1

#### <ins>The User, Persona</ins>

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Ennio_Morricone_Cannes_2007.jpg/1200px-Ennio_Morricone_Cannes_2007.jpg" width=20% height=10%>

Yone is a 56 year old film critic, passionate about movies, loves talking and writing about them. After feeling the lack of having a friend to share his enthusiasm of films, he decides to share his wisdom on and knowledge of films by starting a learning space and creating a community that would like to and be able to have discussions over movies which would allow people with similar passions to come together.

#### <ins>User Goals</ins>

- Aims to set up an event for his learning space.
- Wants to find student preferences using the poll feature.

#### <ins>Preconditions</ins>

- Yone is already a lecturer of the platform, has an account and already logged in.

#### <ins>Scenario, Actions</ins>

- After several introductory topics for two weeks, Yone decides to organize an event, a gathering, to watch the first movie that joiners will write their first critique on. It will also serve as a first face-to-face meeting, serving as an event for him to get to know his co-learners and for them to get to know each other. 
- Yone sets up a poll to find out the most preferable day and time to meet, aiming to maximize the attendance.
- After the results of the poll, he sets up the event on the website (according to these [criteria](https://github.com/bounswe/bounswe2022group3/issues/25)), announcing it to every co-learner. 
- Event will be at a small cinema. Yone sets up one of the theaters reserved for this event, thus attendance will be allowed only to the joined co-learners. Attendance capacity is set to the number of currently joined co-learners.

#### <ins>Acceptance Criteria</ins>

- 1.3.8.1. Lecturers shall be able to create polls, allowed to be filled by the students enrolled in their course. The anonymity and/or the obligation of the poll shall be decided by the lecturer and declared to the students.
- 1.3.8.2. Lecturers shall be able to organize and schedule events. The scope of the event depends on the lecturer's initiative. It can be public or private, face-to-face or online.
- 1.3.8.3. The lecturer shall have the right to edit details (date/time, title, description, location, quota) of the event.
- 1.3.8.4. The lecturer shall have the right to cancel the event.
- 1.3.11. Users shall be able to join the attendance list of the event that they would like to participate, for their joined classes, in the case that quota is not full.

### Mockup 1

#### <ins>Web Mockup</ins>

![web scenario 1_updated](https://user-images.githubusercontent.com/64011660/159525220-f1efad12-cbe1-40b1-8c76-85ae25ceb737.png)

#### <ins>Mobile Mockup</ins>

![Scenario#1-updated-MobileMockup](https://user-images.githubusercontent.com/66492431/159730384-48a8f25a-6948-47d3-add4-2d0be73b8d89.png)

<div style="page-break-after: always;"></div>

### <ins>Scenario 2</ins>

#### <ins>The User - Persona</ins>

<figure>
<img src = "https://user-images.githubusercontent.com/15876225/159442236-f7583338-e971-4b53-829e-f432a128e049.jpg">
<div></div>
<figcaption> <sub>Image is taken from <a href = "https://this-person-does-not-exist.com/en">This Person Does Not Exist</a></sub></figcaption>
</figure>

&nbsp;

Jack is an electrical engineering student in the University of Michigan. He is interested in web development and wants to get a job as a developer. He could not enroll in his desired courses in his own university so he decided to use an online learning program.  

#### <ins>User Goals</ins>

- Aims to ask a question in the discussion forum
- Wants to share the specific error he got by providing a screenshot

#### <ins>Preconditions</ins>

- Jack has an account on the platform and already logged in.
- He has joined to Web Development Space one week ago.

#### <ins>Scenario Actions</ins>

- After watching the tutorial video on the space, Jack tries to set up his own computer for web development. He downloaded the IDE specified in the video; however, he chose x64 instead of the x86 architecture. IDE seems to be installed but Jack sees that it is not working as expected. He decides to ask about this to his co-learners.
- He visits the discussions page of Web Development. He looks through other questions before creating a duplicate question however there are no similar questions about the trouble he is experiencing.
- He creates a new question by describing the status and adding a few screenshots. 
- After some time, a co-learner responds by asking questions about his computer and operating system. After some back and forth, his co-learner provides a link for Jack and wants him to download the installer he provided. 
- Jack goes to the URL, downloads and installs the correct version of the IDE.
- After testing for a minute, he thanks his classmate and closes the discussion.

#### <ins>Acceptance Criteria</ins>

- 1.3.3. Users shall be able to use the discussion channel of the learning spaces they joined in. (described in 2.2.)
  - 1.3.3.1. Users shall be able to open a discussion post to ask questions.
  - 1.3.3.2. Users shall be able to make a comment to an existing discussion post.

- 2.2.1. The system shall provide an interface such that users can ask and answer questions.
- 2.2.2. The system shall provide a discussion section for any type of user inside a learning space.
  - 2.2.2.1. The system should support replying, mentioning and threaded messages to create a comment.
- 2.2.3. The system should support sharing resources and files.
- 2.6.1. The system shall support annotating with text, images and URI.
  - 2.6.1.1. The system shall support external links in the case that users provide URI.
- 2.6.2. The system shall support links that relate to semantic resources about the resource.
- 2.6.3. The system shall provide a mechanism such that annotation can be applied to any note or learning space resource.

### Mockup 2

#### <ins>Web Mockup</ins>

![webmockup2 drawio-6](https://user-images.githubusercontent.com/74921213/159737253-4c7d1775-b4ff-487e-8925-962c08af017f.png)

#### <ins>Mobile Mockup</ins>

![mockup2 drawio](https://user-images.githubusercontent.com/74207333/159730767-a75c2755-6511-457b-b5f2-ec788737b558.png)

<div style="page-break-after: always;"></div>

### Scenario 3

<img src="https://pm1.narvii.com/6352/5980bb38418ec17c61cfd6701f007f2b915ef5be_hq.jpg" width=20% height=10%>

#### <ins>The User, Persona </ins>

* Kaneki Ken is a 19 years old student at Kamii University. He is a self-learner and likes to improve himself in different aspects. He found this platform and started to use it. So far, he's been a person who neatly takes notes to papers during his studies; however, it is hard for him to keep track of all of them. So, he decided to also use this platform's note taking features.

#### <ins>User Goals</ins>

* Aims to create and save notes under subtopics of the chosen learning space.
* Aims to edit saved notes if the need occurs.
* Aims to delete saved notes if the notes are no longer needed or they become irrelevant.

#### <ins>Preconditions</ins>

* Kaneki Ken is already a learner in the platform and logged in.
* Kaneki Ken has access to the learning space resources that they want to take notes of.

#### <ins>Scenario Actions</ins>

During going over the subtopics in learning space, Kaneki Ken feels the need to take notes to summarize that particular section so that they wouldn't have to repeat the content all over again:
* Goes to the relevant course page from their my spaces page.
* Chooses the topic that they want to add notes to.
* Click `Create Notes`.
* Add relevant notes to that body.
* Click `Save`.

Then, if they want to see their notes about that learning space:
* Goes to the relevant learning space page from their my spaces page.
* Click `Notes` on the sidebar.
* Filter the notes depending on the need.

Then, edit or delete those notes by respectively clicking:
* Edit: Click `Edit` --> Edit note body --> Click `Save`.
* Delete: Click `Delete`.

#### <ins>Acceptance Criteria</ins>

- 1.3.4. Users shall be able to use note taking features.
  - 1.3.4.1. Users shall be able to create notes.
  - 1.3.4.2. Users shall be able to save notes in their profile page.
  - 1.3.4.3. Users shall be able to view their saved notes on their profile page.
  - 1.3.4.3.1. Users should be able to sort notes according to date.
  - 1.3.4.3.2. Users should be able to filter notes by learning space name.
  - 1.3.4.4. Users shall be able to delete or edit their notes.
  - 1.3.4.5. Users shall be able to connect, annotate and tag notes.
  - 1.3.4.6. Users shall be able to share their notes with other users.
- 2.3.1 The system shall provide a notes section in profile.
- 2.3.2 The system shall support viewing notes of public and followed users on their profiles. Similarly notes reached by shared links should be visible if only the sharing end is public or followed.
- 2.3.3 The system shall provide registered learners the ability to connect, annotate and tag notes.

### Mockup 3

#### <ins>Web Mockup</ins>

![scenario3_webmockup](https://user-images.githubusercontent.com/45170430/159533360-d3a057c5-57f2-4642-937b-a607ea58698d.png)

#### <ins>Mobile Mockup</ins>

![scenario3_mobilemockup](https://user-images.githubusercontent.com/44259352/159724707-8122f720-8c8f-48f8-b581-4bb579993171.png)

## Project plan
![image](https://user-images.githubusercontent.com/49765256/197226506-d3bb3051-0dd8-4dfa-8c03-d9718403ee18.png)
![image](https://user-images.githubusercontent.com/49765256/199111081-1ca4b312-ce59-46af-a1c3-4bc82681370e.png)
![image](https://user-images.githubusercontent.com/49765256/199111114-21ac6aeb-5120-449c-bff1-7347ad533940.png)
![image](https://user-images.githubusercontent.com/49765256/197226544-f3795f8e-4a1b-4a4b-816b-b5212e73239f.png)
![image](https://user-images.githubusercontent.com/49765256/199111153-eb5cfffd-5af5-4200-8634-2981f688147f.png)
![image](https://user-images.githubusercontent.com/49765256/199111171-98736b11-1f35-4eb1-b46e-c5f4fbb5768a.png)
