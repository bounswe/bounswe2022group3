import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/coursepage.dart';
import 'package:flutter/material.dart';

createDiscussion(BuildContext context, CoursePageViewModel viewModel) {
  String? title;
  showDialog(
      context: context,
      builder: ((context) => AlertDialog(
            title: const Text('Enter the title of discussion'),
            content: TextField(
              onChanged: (value) => title = value,
              decoration: const InputDecoration(hintText: "Title"),
            ),
            actions: [
              GestureDetector(
                onTap: (title != null && title!.isNotEmpty)
                    ? null
                    : () async {
                        Discussion? d =
                            await discussionService.createDiscussion(
                                spaceId: viewModel.course!.id, title: title!);
                        if (d != null) {
                          viewModel.addNewDiscussion(d);
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
