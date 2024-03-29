import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:flutter/material.dart';

TextFormField searchBar(
    void Function(String)? onChanged, TextEditingController controller,
    {close = Function}) {
  return TextFormField(
    cursorColor: CustomColors.main,
    textAlignVertical: TextAlignVertical.center,
    controller: controller,
    maxLines: 1,
    onChanged: onChanged,
    decoration: InputDecoration(
      contentPadding: const EdgeInsets.only(left: 10, top: 10, bottom: 10),
      prefix: GestureDetector(
        onTap: close,
        child: Icon(
          Icons.arrow_back,
          size: 14,
          color: Colors.grey.shade500,
        ),
      ),
      border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide.none),
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
