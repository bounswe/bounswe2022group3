import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/profile_picture.dart';
import 'package:flutter/material.dart';

AppBar appBar({required String? title}) {
  return AppBar(
    elevation: 0,
    backgroundColor: CustomColors.main,
    shadowColor: CustomColors.main,
    foregroundColor: CustomColors.main,
    leading: Padding(
      padding: const EdgeInsets.only(left: 20),
      child: profilePictureButton(
          p_id: userService.user?.id ?? '',
          context: context,
          imagePath: fullImagePath(userService.user?.image)),
    ),
    title: Text(
      title ?? "Welcome!",
      style: TextStyles.pageTitle,
    ),
    centerTitle: false,
    actions: [],
  );
}
