import 'package:bucademy/resources/text_styles.dart';
import 'package:flutter/material.dart';

TextFormField surnameBar(TextEditingController controller) {
  return TextFormField(
    controller: controller,
    maxLines: 1,
    decoration: InputDecoration(
      hintText: 'Surname',
      border: const OutlineInputBorder(),
      hintStyle: TextStyles.helperText,
    ),
    /*validator: (value) {
      if (value == null || value.trim().isEmpty || !RegExp(r'^[a-z A-Z]+$').hasMatch(value)) {
        return "Provide a surname.";
      }
    },*/
  );
}
