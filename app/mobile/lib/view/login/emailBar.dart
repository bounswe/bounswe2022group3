
import 'package:bucademy/resources/custom_colors.dart';
import 'package:flutter/material.dart';

TextFormField emailBar(TextEditingController controller) {
  return TextFormField(
    controller: controller,
    cursorColor: CustomColors.main,
    maxLines: 1,
    decoration: const InputDecoration(
      //labelText: 'Email',
      border: OutlineInputBorder(),
      hintText: 'Email',
      //hintStyle: TextStyles.helperText,
      fillColor: Colors.white,
      filled: true,
      isDense: true,
    ),
    validator: (value) {
      if (value == null || !RegExp(r'^(\w+)(\.\w+)?@(\w+)\.(\w+)(\.\w+)?$').hasMatch(value)) {
        return "Please enter a valid email.";
      }
      return null;
    },
  );
}
