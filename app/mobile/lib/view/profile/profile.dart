// ignore_for_file: non_constant_identifier_names

import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/services/locator.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';
import 'dart:math';

import 'package:bucademy/resources/custom_colors.dart';
import '../../resources/text_styles.dart';
import '../../services/profile_service.dart';
import '../widgets/profile_picture.dart';

Profile p = Profile(
    'ii', "Şule", "Erkul", 'https://randomuser.me/api/portraits/men/40.jpg',
    followers: 1,
    followed: 1,
    rating: 4.0,
    bio: 'Engineer, \nGraphic Design is my passion \nWannabe a bee',
    interests: [
      'Cuisine',
      'Tutting',
      'Flutter'
    ],
    knowledge: [
      'Watercolor',
      'Python',
      'Classic Guitar',
      'C#'
    ],
    activities: [
      'Xtra Person followed you!',
      'You have joined Python Space',
      'Welcome to BUcademy'
    ],
    achievements: []);

Widget profileView() => ViewModelBuilder<ProfileView>.reactive(
    viewModelBuilder: () => ProfileView(),
    builder: (context, viewModel, child) => DefaultTabController(
        length: 4,
        child: Scaffold(
            body: NestedScrollView(
                headerSliverBuilder:
                    (BuildContext context, innerBoxIsScrolled) {
                  return <Widget>[
                    SliverAppBar(
                      title: const Text(
                        'My Profile',
                        style: TextStyles.pageTitle,
                      ),
                      pinned: true,
                      flexibleSpace: FlexibleSpaceBar(
                        background: Container(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 10) +
                                    const EdgeInsets.only(top: 40),
                            decoration: const BoxDecoration(
                              color: CustomColors.main,
                            ),
                            child: Column(children: [
                              profileHeader(context, p.image),
                              aboutMe(context, p.bio, p.interests, p.knowledge)
                            ])),
                      ),
                      elevation: 0,
                      leading: GestureDetector(
                        child: const Icon(Icons.arrow_back_ios,color: Colors.white,),
                        onTap: () {
                        navigatorService.controller.jumpToTab(0);
                        },
                      ),
                      actions: [
                        IconButton(
                            onPressed: () {},
                            icon: const Icon(
                              Icons.settings,
                              color: Colors.white,
                            ))
                      ],
                      expandedHeight: MediaQuery.of(context).size.height * 0.65,
                      forceElevated: innerBoxIsScrolled,
                      foregroundColor: Colors.black,
                      backgroundColor: CustomColors.main,
                      bottom: const TabBar(tabs: [
                        Tab(
                            child: Text(
                          "Activities",
                          style: TextStyle(color: Colors.white),
                        )),
                        Tab(
                            child: Text(
                          "Achievements",
                          style: TextStyle(color: Colors.white),
                        )),
                        Tab(
                            child: Text(
                          "Spaces",
                          style: TextStyle(color: Colors.white),
                        )),
                        Tab(
                            child: Text(
                          "Notes",
                          style: TextStyle(color: Colors.white),
                        )),
                      ],
                      isScrollable: true,),
                    ),
                  ];
                },
                body: TabBarView(
                  children: tabContent,
                )))));

class ProfileView extends ChangeNotifier {}

Widget profileHeader(context, String image_path) {
  return Container(
      //height: MediaQuery.of(context).size.height * 0.15,
      width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10) +
          const EdgeInsets.only(top: 10),
      decoration: const BoxDecoration(
          borderRadius: BorderRadius.only(
        bottomLeft: Radius.circular(Constants.borderRadius),
        bottomRight: Radius.circular(Constants.borderRadius),
      )),
      child: Column(children: [
        profilePicture(imagePath: image_path, height: 40, widht: 40),
        const SizedBox(
          height: 20,
        ),
        const Text(
          'Şule Erkul',
          style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
              margin: const EdgeInsets.all(2),
              decoration: const BoxDecoration(color: Colors.transparent),
              child: Row(children: [
                const Text('Followers'),
                const SizedBox(
                  width: 10,
                  height: 3,
                ),
                const Icon(Icons.person, size: 30),
                Text(p.followers == null ? '0' : p.followers.toString()),
              ]),
            ),
            Container(
              margin: const EdgeInsets.all(2),
              decoration: const BoxDecoration(color: Colors.transparent),
              child: Row(children: [
                const Text('Following'),
                const SizedBox(
                  width: 10,
                  height: 3,
                ),
                const Icon(Icons.person, size: 30),
                Text(p.followed == null ? '0' : p.followed.toString()),
              ]),
            )
          ],
        )
      ]));
}

Widget aboutMe(context, bio, interest, knowledge) {
  return Container(
      //height: 400,
      width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8) +
          const EdgeInsets.only(top: 4),
      decoration: const BoxDecoration(
          color: Color.fromARGB(255, 255, 238, 238),
          borderRadius: BorderRadius.all(
            Radius.circular(Constants.borderRadius),
          )),
      child: Column(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'About Me',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            seperator(context),
            Text(bio),
            const SizedBox(height: 2),
            const Text(
              'Interests',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            seperator(context),
            Row(children: [
              ...p.interests!.map((s) => tag(
                  s,
                  Color((Random().nextDouble() * 0xFFFFFF).toInt())
                      .withOpacity(1.0)))
            ]),
            const SizedBox(height: 2),
            const Text(
              'Knowledge',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            seperator(context),
            Row(children: [
              ...p.knowledge!.map((s) => tag(
                  s,
                  Color((Random().nextDouble() * 0xFFFFFF).toInt())
                      .withOpacity(1.0)))
            ]),
          ]));
}

Widget tag(tag_name, color_name) {
  return Container(
    margin: const EdgeInsets.all(2),
    padding: const EdgeInsets.all(5),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius:
          const BorderRadius.all(Radius.circular(Constants.borderRadius)),
      border: Border.all(color: color_name),
    ),
    child: Text(tag_name),
  );
}

Widget seperator(context) {
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 6.0),
    child: Container(
      height: 2,
      width: MediaQuery.of(context).size.width,
      decoration: BoxDecoration(
          color: Colors.grey[400],
          borderRadius:
              const BorderRadius.all(Radius.circular(Constants.borderRadius))),
    ),
  );
}

List<Widget> list_open(List<String> list_name) {
  List<Widget> tmp = [];
  if (list_name.isEmpty) {
    tmp.add(Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: const [
        SizedBox(width: 30),
        Icon(Icons.circle, size: 10),
        SizedBox(width: 10),
        Text('Wow! Such Empty'),
      ],
    ));
  }
  for (var e in list_name) {
    tmp.add(Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        const SizedBox(width: 30),
        const Icon(Icons.circle, size: 10),
        const SizedBox(width: 10),
        Text(e),
      ],
    ));
  }
  return tmp;
}

List<Widget> tabContent = [
  ListView(
      shrinkWrap: true,
      padding: const EdgeInsets.all(10.0),
      children: list_open(p.activities!)),
  ListView(
    shrinkWrap: true,
    padding: const EdgeInsets.all(10.0),
    children: list_open(p.achievements!),
  ),
  ListView(
    shrinkWrap: true,
    padding: const EdgeInsets.all(10.0),
    children: [
      const Text('Spaces'),
      //...profileService
    ],
  ),
  ListView(
    shrinkWrap: true,
    padding: const EdgeInsets.all(10.0),
    children: [
      const Text('Notes'),
      //...profileService
    ],
  ),
];
