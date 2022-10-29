import 'dart:ui';

import 'package:flutter/material.dart';

class TextStyles {
  static const pageTitle = TextStyle(
    color: Colors.white,
    fontWeight: FontWeight.bold,
    fontStyle: FontStyle.normal,
    fontSize: 24.0,
  );

  static const subtitle = TextStyle(
    color: Colors.black,
    fontWeight: FontWeight.bold,
    fontStyle: FontStyle.normal,
    fontSize: 20.0,
  );

  static TextStyle helperText = TextStyle(
    color: Colors.grey.shade500,
    fontStyle: FontStyle.normal,
    // fontSize: 16.0,
  );

  static TextStyle bodyWhite = const TextStyle(
    color: Colors.white,
  );

  static TextStyle bodyBlack = const TextStyle(
    color: Colors.black,
  );

  static TextStyle infoGrey = const TextStyle(
    color: Colors.grey,
    fontSize: 12,
  );
}
