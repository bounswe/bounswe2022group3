import 'package:bucademy/view/course/add_button.dart';
import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/topic/resource_tile.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget topicPageView(Topic c) =>
    ViewModelBuilder<TopicPageViewModel>.reactive(
        viewModelBuilder: () => TopicPageViewModel(c.id),
        builder: (context, viewModel, child) {
          return viewModel.contentsLoading
              ? const Center(child: CircularProgressIndicator())
              : viewModel.topic != null
                  ? Scaffold(
                      appBar: AppBar(
                        iconTheme: const IconThemeData(color: Colors.white),
                        elevation: 0,
                        backgroundColor: CustomColors.main,
                        shadowColor: CustomColors.main,
                        foregroundColor: CustomColors.main,
                        title: FittedBox(
                          fit: BoxFit.fitWidth,
                          child: Text(
                            viewModel.topic!.name,
                            style: TextStyles.pageTitle,
                          ),
                        ),
                      ),
                      body: Stack(
                        children: [Center(
                            child: SingleChildScrollView(
                          child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                ...viewModel.topic!.resources
                                    .map((Resource cont) => resourceTile(cont,context))
                              ]),
                        )),
                        addButton(viewModel.topic!, context),
]
                      ),
                    )
                  : Scaffold(
                      body: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          mainAxisSize: MainAxisSize.max,
                          children: [
                            const Text(
                              "Oops an Error Occurred!",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 30,
                                  fontWeight: FontWeight.bold),
                            ),
                            OutlinedButton(
                              onPressed: () {
                                Navigator.pop(context);
                              },
                              style: ButtonStyle(
                                backgroundColor:
                                    MaterialStatePropertyAll<Color>(
                                        Colors.amber[800]!),
                              ),
                              autofocus: true,
                              child: const Text(
                                "Go Back To Safety",
                                style: TextStyle(color: Colors.white),
                              ),
                            )
                          ],
                        ),
                      ),
                      backgroundColor: Colors.amber[800]);
        });

// ViewModel
class TopicPageViewModel extends ChangeNotifier {
  String? title;
  bool contentsLoading = true;
  int counter = 0;
  TopicDetailed? topic;
  TopicPageViewModel(String topicId) {
    init(topicId);
  }
  Future<void> init(String topicId) async {
    TopicDetailed? t =
        await contentService.getTopicDetails(topicId: '$topicId');
    if (t != null) topic = t;
    contentsLoading = false;
    notifyListeners();
  }

  Future<void> getContents() async {
    contentsLoading = true;
    notifyListeners();

    title = await contentService.contents('Topic');
    contentsLoading = false;
    notifyListeners();
  }
}
