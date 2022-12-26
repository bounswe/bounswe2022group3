import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/home/appbar.dart';
import 'package:bucademy/view/home/course_tile.dart';
import 'package:bucademy/view/home/search_bar.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget homepageView() => ViewModelBuilder<HomeViewModel>.reactive(
      viewModelBuilder: () => HomeViewModel(),
      onModelReady: (model) => model.getCourses(),
      builder: (context, viewModel, child) => Scaffold(
          appBar: appBar(context),
          body: RefreshIndicator(
            onRefresh: (() => viewModel.update()),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 8) +
                          const EdgeInsets.only(bottom: 12),
                  decoration: const BoxDecoration(
                      color: CustomColors.main,
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(Constants.borderRadius),
                        bottomRight: Radius.circular(Constants.borderRadius),
                      )),
                  child:
                      searchBar(viewModel.search, viewModel.searchBarController,
                          close: () {
                    viewModel.closeSearch();
                    FocusScope.of(context).requestFocus(FocusNode());
                  }),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(left: 12.0, top: 10),
                    child: viewModel.isSearchScreen
                        ? viewModel.isLoading
                            ? const Center(child: CircularProgressIndicator())
                            : SingleChildScrollView(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    ...viewModel.searchResults.map((Course c) =>
                                        searchCourseTile(c, context)),
                                  ],
                                ),
                              )
                        : SingleChildScrollView(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'My Spaces',
                                  style: TextStyles.subtitle,
                                ),
                                const SizedBox(height: 12),
                                viewModel.isLoading
                                    ? loadingIndicator()
                                    : SingleChildScrollView(
                                        scrollDirection: Axis.horizontal,
                                        child: Row(children: [
                                          ...viewModel.enrolledCourses.map(
                                              (Course c) =>
                                                  courseTile(c, context))
                                        ]),
                                      ),
                                const SizedBox(height: 20),
                                const Text(
                                  'Top Spaces',
                                  style: TextStyles.subtitle,
                                ),
                                const SizedBox(height: 12),
                                viewModel.isLoading
                                    ? loadingIndicator()
                                    : SingleChildScrollView(
                                        scrollDirection: Axis.horizontal,
                                        child: Row(
                                          children: [
                                            ...viewModel.courses.map(
                                                (Course c) =>
                                                    courseTile(c, context))
                                          ],
                                        ),
                                      ),
                                const SizedBox(height: 20),
                                Text(
                                  'Browse',
                                  style: TextStyles.pageTitle
                                      .copyWith(color: Colors.black),
                                ),
                                const SizedBox(height: 20),
                                const Text(
                                  'Computer Sciences',
                                  style: TextStyles.subtitle,
                                ),
                                const SizedBox(height: 12),
                                SingleChildScrollView(
                                  scrollDirection: Axis.horizontal,
                                  child: Row(
                                    children: [
                                      ...courseService
                                          .getMockCourses(
                                              'Introduction to Programming with C')
                                          .map((Course c) => courseTile(
                                              c, context,
                                              isClickable: false))
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 20),
                                const Text(
                                  'Art',
                                  style: TextStyles.subtitle,
                                ),
                                const SizedBox(height: 12),
                                SingleChildScrollView(
                                  scrollDirection: Axis.horizontal,
                                  child: Row(
                                    children: [
                                      ...courseService
                                          .getMockCourses(
                                              'Painting Techniques for beginners')
                                          .map((Course c) => courseTile(
                                              c, context,
                                              isClickable: false))
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 20),
                              ],
                            ),
                          ),
                  ),
                ),
              ],
            ),
          )),
    );

// ViewModel
class HomeViewModel extends ChangeNotifier {
  List<Course> courses = [];
  List<Course> enrolledCourses = [];
  TextEditingController searchBarController = TextEditingController();

  List<Course> searchResults = [];
  String? title;
  bool isLoading = false;
  bool isSearchScreen = false;

  Future<void> getCourses() async {
    isLoading = true;
    notifyListeners();

    courses = await courseService.getCourses();
    enrolledCourses = await courseService.getEnrolledCourses();
    isLoading = false;
    notifyListeners();
  }

  closeSearch() {
    isSearchScreen = false;
    searchBarController.clear();
    notifyListeners();
  }

  Future<void> search(String keyword) async {
    bool newState = keyword.isNotEmpty;
    if (newState != isSearchScreen) {
      isSearchScreen = newState;
      notifyListeners();
    }

    if (keyword.length <= 3) {
      searchResults = [];
      notifyListeners();
      return;
    }

    isLoading = true;
    notifyListeners();

    searchResults = await courseService.searchCourse(keyword);
    isLoading = false;
    notifyListeners();
  }

  Future<void> update() async {
    await getCourses();
    return;
  }
}

Widget loadingIndicator() => const Padding(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      child: CircularProgressIndicator(),
    );
