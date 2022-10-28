import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/course_service.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/content_tile.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';
import 'package:bucademy/services/content_service.dart';

Widget coursePageView(Course c) =>
    ViewModelBuilder<CoursePageViewModel>.reactive(
        viewModelBuilder: () => CoursePageViewModel(),
        builder: (context, viewModel, child) {
          List<Widget> tabContent = [
            Container(
              child: ListView(
                shrinkWrap: true,
                padding: EdgeInsets.all(10.0),
                children: [
                  ...contentService
                      .contents('Course Content')
                      .map((Content cont) => contentTile(cont))
                ],
              ),
            ),
            Container(
              child: ListView(
                shrinkWrap: true,
                padding: EdgeInsets.all(10.0),
                children: [
                  ...contentService
                      .contents('Event')
                      .map((Content cont) => contentTile(cont))
                ],
              ),
            ),
            Container(
              child: ListView(
                shrinkWrap: true,
                padding: EdgeInsets.all(10.0),
                children: [
                  ...contentService
                      .contents('Quiz')
                      .map((Content cont) => contentTile(cont))
                ],
              ),
            ),
            Text("Discussion Will Be Here"),
          ];
          Widget courseImage = ClipRRect(
            borderRadius:
                BorderRadius.all(Radius.circular(Constants.borderRadius)),
            child: Image.network(
              'https://cdn.schoolofrock.com/img/hero-large-750w/guitar-lessons1527266771.jpg', //'https://docs.flutter.dev/assets/images/dash/dash-fainting.gif',
              fit: BoxFit.contain,
            ),
          );
          Widget courseInfo = Container(
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Text(c.title),
                    Text('★${c.rating}'),
                    Text('👤45,131'),
                  ]));
          Widget courseDescription = Container(
            padding: const EdgeInsets.symmetric(horizontal: 20) + const EdgeInsets.only(top: 20),
            decoration: const BoxDecoration(
              borderRadius:
                  BorderRadius.all(Radius.circular(Constants.borderRadius)),
            ),
            child: Text(c.body, maxLines: 5),
            // child:Text('Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',maxLines: 4,)
          );

          return Scaffold(
            body: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.max,
              children: [
                Expanded(
                  child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10) +
                          const EdgeInsets.only(top: 20),
                      decoration: const BoxDecoration(
                        // color: CustomColors.main,
                        color: Color.fromARGB(255, 242, 241, 248),
                        borderRadius: BorderRadius.all(Radius.circular(
                            Constants.borderRadius)), //(Constants.borderRadius)
                      ),
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          mainAxisSize: MainAxisSize.max,
                          children: [
                            courseImage,
                            courseInfo,
                            courseDescription,
                          ])),
                ),
                Expanded(
                  child: DefaultTabController(
                    length: 4,
                    child: Scaffold(
                      backgroundColor: Color.fromARGB(255, 242, 241, 248),
                      appBar: AppBar(
                        backgroundColor: Colors.red,
                        foregroundColor: Colors.black,
                        bottom: const TabBar(tabs: [
                          //Tab(child: FittedBox(
                          Tab(
                              icon: Icon(
                                Icons.book_outlined,
                                color: Colors.black,
                              ),
                              child: Text(
                                "Chapters",
                                style: TextStyle(color: Colors.black),
                              )),
                          Tab(
                              icon: Icon(
                                Icons.event,
                                color: Colors.black,
                              ),
                              child: Text(
                                "Events",
                                style: TextStyle(color: Colors.black),
                              )),
                          Tab(
                              icon: Icon(
                                Icons.quiz,
                                color: Colors.black,
                              ),
                              child: Text(
                                "Quizzes",
                                style: TextStyle(color: Colors.black),
                              )),
                          Tab(
                              icon: Icon(
                                Icons.group,
                                color: Colors.black,
                              ),
                              child: Text(
                                "Discussion",
                                style: TextStyle(color: Colors.black),
                              )),
                        ]),
                      ),
                      body: TabBarView(
                        children: tabContent,
                      ),
                    ),
                  ),
                )
              ],
            ),
          );
        });

// ViewModel
class CoursePageViewModel extends ChangeNotifier {
  String? title;
  bool contentsLoading = false;
  int counter = 0;

  Future<void> getContents() async {
    contentsLoading = true;
    notifyListeners();

    title = await contentService.contents('Chapter');
    contentsLoading = false;
    notifyListeners();
  }
}
