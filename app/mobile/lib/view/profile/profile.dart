// ignore_for_file: non_constant_identifier_names

import 'dart:math';

import 'package:bucademy/classes/profile/profile.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/services/locator.dart';
import 'package:flutter/material.dart';
import 'package:restart_app/restart_app.dart';
import 'package:stacked/stacked.dart';

import 'package:bucademy/resources/custom_colors.dart';
import '../../resources/text_styles.dart';
import '../widgets/profile_picture.dart';

class _SliverPersistentHeaderDelagete extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;
  final Color color;
  const _SliverPersistentHeaderDelagete(
      {Color color = CustomColors.main, required this.tabBar})
      : this.color = color;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Container(
      color: color,
      child: tabBar,
    );
  }

  @override
  double get maxExtent => tabBar.preferredSize.height;

  @override
  double get minExtent => tabBar.preferredSize.height;

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) {
    return false;
  }
}

Widget profileView(String p_id) => ViewModelBuilder<ProfileView>.reactive(
    viewModelBuilder: () => ProfileView(),
    onModelReady: (model) => model.getProfileInfo(p_id),
    builder: (context, viewModel, child) => DefaultTabController(
        length: 5,
        child: Scaffold(
          body: p_id.length < 3
              ? const Text(
                  "Please Login First") // send user to the  login page (to be discussed)
              : p == null
                  ? const Center(child: CircularProgressIndicator())
                  : NestedScrollView(
                      headerSliverBuilder: (BuildContext context,
                              innerBoxIsScrolled) =>
                          ([
                            SliverAppBar(
                              pinned: true,
                              elevation: 0,
                              expandedHeight: 240.0,
                              forceElevated: innerBoxIsScrolled,
                              foregroundColor: Colors.black,
                              backgroundColor: CustomColors.main,
                              title: const Text(
                                'My Profile',
                                style: TextStyles.pageTitle,
                              ),
                              flexibleSpace: FlexibleSpaceBar(
                                background: Container(
                                    padding: const EdgeInsets.symmetric(
                                            horizontal: 10) +
                                        const EdgeInsets.only(top: 60),
                                    decoration: const BoxDecoration(
                                      color: CustomColors.main,
                                    ),
                                    child: viewModel.isInfoLoading
                                        ? const Center(
                                            child: CircularProgressIndicator())
                                        : profileHeader(context,
                                            'https://randomuser.me/api/portraits/men/40.jpg')),
                              ),
                              leading: GestureDetector(
                                child: const Icon(
                                  Icons.arrow_back_ios,
                                  color: Colors.white,
                                ),
                                onTap: () {
                                  navigatorService.controller.jumpToTab(
                                      0); // TODO: bunu değiştir bi önceki sayfa olsun
                                },
                              ),
                              actions: [
                                IconButton(
                                    onPressed: () {},
                                    icon: const Icon(
                                      Icons.settings,
                                      color: Colors.white,
                                    )),
                                IconButton(
                                    onPressed: () async {
                                      await userService.logout();
                                      Restart.restartApp();
                                    },
                                    icon: const Icon(
                                      Icons.logout,
                                      color: Colors.white,
                                    ))
                              ],
                            ),
                            SliverPersistentHeader(
                                pinned: true,
                                delegate: _SliverPersistentHeaderDelagete(
                                    tabBar: TabBar(
                                  isScrollable: true,
                                  physics: const ClampingScrollPhysics(),
                                  labelColor: Colors.white,
                                  tabs: tabNames
                                      .map((tabName) => Tab(
                                            child: Text(
                                              tabName,
                                              style: const TextStyle(
                                                  color: Colors.white),
                                            ),
                                          ))
                                      .toList(),
                                ))),
                          ]),
                      body: TabBarView(
                        children: tabContent,
                      )),
        )));

class ProfileView extends ChangeNotifier {
  bool isInfoLoading = false;

  Future<void> getProfileInfo(p_id) async {
    isInfoLoading = true;
    notifyListeners();

    p = await profileService.getProfileInfo(p_id);
    isInfoLoading = false;
    notifyListeners();
  }
}

Widget profileHeader(context, String image_path) {
  String full_name = '${p!.name!} ${p!.surname!}';
  return Container(
      //height: MediaQuery.of(context).size.height * 0.15,
      //width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10) +
          const EdgeInsets.only(top: 10),
      decoration: const BoxDecoration(
          borderRadius: BorderRadius.only(
        bottomLeft: Radius.circular(Constants.borderRadius),
        bottomRight: Radius.circular(Constants.borderRadius),
      )),
      child: Column(children: [
        const SizedBox(height: 20),
        profilePicture(imagePath: image_path, height: 40, widht: 40),
        const SizedBox(
          height: 20,
        ),
        Text(
          full_name,
          style: const TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
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
                const Icon(Icons.person, size: 20),
                const SizedBox(width: 2),
                Text(p!.follower_users == null
                    ? '0'
                    : p!.follower_users!.length.toString()),
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
                const Icon(Icons.person, size: 20),
                const SizedBox(width: 2),
                Text(p!.followed_users == null
                    ? '0'
                    : p!.followed_users!.length.toString()),
              ]),
            )
          ],
        )
      ]));
}

Widget aboutMe() {
  return Container(
      //height: 400,
      //width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8) +
          const EdgeInsets.only(top: 4),
      decoration: const BoxDecoration(
          //color: Color.fromARGB(255, 255, 238, 238),
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
            //seperator(context),
            //Text(p!.personal_info!.bio!),
            const SizedBox(height: 2),
            const Text(
              'Interests',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            //seperator(context),
            Row(children: [
              ...?p!.personal_info!.interests?.map((s) => tag(
                  s,
                  Color((Random().nextDouble() * 0xFFFFFF).toInt())
                      .withOpacity(1.0)))
            ]),
            const SizedBox(height: 2),
            const Text(
              'Knowledge',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            //seperator(context),
            Row(children: [
              ...p!.personal_info!.knowledge!.map((s) => tag(
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

Profile? p;
List<String> tabNames = [
  "About",
  "Activities",
  "Achievements",
  "Spaces",
  "Notes",
];
List<Widget> tabContent = [
  aboutMe(),
  ListView(
      shrinkWrap: true,
      padding: const EdgeInsets.all(10.0),
      children: list_open(p!.personal_info!.personal_activities!)),
  ListView(
    shrinkWrap: true,
    padding: const EdgeInsets.all(10.0),
    children: list_open(p!.personal_info!.personal_achievements!),
  ),
  ListView(
      shrinkWrap: true,
      padding: const EdgeInsets.all(10.0),
      children: [const Text('Spaces')] //list_open(p!.created_spaces!),
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
