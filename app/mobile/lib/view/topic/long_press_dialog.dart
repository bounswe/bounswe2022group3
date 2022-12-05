import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/view/resource/edit_resource_page.dart';
import 'package:flutter/cupertino.dart';

import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/resource/edit_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:stacked/stacked.dart';
import 'package:url_launcher/url_launcher.dart';

Widget longPressDialog(Resource r) => ViewModelBuilder<
        ResourcePageViewModel>.reactive(
    viewModelBuilder: () => ResourcePageViewModel(),
    builder: (context, viewModel, child) {
      return Column(
          mainAxisAlignment: MainAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              margin: const EdgeInsets.all(5),
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: Text(
                "Discussion",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              decoration: BoxDecoration(
                  color: CustomColors.main,
                  borderRadius: BorderRadius.circular(10)),
            ),
            Container(
              margin: const EdgeInsets.all(5),
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: Text(
                "Details",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              decoration: BoxDecoration(
                  color: Color.fromARGB(255, 68, 84, 141),
                  borderRadius: BorderRadius.circular(10)),
            ),
            GestureDetector(
              onTap: () {
                PersistentNavBarNavigator.pushNewScreen(context,
                    screen: editResourceView(r));
              },
              child: Container(
                margin: const EdgeInsets.all(5),
                width: double.infinity,
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                child: Text(
                  "Edit",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
                decoration: BoxDecoration(
                    color: CustomColors.main,
                    borderRadius: BorderRadius.circular(10)),
              ),
            ),
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
                              "You are about to delete this resource.\nThis action is irreversable.\nDo you want to continue?",
                              style: TextStyle(
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                                fontSize: 22,
                              ),
                              textAlign: TextAlign.center,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                GestureDetector(
                                  onTap: () async {
                                    int? deleted = await contentService
                                        .deleteResource(resourceId: r.id);
                                    if (deleted == 201) {
                                      //TODO: remove the resource tile from here
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        const SnackBar(
                                            content: Text(
                                                'Resource Successfully Deleted!')),
                                      );
                                      Navigator.of(context).pop();
                                      Navigator.of(context).pop();
                                      viewModel.notifyListeners();
                                    } else if (deleted == 400) {
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        const SnackBar(
                                            content: Text(
                                                'Resource Could Not Be Deleted!\nYou are not the creator of this resource.')),
                                      );
                                      Navigator.of(context).pop();
                                      Navigator.of(context).pop();
                                      viewModel.notifyListeners();
                                    } else {
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        SnackBar(
                                            content: Text(
                                                'A problem occured. Status code $deleted')),
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
                    color: Color.fromARGB(255, 68, 84, 141),
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
class ResourcePageViewModel extends ChangeNotifier {}
