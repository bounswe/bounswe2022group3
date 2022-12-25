import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/view/resource/edit_resource_page.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

GestureDetector editResourceButton(TopicDetailed t, Resource r, BuildContext context, ChangeNotifier topicPageView,
    {bool isClickable = true}) {
  return GestureDetector(
    onTap: () async {
      if(!isClickable) return;
      PersistentNavBarNavigator.pushNewScreen(context, screen: editResourceView(t,r,topicPageView)); 
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
              Icons.edit_outlined,
              color: Colors.white,
            ),
          )),
    ),
  );
}
