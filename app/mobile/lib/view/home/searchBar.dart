import 'package:bucademy/resources/colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:flutter/material.dart';

TextFormField searchBar() {
  return TextFormField(
    cursorColor: CustomColors.main,
    maxLines: 1,
    decoration: InputDecoration(
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10.0), borderSide: BorderSide.none),
      hintText: 'Search Courses...',
      hintStyle: TextStyles.helperText,
      fillColor: Colors.white,
      filled: true,
      isDense: true,
      suffixIcon: Icon(
        Icons.search,
        color: Colors.grey.shade500,
      ),
    ),
  );
}
