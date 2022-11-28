import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/content_service.dart';
import 'package:flutter/material.dart';

Widget mockTile(MockContent c) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
    margin: const EdgeInsets.only(bottom: 10),
    decoration: BoxDecoration(
      color: CustomColors.getRandomColor(),
      borderRadius: BorderRadius.circular(Constants.borderRadius),
    ),
    child: Text(c.name),
  );
}
