import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/profile/profile.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

Widget profilePicture(
        {required String imagePath,
        double height = 20,
        double widht = 20,
        bool circle = true}) =>
    circle
        ? CircleAvatar(backgroundImage: NetworkImage(imagePath), radius: height)
        : Image.network(imagePath,
            height: height, width: widht, fit: BoxFit.cover);

GestureDetector profilePictureButton(
    {required String? p_id,
    required String imagePath,
    required BuildContext context,
    double height = 20,
    double widht = 20,
    bool circle = true,
    String? userId}) {
  return GestureDetector(
      onTap: () async {
        if (p_id == null && userId != null) {
          p_id = (await profileService.getProfileInfo(userId))!.id;
        }
        if (userId == null) navigatorService.controller.jumpToTab(2);
        if (p_id != null) {
          // ignore: use_build_context_synchronously
          PersistentNavBarNavigator.pushNewScreen(context,
              screen: profileView(p_id!));
        }
      },
      child: circle
          ? CircleAvatar(
              backgroundImage: NetworkImage(imagePath), radius: height)
          : Image.network(imagePath,
              height: height, width: widht, fit: BoxFit.cover));
}
