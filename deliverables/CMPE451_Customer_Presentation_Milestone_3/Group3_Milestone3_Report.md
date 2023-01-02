# Group 3 Milestone 3 Report

- [Group 3 Milestone 3 Report](#group-3-milestone-3-report)
  - [Executive Summary](#executive-summary)
    - [Project Status](#project-status)
    - [List and Status of Deliverables](#list-and-status-of-deliverables)
    - [Final Release Notes](#final-release-notes)
    - [Changes since Milestone 1](#changes-since-milestone-1)
    - [Reflections on Final Milestone Demo](#reflections-on-final-milestone-demo)
    - [What Could Be Done Differently](#what-could-be-done-differently)
  - [Progress Based On Teamwork](#progress-based-on-teamwork)
    - [A Summary of work performed by each team member](#a-summary-of-work-performed-by-each-team-member)
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
    - [Status of the Requirements](#status-of-the-requirements)
    - [API Endpoints](#api-endpoints)
    - [User Interface / User Experience - Front](#user-interface--user-experience---front)
      - [User](#user)
      - [User/\[user\_id\]](#useruser_id)
      - [Space](#space)
      - [Note](#note)
      - [my/spaces/\[space\_id\]](#myspacesspace_id)
      - [my/spaces/\[space\_id\]/resource](#myspacesspace_idresource)
      - [my/spaces\[space\_id\]/discussion/\[discussion\_id\]](#myspacesspace_iddiscussiondiscussion_id)
    - [User Interface / User Experience - Mobile](#user-interface--user-experience---mobile)
      - [App Starting Page](#app-starting-page)
      - [Login Page](#login-page)
      - [Register Page](#register-page)
      - [Home Page](#home-page)
      - [Search Learning Space](#search-learning-space)
      - [Learning Space Join](#learning-space-join)
      - [Topics](#topics)
      - [Create Topic](#create-topic)
      - [Delete Topic (Tap and Hold To Topic Tile)](#delete-topic-tap-and-hold-to-topic-tile)
      - [Resources (Inside Topic)](#resources-inside-topic)
      - [Create New Resource](#create-new-resource)
      - [Resource Page](#resource-page)
      - [Press and Hold On Resource Tile Options Menu](#press-and-hold-on-resource-tile-options-menu)
      - [Delete Resource](#delete-resource)
      - [Edit Resource](#edit-resource)
      - [Create New Note (From Resource)](#create-new-note-from-resource)
      - [Events](#events)
      - [Create a New Event](#create-a-new-event)
      - [Event View](#event-view)
      - [Discussions](#discussions)
      - [Add Discussion](#add-discussion)
      - [View Comments](#view-comments)
      - [Add Comment](#add-comment)
      - [Profile About](#profile-about)
      - [Profile Joined Spaces](#profile-joined-spaces)
      - [Profile Created Spaces](#profile-created-spaces)
      - [Edit Profile](#edit-profile)
      - [Error Page](#error-page)
      - [Feed](#feed)
    - [Annotations](#annotations)
    - [Standards](#standards)
    - [Scenarios](#scenarios)
      - [Scenario](#scenario)
      - [Work done](#work-done)


## Executive Summary

### Project Status
We have achieved the really essential features of the system. However, there are some features and requirements that we couldn't match until the final milestone presentation. All in all, as a team, we believe that we did a good job, especially when considering our workloads outside of this course.

Most of the features were already implemented in Milestone 2, after the milestone 2; we have synchronized mobile and frontend applications in terms of the features they had. Some of the already implemented features on mobile were brought to frontend and vice versa. Outside of this synchronization, we have implemented semantic search and recommendation system. We also created a seperate and publicly accessible annotation server and database, as requested. Also, implemented note sharing with deeplinks. Overall integration of mobile and frontend became much more smoother.

All of the server deployments worked reliably, except for the server that hosted semantic search. Due to high load and cpu intensive ML model, it failed to showcase what the semantic search is truly capable of.

### List and Status of Deliverables

| Deliverable | Status | Last Updated |
|---|---|---|
| [Software Requirements Specification](https://github.com/bounswe/bounswe2022group3/wiki/Requirements) | Completed | 04.12.2022 |
| [Class Diagram](https://github.com/bounswe/bounswe2022group3/wiki/Class-Diagrams) | Completed | 04.11.2022 |
| [Use Case Diagram](https://github.com/bounswe/bounswe2022group3/wiki/Use-Case-Diagrams) | Completed | 31.10.2022 |
| [Sequence Diagrams](https://github.com/bounswe/bounswe2022group3/wiki/Sequence-Diagrams) | Completed | 15.04.2022 |
| [Scenario and Mockup 1](https://github.com/bounswe/bounswe2022group3/wiki/Scenario-1) | Completed | 31.10.2022 |
| [Scenario and Mockup 2](https://github.com/bounswe/bounswe2022group3/wiki/Scenario-2) | Completed | 31.10.2022 |
| [Scenario and Mockup 3](https://github.com/bounswe/bounswe2022group3/wiki/Scenario-3) | Completed | 31.10.2022 |
|[API Specifications](https://github.com/bounswe/bounswe2022group3/wiki/API-Specifications)|Completed|22.10.2022|
| [Project Plan](https://github.com/bounswe/bounswe2022group3/wiki/Project-Plan) | Completed | 1.11.2022 |
|[BUcademyAPI Documentation](https://github.com/bounswe/bounswe2022group3/wiki/BucademyAPI-Documentation) | Completed | 02.01.2023|
|[System Manual](https://github.com/bounswe/bounswe2022group3/wiki/System-Manual)|Completed|02.01.2023|
| [Individual Final Milestone Review](https://github.com/bounswe/bounswe2022group3/wiki/451-Final-Milestone---Individual-Reports) | Completed | 02.01.2023 |
| [Final Milestone Group Review](https://github.com/bounswe/bounswe2022group3/issues/494) | Completed | 02.01.2023 |

### Final Release Notes

**Release:** 0.9.0 [customer-presentation-3](https://github.com/bounswe/bounswe2022group3/releases/tag/customer-presentation-3)

Group 3 Cmpe451 2022 Fall Final Release
**API:** http://api.bucademy.tk/
**Annotation API:** http://bucademy.tk/annotation
**APP:** https://bucademy.tk/

### Changes since Milestone 1
 
As a team, we aspire to perfect every aspect of the project. That leads to a lot of discussion about each team's work, such as deciding how the recommendation system would work or design of space pages on web and so on. At first milestone, we were ahead of the plan as we had completed the design of spaces, profiles, and main pages for both mobile and web applications. 

After the milestone 1, we decided to let subteams decide their processes and designsmore independently. That led us having shorter weekly meetings as whole team, we only shared updates of our process and the interdependencies about funcitonality. That extra time allowed us to implement our tasks faster. 

Other than those, we decided to left out some functionality we proposed last semester after the second milestone. They are : 
- Login/ Sign in using google account,
- Admin user,
- Blocking other users,
- Password alterations,
- Custom sorting functionality for notes, spaces, events, activities, search results.
- Polls,
- Achievements, 
- Monitoring,
- Private profiles,
- Threadded comments,
- Showcasing user's notes on their profile,
- File upload (only URL sharing is available)
- Image annotations

Most of the functionality we left out was not core to the application.  Deciding to not implement those allowed us to focus on what we are already doing. 

### Reflections on Final Milestone Demo

Leading up to the demo, we were a lot more consistent in our work as opposed to other Milestones. Workload was divided more effectively over time. We also made sure to prioritize our requirements better, we asked our customer what held more value in their eyes and devoted more of our time and resources to those requirements.

We have realized our way of presenting two interfaces at the same time in the Milestone 2 demo was mostly successful so we have crafted our scenarios according to that. We had a few new major features since the last demo, such as notifications, note sharing and sorting, recommendations based on interests and profile picture uploading. So we designed our demo around these features. One thing that could have gone better in the demo was that we had some delay when performing the search in the web interface. After the demo we have found this issue was caused because we were making api calls to the search endpoint with every keystroke with about 0.3 secs of debounce, but the response time was  closer to 3-4 in the best case scenario, due to the size of the language model used. So a better practice would have been performing search after the input box was unfocused and performing tag based search if language model was unviable. 

All in all we had a pretty well received demo that has effectively showed the work we had done but we could have tested our app better to find the search response time issue ahead of time. 

### What Could Be Done Differently 

In CmpE 352, we spent way too many weeks to specify requirements, discussed different features and use case scenarios. Requirements that we finalized after those long discussions have a lot of features that we could not implement simply because we did not have enough time. We believed that we can complete all of those features until the very last weeks of the lecture. In [December 18](https://github.com/bounswe/bounswe2022group3/wiki/Meeting-Notes-%2325-18.12.2022) we   finally decided not to implement some features in the requirements.

We have spent almost a year refine those requirements and it was sad seeing all of those meetings go to waste. We did not have much experience working with the team, or any team, so we thought we could complete all of the implementation as well as tests and reports. If we could go back in time, we would remove half of the features and spent more time on perfecting the features that we have.

Working in a team with 12 people is not an easy job. It took a couple months to set the pace and get used to dividing tasks between teammates efficiently. Moreover, we spent first 1 - 1.5 months to learn new technologies and frameworks we have not used before. When we sum up all of factors, we can see that we have succeded a tremendous achievement by finishing the project in time.

## Progress Based On Teamwork

### A Summary of work performed by each team member

#### Arif Akbaba
-  `Member` :Arif Akbaba- Group 3 - FrontEndTeam
- `Responsibilities` :I was in the frontend team. I wrote several pages and also updated some of the code written by other team members. I have been assigned to work on profilepage design and apply backend connection of profile page. I implement Profilepage as public profile page, private profile page  and owner profile page that editible owner user. Also, I have been assigned to work on my_spaces page. 
- `Main contributions` : I have reviewed a part of the requirements/designs. I have updated communication channel part according to group meetings. I have handled profilepage design and backend connection getuser profile.I have implemented the following: [user_id].js .  I have implement public profile page private profile page  and connect to update profile page and rearranged get profile connections based on backend changes. According to team meeting, my spaces page rearranged accordinbg to recommended and popular space. Then, .I have restored my_spaces page and enable reqired backend connections.
 - `Code related significant issues` : [#305](https://github.com/bounswe/bounswe2022group3/issues/305) ,  [#411](https://github.com/bounswe/bounswe2022group3/issues/411) , [#464](https://github.com/bounswe/bounswe2022group3/issues/464),[#467](https://github.com/bounswe/bounswe2022group3/issues/467)
 - `Management related significant issues` : [#313](https://github.com/bounswe/bounswe2022group3/issues/313), [#439](https://github.com/bounswe/bounswe2022group3/issues/439), [#496](https://github.com/bounswe/bounswe2022group3/issues/496)
- `Pull requests` : [#314](https://github.com/bounswe/bounswe2022group3/pull/314), [#412](https://github.com/bounswe/bounswe2022group3/pull/412),[#472](https://github.com/bounswe/bounswe2022group3/pull/472)
- `Additional information` : I have helped the team with PR reviews. I reviewed PRs:[#480](https://github.com/bounswe/bounswe2022group3/pull/480),[#463](https://github.com/bounswe/bounswe2022group3/pull/463),[#428](https://github.com/bounswe/bounswe2022group3/pull/428),[#309](https://github.com/bounswe/bounswe2022group3/pull/309),[#407](https://github.com/bounswe/bounswe2022group3/pull/407),[#459](https://github.com/bounswe/bounswe2022group3/pull/459),[478](https://github.com/bounswe/bounswe2022group3/pull/478)

#### Furkan Akkurt

1. Member: My name is Salih Furkan Akkurt. I'm from Group 3. I'm in the subgroup for back-end.
2. Responsibilities: I was initially given the assignments of reviewing the software requirements, diagrams, user scenarios and mockups of the project. Afterwards, I became a part of the back-end team. In the back-end team, I was given the assignments of creating 2 database schemas (Course and Enrollment), in line with the class diagram, and several functions for these schemas, in line with the API specifications given by the web front-end and mobile teams. Then, I was given the responsibility of creating a database schema and API functions for annotations, compliant with the W3C Recommendation of [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/). Then, I was given the responsibility of implementing 2 API functions related to gathering popular and recommended spaces.
3. Main contributions: I have attended many meetings with the entire team present, only the back-end team and with the customer. I have reviewed the software requirements, diagrams, user scenarios and mockups of the project. I have contributed to the wiki of the project, creating and organizing management pages. I have created several issues related specifically to me or to the entire team. For the back-end, I have created 3 database schemas (Space, Enrollment and Annotation) and API functions related to these schemas, requested by the web front-end and mobile teams. I have created and maintained these and other API functions, related to Resource and Topic schemas. Annotation schema complies with the W3C Recommendation of [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/). Annotation server complies with the W3C Recommendation of [Web Annotation Protocol](https://www.w3.org/TR/annotation-protocol/). I have reviewed many pull requests and merged them. I have updated many of the naming conventions (e.g. course -> space) on the back-end. I have implemented the space recommendation system after integrating [an API function from Datamuse](https://www.datamuse.com/api/) that returns similar phrases to a given input.
    - Code related significant issues: [#301](https://github.com/bounswe/bounswe2022group3/issues/301), [#303](https://github.com/bounswe/bounswe2022group3/issues/303), [#349](https://github.com/bounswe/bounswe2022group3/issues/349), [#381](https://github.com/bounswe/bounswe2022group3/issues/381)
    - Management related significant issues: [#258](https://github.com/bounswe/bounswe2022group3/issues/258), [#304](https://github.com/bounswe/bounswe2022group3/issues/304), [#329](https://github.com/bounswe/bounswe2022group3/issues/329), [#373](https://github.com/bounswe/bounswe2022group3/issues/373), [#491](https://github.com/bounswe/bounswe2022group3/issues/491)
4. Pull requests: [#297](https://github.com/bounswe/bounswe2022group3/pull/297), [#308](https://github.com/bounswe/bounswe2022group3/pull/308), [#310](https://github.com/bounswe/bounswe2022group3/pull/310), [#315](https://github.com/bounswe/bounswe2022group3/pull/315), [#321](https://github.com/bounswe/bounswe2022group3/pull/321), [#328](https://github.com/bounswe/bounswe2022group3/pull/328), [#335](https://github.com/bounswe/bounswe2022group3/pull/335), [#354](https://github.com/bounswe/bounswe2022group3/pull/354), [#359](https://github.com/bounswe/bounswe2022group3/pull/359) [#372](https://github.com/bounswe/bounswe2022group3/pull/372), [#374](https://github.com/bounswe/bounswe2022group3/pull/374), [#379](https://github.com/bounswe/bounswe2022group3/pull/379), [#382](https://github.com/bounswe/bounswe2022group3/pull/382), [#405](https://github.com/bounswe/bounswe2022group3/pull/405), [#410](https://github.com/bounswe/bounswe2022group3/pull/410), [#413](https://github.com/bounswe/bounswe2022group3/pull/413), [#455](https://github.com/bounswe/bounswe2022group3/pull/455) and [#456](https://github.com/bounswe/bounswe2022group3/pull/456)
5. Unit Tests: [396c1d6](https://github.com/bounswe/bounswe2022group3/commit/396c1d676f924cc2d13bfb74a9d700b2729a38a3), [a630544](https://github.com/bounswe/bounswe2022group3/commit/a6305449c55d3823ddade8278581cc16ff702f06), [1f704f5](https://github.com/bounswe/bounswe2022group3/commit/1f704f5280697fe10754216928cc697d0a2f9834) and [3ee3d32](https://github.com/bounswe/bounswe2022group3/commit/3ee3d3280aad57f0a46e53c67ec7db4ea520cb9e)

#### Mehmet Gökberk Arslan
- `Member` : Mehmet Gökberk Arslan - 2018400240 - Group 3 - Backend Team
- `Responsibilities`: I was given the responsibility of creating profile page endpoints and adjusting ratings learning spaces. I was also given the responsibility to document standards. 
- `Main contributions`: I worked on profile page and created a schema for users' personal information. We have decided to keep user schema and user profile (personal info) schemas seperate since this way would be more modular and since getting user ids from the database is a very common operation, we did not want to create a big and inclusive schema for users. I also worked on fixing a bug related to space ratings and later I have implemented the corresponding endpoints that enable users to rate and view the ratings of learning spaces.
  - `Code related significant issues` : 
[#421](https://github.com/bounswe/bounswe2022group3/issues/421), 
[#476](https://github.com/bounswe/bounswe2022group3/issues/476)

  - `Management related significant issues` : 
[#330](https://github.com/bounswe/bounswe2022group3/issues/330)

- `Pull requests` : 
[#294](https://github.com/bounswe/bounswe2022group3/pull/294),
[#423](https://github.com/bounswe/bounswe2022group3/pull/423),
[#477](https://github.com/bounswe/bounswe2022group3/pull/477)

#### Bilal Aytekin
- **Member:** I am Bilal Aytekin (2018400132). I am in the mobile team of Group 3.
- **Responsibilities:** I was given the responsibility of handling the event feature and improving the profile with interests.
- **Main contributions:**
  - I worked on the event feature and implemented its creation and editing.
  - I implemented the interest selection feature. The user can choose from a large predefined set of interests. Using a plugin, I have also presented the user with the option of searching among these features. To do this, I searched for a suitable option in pub.dev. Later, we moved it to the profile and incorporated it into editing the profile.
  - I was also going to implement the account deletion feature, but for time considerations, we canceled this feature.
  - I have attended all of the meetings.
  - All the while, I have tried to take on the role of an editor for the repository. You can see many an issue I have corrected the typos and grammatical errors (thanks to Grammarly!), added the necessary tags/projects/milestones.
- **Code-related significant issues:** 
[#419](https://github.com/bounswe/bounswe2022group3/issues/419), 
[#465](https://github.com/bounswe/bounswe2022group3/issues/465), 
[#466](https://github.com/bounswe/bounswe2022group3/issues/466), 
[#483](https://github.com/bounswe/bounswe2022group3/issues/483),
[#486](https://github.com/bounswe/bounswe2022group3/issues/486).
- **Management-related significant issues:**
[#440](https://github.com/bounswe/bounswe2022group3/issues/440),
[#414](https://github.com/bounswe/bounswe2022group3/issues/414),
[#491](https://github.com/bounswe/bounswe2022group3/issues/491),
[#494](https://github.com/bounswe/bounswe2022group3/issues/494).
- **Pull requests:**
[#433](https://github.com/bounswe/bounswe2022group3/pull/433),
[#483](https://github.com/bounswe/bounswe2022group3/pull/483),
[#486](https://github.com/bounswe/bounswe2022group3/pull/486).
- **Additional information:** I have reviewed the following pull requests: 
[#317](https://github.com/bounswe/bounswe2022group3/pull/468),
[#393](https://github.com/bounswe/bounswe2022group3/pull/475),
[#341](https://github.com/bounswe/bounswe2022group3/pull/483),
[#387](https://github.com/bounswe/bounswe2022group3/pull/485).



#### Nurlan Dadashov
- `Member` : Nurlan Dadashov - 2019400300 - Group 3 - Frontend Team
- `Responsibilities`: I have been coordinating the work of the frontend team. I have been communicating with backend and mobile teams and wrote backend specifications. I have been reviewing the codes of other team members. I presented the web application during customer milestones. 
- `Main contributions`: I have initialized the frontend project, BUcademy. I have created an authentication layout for registration and login pages. I have created main layout for learning space which contains resources, events, discussions, notes pages. I have implemented a new design on the home and my spaces pages. I worked on implementing annotations for resources. I also implemented create space functionality. I have implemented profile photo upload functionality. I have implemented a separate page for notes so that they can be shared and saved. I have implemented edit and rating functionality for resources. I made styling corrections to many pages to make them visually more appealing.
  - `Code related significant issues` : 
[#287](https://github.com/bounswe/bounswe2022group3/issues/287), 
[#311](https://github.com/bounswe/bounswe2022group3/issues/311), 
[#312](https://github.com/bounswe/bounswe2022group3/issues/312),
[#383](https://github.com/bounswe/bounswe2022group3/issues/383),
[#401](https://github.com/bounswe/bounswe2022group3/issues/401),
[#417](https://github.com/bounswe/bounswe2022group3/issues/417),
[#460](https://github.com/bounswe/bounswe2022group3/issues/460)

  - `Management related significant issues` : 
[#260](https://github.com/bounswe/bounswe2022group3/issues/260), 
[#270](https://github.com/bounswe/bounswe2022group3/issues/270),
[#352](https://github.com/bounswe/bounswe2022group3/issues/352) 

- `Pull requests` : 
[#277](https://github.com/bounswe/bounswe2022group3/pull/277), 
[#309](https://github.com/bounswe/bounswe2022group3/pull/309), 
[#320](https://github.com/bounswe/bounswe2022group3/pull/320),
[#390](https://github.com/bounswe/bounswe2022group3/pull/390),
[#407](https://github.com/bounswe/bounswe2022group3/pull/407),  [#459](https://github.com/bounswe/bounswe2022group3/pull/459),
[#473](https://github.com/bounswe/bounswe2022group3/pull/473), 
[#478](https://github.com/bounswe/bounswe2022group3/pull/478)

- `Additional information`: I reviewed PRs: 
[#285](https://github.com/bounswe/bounswe2022group3/pull/285),
[#286](https://github.com/bounswe/bounswe2022group3/pull/286),
[#314](https://github.com/bounswe/bounswe2022group3/pull/314),
[#324](https://github.com/bounswe/bounswe2022group3/pull/324),
[#336](https://github.com/bounswe/bounswe2022group3/pull/336),
[#355](https://github.com/bounswe/bounswe2022group3/pull/355),
[#395](https://github.com/bounswe/bounswe2022group3/pull/395),
[#399](https://github.com/bounswe/bounswe2022group3/pull/399),
[#412](https://github.com/bounswe/bounswe2022group3/pull/412). 
I populated the database by creating new resources, discussions, topics, etc.

#### Hatice Şule Erkul
- `Member` : Hatice Şule Erkul - 2017400051 - Group 3 - Mobile Team
- `Responsibilities`: I was responsible for user profiles and annotations on mobile app.
- `Main contributions`: I worked on user profile page. I implemented tabbed view for the page which shows user's created spaces, joined spaces, and personal information. This pages layout changed multiple times to provide clean looking and intuitive design. I implemented backend connetions of profile related endpoints in Profile Service class. I also implemented a button to view profiles. It allows users to see other users profiles. I implemented follow/unfollow for profiles. I implemented 'edit profile' page except interest selection widget. I worked on annotations for mobile; however, we were not able to merge it with the app because it did not work with Markdown. I reviewed PRs of my teammates. I attented most of the meetings. 

  - `Code related significant issues` : [#327](https://github.com/bounswe/bounswe2022group3/issues/327), [#404](https://github.com/bounswe/bounswe2022group3/issues/404), [#481](https://github.com/bounswe/bounswe2022group3/issues/481), [#482](https://github.com/bounswe/bounswe2022group3/issues/482)

  - `Management related significant issues` : [#363](https://github.com/bounswe/bounswe2022group3/issues/363)

- `Pull requests` : [#483](https://github.com/bounswe/bounswe2022group3/pull/483), [#388](https://github.com/bounswe/bounswe2022group3/pull/388), [#337](https://github.com/bounswe/bounswe2022group3/pull/337),
- `Additional information`: I reviewed PRs: [#345](https://github.com/bounswe/bounswe2022group3/pull/345), [#376](https://github.com/bounswe/bounswe2022group3/pull/376), [#427](https://github.com/bounswe/bounswe2022group3/pull/427). My take on mobile annotations: As I mentioned in `Main Contributions` part, I was not able to finish implementing annotations on mobile app. I implemented annotation_service.dart for existing endpoints. I also implemented annotation.dart for data model. At first I tried to use [JsonSerializable](https://pub.dev/packages/json_serializable) for that but it wasn't compatible with request structure mentioned in [W3C Standarts](https://www.w3.org/TR/annotation-model/). So, I implemented toJson and fromJson functions myself. I also implemented custom toolbar and selection delegate because flutter has limited functionality for customizing selection toolbars. I created a text widget for annotations (annotated_text.dart) which uses SelectableText widget of flutter and paints the annotations. As it uses SelectableText, it works fine with normally formatted text. I also implemented a popup which shows the comment related to an annotation. When it came to combining this widget and flutter's markdown widget, it got complicated. Flutter is not able to process HTML, so in its Markdown package, it traverses the input string and creates a widget for each tag. The text inside markdown widget can configured to be selectable however there is no way to get the widgets of the selected area. This causes problem in getting exact text that is annotated and highlighting it. Here are some issues from Flutter repo which mentions the problem I experienced :
    - [Selection is only available in the same paragraph](https://github.com/flutter/flutter/issues/99819)
    - [Highlighting with additional tag](https://github.com/dart-lang/markdown/issues/365)
    - [Accessing children widgets](https://github.com/flutter/flutter/issues/109292)
    
    A solution proposed to highlight text was creating another tag inside the markdown text for annotated part and configuring a style for it. This method requires to alter the markdown text coming from the database. It also doesn’t work all the time. When the new highlight tag is inside another tag, it messes up the parent tag’s formatting. Another solution was to create my own markdown parser, which I started bu could not complete in time. You can see what I’ve coded in [mobile/annotation](https://github.com/bounswe/bounswe2022group3/tree/mobile/annotation) branch. Overall, I worked really hard to implement annotations; however, I could not complete it in given time.

#### Kadir Ersoy
-  `Member`: Kadir Ersoy - 2018400252 - Group 3 - Backend Team
- `Responsibilities`: I have worked on registration and authorization at first. Then I created note, activities and userProfile endpoints, and built test infrastructure. Lastly, I handled creating annotation microservice. For the rest of the project, I mostly assigned for maintenance, handling requests of front and mobile, and resolving found bugs. I also was the note taker for most of the meetings and milestones.
- `Main contributions`: 
  - I have reviewed a part of the requirements/designs and updated them. 
  - I have implemented `/register` , `/login`, `/logout` endpoints.
  - I have set up authorization middleware for backend.
  - I have implemented `/note` endpoint and updated /userProfile. I have set up test infrastructure for the backend. I have helped resolve bugs and backend issues that have come up during the `backend - front/mobile` connection. 
  - I have implemented `/activity` endpoint. I moved the already existing annotation endpoint to a seperate machine and adjusted it to become a microservice.
  - `Code related significant issues`: [#302](https://github.com/bounswe/bounswe2022group3/issues/302), [#378](https://github.com/bounswe/bounswe2022group3/issues/378) [#389](https://github.com/bounswe/bounswe2022group3/issues/389) [#397](https://github.com/bounswe/bounswe2022group3/issues/397) [#450](https://github.com/bounswe/bounswe2022group3/issues/450) [#448](https://github.com/bounswe/bounswe2022group3/issues/448)
  - `Management related significant issues`: [#268](https://github.com/bounswe/bounswe2022group3/issues/268) , [#269](https://github.com/bounswe/bounswe2022group3/issues/269), [#342](https://github.com/bounswe/bounswe2022group3/issues/342) [#346](https://github.com/bounswe/bounswe2022group3/issues/346) [#437](https://github.com/bounswe/bounswe2022group3/issues/437) [#494](https://github.com/bounswe/bounswe2022group3/issues/494).
- `Pull requests`: [#293](https://github.com/bounswe/bounswe2022group3/pull/293), [#332](https://github.com/bounswe/bounswe2022group3/pull/332), [#364](https://github.com/bounswe/bounswe2022group3/pull/364) [#371](https://github.com/bounswe/bounswe2022group3/pull/371) [#384](https://github.com/bounswe/bounswe2022group3/pull/384) [#386](https://github.com/bounswe/bounswe2022group3/pull/386) [#392](https://github.com/bounswe/bounswe2022group3/pull/392) [#398](https://github.com/bounswe/bounswe2022group3/pull/398) [#406](https://github.com/bounswe/bounswe2022group3/pull/406) [#409](https://github.com/bounswe/bounswe2022group3/pull/409) [#447](https://github.com/bounswe/bounswe2022group3/pull/447) [#449](https://github.com/bounswe/bounswe2022group3/pull/449) [#457](https://github.com/bounswe/bounswe2022group3/pull/457)
- `Unit Tests` : [#386](https://github.com/bounswe/bounswe2022group3/pull/386) unit tests for /user
- `Additional information`: I have helped the team with PR reviews.
  - [#291](https://github.com/bounswe/bounswe2022group3/pull/291) [#292](https://github.com/bounswe/bounswe2022group3/pull/292)  [#293](https://github.com/bounswe/bounswe2022group3/pull/293)  [#294](https://github.com/bounswe/bounswe2022group3/pull/294) [#297](https://github.com/bounswe/bounswe2022group3/pull/297) [#298](https://github.com/bounswe/bounswe2022group3/pull/298) [#308](https://github.com/bounswe/bounswe2022group3/pull/308) [#315](https://github.com/bounswe/bounswe2022group3/pull/315) [#321](https://github.com/bounswe/bounswe2022group3/pull/321) [#328](https://github.com/bounswe/bounswe2022group3/pull/328) [#335](https://github.com/bounswe/bounswe2022group3/pull/335) [#359](https://github.com/bounswe/bounswe2022group3/pull/359) [#374](https://github.com/bounswe/bounswe2022group3/pull/374) [#379](https://github.com/bounswe/bounswe2022group3/pull/379) [#382](https://github.com/bounswe/bounswe2022group3/pull/382) [#405](https://github.com/bounswe/bounswe2022group3/pull/405) [#409](https://github.com/bounswe/bounswe2022group3/pull/409) [#410](https://github.com/bounswe/bounswe2022group3/pull/410) [#413](https://github.com/bounswe/bounswe2022group3/pull/413) [#422](https://github.com/bounswe/bounswe2022group3/pull/422) [#423](https://github.com/bounswe/bounswe2022group3/pull/423) [#455](https://github.com/bounswe/bounswe2022group3/pull/455) [#456](https://github.com/bounswe/bounswe2022group3/pull/456) [#457](https://github.com/bounswe/bounswe2022group3/pull/457)

#### Berke Özdemir
-  **Member**: Berke Özdemir - 2016400246 - Group 3 - Frontend Team
- **Responsibilities**: I have been assigned to work on web application's GDPR compliance, topic creation, resource creation, resource editing, resource displaying, space page refinement, event, home page, user page and search functionality and notifications for the web application.
- **Main contributions**: 
  - I have created the home component and user courses component.
  - I have implemented the navbar component to use in those pages.
  - I have implemented a course card component to use in those pages.
  - I have implemented the resource display page.
  - I have implemented event display and creation pages. 
  - I have implemented topic creation popup.
  - I have implemented resource list display for the resources pages. 
  - I have improved the UI of the space page.
  - I have implemented activities flow.

  
- **Code related significant issues**: [#325](https://github.com/bounswe/bounswe2022group3/issues/325)  , [#326](https://github.com/bounswe/bounswe2022group3/issues/326), [#418](https://github.com/bounswe/bounswe2022group3/issues/418),  [#394](https://github.com/bounswe/bounswe2022group3/issues/394),  [#360](https://github.com/bounswe/bounswe2022group3/issues/360),  [#361](https://github.com/bounswe/bounswe2022group3/issues/361), [#479](https://github.com/bounswe/bounswe2022group3/issues/479)
- **Management related significant issues**: [#276](https://github.com/bounswe/bounswe2022group3/issues/276), [#269](https://github.com/bounswe/bounswe2022group3/issues/269), [#420](https://github.com/bounswe/bounswe2022group3/issues/420) , [#494](https://github.com/bounswe/bounswe2022group3/pull/494)
- Pull requests: [#362](https://github.com/bounswe/bounswe2022group3/pull/362) [#434](https://github.com/bounswe/bounswe2022group3/pull/434) [#399](https://github.com/bounswe/bounswe2022group3/pull/399), [#395](https://github.com/bounswe/bounswe2022group3/pull/395), [#324](https://github.com/bounswe/bounswe2022group3/issues/324), [#336](https://github.com/bounswe/bounswe2022group3/issues/336), [#479](https://github.com/bounswe/bounswe2022group3/issues/479)
- **Additional information**: I have helped the team with PR reviews.

#### Mertcan Özkan
- `Member` : Mertcan Özkan- 2019400081- Group 3 - Frontend Team
- `Responsibilities`: I was in the frontend team. I wrote several pages and also updated some of the code written by other team members.
- `Main contributions`: I created the course summary page. I created/updated the discussions page to its tabular form. Also added sorting feature to discussions. I added create note, edit note and create discussion pop-ups. I updated the profile page and added follow/unfollow features and knowledge/interest tags of the user. I modified the notes page ,gave it the latest form and moved notes to its own component. Also added note filtering feature based on topic and resource. I also connected all these components/pages to backend. I also communicated with the backend team to update some of the endpoints based on projects needs.

  - `Code related significant issues` : 
[#289](https://github.com/bounswe/bounswe2022group3/issues/289), 
[#356](https://github.com/bounswe/bounswe2022group3/issues/356), 
[#415](https://github.com/bounswe/bounswe2022group3/issues/415),
[#416](https://github.com/bounswe/bounswe2022group3/issues/416),
[#451](https://github.com/bounswe/bounswe2022group3/issues/451),
[#452](https://github.com/bounswe/bounswe2022group3/issues/452),
[#453](https://github.com/bounswe/bounswe2022group3/issues/453)

  - `Management related significant issues` : 
[#272](https://github.com/bounswe/bounswe2022group3/issues/272), 
[#258](https://github.com/bounswe/bounswe2022group3/issues/258), 
[#259](https://github.com/bounswe/bounswe2022group3/issues/259), 
[#269](https://github.com/bounswe/bounswe2022group3/issues/269), 
- `Pull requests` : 
[#277](https://github.com/bounswe/bounswe2022group3/pull/488), 
[#309](https://github.com/bounswe/bounswe2022group3/pull/286), 
[#320](https://github.com/bounswe/bounswe2022group3/pull/355),
[#390](https://github.com/bounswe/bounswe2022group3/pull/428),
[#407](https://github.com/bounswe/bounswe2022group3/pull/461),  [#473](https://github.com/bounswe/bounswe2022group3/pull/463)

#### Muhammet Şen
- `Member` : Muhammet Şen - 2018400192 - Group 3 - Mobile Team
- `Responsibilities`: I worked on improving the co-learning experience on the mobile application by letting the users share notes with each other and showing each others' activities on a feed page. 
- `Main contributions`: I implemented deep link mechanism to open the Bucademy app when user clicks a link belongs to the domain of bucademy.tk. The main feature that uses this mechanism is note sharing. A user can open a note's page by just clicking on a url, and duplicate the note to their own enrollment. Moreover, I implemented the feed page that a user can see the activities of the user they are following, like creating a new space or starting a discussion. I also improved the homepage by showing the recommended spaces. 
  - `Code related significant issues` : 
[#270](https://github.com/bounswe/bounswe2022group3/issues/270), 
[#281](https://github.com/bounswe/bounswe2022group3/issues/281), 
[#295](https://github.com/bounswe/bounswe2022group3/issues/295), 
[#316](https://github.com/bounswe/bounswe2022group3/issues/316), 
[#344](https://github.com/bounswe/bounswe2022group3/issues/344),
[#391](https://github.com/bounswe/bounswe2022group3/issues/391),
[#400](https://github.com/bounswe/bounswe2022group3/issues/400),
[#430](https://github.com/bounswe/bounswe2022group3/issues/430),
[#469](https://github.com/bounswe/bounswe2022group3/issues/469),
[#474](https://github.com/bounswe/bounswe2022group3/issues/474),
[#484](https://github.com/bounswe/bounswe2022group3/issues/484)

  - `Management related significant issues` : 
[#261](https://github.com/bounswe/bounswe2022group3/issues/261),
[#266](https://github.com/bounswe/bounswe2022group3/issues/266),
[#276](https://github.com/bounswe/bounswe2022group3/issues/276),
[#334](https://github.com/bounswe/bounswe2022group3/issues/334),

- `Pull requests` : 
[#282](https://github.com/bounswe/bounswe2022group3/pull/282),
[#296](https://github.com/bounswe/bounswe2022group3/pull/296),
[#317](https://github.com/bounswe/bounswe2022group3/pull/317),
[#341](https://github.com/bounswe/bounswe2022group3/pull/341),
[#345](https://github.com/bounswe/bounswe2022group3/pull/345),
[#376](https://github.com/bounswe/bounswe2022group3/pull/376),
[#431](https://github.com/bounswe/bounswe2022group3/pull/431),
[#432](https://github.com/bounswe/bounswe2022group3/pull/432),
[#468](https://github.com/bounswe/bounswe2022group3/pull/468),
[#475](https://github.com/bounswe/bounswe2022group3/pull/475),
[#485](https://github.com/bounswe/bounswe2022group3/pull/485)

- `Additional information`: I reviewed PRs: 
[#310](https://github.com/bounswe/bounswe2022group3/pull/310),
[#318](https://github.com/bounswe/bounswe2022group3/pull/318),
[#337](https://github.com/bounswe/bounswe2022group3/pull/337),
[#340](https://github.com/bounswe/bounswe2022group3/pull/340),
[#377](https://github.com/bounswe/bounswe2022group3/pull/377),
[#388](https://github.com/bounswe/bounswe2022group3/pull/388),
[#470](https://github.com/bounswe/bounswe2022group3/pull/470), 
[#483](https://github.com/bounswe/bounswe2022group3/pull/483), 
[#490](https://github.com/bounswe/bounswe2022group3/pull/490).

#### Salim Kemal Tirit
- `Member` : Salim Kemal Tirit - 2019400153 - Group 3 - Mobile Team
- `Responsibilities`: I was given the responsibility of creating learning space, topic and resource pages. I was given the responsibility to present the application. 
- `Main contributions`: I worked on the learning space page and implemented a tabbed view for it. The tabs are being used for topics, events, notes, and discussions. I implemented the topic page. I implemented create and delete topic functionality. I implemented the resource page. I implemented creating, editing, and deleting resource functionalities. I implemented a nice pop-up type interface showing options when the user clicks and holds onto the topic or resource tiles.  I worked on the navigation to other pages such as the discussion and note pages from the resource page. I worked on the events part and made some changes and fixes in the create event dialogue. I added the show on map button which directs to the map application of the phone. I have attended most of the meetings and took meeting notes in some of them. I have presented our mobile application in all of the milestones. 
  - `Code related significant issues` : 
[#283](https://github.com/bounswe/bounswe2022group3/issues/283), 
[#284](https://github.com/bounswe/bounswe2022group3/issues/284), 
[#306](https://github.com/bounswe/bounswe2022group3/issues/306), 
[#319](https://github.com/bounswe/bounswe2022group3/issues/319),
[#368](https://github.com/bounswe/bounswe2022group3/issues/368),
[#402](https://github.com/bounswe/bounswe2022group3/issues/402),
[#403](https://github.com/bounswe/bounswe2022group3/issues/403),
[#425](https://github.com/bounswe/bounswe2022group3/issues/425),
[#426](https://github.com/bounswe/bounswe2022group3/issues/426),
[#454](https://github.com/bounswe/bounswe2022group3/issues/454),
[#471](https://github.com/bounswe/bounswe2022group3/issues/471)

  - `Management related significant issues` : 
[#269](https://github.com/bounswe/bounswe2022group3/issues/271),
[#347](https://github.com/bounswe/bounswe2022group3/issues/347),
[#348](https://github.com/bounswe/bounswe2022group3/issues/348),
[#350](https://github.com/bounswe/bounswe2022group3/issues/350),
[#438](https://github.com/bounswe/bounswe2022group3/issues/438),
[#442](https://github.com/bounswe/bounswe2022group3/issues/442),
[#443](https://github.com/bounswe/bounswe2022group3/issues/443),
[#444](https://github.com/bounswe/bounswe2022group3/issues/444),
[#445](https://github.com/bounswe/bounswe2022group3/issues/445),
[#446](https://github.com/bounswe/bounswe2022group3/issues/446),
[#493](https://github.com/bounswe/bounswe2022group3/issues/493),
[#495](https://github.com/bounswe/bounswe2022group3/issues/495)

- `Pull requests` : 
[#318](https://github.com/bounswe/bounswe2022group3/pull/318),
[#340](https://github.com/bounswe/bounswe2022group3/pull/340),
[#427](https://github.com/bounswe/bounswe2022group3/pull/427),
[#436](https://github.com/bounswe/bounswe2022group3/pull/436),
[#470](https://github.com/bounswe/bounswe2022group3/pull/470),
[#490](https://github.com/bounswe/bounswe2022group3/pull/490),
[#492](https://github.com/bounswe/bounswe2022group3/pull/492)

- `Additional information`: I reviewed PRs: 
[#317](https://github.com/bounswe/bounswe2022group3/pull/317),
[#341](https://github.com/bounswe/bounswe2022group3/pull/341),
[#387](https://github.com/bounswe/bounswe2022group3/pull/387),
[#393](https://github.com/bounswe/bounswe2022group3/pull/393),
[#432](https://github.com/bounswe/bounswe2022group3/pull/432),
[#433](https://github.com/bounswe/bounswe2022group3/pull/433),
[#441](https://github.com/bounswe/bounswe2022group3/pull/441). I populated the database by creating new resources, discussions, topics, and notes.

#### Burak Yilmaz
-  `Member`: Burak Yilmaz - 2018400237 - Group 3 - Backend Team
- `Responsibilities`: I initially created the server structure for the whole team. After that, I was given some specific schemas and their corresponding APIs for CRUD operations. They can be found in the below PRs. I also did some optimizations for both backend and frontend servers so that they would be more stable. I also implemented and dockerized the semantic search engine and the relevant server. 
- `Main contributions`: 
  - I have reviewed a part of the requirements/designs and updated them. 
  - I have created the initial backend server structure.
  - I have implemented semantic search engine and its server.
  - I have implemented the relevant endpoints in the PRs below.
  - I have done frontend optimizations so the machines could work with that load. Also configured external semantic search server for the demo day.

- `Code related significant issues`: [#274](https://github.com/bounswe/bounswe2022group3/issues/274), [#385](https://github.com/bounswe/bounswe2022group3/issues/385), [#422](https://github.com/bounswe/bounswe2022group3/issues/422), [#458](https://github.com/bounswe/bounswe2022group3/issues/458), [#487](https://github.com/bounswe/bounswe2022group3/issues/487)

- `Management related significant issues`: [#270](https://github.com/bounswe/bounswe2022group3/issues/270), [#424](https://github.com/bounswe/bounswe2022group3/issues/424)

- `Pull requests`: [#291](https://github.com/bounswe/bounswe2022group3/pull/291), [#292](https://github.com/bounswe/bounswe2022group3/pull/292), [#385](https://github.com/bounswe/bounswe2022group3/issues/385), [#422](https://github.com/bounswe/bounswe2022group3/issues/422), [#458](https://github.com/bounswe/bounswe2022group3/issues/458), [#487](https://github.com/bounswe/bounswe2022group3/issues/487)
- `Additional information`: I have helped the team with PR reviews. Also made sure that both frontend and backend deployments worked reliably by optimizing dependencies and monitoring load. Also, total number of issues seem low, however they mostly included dependent schemas and/or endpoints in them, so they could be split to multiple PRs. And since we mostly worked with meetings, most of my work doesn't have standalone issues; they have the finalized PRs as the issues.


### Status of the Requirements
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
| 1.2.2.  |  **completed** |
| -- 1.3. User Actions |  |
| 1.3.1  | not_started |
| 1.3.1.1 | not_started |
| 1.3.2. |  **completed** |
| 1.3.3.  | completed |
| 1.3.3.1. | completed |
| 1.3.3.2. | completed |
| 1.3.4.1. | completed |
| 1.3.4.2. | completed |
| 1.3.4.3. | completed |
| 1.3.4.3.1. | not_started |
| 1.3.4.3.2. |  **completed** |
| 1.3.4.4 | completed  |
| 1.3.4.5  |  **completed** |
| 1.3.4.6 |  **completed** |
| 1.3.5  |  **completed** |
| 1.3.6 (with its subtopics)| completed |
| 1.3.7 | completed |
| 1.3.8 (with its subtopics) |completed(except 1.3.8.1 not  started)  |
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
| 2.1.2.2. Activities (with its subsections) |  **completed** |
| 2.1.2.5. Monitoring (with its subsections) | not started |
| 2.1.2.6. Knowledge (with its subsections) | completed |
| 2.1.2.7. Rating (with its subsections) |  **completed** |
| 2.1.2.8. Notes (with its subsections) |  **completed** |
| 2.1.3. Following (with its subsections) |  **completed** |
| 2.1.4. Privacy (with its subsections)| not started|
| -- 2.2. Communication Channel |  |
| 2.2.1 | completed |
| 2.2.2 | completed |
| 2.2.2.1 | not_started |
| 2.2.3 | not_started |
| -- 2.3. Note Taking |  **completed**  |
| 2.3.1  | completed |
| 2.3.2  | not_started |
| 2.3.3   | **completed** |
| -- 2.4. Recommendations |
|2.4.1. |completed|
|2.4.1.1. | **completed** |
| -- 2.5. Search Engine |  
|2.5.1.|completed|
|2.5.2.|completed|
|2.5.3. | **completed** |
|2.5.4.|in progress|
|2.5.5. |not_started|
|2.5.6. |not_started|
|2.5.7.  (with its subtopics)|not started (expect 2.5.7.3  **completed** )|
| -- 2.6. Annotation | | 
|2.6.1| **completed**  (expect image annotation)|
|2.6.1.1|completed|
|2.6.2|not_started|
|2.6.3| **completed** |
|2.6.4|completed|
| -- 2.7. Notifications(with its subtopics)| **completed**  (expect push notifications)|
| ## Non-Functional Requirements||
| -- 3.1. Accessibility and Availability| completed |
| -- 3.2. Security (with its subtopics)|completed (except 3.2.5 not_started ) |
| -- 3.3. Privacy(with its subtopics)|completed (except 3.3.6[with its subtopics] not_started ) |
| -- 3.4. Performance and Reliability||
|3.4.1.| completed |
|3.4.2.|completed|
|3.4.3.|completed|
|3.4.4| **completed** |
|3.4.5| **completed** |
|3.4.6|completed|
| -- 3.5. Standards (with its subtopics)|completed|

### API Endpoints
- BucademyAPI documentation can be viewed from [here](https://documenter.getpostman.com/view/20679271/2s8YzL2kTF). The same document is available at [wiki](https://github.com/bounswe/bounswe2022group3/wiki/BucademyAPI-Documentation).
- BUcademy API: https://api.bucademy.tk/
- Annotation API: https://bucademy.tk/annotation/
- You can access the three example functionalities of BucademyAPI from this [postman collection](https://www.postman.com/gold-flare-216577/workspace/bucademyapi-examples/collection/20679271-d56f8dec-e9a1-4495-820f-3bf38b7adc94?action=share&creator=20679271).
  - You must register to the platform using [POST]/user/register. Then you will get a confirmation email. You can follow the link in the email to confirm your account. Then you must log in to the system via [POST]/user/login.
  - For the three functionalities;
    - Newly registered accounts can view existing spaces by [GET]/space/searchSpaces. You can test the semantic search by providing a keyword, [GET]/space/searchSpaces/keyword.
    - For the further explained endpoints to work, the user must provide an access token, which is provided by [POST]/user/login.
      - So, acquire an access token from login and put it to the Authorization tab of the endpoint you want to run, as a bearer token. You can also put the access token to the provided postman environment's access token variable.
    - Users can enroll in a space by [POST]/enrollment, providing a space id, which can be acquired from [GET]/space/searchSpaces. and view their enrollment via [GET]/enrollment/getEnrolledSpaces.
    - Users can create spaces via [POST]/space, providing necessary information.
    - Users can create resources and notes on the spaces they enrolled and they created, using [POST]/resource. 
      - Please beware of giving valid topic_id's to create resource. To avoid confusion, we added getSpace endpoint, so that you can view all topics on a space and choose one to create resource in. OR you can create a topic yourself on a space via [POST]/topic and create a resource on that topic.
    - Users can create notes on the spaces they enrolled and they created, using [POST]/note. 
      - Please beware of giving valid resource_id's to create notes. To avoid confusion, we added getTopic endpoint, so that you can view all resources on a topic and choose one to create the note in. OR you can create a resource yourself on a topic via [POST]/resource and create a note on that resource.

### User Interface / User Experience - Front

#### User
-	Register
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/register.js
<img width="1470" alt="image" src="https://user-images.githubusercontent.com/45170430/210247192-582fe8a8-6419-44a1-900b-3c3978717d41.png">

-	Login
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/login.js
<img width="1470" alt="image" src="https://user-images.githubusercontent.com/45170430/210247238-b675463e-e477-4cc4-b4a0-351dda1bf191.png">

-	Profile
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/%5Buser_id%5D.js

![image](https://user-images.githubusercontent.com/45170430/210247319-05c6bc3e-856a-435e-835e-b0aa8b530094.png)

-	Home
 https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/index.js

![image](https://user-images.githubusercontent.com/45170430/210247552-fbb4386b-94c1-486a-8a0b-f5d541f1675e.png)

-	Myspaces
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/my_spaces.js

![image](https://user-images.githubusercontent.com/45170430/210247903-1cd4c90c-0f7b-49c2-870a-983ab22da5bd.png)

#### User/[user_id]
-	Activities
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/user/%5Buser_id%5D/activities.js

![image](https://user-images.githubusercontent.com/45170430/210248168-3ad06027-9201-4b02-acab-c5dc5168d17e.png)

#### Space
-	Space
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/space/%5Bspace_id%5D.js

![image](https://user-images.githubusercontent.com/45170430/210248326-29195fb0-86c3-4214-a2db-ec0172621fb8.png)

-	CreateSpace
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/space/create_space.js

![image](https://user-images.githubusercontent.com/45170430/210248365-8426483a-4c3a-48d1-a50c-7eb6097696d5.png)

#### Note
- 	Note
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/note/%5Bnote_id%5D.js

![image](https://user-images.githubusercontent.com/45170430/210248634-922bf1ca-17cf-45ba-842f-f5785faf9c30.png)

#### my/spaces/[space_id]
-	Discussion
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/discussions.js

![image](https://user-images.githubusercontent.com/45170430/210248695-7d3491df-6bca-4ef9-af49-30e56d1e5542.png)

-	Event 
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/events.js

![image](https://user-images.githubusercontent.com/45170430/210248801-7822bf6c-20ed-4022-aff7-1cccfb38e635.png)

-	Notes
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/notes.js

![image](https://user-images.githubusercontent.com/45170430/210249006-245a6647-8235-497e-8a1c-4176cf9d546c.png)


-	Resources
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/resources.js 

![image](https://user-images.githubusercontent.com/45170430/210249040-ba9f8acf-1893-44cb-aa51-9df320481005.png)

#### my/spaces/[space_id]/resource
-	Create resource
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/resource/%5Bresource%5D.js

![image](https://user-images.githubusercontent.com/45170430/210249150-9cf09968-d00c-4f8c-89e4-bb357bc440de.png)

-	Resource
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/resource/%5Bresource%5D.js

![image](https://user-images.githubusercontent.com/45170430/210249211-77fe359d-71ee-49a9-a8f3-d440113867f2.png)

#### my/spaces[space_id]/discussion/[discussion_id]
- Discussion
https://github.com/bounswe/bounswe2022group3/blob/master/app/client/pages/my/spaces/%5Bspace_id%5D/discussion/%5Bdiscussion_id%5D.js

![image](https://user-images.githubusercontent.com/45170430/210249269-2f9d5755-ee38-44fc-973a-24c82c5e1739.png)


### User Interface / User Experience - Mobile

#### App Starting Page
![1672626704662](https://user-images.githubusercontent.com/64011660/210191630-a0ff5a0e-712d-40eb-9472-e694cf113303.jpg)

-  Classes

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

-  View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/intro/intro.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/main.dart


#### Login Page
![1672595539216](https://user-images.githubusercontent.com/64011660/210180674-ee06c4d4-ce0f-41b9-88c1-037ae562d777.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/login.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/login.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/user_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/persistence_service.dart

-  View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/login/login.dart


#### Register Page
![1672595539188](https://user-images.githubusercontent.com/64011660/210180679-4b3c7c75-1e84-41b3-8957-740b455621cd.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/register.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/register.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/user_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/persistence_service.dart

-  View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/login/registration.dart


#### Home Page
![1672595539162](https://user-images.githubusercontent.com/64011660/210180359-abbd0e4a-26e2-4e8b-9808-3976c1e7f378.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/user.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/user/user.g.dart

-  Resources
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/resources/constants.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/resources/text_styles.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/resources/custom_colors.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/persistence_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/appbar.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/course_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/homepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/search_bar.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart


#### Search Learning Space
![1672595539134](https://user-images.githubusercontent.com/64011660/210180376-351a3f88-338d-4735-98d2-6f46d259d4a4.jpg)
![1672595539107](https://user-images.githubusercontent.com/64011660/210180378-7d3c5bad-982d-406b-a82e-bb947b767c1d.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/search_bar.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/homepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/home/appbar.dart


#### Learning Space Join
![1672595537928](https://user-images.githubusercontent.com/64011660/210180424-79931928-0579-4a06-adcd-6bc73189c80f.jpg)
![1672595537896](https://user-images.githubusercontent.com/64011660/210180426-f17a2eaf-dc20-4f75-bd42-ebceefb47ca1.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart


#### Topics
![1672595539080](https://user-images.githubusercontent.com/64011660/210180456-aa448bea-11ec-40c6-a3d6-868e09ca5671.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/course/course.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic_tile.dart


#### Create Topic
![1672595538913](https://user-images.githubusercontent.com/64011660/210180482-b0037e46-517b-4b8a-977b-d51ab7639201.jpg)
![1672595538882](https://user-images.githubusercontent.com/64011660/210180488-2e4c6ffd-24df-4a6a-ac41-4dfc3d4f6dd2.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic/create_topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic_tile.dart


#### Delete Topic (Tap and Hold To Topic Tile)
![1672595539026](https://user-images.githubusercontent.com/64011660/210180492-b91e2e4a-7ae6-463f-836e-686d5fdf22ca.jpg)
![1672595539000](https://user-images.githubusercontent.com/64011660/210180507-5367c0fe-6581-4698-b3d1-780e40f03468.jpg)
![1672595538971](https://user-images.githubusercontent.com/64011660/210180512-f82f1469-305b-4d2d-b60e-dec3aaf3dfed.jpg)
![1672595538852](https://user-images.githubusercontent.com/64011660/210180521-e842135e-7b5f-4b43-902d-329ae0214277.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/course_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/topic/long_press_dialog.dart


#### Resources (Inside Topic) 
![1672595538825](https://user-images.githubusercontent.com/64011660/210180530-fb7af3ec-3d54-4395-a3e3-3a6a1ebc7ec3.jpg)
![1672595538798](https://user-images.githubusercontent.com/64011660/210180552-def02281-b668-494f-aff9-0becbcf82157.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/topicpage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/resource_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/add_button.dart



#### Create New Resource
![1672595538772](https://user-images.githubusercontent.com/64011660/210180566-f8addcd7-bb62-404f-9394-4c53ab725d3b.jpg)
![1672595538744](https://user-images.githubusercontent.com/64011660/210180569-c7434514-aef2-470c-8246-84e52981bc78.jpg)
![1672595538719](https://user-images.githubusercontent.com/64011660/210180571-5c3663a8-f475-4ddf-a71a-f6229bbd62d6.jpg)
![1672595538693](https://user-images.githubusercontent.com/64011660/210180585-dcc4a66b-862b-4cb1-89e6-4b21a0c0e0f5.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/topic/topic.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/add_resource_page.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/markdown_input.dart


#### Resource Page
![1672595538541](https://user-images.githubusercontent.com/64011660/210180638-be16a1c1-364f-4acc-934c-6d4d8830034a.jpg)
![1672595538512](https://user-images.githubusercontent.com/64011660/210180793-cfdf8664-a370-44c0-a52f-aabf07155a79.jpg)
![1672595538339](https://user-images.githubusercontent.com/64011660/210180796-121f599f-8437-44d8-9f1f-79e43113b547.jpg)


-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/edit_button.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/edit_resource_page.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/resourcepage.dart


#### Press and Hold On Resource Tile Options Menu
![1672595538664](https://user-images.githubusercontent.com/64011660/210180589-06910f2c-1adc-4907-b5af-15b8f477df9b.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

-  Services

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/long_press_dialog.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/resource_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/topicpage.dart


#### Delete Resource
![1672595538601](https://user-images.githubusercontent.com/64011660/210180621-756f08c2-9e30-45a6-a56d-dc4fa3cd6ba4.jpg)
![1672595538570](https://user-images.githubusercontent.com/64011660/210180626-31d0022e-cbe9-45dc-8e0f-b1bda76e1371.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/long_press_dialog.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/resource_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/topicpage.dart


#### Edit Resource
![1672595538633](https://user-images.githubusercontent.com/64011660/210180789-a057827d-ebc6-4e60-a7e5-3a48048e5011.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/resource/resource.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/edit_button.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/edit_resource_page.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/resourcepage.dart


#### Create New Note (From Resource)
![1672595538368](https://user-images.githubusercontent.com/64011660/210191651-7b4678fd-a4bd-4ee7-a684-723dd8003480.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/note/note.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/note/note.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/note_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/content_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/resource/resourcepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/note/create_note_page.dart


#### Events
![1672595538310](https://user-images.githubusercontent.com/64011660/210181954-ec6ff4de-0759-4e04-8cba-20a40e50e91e.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/event/event.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/event/event.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/event_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart


#### Create a New Event
![1672595538254](https://user-images.githubusercontent.com/64011660/210181968-e6922d2b-c251-42d2-b98a-26880c672b28.jpg)
![1672595538225](https://user-images.githubusercontent.com/64011660/210181970-13e891cc-f1fc-46af-a904-88738ff8fb31.jpg)
![1672595538195](https://user-images.githubusercontent.com/64011660/210181972-1da24ad3-2126-4724-be19-0cd1217fc56f.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/event/event.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/event/event.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/event_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/event/create_event.dart


#### Event View
![1672595538025](https://user-images.githubusercontent.com/64011660/210181983-6a8dc7bf-100c-4870-87d4-a5bd9ff4105b.jpg)
![1672595537996](https://user-images.githubusercontent.com/64011660/210181989-fed07413-5604-479f-b88b-f88e1e203382.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/event/event.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/event/event.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/event_service.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/event/event_view.dart


#### Discussions
![1672595537961](https://user-images.githubusercontent.com/64011660/210181935-faee2fc7-9591-4757-937b-77c97c37afc7.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/discussion_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/discussion_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/comment_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/markdown_input.dart


#### Add Discussion
![1672626704647](https://user-images.githubusercontent.com/64011660/210191529-000083c0-8248-41ac-b696-f777268d0069.jpg)
![1672626704632](https://user-images.githubusercontent.com/64011660/210191532-437be139-04cd-4a07-b39b-46626b400ac4.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/discussion_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/discussion_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/create_discussion.dart


#### View Comments
![1672595538484](https://user-images.githubusercontent.com/64011660/210191538-a03db4d7-0cb9-454d-be09-09d5e11527af.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/comment.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/comment.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/discussion_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/discussion_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/comment_tile.dart


#### Add Comment
![1672595538456](https://user-images.githubusercontent.com/64011660/210191551-84bca5fb-1005-45d6-a8ad-1440c37f7687.jpg)
![1672595538427](https://user-images.githubusercontent.com/64011660/210191554-89f255bc-6adf-40a5-9a60-7e696302f1b9.jpg)
![1672595538398](https://user-images.githubusercontent.com/64011660/210191561-36b69a7b-26b4-4803-8eff-a0973a6960fc.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/discussion.g.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/comment.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/discussion/comment.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/discussion_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/locator.dart

-  View
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/discussion_view.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/discussion/comment_tile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/markdown_input.dart


#### Profile About
![1672595537830](https://user-images.githubusercontent.com/64011660/210182077-c9780ce7-9c40-4208-8877-b6cf752f3e3a.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/profile/profile.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/profile_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

-  View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/dashboard_view.dart


#### Profile Joined Spaces
![1672595537797](https://user-images.githubusercontent.com/64011660/210182098-025ee8a2-9806-48dd-b6d0-691662f3a83f.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/profile/profile.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/profile_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

-  View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/dashboard_view.dart


#### Profile Created Spaces
![1672595537764](https://user-images.githubusercontent.com/64011660/210182105-fbaa8a1a-0886-4eef-9a85-4b6bff597371.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/profile/profile.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/profile_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

-  View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/dashboard_view.dart


#### Edit Profile
![image](https://user-images.githubusercontent.com/64011660/210182120-e2a223a8-7b95-487e-8004-cf545d7dcce5.png)
![1672595537705](https://user-images.githubusercontent.com/64011660/210182124-b748ba0d-5bc1-4e9c-ad9b-9e663354803e.jpg)

-  Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/profile/profile.g.dart

-  Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/profile_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

-  View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/profile/edit_profile.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/dashboard_view.dart


#### Error Page
![1672595537642](https://user-images.githubusercontent.com/64011660/210182148-da26112d-2e44-4a43-9d39-d27ce39c643a.jpg)

-  Classes
-  Services
-  View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/topic/topicpage.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/course/coursepage.dart


#### Feed
![1672595537861](https://user-images.githubusercontent.com/64011660/210182160-42b60a83-a314-431f-9c91-b2e9030ba3b7.jpg)

- Classes
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/feed/activity.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/classes/feed/activity.g.dart

- Services
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/feed_service.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/services/navigator_service.dart

- View 
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/feed/feed.dart
https://github.com/bounswe/bounswe2022group3/blob/master/app/mobile/lib/view/widgets/profile_picture.dart

### Annotations

We have implemented the database schema for text annotations. It's compliant with the W3C Recommendation of [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/). We have implemented API functions for text annotation creation, retrieval, update and deletion. We have implemented text annotations for our web front-end, leveraging [an annotation library](https://www.npmjs.com/package/@recogito/recogito-js). We have provided a distinct annotation database server in order to comply with the W3C Recommendation of [Web Annotation Protocol](https://www.w3.org/TR/annotation-protocol/).

### Standards

Our annotations fit the W3C standard of Web Annotation Data Model. We constructed a new database that is for annotation purposes only after milestone 2, in order to make our annotations fully fit the W3C standards. For geolocation, we have used longitudes and latitudes in our endpoints which are used to show/set event locations on a map in order to fit the W3C standards.

### Scenarios

#### Scenario

<!-- Sign up, Interests -->
In April 2020, Claire is at home due to the COVID-19 pandemic. She had learnt about the platform [BUcademy](http://bucademy.tk/) from a friend and decided to give it a go. She joins the platform and includes her interests in her profile.

<!-- Recommendations, Searching, Notes -->
When she opens the platform as a user for the first time, she sees a list of recommended spaces based on her interests but she wants to take on something that can be done to pass the time and also improve her skills, not restricted to her interests. She searches for "something to do at home" and finds a learning space on _how to bake a cake_. She joins the space and sees its topics and resources. She opens up a resource called "Tricks not to burn the cake" and reads its body. She clicks on a button to create a new note for herself, summarizing what she learnt from the resource.

<!-- Annotation -->
She goes on to read another resource called "How to make the cake look good". She follows the steps that night and posts the picture of the cake on Instagram. She annotates the ending sentence of the resource body, which is "Enjoy!", with a text annotation, including her Instagram post as the body of the annotation.

<!-- Notification, Events -->
After a few days, while Claire is browsing the platform, she sees a notification of her friend's creation of an online event called "Zoom Bake Off". She joins the event and attends it at the scheduled time.

#### Work done

We have created a web application that serves as a learning platform. The application has a server side and also client sides for both web and mobile. Most of the features have required all the sides to work together. This work includes meetings, discussions, and coding.

<!-- Sign up, Log in -->
The application allows users to sign up. The back-end has provided database schemas for users and API functions for CRUD operations on it. The front-end and mobile sides have implemented pages for users to sign up.

<!-- Interests -->
The database schemas for users are such that users can have interests. The back-end has provided API functions for users to add and remove interests. The front-end and mobile sides have implemented pages for users to add and remove interests.

<!-- Recommendation -->
There is a recommendation system that recommends spaces to users based on their interests. The back-end has provided API functions for the recommendation system. The front-end and mobile sides have implemented sections for users to see the recommended spaces on their "My Spaces" page and home page, respectively. The recommendation system uses [an API from Datamuse](https://www.datamuse.com/api/) to find semantically similar words to the user's interests, then searches for spaces that contain these words in their titles, descriptions, or tags.

<!-- Searching -->
The application allows users to search for existent learning spaces. For this to work, the back-end has provided database schemas for spaces and API functions for CRUD operations on it. The front-end and mobile sides have implemented pages for users to search for spaces and see their details. This search is done based on text searches of space titles, descriptions, and tags, as well as semantically. For the semantic search, we are using a pretrained model to find relevances between the search query and the space titles and descriptions.

<!-- Notes -->
The back-end has provided database schemas for notes and API functions for CRUD operations on it. The front-end and mobile sides have implemented pages for users to create, read, update, and delete notes. The notes are associated with resources.

<!-- Annotations -->
The back-end has provided database schemas for text annotations and API functions for CRUD operations on it. We made sure that the database schema has compliance with the W3C Recommendation of [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/). We have provided a distinct annotation database server in order to comply with the W3C Recommendation of [Web Annotation Protocol](https://www.w3.org/TR/annotation-protocol/). The front-end have implemented text annotations in resource pages for users to create, read, update, and delete text annotations.

<!-- Notification -->
The back-end has provided API functions for the notification system, such as the `getFeed` function. They have also provided API functions for users to follow and unfollow other users, which is used by the notification system. When a user creates a discussion, an event, a space, a topic or a resource, or joins a space, the notification system sends a notification to all the users that follow the user. The front-end and mobile sides have implemented sections for users to see their feeds of what their followed users have done on the platform. They have also implemented buttons for users to follow and unfollow other users.

<!-- Events -->
The back-end has provided database schemas for events and API functions for CRUD operations on it. We made sure that the database schema has compliance with the W3C Recommendation of [Geolocation API](https://www.w3.org/TR/geolocation/).
