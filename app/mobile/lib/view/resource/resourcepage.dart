import 'package:animated_floating_buttons/animated_floating_buttons.dart';
import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/coursepage.dart';
import 'package:bucademy/view/course/discussion/discussion_view.dart';
import 'package:bucademy/view/resource/edit_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:stacked/stacked.dart';
import 'package:url_launcher/url_launcher.dart';

Widget resourcePageView(TopicDetailed t, Resource r,
        ChangeNotifier topicPageView, CoursePageViewModel coursePageModel) =>
    ViewModelBuilder<ResourcePageViewModel>.reactive(
        viewModelBuilder: () => ResourcePageViewModel(),
        builder: (context, viewModel, child) {
          Discussion? d;
          String id;
          return viewModel.contentsLoading
              ? const Center(child: CircularProgressIndicator())
              : Scaffold(
                  appBar: AppBar(
                    iconTheme: const IconThemeData(color: Colors.white),
                    elevation: 0,
                    backgroundColor: CustomColors.main,
                    shadowColor: CustomColors.main,
                    foregroundColor: CustomColors.main,
                    title: FittedBox(
                      fit: BoxFit.fitWidth,
                      child: Text(
                        r.name,
                        style: TextStyles.pageTitle,
                      ),
                    ),
                  ),
                  body: Stack(children: [
                    SingleChildScrollView(
                      child: Column(
                        children: [
                          Markdown(
                            onTapLink: (text, href, title) async {
                              if (href == null) return;
                              if (!await launchUrl(Uri.parse(href))) {
                                print('Could not launch the url');
                              }
                            },
                            styleSheet: MarkdownStyleSheet(
                                blockquoteDecoration: const BoxDecoration(
                                    color: CustomColors.main)),
                            data: r.body,
                            shrinkWrap: true,
                            physics: const ClampingScrollPhysics(),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: AnimatedFloatingActionButton(
                          fabButtons: <Widget>[
                            if (userService.user != null &&
                                r.creator.id == userService.user!.id)
                              FloatingActionButton(
                                onPressed: () => editResourceButton(
                                    t, r, context, topicPageView),
                                backgroundColor: CustomColors.main,
                                tooltip: 'Edit Resource',
                                heroTag: 'btn1',
                                child: const Icon(
                                  Icons.edit_outlined,
                                ),
                              ),
                            FloatingActionButton(
                              onPressed: null,
                              backgroundColor: CustomColors.main,
                              tooltip: 'Create A New Note',
                              heroTag: 'btn2',
                              child: Icon(Icons.note_add_outlined),
                            ),
                            FloatingActionButton(
                              onPressed: () async => {
                                if (r.discussion?.id == null)
                                  {
                                    d = await discussionService
                                        .createDiscussion(
                                            spaceId: coursePageModel.course!.id,
                                            title: r.name),
                                    viewModel.notifyListeners(),
                                    id = d!.id
                                  }
                                else
                                  id = r.discussion!.id,
                                PersistentNavBarNavigator.pushNewScreen(context,
                                    screen: discussionView(discussionId: id))
                              },
                              backgroundColor: CustomColors.main,
                              tooltip: 'Go To Discussion Of The Resource',
                              heroTag: 'btn3',
                              child: Icon(Icons.group_outlined),
                            ),
                          ],
                          colorStartAnimation: CustomColors.main,
                          colorEndAnimation: Color.fromARGB(255, 68, 84, 141),
                          animatedIconData:
                              AnimatedIcons.menu_close //To principal button
                          ),
                    ),
                  ]),
                );
        });

// ViewModel
class ResourcePageViewModel extends ChangeNotifier {
  String? title;
  bool contentsLoading = false;
  int counter = 0;
  ResourcePageViewModel() {
    counter++;
  }

  Future<void> getContents() async {
    contentsLoading = true;
    notifyListeners();

    title = await contentService.contents('Topic');
    contentsLoading = false;
    notifyListeners();
  }
}
