import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget longPressTopicTile(Topic topic, ChangeNotifier viewModelCoursePage, CourseDetailed course) => ViewModelBuilder<
        LongPressTopicModel>.reactive(
    viewModelBuilder: () => LongPressTopicModel(),
    builder: (context, viewModel, child) {
      return Column(
          mainAxisAlignment: MainAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            GestureDetector(
              onTap: () {
                showDialog(
                  context: context,
                  builder: ((context) => AlertDialog(
                        content: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Text(
                              "You are about to delete this topic.\nThis action is irreversable.\nDo you want to continue?",
                              style: TextStyle(
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                                fontSize: 22,
                              ),
                              textAlign: TextAlign.center,
                            ),
                            Wrap(
                              children: [
                                GestureDetector(
                                  onTap: () async {
                                    int? deleted = await contentService
                                        .deleteTopic(topicId: topic.id);
                                    if (deleted == 201) {
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        const SnackBar(
                                            content: Text(
                                                'Topic Successfully Deleted!')),
                                      );
                                      Navigator.of(context).pop();
                                      Navigator.of(context).pop();
                                      course.topics.remove(topic);
                                      viewModel.notifyListeners();
                                      viewModelCoursePage.notifyListeners();
                                    } else if (deleted == 400) {
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        const SnackBar(
                                            content: Text(
                                                'Topic Could Not Be Deleted!\nYou are not the creator of this topic.')),
                                      );
                                      Navigator.of(context).pop();
                                      Navigator.of(context).pop();
                                      viewModel.notifyListeners();
                                    } else {
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        SnackBar(
                                            content: Text(
                                                'Could Not Delete Topic!\nYou might not be the creator.'//'A problem occured. Status code $deleted'
                                                )),
                                      );
                                      Navigator.of(context).pop();
                                      Navigator.of(context).pop();
                                      viewModel.notifyListeners();
                                    }
                                  },
                                  child: Container(
                                    padding:
                                        const EdgeInsets.symmetric(vertical: 8),
                                    margin: const EdgeInsets.symmetric(
                                        vertical: 8, horizontal: 4),
                                    width: 120,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(
                                          Constants.borderRadius),
                                      color: CustomColors.main,
                                    ),
                                    child: Center(
                                        child: Text(
                                      "Yes",
                                      style: TextStyles.bodyWhite,
                                    )),
                                  ),
                                ),
                                GestureDetector(
                                  onTap: () {
                                    Navigator.of(context).pop();
                                    Navigator.of(context).pop();
                                    viewModel.notifyListeners();
                                  },
                                  child: Container(
                                    padding:
                                        const EdgeInsets.symmetric(vertical: 8),
                                    margin: const EdgeInsets.symmetric(
                                        vertical: 8, horizontal: 4),
                                    width: 120,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(
                                          Constants.borderRadius),
                                      color: CustomColors.main,
                                    ),
                                    child: Center(
                                        child: Text(
                                      "No",
                                      style: TextStyles.bodyWhite,
                                    )),
                                  ),
                                ),
                              ],
                            )
                          ],
                        ),
                      )),
                );
              },
              child: Container(
                margin: const EdgeInsets.all(5),
                width: double.infinity,
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                decoration: BoxDecoration(
                    color: CustomColors.main,
                    borderRadius: BorderRadius.circular(10)),
                child: const Text(
                  "Delete",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ]);
    });

// ViewModel
class LongPressTopicModel extends ChangeNotifier {}
