import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/profile_picture.dart';
import 'package:flutter/material.dart';

AppBar appBar() {
  return AppBar(
    elevation: 0,
    backgroundColor: CustomColors.main,
    shadowColor: CustomColors.main,
    foregroundColor: CustomColors.main,
    leading: GestureDetector(
      child: const Icon(
        Icons.menu,
        color: Colors.white,
      ),
      onTap: () {},
    ),
    title: Text(
      userService.user != null ? "Hello ${userService.user?.name}!" : "Welcome!",
      style: TextStyles.pageTitle,
    ),
    centerTitle: false,
    actions: [
      Padding(
        padding: const EdgeInsets.only(right: 20),
        child: profilePicture(imagePath: fullImagePath(userService.user?.image)),
      )
    ],
  );
}
