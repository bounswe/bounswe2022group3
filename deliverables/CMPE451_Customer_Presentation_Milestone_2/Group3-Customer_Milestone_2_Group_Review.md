# Customer Milestone 2 Group Review

- [Customer Milestone 2 Group Review](#customer-milestone-2-group-review)
  - [Executive Summary](#executive-summary)
    - [ Summary of the Project Status ](#-summary-of-the-project-status-)
    - [Changes Made or Planned since Milestone 1](#changes-made-or-planned-since-milestone-1)
    - [Future Plans and Improvements](#future-plans-and-improvements)
      - [Follow system](#follow-system)
      - [Semantic search engine](#semantic-search-engine)
      - [Recommendation system](#recommendation-system)
      - [Achievements and badges](#achievements-and-badges)
      - [Annotations](#annotations)
      - [Rating](#rating)
      - [Note Taking](#note-taking)
      - [Events](#events)
  - [Progress based on teamwork](#progress-based-on-teamwork)
    - [Summary of work performed by each team member](#summary-of-work-performed-by-each-team-member)
      - [Arif Akbaba](#arif-akbaba)
      - [Furkan Akkurt](#furkan-akkurt)
      - [Mehmet Gökberk Arslan](#mehmet-gökberk-arslan)
      - [Bilal Aytekin](#bilal-aytekin)
      - [Nurlan Dadashov](#nurlan-dadashov)
      - [Hatice Şule Erkul](#hatice-şule-erkul)
      - [Kadir Ersoy](#kadir-ersoy)
      - [Berke Özdemir](#berke-özdemir)
      - [Mertcan Özkan](#mertcan-özkan)
      - [Muhammet Şen](#muhammet-şen)
      - [Salim Kemal Tirit](#salim-kemal-tirit)
      - [Burak Yilmaz](#burak-yilmaz)
    - [List and Status of Deliverables](#list-and-status-of-deliverables)
    - [Progress According to Requirements](#progress-according-to-requirements)
    - [API Endpoints](#api-endpoints)
    - [User Interface / User Experience - Front](#user-interface--user-experience---front)
      - [User](#user)
      - [Space](#space)
      - [my/spaces/\[space\_id\]](#myspacesspace_id)
      - [my/spaces/\[space\_id\]/resoruce](#myspacesspace_idresoruce)
      - [my/spaces\[space\_id\]/discussion/\[discussion\_id\]](#myspacesspace_iddiscussiondiscussion_id)
    - [User Interface / User Experience - Mobile](#user-interface--user-experience---mobile)
      - [Home Page](#home-page)
      - [Search Learning Space](#search-learning-space)
      - [Learning Space Join](#learning-space-join)
      - [Topics](#topics)
      - [Create Topic](#create-topic)
      - [Delete Topic](#delete-topic)
      - [Resources (Inside Topic)](#resources-inside-topic)
      - [Create New Resource](#create-new-resource)
      - [Long Press On Resource Tile Options Menu](#long-press-on-resource-tile-options-menu)
      - [Delete Resource](#delete-resource)
      - [Notes](#notes)
      - [Inside Note Preview](#inside-note-preview)
      - [Inside Note Edit](#inside-note-edit)
      - [Discussions](#discussions)
      - [Add Discussion](#add-discussion)
      - [Profile About](#profile-about)
      - [Profile Activities](#profile-activities)
      - [Profile Achievements](#profile-achievements)
      - [Profile Notes](#profile-notes)
      - [App Starting Page](#app-starting-page)
      - [Login Page](#login-page)
      - [Register Page](#register-page)
      - [Events](#events-1)
      - [View Comments](#view-comments)
      - [Add Comment](#add-comment)
      - [Resource Page](#resource-page)
    - [Annotations](#annotations-1)
    - [Standards](#standards)
  - [Individual Reports](#individual-reports)
    - [Arif Akbaba](#arif-akbaba-1)
    - [Furkan Akkurt](#furkan-akkurt-1)
    - [Mehmet Gökberk Arslan](#mehmet-gökberk-arslan-1)
    - [Bilal Aytekin](#bilal-aytekin-1)
    - [Nurlan Dadashov](#nurlan-dadashov-1)
    - [Hatice Şule Erkul](#hatice-şule-erkul-1)
    - [Kadir Ersoy](#kadir-ersoy-1)
    - [Berke Özdemir](#berke-özdemir-1)
    - [Mertcan Özkan](#mertcan-özkan-1)
    - [Muhammet Şen](#muhammet-şen-1)
    - [Salim Kemal Tirit](#salim-kemal-tirit-1)
    - [Burak Yilmaz](#burak-yilmaz-1)


## Executive Summary

### <ins> Summary of the Project Status </ins>

After the milestone 1, we have greatly expanded our features in all of the teams. We have integrated almost all of the endpoints to both mobile and frontend applications. We have completely removed all of the static data in those applications and populated our database so that it has much more realistic data. This way, we were able to showcase a realistic usecase in the milestone 2.

Specifically, we have implemented and/or advanced the following schemas and relevant operations in a fully working manner: `space`, `comment`, `discussion`, `event`, `resource` and `annotation`.

We also got a domain name, `bucademy.tk`, and configured necessary SSL certificates. That enabled the HTTPS connection, which resulted in a much better UX.

Both the backend and the frontend deployments seem to be still working reliably, haven't even crashed once (except for faulty logic) since the optimizations made for them.

We also implemented an auto-restart mechanism for the containers that failed for unhandled exceptions. That helped with the downtime and the wait time for frontend and mobile teams.

Overall the teams are able to communicate even more clearly and in an even more agile way. 
As a result of all of these, we were able to progress in a steady and a satisfying rate, showcased in the milestone 2 presentation.


### <ins>Changes Made or Planned since Milestone 1</ins>

- We have employed a more active use of our communications channel (Discord). This has provided a more dynamic development process, quickly deciding on or changing API specifications or frontend/mobile product decisions.
- We also employed a smaller group-based approach. Features and endpoints were divided among team members in that team's weekly meetings; then, during the development process, members of different groups implementing the same feature would discuss it among themselves in detail and specify the work that needed to be done. Finally, the final product would be shown to the whole team. Working in this way has allowed everyone to focus on their specific tasks and abstract the rest of the project.
- We have no plans to change the workflow described above as it has worked.
- We plan to divide work more equally over time. We did most of the work near the deadline.
- We plan to write better PR reviews, as merging the PRs close to the deadline was stressful.

### <ins>Future Plans and Improvements</ins>

#### Follow system
We have not started working on follow mechanism and activities. Users shall be able to follow each other and see followed users' activities. Backend should store actions users do and provide endpoints to show those activities to other users. Front and mobile will list activites in the profile page. We should  discuss adding a discover or feed page to visualize followed users activities.
#### Semantic search engine
Bucademy will support semantic search that will be used especially while searching spaces. This will be mostly backend teams' task since we already have a search UI in mobile and frontend apps.
#### Recommendation system
Similar to search engine, backend team should provide endpoints that will recommend new spaces to users according to their interests and current spaces.
#### Achievements and badges
We will integrate achievements and badges throughout Bucademy. We are not completed the design part yet, there is more to discuss and decide.
#### Annotations
Our backend and frontend supports text based annotations and mobile will support it too. Moreover, we are planning to implement image annotation. Lastly, we should store annotations on a different database, as requested by the customer.
#### Rating
As a part of the co-learning experience, users should be able to rate resources and comments. Our backend completed most of the requirements for this rating system. Adding related features to mobile and front apps is in our current sprint.
#### Note Taking
Being able to create new notes in our mobile app is the only missing part of note taking.
#### Events
Backend and frontend teams have implemented event system. We will have it in our mobile app. We have not tested it in detail.

## Progress based on teamwork

### Summary of work performed by each team member

#### Arif Akbaba
-  `Member` :Arif Akbaba- Group 3 - FrontEndTeam
- `Responsibilities` : I was tasked to implement a new profile specification. According to a team meeting, the profile page would be implemented as a public profile page, private profile page, and owner profile page that can be edited by the owner user. According to the code reviews of my teammates, I provided the necessary arrangements on these pages.
- `Main contributions` : I have implemented the following: [user_id].js .  I have implemented a public and a private profile page, connected these to the update profile page, and rearranged get profile connections based on backend changes.
 - `Code related significant issues` : [#411](https://github.com/bounswe/bounswe2022group3/issues/411) 
 - `Management related significant issues` : [#439](https://github.com/bounswe/bounswe2022group3/issues/439)
- `Pull requests` :  [#412](https://github.com/bounswe/bounswe2022group3/pull/412)
- `Additional information` : I have helped the team with PR reviews.

#### Furkan Akkurt

1. Member: My name is Salih Furkan Akkurt. I'm from Group 3.
2. Responsibilities: I was given the responsibility of creating a database schema and API functions for annotations compliant with the W3C standard for Web Annotation Data Model.
3. Main contributions: I have attended many meetings with the entire team present, only the back-end team, and with the customer. I have contributed to the project's wiki, creating and organizing management pages. I have created issues related specifically to the entire team or me. For the back-end, I have created and maintained many API functions requested by the web front-end and mobile teams. I have created the back-end for text annotations, complying with the W3C standard for Web Annotation Data Model, except for a distinct annotation database we plan to implement. I have reviewed many pull requests and merged them. I have updated many of the naming conventions (e.g., course -> space) on the back-end.
    - Code related significant issues: [#381](https://github.com/bounswe/bounswe2022group3/issues/381)
    - Management related significant issues: [#373](https://github.com/bounswe/bounswe2022group3/issues/373)
5. Pull requests: [#372](https://github.com/bounswe/bounswe2022group3/pull/372), [#374](https://github.com/bounswe/bounswe2022group3/pull/374), [#379](https://github.com/bounswe/bounswe2022group3/pull/379), [#382](https://github.com/bounswe/bounswe2022group3/pull/382), [#405](https://github.com/bounswe/bounswe2022group3/pull/405), [#410](https://github.com/bounswe/bounswe2022group3/pull/410), [#413](https://github.com/bounswe/bounswe2022group3/pull/413)
6. Unit tests: [396c1](https://github.com/bounswe/bounswe2022group3/commit/396c1d676f924cc2d13bfb74a9d700b2729a38a3)

#### Mehmet Gökberk Arslan
-  `Member`: Mehmet Gökberk Arslan - 2018400240 - Group 3 - Backend Team
- `Responsibilities`: I have been assigned to work on the profile endpoint and configuring ratings for different schemas.
- `Main contributions`: I have implemented a part of the user profile page and modified the corresponding endpoints to set and read ratings.
  - `Code related significant issues`: [#421](https://github.com/bounswe/bounswe2022group3/issues/421)
- `Pull requests`: [#423](https://github.com/bounswe/bounswe2022group3/pull/423) 
- `Additional information`: I have helped the team with PR reviews.

#### Bilal Aytekin
-  `Member`: Bilal Aytekin - 2018400132 - Group 3 - Mobile Team
- `Responsibilities`: I have been assigned to work on the mobile application's login, registration, and event features.
- `Main contributions`: I have implemented the login and registration pages and connected them to the backend. Later on, I added GDPR compliancy to the registration and changed the flow of the mobile application to include these features. I have implemented creating and viewing an event for the mobile application.
  - `Code related significant issues`: [#343](https://github.com/bounswe/bounswe2022group3/issues/343),  [#419](https://github.com/bounswe/bounswe2022group3/issues/419)
  - `Management related significant issues`: [#408](https://github.com/bounswe/bounswe2022group3/issues/408), [#414](https://github.com/bounswe/bounswe2022group3/issues/414), [#420](https://github.com/bounswe/bounswe2022group3/issues/420)
- `Pull requests`: [#377](https://github.com/bounswe/bounswe2022group3/pull/377) [#433](https://github.com/bounswe/bounswe2022group3/pull/433)
- `Additional information`: I have helped the team with PR reviews.

#### Nurlan Dadashov
-  `Member`: Nurlan Dadashov - 2019400300 - Group 3 - Frontend Team
- `Responsibilities`: I have been coordinating the work of the frontend team. I have been communicating with backend and mobile teams and writing backend specifications. I have been reviewing the codes of other team members.
- `Main contributions`: I have implemented a new design on the home and my spaces pages. I worked on implementing annotations for resources. I also implemented create space functionality. I made styling corrections to many pages to make them visually more appealing.
  - `Code related significant issues` : [#383](https://github.com/bounswe/bounswe2022group3/issues/383) [#401](https://github.com/bounswe/bounswe2022group3/issues/401) [#417](https://github.com/bounswe/bounswe2022group3/issues/417)
  - `Management related significant issues` : [#352](https://github.com/bounswe/bounswe2022group3/issues/352) 
- `Pull requests` : [#407](https://github.com/bounswe/bounswe2022group3/pull/407),  [#390](https://github.com/bounswe/bounswe2022group3/pull/390)

#### Hatice Şule Erkul
-  `Member`: Hatice Şule Erkul - 2017400051 - Group 3 - Mobile Team
- `Responsibilities`:  I was responsible for the profile page and annotations of the mobile application.
- `Main contributions`: I wrote API specifications for profiles and created `.../classes/profile.dart` to connect profile pages to the backend. I implemented a custom selection toolbar for annotations that is only available at `mobile/anotations` branch.
  - `Code related significant issues` : [#327](https://github.com/bounswe/bounswe2022group3/issues/327), [#404](https://github.com/bounswe/bounswe2022group3/issues/404)
  - `Management related significant issues` : [#363](https://github.com/bounswe/bounswe2022group3/issues/363)
- `Pull requests` : [#338](https://github.com/bounswe/bounswe2022group3/pull/338)
- `Additional Information` : I have reviewed the following PRs:   [#345](https://github.com/bounswe/bounswe2022group3/pull/345), [#376](https://github.com/bounswe/bounswe2022group3/pull/376), [#427](https://github.com/bounswe/bounswe2022group3/pull/427)

#### Kadir Ersoy
-  `Member` : Kadir Ersoy - 2018400252 - Group 3 - Backend Team
- `Responsibilities` : I have been assigned to work on note endpoint, building test infrastructure and maintaining the current backend with bug fixing, and doing necessary updates according to the requests of the front and mobile teams.
- `Main contributions` : I have implemented `/note` endpoint and updated /userProfile. I have set up test infrastructure for the backend. I have helped resolve bugs and backend issues that have come up during the `backend - front/mobile` connection. 
  - `Code related significant issues` : [#378](https://github.com/bounswe/bounswe2022group3/issues/378) [#389](https://github.com/bounswe/bounswe2022group3/issues/389) [#397](https://github.com/bounswe/bounswe2022group3/issues/397)
  - `Management related significant issues` : [#342](https://github.com/bounswe/bounswe2022group3/issues/342) [#346](https://github.com/bounswe/bounswe2022group3/issues/346) [#437](https://github.com/bounswe/bounswe2022group3/issues/437)
- `Pull requests` : [#364](https://github.com/bounswe/bounswe2022group3/pull/364) [#371](https://github.com/bounswe/bounswe2022group3/pull/371) [#384](https://github.com/bounswe/bounswe2022group3/pull/384) [#386](https://github.com/bounswe/bounswe2022group3/pull/386) [#392](https://github.com/bounswe/bounswe2022group3/pull/392) [#398](https://github.com/bounswe/bounswe2022group3/pull/398) [#406](https://github.com/bounswe/bounswe2022group3/pull/406) [#409](https://github.com/bounswe/bounswe2022group3/pull/409)
- `Unit Tests` : [#386](https://github.com/bounswe/bounswe2022group3/pull/386) unit tests for /user
- `Additional information` : I have helped the team with PR reviews.

#### Berke Özdemir
-  `Member`: Berke Özdemir - 2016400246 - Group 3 - Frontend Team
- `Responsibilities`: I have been assigned to work on the web application's GDPR compliance, topic creation, resource creation, resource editing, resource displaying, space page refinement, and event features. Reviewing teammates' codes.
- `Main contributions`: I have implemented the resource display, event and creation pages and connected them to the backend. I have implemented topic creation and resource list display for the resources pages. I have improved the UI of the space page.
  - `Code related significant issues`: [#418](https://github.com/bounswe/bounswe2022group3/issues/418),  [#394](https://github.com/bounswe/bounswe2022group3/issues/394),  [#360](https://github.com/bounswe/bounswe2022group3/issues/360),  [#361](https://github.com/bounswe/bounswe2022group3/issues/361)
  - `Management related significant issues`:  [#420](https://github.com/bounswe/bounswe2022group3/issues/420)
- `Pull requests`: [#362](https://github.com/bounswe/bounswe2022group3/pull/362) [#434](https://github.com/bounswe/bounswe2022group3/pull/434) [#399](https://github.com/bounswe/bounswe2022group3/pull/399) [#395](https://github.com/bounswe/bounswe2022group3/pull/395) 
- `Additional information`: I have helped the team with PR reviews.

#### Mertcan Özkan
-  `Member` : Mertcan Özkan - Group 3 - FrontEndTeam
- `Responsibilities` : I was tasked to create a new discussion component based on Nurlans previous code and add it to the resource page, creating a new pop-up component for adding discussions, editing notes, and adding notes. Also, creating a discussions table for viewing all the discussions for a learning space, creating a new notes component based on Nurlans previous code, and connecting all these components and files to the backend.
- `Main contributions` : I created the following: CreateDiscussions.jsx, EditNotes.jsx, CreateNote.jsx, PopModule.scss, Note.jsx, Discussions.js. Also edited Notes.js and [discussion_id].js . Connected newly created ones to the backend.
 - `Code related significant issues` :
 -  [##416 ](https://github.com/bounswe/bounswe2022group3/issues/#416 ) 
 - [##415 ](https://github.com/bounswe/bounswe2022group3/issues/415)
 -  [#356](https://github.com/bounswe/bounswe2022group3/issues/356) 
- `Pull requests` : 
- [#355](https://github.com/bounswe/bounswe2022group3/pull/355)
-  [#428](https://github.com/bounswe/bounswe2022group3/pull/428) 
- `Additional information` : I have helped the team with PR reviews.

#### Muhammet Şen
-  `Member`: Muhammet Şen - 2018400192 - Group 3 - Mobile Team
- `Responsibilities`:  I have worked on the mobile app's notes and discussions parts. Moreover, I was responsible for initializing our domains (bucademy.tk and api.bucademy.tk) and getting SSL certificates.
- `Main contributions`: I implemented the markdown editor component we use across our mobile app. I created a discussion page where users can post new discussions and view other discussions. Similarly, I implemented note taking page. Finally, I have implemented deep links to let users open the app by clicking a `bucademy.tk` URL.
  - `Code related significant issues` : [#344](https://github.com/bounswe/bounswe2022group3/issues/344), [#391](https://github.com/bounswe/bounswe2022group3/issues/391), [#400](https://github.com/bounswe/bounswe2022group3/issues/400), [#430](https://github.com/bounswe/bounswe2022group3/issues/430).
  - `Management related significant issues` : [#334](https://github.com/bounswe/bounswe2022group3/issues/334), [#440](https://github.com/bounswe/bounswe2022group3/issues/440)
- `Pull requests` : [#345](https://github.com/bounswe/bounswe2022group3/pull/345), [#376](https://github.com/bounswe/bounswe2022group3/pull/376), [#387](https://github.com/bounswe/bounswe2022group3/pull/387), [#431](https://github.com/bounswe/bounswe2022group3/pull/431), [#432](https://github.com/bounswe/bounswe2022group3/pull/432).

#### Salim Kemal Tirit
- `Member` : Salim Kemal Tirit - 2019400153 - Group 3 - Mobile Team
- `Responsibilities`:  I worked on the topics page and details of the topics on the mobile application. This includes viewing, editing, and deleting both content and topics.   
- `Main contributions`: I implemented the topic page. I implemented create and delete topic functionality. I implemented the resource page. I implemented creating, editing, and deleting resource functionalities. I implemented a nice pop-up type interface showing options when the user clicks and holds onto the topic or resource tiles. 
  - `Code related significant issues` : [#368](https://github.com/bounswe/bounswe2022group3/issues/368) [#402](https://github.com/bounswe/bounswe2022group3/issues/402) [#403](https://github.com/bounswe/bounswe2022group3/issues/403)  [#425](https://github.com/bounswe/bounswe2022group3/issues/425)  [#426](https://github.com/bounswe/bounswe2022group3/issues/426) 
  - `Management related significant issues` : [#347](https://github.com/bounswe/bounswe2022group3/issues/347) [#350](https://github.com/bounswe/bounswe2022group3/issues/350) [#438](https://github.com/bounswe/bounswe2022group3/issues/438)
- `Pull requests` : [#427](https://github.com/bounswe/bounswe2022group3/pull/427) [#436](https://github.com/bounswe/bounswe2022group3/pull/436)
- `Additional information`: I helped the team with PR reviews. I presented the mobile application part in the milestone presentations. I populated the database by creating new resources, discussions, topics, and notes.

#### Burak Yilmaz
-  `Member` : Burak Yilmaz - 2018400237 - Group 3 - Backend Team
- `Responsibilities` : Event and participation logic, occasional bug fixes, and updates regarding the requests from mobile and frontend teams on the backend server. Also, making sure that the server runs robustly and reliably.
- `Main contributions` : I have implemented the `event` endpoint and. Created auto-restart logic for the backend server.
  - `Code related significant issues` : [#385](https://github.com/bounswe/bounswe2022group3/pull/385) [#422](https://github.com/bounswe/bounswe2022group3/pull/422)
  - `Management related significant issues` : [#424](https://github.com/bounswe/bounswe2022group3/issues/424)
- `Pull requests` : [#385](https://github.com/bounswe/bounswe2022group3/pull/385) [#422](https://github.com/bounswe/bounswe2022group3/pull/422) 
- `Additional information` : I have helped the team with PR reviews. Also made sure that both frontend and backend deployments worked reliably by optimizing dependencies and monitoring load.

### List and Status of Deliverables

| Deliverable | Status | Last Updated |
|---|---|---|
| [Software Requirements Specification](https://github.com/bounswe/bounswe2022group3/wiki/Requirements) | Completed | 04.12.2022 |
| [Class Diagram](https://github.com/bounswe/bounswe2022group3/wiki/Class-Diagrams) | Completed | 04.112022 |
| [Use Case Diagram](https://github.com/bounswe/bounswe2022group3/wiki/Use-Case-Diagrams) | Completed | 31.10.2022 |
| [Sequence Diagrams](https://github.com/bounswe/bounswe2022group3/wiki/Sequence-Diagrams) | Completed | 15.04.2022 |
| [Scenario and Mockup 1](https://github.com/bounswe/bounswe2022group3/wiki/Scenario-1) | Completed | 31.10.2022 |
| [Scenario and Mockup 2](https://github.com/bounswe/bounswe2022group3/wiki/Scenario-2) | Completed | 31.10.2022 |
| [Scenario and Mockup 3](https://github.com/bounswe/bounswe2022group3/wiki/Scenario-3) | Completed | 31.10.2022 |
| [Project Plan](https://github.com/bounswe/bounswe2022group3/wiki/Project-Plan) | Ongoing | 31.10.2022 |
|[BUcademyAPI Documentation](https://github.com/bounswe/bounswe2022group3/wiki/BucademyAPI-Documentation) | Completed | 08.12.2022|
| [Individual Milestone 2 Review](https://github.com/bounswe/bounswe2022group3/wiki/Milestone-2-Individual-Reports) | Completed | 09.12.2022 |
| [Customer Milestone 2 Group Review](https://github.com/bounswe/bounswe2022group3/issues/437) | Ongoing | 09.12.2022 |

### Progress According to Requirements

|Requirement | Status |
|---|---|
| ## User Requirements |  |
| 1.1 Account Features |  |
| -- 1.1.1 Registration|  |
| 1.1.1.1 | completed  |
| 1.1.1.1.1. |  completed |
| 1.1.1.2. | not started |
| -- 1.1.2 Log In  |  |
| 1.1.2.1. | completed |
| 1.1.2.2. | not started |
| 1.1.2.3. | not started |
| 1.1.2.4. | not started |
| 1.1.2.4. | not started |
| -- 1.1.3 Log Out |  |
| 1.1.3.1  | completed  |
| -- 1.2. Profile  |  |
|  1.2.1. | completed |
| 1.2.2.  | in progress |
| -- 1.3. User Actions |  |
| 1.3.1  | not_started |
| 1.3.1.1 | not_started |
| 1.3.2. | not started |
| 1.3.3.  | completed |
| 1.3.3.1. | completed |
| 1.3.3.2. | completed |
| 1.3.4.1. | completed |
| 1.3.4.2. | completed |
| 1.3.4.3. | completed |
| 1.3.4.3.1. | not_started |
| 1.3.4.3.1. | not_started |
| 1.3.4.4 | completed  |
| 1.3.4.5  | in_progress |
| 1.3.4.6 | not_started |
| 1.3.5  | in_progress |
| 1.3.6 (with its subtopics)| completed |
| 1.3.7 | completed |
| 1.3.8 (with its subtopics) |completed(except 1.3.8.1 in_progress)  |
| 1.3.9 | not_started |
| 1.3.10 | not_started |
| 1.3.11 | completed |
| 1.3.12  | completed |
| 1.3.13 | completed |
| 1.3.14 | completed |
| 1.3.15. (with its subtopics) | completed |
| -- 1.4. Admin User (with its subtopics)  | not_started |
| ## System Requirements |  |
| -- 2.1. Profile Page |  |
| 2.1.2.1. Bio| completed |
| 2.1.1 | completed |
| 2.1.2.2. Achievements (with its subsections) | not started |
| 2.1.2.3. Interests (with its subsections) | completed |
| 2.1.2.2. Activities (with its subsections) | not started |
| 2.1.2.5. Monitoring (with its subsections) | not started |
| 2.1.2.6. Knowledge (with its subsections) | completed |
| 2.1.2.7. Rating (with its subsections) | not started |
| 2.1.2.8. Notes (with its subsections) | in progress |
| 2.1.3. Following (with its subsections) | in progress |
| 2.1.4. Privacy (with its subsections)| not started|
| -- 2.2. Communication Channel |  |
| 2.2.1 | completed |
| 2.2.2 | completed |
| 2.2.2.1 | not_started |
| 2.2.3 | not_started |
| -- 2.3. Note Taking |  |
| 2.3.1  | completed |
| 2.3.2  | not_started |
| 2.3.3   |not_started  |
| -- 2.4. Recommendations |
|2.4.1. |completed|
|2.4.1.1. |in progress|
| -- 2.5. Search Engine |  
|2.5.1.|completed|
|2.5.2.|completed|
|2.5.3. |in progress|
|2.5.4.|in progress|
|2.5.5. |not_started|
|2.5.6. |not_started|
|2.5.7.  (with its subtopics)|in progress|
| -- 2.6. Annotation | | 
|2.6.1|in progress|
|2.6.1.1|completed|
|2.6.2|not_started|
|2.6.3|in progress|
|2.6.4|completed|
| -- 2.7. Notifications(with its subtopics)|not_started |
| ## Non-Functional Requirements||
| -- 3.1. Accessibility and Availability| completed |
| -- 3.2. Security (with its subtopics)|completed (except 3.2.5 not_started ) |
| -- 3.3. Privacy(with its subtopics)|completed (except 3.3.6[with its subtopics] not_started ) |
| -- 3.4. Performance and Reliability||
|3.4.1.| completed |
|3.4.2.|completed|
|3.4.3.|completed|
|3.4.4|in_progress|
|3.4.5|in_progress|
|3.4.6|completed|
| -- 3.5. Standards (with its subtopics)|completed|

### API Endpoints
- BucademyAPI documentation can be viewed from [here](https://documenter.getpostman.com/view/20679271/2s8YzL2kTF). The same document is available at [wiki](https://github.com/bounswe/bounswe2022group3/wiki/BucademyAPI-Documentation).
- https://api.bucademy.tk
- You can access the three example functionalities of BucademyAPI from this [postman collection](https://www.postman.com/gold-flare-216577/workspace/bucademyapi-examples/collection/20679271-d56f8dec-e9a1-4495-820f-3bf38b7adc94?action=share&creator=20679271). 
  - You must register to the platform using `[POST]/user/register`. Then you will get a confirmation email. You can follow the link in the email to confirm your account. Then you must log in to the system via `[POST]/user/login`. 
  - For the three functionalities;
    - Newly registered accounts can view existing spaces by `[GET]/space/searchSpaces`. If a keyword was provided, `[GET]/space/searchSpaces/keyword`, it will perform a search among the spaces. 
    - Also, users can enroll in a space by `[POST]/enrollment`, providing a space id, which can be acquired from `[GET]/space/searchSpaces`. and view their enrollment via `[GET]/enrollment/getEnrolledSpaces`. 
      - For the explained enrollment endpoints to work, the user must provide an access token, which is provided by `[POST]/user/login`.
      - So, acquire an access token from login and put it to the Authorization tab as a bearer token. You can also put the access token to the provided postman environment's access token variable.

### User Interface / User Experience - Front 

#### User
-	Register
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/register.js

![image](https://user-images.githubusercontent.com/45170430/206675478-7a135a24-630b-4890-8aa9-1fcc87b2985d.png)
-	Login
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/login.js

![image](https://user-images.githubusercontent.com/45170430/206675577-5f611083-bc46-4dea-8479-755fa7fb8d83.png)
-	Profile
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/%5Buser_id%5D.js

![image](https://user-images.githubusercontent.com/45170430/206675752-580f7c0b-2ebe-4603-b95e-f27d9267077b.png)

-	Home
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/index.js

![image](https://user-images.githubusercontent.com/45170430/206675870-1318db19-f74d-409e-9361-f282658b438c.png)

-	Myspaces
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/my_spaces.js

![image](https://user-images.githubusercontent.com/45170430/206675927-d5e2d714-b1f0-4fe6-8ba3-eb86893b5f79.png)

#### Space
-	Space
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/space/%5Bspace_id%5D.js

![image](https://user-images.githubusercontent.com/45170430/206676175-4fe6f120-276e-4850-aa04-8527365a7532.png)

-	CreateSpace
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/space/create_space.js

![image](https://user-images.githubusercontent.com/45170430/206676316-b6daf455-0510-43fd-abf7-b4d66c2fe3e6.png)

#### my/spaces/[space_id]
-	Discussion
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/discussions.js

![image](https://user-images.githubusercontent.com/45170430/206676671-be2d5b49-8213-4236-a467-424a20d8da91.png)

-	Event 
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/events.js

![image](https://user-images.githubusercontent.com/45170430/206676611-2d7eff91-ba05-44fd-bb1b-cb03e018fdf2.png)

-	Notes
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/notes.js

![image](https://user-images.githubusercontent.com/45170430/206676558-b6a0f206-9c2d-4147-9bba-237bd0ee4079.png)

-	Resources
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/resources.js 

![image](https://user-images.githubusercontent.com/45170430/206676497-c8b4807e-b086-48fc-a1e0-0485024e3bca.png)


#### my/spaces/[space_id]/resoruce
-	Create resource
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/resource/%5Bresource%5D.js
 
![image](https://user-images.githubusercontent.com/45170430/206676804-92c97362-ad87-420b-9f25-7066ca6e94c6.png)

-	Resource
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/resource/%5Bresource%5D.js

![image](https://user-images.githubusercontent.com/45170430/206677079-64babede-5335-4b12-9836-2c4ee6219abe.png)

#### my/spaces[space_id]/discussion/[discussion_id]
•	Discussion
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/discussion/%5Bdiscussion_id%5D.js

![image](https://user-images.githubusercontent.com/45170430/206677284-64d45c60-5f5d-41a2-a6bd-7032f1efda39.png)

### User Interface / User Experience - Mobile

#### Home Page

<img src="https://user-images.githubusercontent.com/64011660/206652766-914f76b0-39e5-4633-a5cb-f585c0185841.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/user.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/user.g.dart

- Resources
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/resources/constants.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/resources/text_styles.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/resources/custom_colors.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/persistence_service.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/appbar.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/course_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/homepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/search_bar.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart


#### Search Learning Space
<img src="https://user-images.githubusercontent.com/64011660/206652850-53006f34-8cd0-4066-9185-8338b541d8e0.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/search_bar.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/homepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/appbar.dart

#### Learning Space Join
<img src="https://user-images.githubusercontent.com/64011660/206652927-423a10af-8698-4068-8275-1ce72f6b9524.png" width=30%>
<img src="https://user-images.githubusercontent.com/64011660/206652951-5d008127-9f6f-4fa3-882d-dbcabd9d1db1.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart
- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart
- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart



#### Topics
<img src="https://user-images.githubusercontent.com/64011660/206653287-8909830e-dbec-4144-b9ac-d9562465cb46.png" width=30%>

- Classes

https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart

https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart
- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic_tile.dart


#### Create Topic
<img src="https://user-images.githubusercontent.com/64011660/206653410-c0304b67-43dc-4041-8687-645602430639.png" width=30%>
<img src="https://user-images.githubusercontent.com/64011660/206653435-c2d89a59-9e01-4b57-8ef1-02d1dab92373.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart
- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart
- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic/create_topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic_tile.dart



#### Delete Topic
<img src="https://user-images.githubusercontent.com/64011660/206653509-6b8b8bef-c2c6-4f84-ab32-3da95365052d.png" width=30%>
<img src="https://user-images.githubusercontent.com/64011660/206653522-a6780a50-b969-4e3e-a4a0-bcc7dcbd2996.png" width=30%>
<img src="https://user-images.githubusercontent.com/64011660/206653546-869357d1-f1d0-4375-bc66-f29cb8fa45ac.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart
- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic/long_press_dialog.dart



#### Resources (Inside Topic) 
<img src="https://user-images.githubusercontent.com/64011660/206653633-875d8808-eba6-44e0-bd85-fee7a68cae3f.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart
- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart
- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/topicpage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/resource_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/add_button.dart



#### Create New Resource
<img src="https://user-images.githubusercontent.com/64011660/206653759-08fd63bf-b521-4fa3-8964-e39ed0e27c8b.png" width=30%>

<img src="https://user-images.githubusercontent.com/64011660/206653775-7a4a29ed-e94a-4620-8aac-a1e93014ff08.png" width=30%>

<img src="https://user-images.githubusercontent.com/64011660/206653815-42eeb1be-d76c-4bba-bf39-141b8de0c873.png" width=30%> 

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart
- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart
- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/add_resource_page.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/markdown_input.dart



#### Long Press On Resource Tile Options Menu
<img src="https://user-images.githubusercontent.com/64011660/206653937-578eb32a-1e3c-4eff-bfb6-7f917af0388c.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

- Services

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/long_press_dialog.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/resource_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/topicpage.dart


#### Delete Resource
<img src="https://user-images.githubusercontent.com/64011660/206654006-8b6ad34b-d92b-4567-a018-7bd5c891007a.png" width=30%>
<img src="https://user-images.githubusercontent.com/64011660/206654014-7414d690-1417-4280-8f85-143b8833176b.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart


- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/long_press_dialog.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/resource_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/topicpage.dart


#### Notes
<img src="https://user-images.githubusercontent.com/64011660/206654166-af220947-b615-484a-a249-d055e00c038d.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/note/note.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/note/note.g.dart

https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart

- Services

https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/note_service.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/mock_tile.dart


#### Inside Note Preview
<img src="https://user-images.githubusercontent.com/64011660/206654258-fbcb6dd4-0721-4a39-aea2-94339ad0cffd.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/note/note.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/note/note.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/note_service.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/note/note_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/markdown_input.dart



#### Inside Note Edit
<img src="https://user-images.githubusercontent.com/64011660/206654368-774bb0bf-2a04-4685-b3c8-493bb039cabe.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/note/note.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/note/note.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/note_service.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/note/note_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/markdown_input.dart


#### Discussions
<img src="https://user-images.githubusercontent.com/64011660/206654416-e4abf1a7-7484-436b-8e14-be2e9cf40eb2.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/discussion_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/discussion_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/comment_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/markdown_input.dart



#### Add Discussion
<img src="https://user-images.githubusercontent.com/64011660/206654477-bcf2baf3-7d0c-42bf-a755-c75010ed4d86.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/discussion_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/discussion_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/create_discussion.dart

#### Profile About
<img src="https://user-images.githubusercontent.com/64011660/206654647-8e1e52e0-6495-4967-8ecd-9516e2e710aa.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile/lib/classes/profile.dart
https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile/lib/classes/profile.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/profile_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/dashboard_view.dart


#### Profile Activities
<img src="https://user-images.githubusercontent.com/64011660/206654712-3750143c-fdcf-431e-bb1b-cac584e37d45.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile/lib/classes/profile.dart
https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile/lib/classes/profile.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/profile_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/dashboard_view.dart



#### Profile Achievements
<img src="https://user-images.githubusercontent.com/64011660/206654775-b6017ca7-0d8f-4eb0-a88b-6f396e2e264c.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile/lib/classes/profile.dart
https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile/lib/classes/profile.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/profile_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/dashboard_view.dart


#### Profile Notes
<img src="https://user-images.githubusercontent.com/64011660/206654872-65f43f3b-870e-47fa-999d-f6e85d253c94.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile/lib/classes/profile.dart
https://github.com/bounswe/bounswe2022group3/tree/master/app/mobile/lib/classes/profile.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/profile_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/dashboard_view.dart



#### App Starting Page
<img src="https://user-images.githubusercontent.com/64011660/206655854-2172ce49-6458-48c2-8406-fc351236d8b1.png" width=30%>

- Classes

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/intro/intro.dart


#### Login Page
<img src="https://user-images.githubusercontent.com/64011660/206655917-e9602b46-d18b-48f0-830d-d2b3825bc830.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/login.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/login.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/user_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/login/login.dart

#### Register Page
<img src="https://user-images.githubusercontent.com/64011660/206655960-17bfa7ef-38e2-46f4-8918-28bcbc7ba384.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/register.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/register.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/user_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/login/registration.dart


#### Events
<img src="https://user-images.githubusercontent.com/64011660/206657666-884625de-25a0-4631-9be8-b2bd5127ef23.png" width=30%>

- Classes
https://github.com/bounswe/bounswe2022group3/blob/mobile/event/app/mobile/lib/classes/event/event.dart
https://github.com/bounswe/bounswe2022group3/blob/mobile/event/app/mobile/lib/classes/event/event.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/mobile/event/app/mobile/lib/services/event_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/mobile/event/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/mobile/event/app/mobile/lib/view/course/event/event_view.dart



#### View Comments
<img src="https://user-images.githubusercontent.com/56507424/206679142-ad606503-3de0-45e7-ad82-564769debc64.jpeg" width=30%> 


- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/comment.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/comment.g.dart

https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/discussion_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/discussion_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/comment_tile.dart


#### Add Comment
<img src="https://user-images.githubusercontent.com/56507424/206679359-4177296d-9980-4aea-9daa-231907477338.jpeg" width=30%>
<img src="https://user-images.githubusercontent.com/56507424/206679366-ea2d6e99-3155-46e4-8a2e-2b5ad81954e7.jpeg" width=30%>


- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/comment.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/comment.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/discussion_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/discussion_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/comment_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/markdown_input.dart


#### Resource Page
<img src="https://user-images.githubusercontent.com/64011660/206697861-0d8c6369-2b89-4fa4-a2df-4aae1ea1c1e1.jpg" width=30%>


- Classes

https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart

- View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/edit_button.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/edit_resource_page.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/resourcepage.dart





### Annotations

**Status**: We have implemented the database schema for text annotations. It's compliant with the W3C standard of Web Annotation Data Model. We have implemented API functions for text annotation creation, retrieval, update and deletion. We have implemented text annotations for our web front-end, leveraging [an annotation library](https://www.npmjs.com/package/@recogito/recogito-js).
**Plans**: We plan to provide text annotation functionalities on our mobile front-end. We plan to provide a distinct annotation database in order to fully comply with the W3C standard. If time permits, we also plan to create image annotation functionalities.

### Standards
Our annotations fit the W3C standard of Web Annotation Data Model except the part that needs a seperate database. We plan to construct a new database that is for annotation purposes only which will make our annotations fully fit the W3C standards. For geolocation, we have used longitudes and latitudes in our endpoints which are used to show/set event locations on a map in order to fit the W3C standards.

## Individual Reports

### Arif Akbaba
-  `Member` :Arif Akbaba- Group 3 - FrontEndTeam
- `Responsibilities` : I was tasked to implement a new profile specification. According to a team meeting, the profile page would be implemented as a public profile page, private profile page, and owner profile page that can be edited by the owner user. According to the code reviews of my teammates, I provided the necessary arrangements on these pages.
- `Main contributions` : I have implemented the following: [user_id].js .  I have implemented a public and a private profile page, connected these to the update profile page, and rearranged get profile connections based on backend changes.
 - `Code related significant issues` : [#411](https://github.com/bounswe/bounswe2022group3/issues/411) 
 - `Management related significant issues` : [#439](https://github.com/bounswe/bounswe2022group3/issues/439)
- `Pull requests` :  [#412](https://github.com/bounswe/bounswe2022group3/pull/412)
- `Additional information` : I have helped the team with PR reviews.

### Furkan Akkurt

1. Member: My name is Salih Furkan Akkurt. I'm from Group 3.
2. Responsibilities: I was given the responsibility of creating a database schema and API functions for annotations compliant with the W3C standard for Web Annotation Data Model.
3. Main contributions: I have attended many meetings with the entire team present, only the back-end team, and with the customer. I have contributed to the project's wiki, creating and organizing management pages. I have created issues related specifically to the entire team or me. For the back-end, I have created and maintained many API functions requested by the web front-end and mobile teams. I have created the back-end for text annotations, complying with the W3C standard for Web Annotation Data Model, except for a distinct annotation database we plan to implement. I have reviewed many pull requests and merged them. I have updated many of the naming conventions (e.g., course -> space) on the back-end.
    - Code related significant issues: [#381](https://github.com/bounswe/bounswe2022group3/issues/381)
    - Management related significant issues: [#373](https://github.com/bounswe/bounswe2022group3/issues/373)
5. Pull requests: [#372](https://github.com/bounswe/bounswe2022group3/pull/372), [#374](https://github.com/bounswe/bounswe2022group3/pull/374), [#379](https://github.com/bounswe/bounswe2022group3/pull/379), [#382](https://github.com/bounswe/bounswe2022group3/pull/382), [#405](https://github.com/bounswe/bounswe2022group3/pull/405), [#410](https://github.com/bounswe/bounswe2022group3/pull/410), [#413](https://github.com/bounswe/bounswe2022group3/pull/413)
6. Unit tests: [396c1](https://github.com/bounswe/bounswe2022group3/commit/396c1d676f924cc2d13bfb74a9d700b2729a38a3)

### Mehmet Gökberk Arslan
-  `Member`: Mehmet Gökberk Arslan - 2018400240 - Group 3 - Backend Team
- `Responsibilities`: I have been assigned to work on the profile endpoint and configuring ratings for different schemas.
- `Main contributions`: I have implemented a part of the user profile page and modified the corresponding endpoints to set and read ratings.
  - `Code related significant issues`: [#421](https://github.com/bounswe/bounswe2022group3/issues/421)
- `Pull requests`: [#423](https://github.com/bounswe/bounswe2022group3/pull/423) 
- `Additional information`: I have helped the team with PR reviews.

### Bilal Aytekin
-  `Member`: Bilal Aytekin - 2018400132 - Group 3 - Mobile Team
- `Responsibilities`: I have been assigned to work on the mobile application's login, registration, and event features.
- `Main contributions`: I have implemented the login and registration pages and connected them to the backend. Later on, I added GDPR compliancy to the registration and changed the flow of the mobile application to include these features. I have implemented creating and viewing an event for the mobile application.
  - `Code related significant issues`: [#343](https://github.com/bounswe/bounswe2022group3/issues/343),  [#419](https://github.com/bounswe/bounswe2022group3/issues/419)
  - `Management related significant issues`: [#408](https://github.com/bounswe/bounswe2022group3/issues/408), [#414](https://github.com/bounswe/bounswe2022group3/issues/414), [#420](https://github.com/bounswe/bounswe2022group3/issues/420)
- `Pull requests`: [#377](https://github.com/bounswe/bounswe2022group3/pull/377) [#433](https://github.com/bounswe/bounswe2022group3/pull/433)
- `Additional information`: I have helped the team with PR reviews.

### Nurlan Dadashov
-  `Member`: Nurlan Dadashov - 2019400300 - Group 3 - Frontend Team
- `Responsibilities`: I have been coordinating the work of the frontend team. I have been communicating with backend and mobile teams and writing backend specifications. I have been reviewing the codes of other team members.
- `Main contributions`: I have implemented a new design on the home and my spaces pages. I worked on implementing annotations for resources. I also implemented create space functionality. I made styling corrections to many pages to make them visually more appealing.
  - `Code related significant issues` : [#383](https://github.com/bounswe/bounswe2022group3/issues/383) [#401](https://github.com/bounswe/bounswe2022group3/issues/401) [#417](https://github.com/bounswe/bounswe2022group3/issues/417)
  - `Management related significant issues` : [#352](https://github.com/bounswe/bounswe2022group3/issues/352) 
- `Pull requests` : [#407](https://github.com/bounswe/bounswe2022group3/pull/407),  [#390](https://github.com/bounswe/bounswe2022group3/pull/390)

### Hatice Şule Erkul
-  `Member`: Hatice Şule Erkul - 2017400051 - Group 3 - Mobile Team
- `Responsibilities`:  I was responsible for the profile page and annotations of the mobile application.
- `Main contributions`: I wrote API specifications for profiles and created `.../classes/profile.dart` to connect profile pages to the backend. I implemented a custom selection toolbar for annotations that is only available at `mobile/anotations` branch.
  - `Code related significant issues` : [#327](https://github.com/bounswe/bounswe2022group3/issues/327), [#404](https://github.com/bounswe/bounswe2022group3/issues/404)
  - `Management related significant issues` : [#363](https://github.com/bounswe/bounswe2022group3/issues/363)
- `Pull requests` : [#338](https://github.com/bounswe/bounswe2022group3/pull/338)
- `Additional Information` : I have reviewed the following PRs:   [#345](https://github.com/bounswe/bounswe2022group3/pull/345), [#376](https://github.com/bounswe/bounswe2022group3/pull/376), [#427](https://github.com/bounswe/bounswe2022group3/pull/427)

### Kadir Ersoy
-  `Member` : Kadir Ersoy - 2018400252 - Group 3 - Backend Team
- `Responsibilities` : I have been assigned to work on note endpoint, building test infrastructure and maintaining the current backend with bug fixing, and doing necessary updates according to the requests of the front and mobile teams.
- `Main contributions` : I have implemented `/note` endpoint and updated /userProfile. I have set up test infrastructure for the backend. I have helped resolve bugs and backend issues that have come up during the `backend - front/mobile` connection. 
  - `Code related significant issues` : [#378](https://github.com/bounswe/bounswe2022group3/issues/378) [#389](https://github.com/bounswe/bounswe2022group3/issues/389) [#397](https://github.com/bounswe/bounswe2022group3/issues/397)
  - `Management related significant issues` : [#342](https://github.com/bounswe/bounswe2022group3/issues/342) [#346](https://github.com/bounswe/bounswe2022group3/issues/346) [#437](https://github.com/bounswe/bounswe2022group3/issues/437)
- `Pull requests` : [#364](https://github.com/bounswe/bounswe2022group3/pull/364) [#371](https://github.com/bounswe/bounswe2022group3/pull/371) [#384](https://github.com/bounswe/bounswe2022group3/pull/384) [#386](https://github.com/bounswe/bounswe2022group3/pull/386) [#392](https://github.com/bounswe/bounswe2022group3/pull/392) [#398](https://github.com/bounswe/bounswe2022group3/pull/398) [#406](https://github.com/bounswe/bounswe2022group3/pull/406) [#409](https://github.com/bounswe/bounswe2022group3/pull/409)
- `Unit Tests` : [#386](https://github.com/bounswe/bounswe2022group3/pull/386) unit tests for /user
- `Additional information` : I have helped the team with PR reviews.

### Berke Özdemir
-  `Member`: Berke Özdemir - 2016400246 - Group 3 - Frontend Team
- `Responsibilities`: I have been assigned to work on the web application's GDPR compliance, topic creation, resource creation, resource editing, resource displaying, space page refinement, and event features. Reviewing teammates' codes.
- `Main contributions`: I have implemented the resource display, event and creation pages and connected them to the backend. I have implemented topic creation and resource list display for the resources pages. I have improved the UI of the space page.
  - `Code related significant issues`: [#418](https://github.com/bounswe/bounswe2022group3/issues/418),  [#394](https://github.com/bounswe/bounswe2022group3/issues/394),  [#360](https://github.com/bounswe/bounswe2022group3/issues/360),  [#361](https://github.com/bounswe/bounswe2022group3/issues/361)
  - `Management related significant issues`:  [#420](https://github.com/bounswe/bounswe2022group3/issues/420)
- `Pull requests`: [#362](https://github.com/bounswe/bounswe2022group3/pull/362) [#434](https://github.com/bounswe/bounswe2022group3/pull/434) [#399](https://github.com/bounswe/bounswe2022group3/pull/399) [#395](https://github.com/bounswe/bounswe2022group3/pull/395) 
- `Additional information`: I have helped the team with PR reviews.

### Mertcan Özkan
-  `Member` : Mertcan Özkan - Group 3 - FrontEndTeam
- `Responsibilities` : I was tasked to create a new discussion component based on Nurlans previous code and add it to the resource page, creating a new pop-up component for adding discussions, editing notes, and adding notes. Also, creating a discussions table for viewing all the discussions for a learning space, creating a new notes component based on Nurlans previous code, and connecting all these components and files to the backend.
- `Main contributions` : I created the following: CreateDiscussions.jsx, EditNotes.jsx, CreateNote.jsx, PopModule.scss, Note.jsx, Discussions.js. Also edited Notes.js and [discussion_id].js . Connected newly created ones to the backend.
 - `Code related significant issues` :
 -  [##416 ](https://github.com/bounswe/bounswe2022group3/issues/#416 ) 
 - [##415 ](https://github.com/bounswe/bounswe2022group3/issues/415)
 -  [#356](https://github.com/bounswe/bounswe2022group3/issues/356) 
- `Pull requests` : 
- [#355](https://github.com/bounswe/bounswe2022group3/pull/355)
-  [#428](https://github.com/bounswe/bounswe2022group3/pull/428) 
- `Additional information` : I have helped the team with PR reviews.

### Muhammet Şen
-  `Member`: Muhammet Şen - 2018400192 - Group 3 - Mobile Team
- `Responsibilities`:  I have worked on the mobile app's notes and discussions parts. Moreover, I was responsible for initializing our domains (bucademy.tk and api.bucademy.tk) and getting SSL certificates.
- `Main contributions`: I implemented the markdown editor component we use across our mobile app. I created a discussion page where users can post new discussions and view other discussions. Similarly, I implemented note taking page. Finally, I have implemented deep links to let users open the app by clicking a `bucademy.tk` URL.
  - `Code related significant issues` : [#344](https://github.com/bounswe/bounswe2022group3/issues/344), [#391](https://github.com/bounswe/bounswe2022group3/issues/391), [#400](https://github.com/bounswe/bounswe2022group3/issues/400), [#430](https://github.com/bounswe/bounswe2022group3/issues/430).
  - `Management related significant issues` : [#334](https://github.com/bounswe/bounswe2022group3/issues/334), [#440](https://github.com/bounswe/bounswe2022group3/issues/440)
- `Pull requests` : [#345](https://github.com/bounswe/bounswe2022group3/pull/345), [#376](https://github.com/bounswe/bounswe2022group3/pull/376), [#387](https://github.com/bounswe/bounswe2022group3/pull/387), [#431](https://github.com/bounswe/bounswe2022group3/pull/431), [#432](https://github.com/bounswe/bounswe2022group3/pull/432).

### Salim Kemal Tirit
- `Member` : Salim Kemal Tirit - 2019400153 - Group 3 - Mobile Team
- `Responsibilities`:  I worked on the topics page and details of the topics on the mobile application. This includes viewing, editing, and deleting both content and topics.   
- `Main contributions`: I implemented the topic page. I implemented create and delete topic functionality. I implemented the resource page. I implemented creating, editing, and deleting resource functionalities. I implemented a nice pop-up type interface showing options when the user clicks and holds onto the topic or resource tiles. 
  - `Code related significant issues` : [#368](https://github.com/bounswe/bounswe2022group3/issues/368) [#402](https://github.com/bounswe/bounswe2022group3/issues/402) [#403](https://github.com/bounswe/bounswe2022group3/issues/403)  [#425](https://github.com/bounswe/bounswe2022group3/issues/425)  [#426](https://github.com/bounswe/bounswe2022group3/issues/426) 
  - `Management related significant issues` : [#347](https://github.com/bounswe/bounswe2022group3/issues/347) [#350](https://github.com/bounswe/bounswe2022group3/issues/350) [#438](https://github.com/bounswe/bounswe2022group3/issues/438)
- `Pull requests` : [#427](https://github.com/bounswe/bounswe2022group3/pull/427) [#436](https://github.com/bounswe/bounswe2022group3/pull/436)
- `Additional information`: I helped the team with PR reviews. I presented the mobile application part in the milestone presentations. I populated the database by creating new resources, discussions, topics, and notes.

### Burak Yilmaz
-  `Member` : Burak Yilmaz - 2018400237 - Group 3 - Backend Team
- `Responsibilities` : Event and participation logic, occasional bug fixes, and updates regarding the requests from mobile and frontend teams on the backend server. Also, making sure that the server runs robustly and reliably.
- `Main contributions` : I have implemented the `event` endpoint and. Created auto-restart logic for the backend server.
  - `Code related significant issues` : [#385](https://github.com/bounswe/bounswe2022group3/pull/385) [#422](https://github.com/bounswe/bounswe2022group3/pull/422)
  - `Management related significant issues` : [#424](https://github.com/bounswe/bounswe2022group3/issues/424)
- `Pull requests` : [#385](https://github.com/bounswe/bounswe2022group3/pull/385) [#422](https://github.com/bounswe/bounswe2022group3/pull/422) 
- `Additional information` : I have helped the team with PR reviews. Also made sure that both frontend and backend deployments worked reliably by optimizing dependencies and monitoring load.
