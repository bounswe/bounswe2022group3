// ignore_for_file: non_constant_identifier_names
import 'dart:math';

import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/classes/profile/profile.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/home/course_tile.dart';
import 'package:bucademy/view/login/login.dart';
import 'package:bucademy/view/profile/edit_profile.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
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
    onModelReady: (viewModel) => viewModel.getProfileInfo(p_id),
    builder: (context, viewModel, child) => DefaultTabController(
        length: 4,
        child: Scaffold(
          body: p_id.length < 3
              ? Center(
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          "Please Login First",
                        ),
                        const SizedBox(height: 10),
                        TextButton(
                            onPressed: () =>
                                PersistentNavBarNavigator.pushNewScreen(context,
                                    screen: loginView()),
                            style: ButtonStyle(
                                backgroundColor: MaterialStateColor.resolveWith(
                                    (states) => CustomColors.main)),
                            child: const Text('login',
                                style: TextStyle(color: Colors.white)))
                      ]),
                ) // send user to the  login page (to be discussed)
              : viewModel.p == null
                  ? const Center(child: CircularProgressIndicator())
                  : NestedScrollView(
                      headerSliverBuilder: (BuildContext context,
                              innerBoxIsScrolled) =>
                          ([
                            SliverAppBar(
                              pinned: true,
                              elevation: 0,
                              expandedHeight:
                                  viewModel.isMyProfile ? 230.0 : 260.0,
                              forceElevated: innerBoxIsScrolled,
                              foregroundColor: Colors.black,
                              backgroundColor: CustomColors.main,
                              title: Text(
                                viewModel.isMyProfile ? 'My Profile' : '',
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
                                      : Column(
                                          children: [
                                            const SizedBox(height: 30),
                                            profilePicture(
                                                imagePath: fullImagePath(
                                                    viewModel.p!.image!),
                                                height: 40,
                                                widht: 40),
                                            const SizedBox(
                                              height: 15,
                                            ),
                                            Text(
                                              '${viewModel.p!.name!} ${viewModel.p!.surname!}',
                                              style: const TextStyle(
                                                  fontSize: 25,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                            const SizedBox(height: 10),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.spaceEvenly,
                                              children: [
                                                Container(
                                                    margin:
                                                        const EdgeInsets.all(2),
                                                    decoration:
                                                        const BoxDecoration(
                                                            color: Colors
                                                                .transparent),
                                                    child: Row(children: [
                                                      const Text('Followers'),
                                                      const SizedBox(
                                                        width: 10,
                                                        height: 3,
                                                      ),
                                                      const Icon(Icons.person,
                                                          size: 15),
                                                      const SizedBox(width: 2),
                                                      Text(viewModel.p!
                                                                  .follower_users ==
                                                              null
                                                          ? '0'
                                                          : viewModel
                                                              .p!
                                                              .follower_users!
                                                              .length
                                                              .toString()),
                                                    ])),
                                                Container(
                                                  margin:
                                                      const EdgeInsets.all(2),
                                                  decoration:
                                                      const BoxDecoration(
                                                          color: Colors
                                                              .transparent),
                                                  child: Row(children: [
                                                    const Text('Following'),
                                                    const SizedBox(
                                                      width: 10,
                                                      height: 3,
                                                    ),
                                                    const Icon(Icons.person,
                                                        size: 15),
                                                    const SizedBox(width: 2),
                                                    Text(viewModel.p!
                                                                .followed_users ==
                                                            null
                                                        ? '0'
                                                        : viewModel
                                                            .p!
                                                            .followed_users!
                                                            .length
                                                            .toString()),
                                                  ]),
                                                ),
                                              ],
                                            ),
                                            !viewModel.isMyProfile
                                                ? ElevatedButton(
                                                    style: ElevatedButton.styleFrom(
                                                        backgroundColor: Colors
                                                            .grey.shade200,
                                                        foregroundColor: Colors
                                                            .blue.shade900,
                                                        textStyle:
                                                            const TextStyle(
                                                                fontWeight:
                                                                    FontWeight
                                                                        .bold)),
                                                    onPressed: () {
                                                      viewModel
                                                          .followUnfollowCallback();
                                                    },
                                                    child: Text(
                                                        viewModel.isFollowed
                                                            ? 'Unfollow'
                                                            : 'Follow'))
                                                : const SizedBox(height: 0)
                                          ],
                                        ),
                                ),
                              ),
                              leading: GestureDetector(
                                child: const Icon(
                                  Icons.arrow_back_ios,
                                  color: Colors.white,
                                ),
                                onTap: () {
                                  Navigator.of(context).canPop()
                                      ? Navigator.of(context).pop()
                                      : navigatorService.controller
                                          .jumpToTab(0);
                                },
                              ),
                              actions: viewModel.isMyProfile
                                  ? [
                                      IconButton(
                                          onPressed: () {
                                            viewModel.p != null
                                                ? PersistentNavBarNavigator
                                                    .pushNewScreen(context,
                                                        screen: editProfileView(
                                                            viewModel,
                                                            viewModel),
                                                        withNavBar: false)
                                                : ScaffoldMessenger.of(context)
                                                    .showSnackBar(
                                                    const SnackBar(
                                                        content: Text(
                                                            'Please Wait for a Moment')),
                                                  );
                                          },
                                          icon: const Icon(
                                            Icons.edit,
                                            color: Colors.white,
                                          ))
                                    ]
                                  : [],
                            ),
                            SliverPersistentHeader(
                                pinned: true,
                                delegate: _SliverPersistentHeaderDelagete(
                                    tabBar: TabBar(
                                  indicator: const BoxDecoration(
                                      borderRadius: BorderRadius.only(
                                          topLeft: Radius.circular(15),
                                          topRight: Radius.circular(15)),
                                      color:
                                          Color.fromARGB(255, 164, 184, 255)),
                                  isScrollable: true,
                                  physics: const ClampingScrollPhysics(),
                                  unselectedLabelColor: Colors.white70,
                                  labelColor: Colors.white,
                                  tabs: viewModel.tabNames
                                      .map((tabName) => Tab(
                                            child: Text(
                                              tabName,
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ))
                                      .toList(),
                                ))),
                          ]),
                      body: TabBarView(children: [
                        aboutMe(viewModel.p, context),
                        ListView(
                            shrinkWrap: true,
                            padding: const EdgeInsets.all(10.0),
                            children: list_open(
                                viewModel.p!.personal_info!.activities!)),
                        ListView(
                          shrinkWrap: true,
                          padding: const EdgeInsets.all(10.0),
                          children: spaceTiles(viewModel.joined, context),
                        ),
                        ListView(
                          shrinkWrap: true,
                          padding: const EdgeInsets.all(10.0),
                          children: spaceTiles(viewModel.created, context),
                        ),
                      ])),
        )));

