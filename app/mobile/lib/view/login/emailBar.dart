
import 'package:bucademy/resources/custom_colors.dart';
import 'package:email_validator/email_validator.dart';
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
      isDense: true,
    ),
    autofillHints: const [AutofillHints.email],
    validator: (value) {
      if (value!=null && !EmailValidator.validate(value)) {
        return "Please enter a valid email.";
      }
      return null;
    },
  );
}
