import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/view/resource/edit_resource_page.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

editResourceButton(TopicDetailed t, Resource r, BuildContext context,
    ChangeNotifier topicPageView,
    {bool isClickable = true}) {
  if (!isClickable) return;
  PersistentNavBarNavigator.pushNewScreen(context,
      screen: editResourceView(t, r, topicPageView));
}
