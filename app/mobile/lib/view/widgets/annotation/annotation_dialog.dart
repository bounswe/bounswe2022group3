import 'package:bucademy/resources/custom_colors.dart';
import 'package:flutter/material.dart';

enum DialogType { create, edit, view, abort }

class AnnotationDialog {
  final BuildContext context;
  final DialogType? purpose;
  AnnotationDialog({required this.context, this.purpose});

  Future<List<dynamic>> createDialog() async {
    TextEditingController textEditingController = TextEditingController();
    String comment = '';
    final action = await showDialog(
        context: context,
        builder: ((context) {
          return AlertDialog(
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            content: Form(
              child: Column(children: [
                const Text('Comment:'),
                TextFormField(
                  controller: textEditingController,
                  decoration:
                      const InputDecoration(hintText: "Add your comment here"),
                  onChanged: (value) => comment = value,
                )
              ]),
            ),
            actions: <Widget>[cancelButton(context), submitButton(context)],
          );
        }));
    List<dynamic> ret = [];
    if (action != null && action == DialogType.create) {
      ret.add(DialogType.create);
      ret.add(comment);
    } else {
      ret.add(DialogType.abort);
      ret.add('');
    }
    return ret;
  }
}

Widget cancelButton(BuildContext context) {
  return TextButton(
      onPressed: () => Navigator.of(context).pop(DialogType.abort),
      child: const Text(
        'Cancel',
        style: TextStyle(color: CustomColors.main),
      ));
}

Widget submitButton(BuildContext context) {
  return ElevatedButton(
      onPressed: () => Navigator.of(context).pop(DialogType.create),
      child: const Text(
        'Submit',
        style: TextStyle(color: Colors.white),
      ));
}

Widget editButton(BuildContext context) {
  return IconButton(
      icon: const Icon(Icons.edit_outlined),
      onPressed: () => Navigator.of(context).pop(DialogType.edit));
}
