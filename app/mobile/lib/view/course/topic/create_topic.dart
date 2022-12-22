import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/coursepage.dart';
import 'package:flutter/material.dart';

createTopic(BuildContext context, CoursePageViewModel viewModel) {
  String? title;
  showDialog(
      context: context,
      builder: ((context) => AlertDialog(
            title: const Text('Enter the name of topic'),
            content: TextField(
              onChanged: (value) => title = value,
              decoration: const InputDecoration(hintText: "Name"),
            ),
            actions: [
              GestureDetector(
                onTap: (title != null && title!.isNotEmpty)
                    ? null
                    : () async {
                        Topic? t =
                            await contentService.createNewTopic(spaceId: viewModel.course!.id, name: title!);

                        if (t != null) {
                          viewModel.addNewTopic(t);
                          Navigator.of(context).pop();
                        }
                      },
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                  color: CustomColors.main,
                  child: Text('Create', style: TextStyles.bodyWhite),
                ),
              )
            ],
          )));
}
