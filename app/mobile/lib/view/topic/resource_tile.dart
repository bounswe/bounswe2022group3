import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/view/course/coursepage.dart';
import 'package:bucademy/view/resource/edit_resource_page.dart';
import 'package:bucademy/view/resource/resourcepage.dart';
import 'package:bucademy/view/topic/long_press_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:url_launcher/url_launcher.dart';

GestureDetector resourceTile(TopicDetailed t,Resource r, BuildContext context, ChangeNotifier viewModelTopic, CoursePageViewModel coursePageModel,
    {bool isClickable = true}) {
  return GestureDetector(
    onLongPress: () {
      showDialog(
        context: context,
        builder: ((context) => AlertDialog(
              backgroundColor: Colors.white.withOpacity(0),
              content: longPressDialog(t, r, viewModelTopic),
            )),
      );
    },
    onTap: () {
      if (!isClickable) return;
      PersistentNavBarNavigator.pushNewScreen(context,
          screen: resourcePageView(t,r,viewModelTopic,coursePageModel));
    },
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 242, 241, 248),
        borderRadius: BorderRadius.circular(Constants.borderRadius),
      ),
      child: Text(
        r.name,
        style: TextStyles.subtitle,
      ),
    ),
  );
}
