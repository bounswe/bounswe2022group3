import 'package:bucademy/resources/constants.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

import '../../resources/colors.dart';
import '../../resources/text_styles.dart';
import '../widgets/profile_picture.dart';

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
                              profileHeader(context),
                              aboutMe(context, 'hello!', '', '')
                            ])),
                      ),
                      elevation: 0,
                      leading: const BackButton(color: Colors.white),
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
                      ]),
                    ),
                  ];
                },
                body: TabBarView(
                  children: tabContent,
                )))));

class ProfileView extends ChangeNotifier {}

Widget profileHeader(context) {
  return Container(
      //height: MediaQuery.of(context).size.height * 0.15,
      width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10) +
          const EdgeInsets.only(top: 10),
      decoration: const BoxDecoration(
          color: CustomColors.main,
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(Constants.borderRadius),
            bottomRight: Radius.circular(Constants.borderRadius),
          )),
      child: Column(children: [
        profilePicture(
            imagePath: '../../demo/Person.svg', height: 40, widht: 40),
        const SizedBox(
          height: 20,
        ),
        const Text(
          'Şule Erkul',
          style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
        ),
      ]));
}

Widget aboutMe(context, bio, interest, knowledge) {
  return Container(
      //height: 400,
      width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.symmetric(horizontal: 20) +
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
            const Text(
              'Interests',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            seperator(context),
            Text(interest),
            const Text(
              'Knowledge',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            seperator(context),
            Text(knowledge),
          ]));
}

Widget seperator(context) {
  return Container(
    height: 2,
    width: MediaQuery.of(context).size.width,
    decoration: BoxDecoration(
        color: Colors.grey[700],
        borderRadius:
            const BorderRadius.all(Radius.circular(Constants.borderRadius))),
  );
}

List<Widget> tabContent = [
  ListView(
    shrinkWrap: true,
    padding: const EdgeInsets.all(10.0),
    children: [
      Text('Activities'),
      //...profileService
    ],
  ),
  ListView(
    shrinkWrap: true,
    padding: EdgeInsets.all(10.0),
    children: [
      Text('Achievements'),
      //...profileService
    ],
  ),
  ListView(
    shrinkWrap: true,
    padding: const EdgeInsets.all(10.0),
    children: [
      Text('Spaces'),
      //...profileService
    ],
  ),
  ListView(
    shrinkWrap: true,
    padding: const EdgeInsets.all(10.0),
    children: [
      Text('Notes'),
      //...profileService
    ],
  ),
];
