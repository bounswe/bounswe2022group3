import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

import '../topic/topicpage.dart';

GestureDetector topicTile(Topic t, BuildContext context, {bool isClickable = true}) {
  return GestureDetector(
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: CustomColors.getRandomColor(),
        borderRadius: BorderRadius.circular(Constants.borderRadius),
      ),
      child: Text(t.name),
    ),
    onTap: () {
      if(!isClickable) return;
      PersistentNavBarNavigator.pushNewScreen(context, screen: topicPageView(t));
    },
  );
}
