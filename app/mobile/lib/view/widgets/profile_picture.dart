import 'package:bucademy/view/profile/profile.dart';
import 'package:flutter/material.dart';

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
    {required String p_id,
    required String imagePath,
    required BuildContext context,
    double height = 20,
    double widht = 20,
    bool circle = true}) {
  return GestureDetector(
      onTap: () => Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => profileView(p_id))),
      child: circle
          ? CircleAvatar(
              backgroundImage: NetworkImage(imagePath), radius: height)
          : Image.network(imagePath,
              height: height, width: widht, fit: BoxFit.cover));
}