class ProfileView extends ChangeNotifier {
  Profile? p;
  bool isInfoLoading = false;
  bool isMyProfile = false;
  bool isFollowed = false;
  List<Course>? joined = [];
  List<Course>? created = [];
  List<String> tabNames = [
    "About",
    "Activities",
    "Joined Spaces",
    "Created Spaces"
  ];
  List<Widget> tabContent = [];
  List<String>? tags = [];

  Future<void> followUnfollowCallback() async {
    if (!isFollowed) {
      isFollowed = await profileService.follow(p!.id);
    } else {
      isFollowed = await profileService.unfollow(p!.id);
    }
    notifyListeners();
  }

  Future<void> getProfileInfo(String p_id) async {
    isInfoLoading = true;
    notifyListeners();
    isMyProfile = userService.user!.id == p_id;
    p = await profileService.getProfileInfo(p_id);
    tags = await profileService.getTags();
    if (p!.created_spaces != null) {
      created = await getSpaces(p!.created_spaces, 'Created Spaces');
    }
    joined = await getSpaces([], 'Joined Spaces');
    isFollowed = p!.follower_users!.contains(userService.user!);
    isInfoLoading = false;
    notifyListeners();
  }

  Future<List<Course>> getSpaces(List<Space>? created, String tab) async {
    List<Course> courses = [];
    if (tab == 'Created Spaces') {
      if (created == null) {
        return [];
      }
      for (Space e in created) {
        String courseId = e.id!;
        CourseDetailed? cd = await courseService.getCourseDetails(id: courseId);
        if (cd != null) {
          Course c = Course(cd.name, cd.id, cd.info, cd.tags, cd.image,
              cd.creator, cd.numberOfEnrolled, cd.rating);
          courses.add(c);
        }
      }
    } else if (tab == 'Joined Spaces') {
      courses = await courseService.getEnrolledCourses();
    }
    return courses;
  }
}

Widget aboutMe(Profile? p, BuildContext context) {
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
            seperator(context),
            Text(p!.personal_info!.bio!),
            const SizedBox(height: 15),
            const Text(
              'Interests',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            seperator(context),
            SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(children: [
                  ...?p.personal_info!.interests?.map((s) => tag(
                      s,
                      Color((Random().nextDouble() * 0xFFFFFF).toInt())
                          .withOpacity(1.0)))
                ])),
            const SizedBox(height: 15),
            const Text(
              'Knowledge',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            seperator(context),
            SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(children: [
                  ...p.personal_info!.knowledge!.map((s) => tag(
                      s,
                      Color((Random().nextDouble() * 0xFFFFFF).toInt())
                          .withOpacity(1.0)))
                ])),
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

List<Widget> spaceTiles(List<Course>? list_name, context) {
  if (list_name == null || list_name.isEmpty) {
    return [
      Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: const [
          SizedBox(width: 30),
          Icon(Icons.circle, size: 10),
          SizedBox(width: 10),
          Text('Wow! Such Empty'),
        ],
      )
    ];
  }
  List<Widget> space_tiles = [];

  for (Course c in list_name) {
    space_tiles.add(courseTile(c, context));
    space_tiles.add(const SizedBox(
      height: 10,
    ));
  }
  return space_tiles;
}
