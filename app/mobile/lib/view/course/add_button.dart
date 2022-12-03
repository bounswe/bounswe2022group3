import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/view/course/add_resource_page.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

GestureDetector addButton(Topic c, BuildContext context,
    {bool isClickable = true}) {
  return GestureDetector(
    onTap: () async {
      if(!isClickable) return;
      PersistentNavBarNavigator.pushNewScreen(context, screen: addContentView(c)); 
    },
    child: Padding(
      padding: const EdgeInsets.all(10),
      child: OverflowBox(
          alignment: Alignment.bottomRight,
          child: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
                color: const Color.fromARGB(255, 242, 241, 248),
                borderRadius: BorderRadiusDirectional.circular(10),
                border: Border.all(color: Colors.black),
              ),
            child: const Icon(
              Icons.add_outlined,
              color: Colors.black,
            ),
          )),
    ),
  );
}
