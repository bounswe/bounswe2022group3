import 'package:bucademy/resources/custom_colors.dart';
import 'package:flutter/material.dart';

TextFormField passwordBar(TextEditingController controller) {
  return TextFormField(
    controller: controller,
    cursorColor: CustomColors.main,
    maxLines: 1,
    obscureText: true,
    decoration: const InputDecoration(
      hintText: 'Password',
      border: OutlineInputBorder(),
      fillColor: Colors.white,
      //filled: true,
      isDense: true,
    ),
    validator: (value) {
      if (value == null || value.trim().length < 8) {
        return "Your password must be at least 8 characters long.";
      }
    }
  );
}
