import 'package:bucademy/resources/colors.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/course_service.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/home/searchBar.dart';
import 'package:bucademy/view/widgets/profile_picture.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget homepageView() => ViewModelBuilder<HomeViewModel>.reactive(
      viewModelBuilder: () => HomeViewModel(),
      builder: (context, viewModel, child) => Scaffold(
          // backgroundColor: Colors.amber,
          appBar: appBar(),
          body: Column(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8) + const EdgeInsets.only(bottom: 12),
                decoration: const BoxDecoration(
                    color: CustomColors.main,
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(Constants.borderRadius),
                      bottomRight: Radius.circular(Constants.borderRadius),
                    )),
                child: searchBar(),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 12.0, top: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'My Courses',
                      style: TextStyles.subtitle,
                    ),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          ...courseService.courses().map(
                                (Course c) => Container(
                                  width: 160,
                                  padding: const EdgeInsets.only(right: 12.0),
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Image.network(
                                        c.image ??
                                            'https://cdn.educba.com/academy/wp-content/uploads/2019/03/Introduction-To-Data-Science.jpg.webp',
                                        height: 120,
                                        fit: BoxFit.cover,
                                      ),
                                      Text(
                                        c.title,
                                        maxLines: 2,
                                        textAlign: TextAlign.center,
                                      )
                                    ],
                                  ),
                                ),
                              ),
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ],
          )),
    );

AppBar appBar() {
  return AppBar(
    elevation: 0,
    backgroundColor: CustomColors.main,
    shadowColor: CustomColors.main,
    foregroundColor: CustomColors.main,
    leading: GestureDetector(
      child: const Icon(
        Icons.menu,
        color: Colors.white,
      ),
      onTap: () {},
    ),
    title: const Text(
      "Hello, Can!",
      style: TextStyles.pageTitle,
    ),
    centerTitle: false,
    actions: [
      Padding(
        padding: const EdgeInsets.only(right: 20),
        child: profilePicture(imagePath: 'https://randomuser.me/api/portraits/men/40.jpg'),
      )
    ],
  );
}

// ViewModel
class HomeViewModel extends ChangeNotifier {
  String? title;
  bool isLoading = false;
}
