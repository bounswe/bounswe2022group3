import 'package:flutter/material.dart';

Widget profilePicture({required String imagePath, double height = 20, double widht = 20, bool circle = true}) => circle
    ? CircleAvatar(backgroundImage: NetworkImage(imagePath), radius: height)
    : Image.network(imagePath, height: height, width: widht, fit: BoxFit.cover);
