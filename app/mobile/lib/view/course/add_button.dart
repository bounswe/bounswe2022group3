import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/view/course/add_resource_page.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

GestureDetector addButton(TopicDetailed t, BuildContext context,
    {bool isClickable = true}) {
  return GestureDetector(
    onTap: () async {
      if(!isClickable) return;
      PersistentNavBarNavigator.pushNewScreen(context, screen: addContentView(t)); 
    },
    child: Padding(
      padding: const EdgeInsets.all(10),
      child: OverflowBox(
          alignment: Alignment.bottomRight,
          child: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
                color: CustomColors.main,
                borderRadius: BorderRadiusDirectional.circular(10),
              ),
            child: const Icon(
              Icons.add_outlined,
              color: Colors.white,
            ),
          )),
    ),
  );
}
