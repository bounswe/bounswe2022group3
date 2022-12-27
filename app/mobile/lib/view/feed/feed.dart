// ignore_for_file: use_build_context_synchronously

import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/classes/feed/activity.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/coursepage.dart';
import 'package:bucademy/view/course/discussion/discussion_view.dart';
import 'package:bucademy/view/home/appbar.dart';
import 'package:bucademy/view/topic/topicpage.dart';
import 'package:bucademy/view/widgets/profile_picture.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:stacked/stacked.dart';

Widget feedView() => ViewModelBuilder<FeedViewModel>.reactive(
    viewModelBuilder: () => FeedViewModel(),
    onModelReady: (viewModel) => viewModel.refresh(),
    builder: (context, viewModel, child) {
      return Scaffold(
        appBar: appBar(title: 'Feed', context: context),
        backgroundColor: Colors.white,
        body: RefreshIndicator(
          onRefresh: viewModel.refresh,
          child: Column(
            children: [
              Expanded(
                child: viewModel.loading
                    ? const Center(child: CircularProgressIndicator())
                    : Padding(
                        padding: const EdgeInsets.only(
                            left: 12.0, right: 12.0, top: 10),
                        child: Stack(
                          children: [
                            ListView(
                              // this listview is needed to trigger refresh
                              padding: EdgeInsets.zero,
                              shrinkWrap: true,
                              children: [
                                SizedBox(
                                  height: MediaQuery.of(context).size.height,
                                )
                              ],
                            ),
                            SingleChildScrollView(
                              child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: viewModel.activities
                                      .map((activity) => Container(
                                            padding: const EdgeInsets.symmetric(
                                                vertical: 10, horizontal: 10),
                                            child: Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                profilePictureButton(
                                                    imagePath: fullImagePath(
                                                        activity.user.image),
                                                    context: context,
                                                    p_id: null,
                                                    userId: activity.user.id),
                                                Expanded(
                                                  child: GestureDetector(
                                                    onTap: () => goToDetails(
                                                        activity, context),
                                                    child: Row(
                                                      children: [
                                                        const SizedBox(
                                                            width: 10),
                                                        Flexible(
                                                            child: RichText(
                                                          text: TextSpan(
                                                              text:
                                                                  activity.body,
                                                              style: TextStyles
                                                                  .bodyBlack,
                                                              children: [
                                                                TextSpan(
                                                                    text:
                                                                        '\n${activity.timeDiff}',
                                                                    style: TextStyles
                                                                        .infoGrey)
                                                              ]),
                                                        ))
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ))
                                      .toList()),
                            ),
                          ],
                        ),
                      ),
              ),
            ],
          ),
        ),
      );
    });

goToDetails(Activity activity, BuildContext context) async {
  if (activity.spaceId == null) return;
  CourseDetailed? courseDetailed =
      await courseService.getCourseDetails(id: activity.spaceId!);
  if (courseDetailed == null) return;
  Course course = Course.fromJson(courseDetailed.toJson()
    ..update('creator', (value) => courseDetailed.creator.toJson()));

  if (activity.topicId != null) {
    PersistentNavBarNavigator.pushNewScreen(context,
        screen: topicPageView(courseDetailed.topics
            .firstWhere((element) => element.id == activity.topicId)),
        withNavBar: false);
  } else if (activity.discussionId != null) {
    PersistentNavBarNavigator.pushNewScreen(context,
        screen: discussionView(discussionId: activity.discussionId!),
        withNavBar: false);
  } else {
    PersistentNavBarNavigator.pushNewScreen(context,
        screen: coursePageView(course), withNavBar: false);
  }
  //TODO add event redirection
}

class FeedViewModel extends ChangeNotifier {
  bool loading = false;
  List<Activity> activities = [];
  Future refresh() async {
    loading = true;
    notifyListeners();

    activities = await feedService.getFeed();
    loading = false;
    notifyListeners();
  }
}
