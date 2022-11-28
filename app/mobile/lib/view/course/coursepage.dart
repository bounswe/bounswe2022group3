import 'package:bucademy/classes/chapter/chapter.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/content_tile.dart';
import 'package:bucademy/view/course/mock_tile.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';
import 'package:bucademy/services/content_service.dart';

Widget coursePageView(Course c) => ViewModelBuilder<CoursePageViewModel>.reactive(
    viewModelBuilder: () => CoursePageViewModel(c.id),
    builder: (context, viewModel, child) {
      return viewModel.contentsLoading 
       ? const Center(child: CircularProgressIndicator())
       : viewModel.course != null 
        ? DefaultTabController(
            length: 5,
            child: Scaffold(
              body: NestedScrollView(
                headerSliverBuilder:
                    (BuildContext context, bool innerBoxIsScrolled) {
                  return <Widget>[
                    SliverAppBar(
                      title: Text(viewModel.course!.name),
                      pinned: true,
                      flexibleSpace: FlexibleSpaceBar(
                        collapseMode: CollapseMode.pin,
                        background: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10),
                          decoration: const BoxDecoration(
                            // color: CustomColors.main,
                            color: Color.fromARGB(255, 242, 241, 248),
                            borderRadius: BorderRadius.all(Radius.circular(
                                Constants
                                    .borderRadius)), //(Constants.borderRadius)
                          ),
                          child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                ConstrainedBox(
                                  constraints:
                                      const BoxConstraints(maxHeight: 200),
                                  child: ClipRRect(
                                    borderRadius: const BorderRadius.all(
                                        Radius.circular(
                                            Constants.borderRadius)),
                                    child: Image.network(
                                      viewModel.course!.image,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                                Container(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 10),
                                    child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        children: [
                                          Text('★ ${viewModel.course!.rating}'),
                                          Text(
                                              '👤 ${viewModel.course!.numberOfEnrolled}'),
                                        ])),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 20),
                                  decoration: const BoxDecoration(
                                    borderRadius: BorderRadius.all(
                                        Radius.circular(
                                            Constants.borderRadius)),
                                  ),
                                  child:
                                      Text(viewModel.course!.info, maxLines: 5),
                                  // child:Text('Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',maxLines: 4,)
                                ),
                                                                      if (!courseService.enrolledIds.contains(c.id))
                                        GestureDetector(
                                          onTap: () async {
                                            await courseService.enrollToSpace(spaceId: c.id);
                                            ScaffoldMessenger.of(context).showSnackBar(
                                                SnackBar(content: Text('Successfully Joined To The Space!')));
                                            viewModel.notifyListeners();
                                          },
                                          child: Container(
                                            padding: const EdgeInsets.symmetric(vertical: 8),
                                            margin: const EdgeInsets.symmetric(vertical: 8),
                                            width: 120,
                                            decoration: BoxDecoration(
                                              borderRadius: BorderRadius.circular(Constants.borderRadius),
                                              color: CustomColors.main,
                                            ),
                                            child: Center(
                                                child: Text(
                                              "Join",
                                              style: TextStyles.bodyWhite,
                                            )),
                                          ),
                                        ),
                              ]),
                        ),
                        
                      ),
                      expandedHeight: 450,
                      forceElevated: innerBoxIsScrolled,
                      foregroundColor: Colors.black,
                      backgroundColor: const Color.fromARGB(255, 242, 241, 248),
                      bottom: const TabBar(
                        isScrollable: true,
                        tabs: [
                          Tab(
                              icon: Icon(
                                Icons.book_outlined,
                                color: Colors.black,
                              ),
                              child: Text(
                                "Contents",
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
                                Icons.note_alt_outlined,
                                color: Colors.black,
                              ),
                              child: Text(
                                "Notes",
                                style: TextStyle(color: Colors.black),
                              )),
                          Tab(
                              icon: Icon(
                                Icons.quiz_outlined,
                                color: Colors.black,
                              ),
                              child: Text(
                                "Quizzes",
                                style: TextStyle(color: Colors.black),
                              )),
                          Tab(
                              icon: Icon(
                                Icons.group_outlined,
                                color: Colors.black,
                              ),
                              child: Text(
                                "Discussion",
                                style: TextStyle(color: Colors.black),
                              )),
                        ],
                        indicatorColor: CustomColors.main,
                      ),
                    ),
                  ];
                },
                body: TabBarView(
                  children: [
                    Stack(
                      children: [
                        ListView(
                          shrinkWrap: true,
                          padding: const EdgeInsets.all(10.0),
                          children: [
                            ...viewModel.course!.topics
                                .map((Chapter t) => topicTile(t, context))
                          ],
                        ),
                        Padding(
                          padding: EdgeInsets.all(10),
                          child: OverflowBox(
                            alignment: Alignment.bottomRight,
                            child: Container(
                              margin: EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: const Color.fromARGB(255, 242, 241, 248),
                                borderRadius: BorderRadiusDirectional.circular(10)
                              ),
                              child: Icon(Icons.edit_outlined, color: Colors.black,),
                            )
                          ),
                        ),
                      ]
                    ),
                    ListView(
                      shrinkWrap: true,
                      padding: const EdgeInsets.all(10.0),
                      children: [
                        ...contentService.contents("Event").map((MockContent m) => mockTile(m))
                      ],
                    ),
                    ListView(
                      shrinkWrap: true,
                      padding: const EdgeInsets.all(10.0),
                      children: [
                        ...contentService.contents("Note").map((MockContent m) => mockTile(m))
                      ],
                    ),                    
                    ListView(
                      shrinkWrap: true,
                      padding: const EdgeInsets.all(10.0),
                      children: [
                        ...contentService.contents("Quiz").map((MockContent m) => mockTile(m))
                      ],
                    ),
                    ListView(
                      shrinkWrap: true,
                      padding: const EdgeInsets.all(10.0),
                      children: [
                        ...contentService.contents("Discussion").map((MockContent m) => mockTile(m))
                      ],
                    ),
                  ],
                ),
              ),
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
                            MaterialStatePropertyAll<Color>(Colors.amber[800]!),
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
class CoursePageViewModel extends ChangeNotifier {
  String? title;
  bool contentsLoading = true;
  int counter = 0;
  CourseDetailed? course;
  CoursePageViewModel(String courseId) {
    init(courseId);
  }
  Future<void> init(String courseId) async {
    CourseDetailed? c = await courseService.getCourseDetails(id: courseId);
    if (c != null) course = c;
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
