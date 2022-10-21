import 'package:bucademy/services/course_service.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget courseView({required Course course}) => ViewModelBuilder<CourseViewModel>.reactive(
      viewModelBuilder: () => CourseViewModel(course),
      builder: (context, viewModel, child) => Scaffold(
        body: Scaffold(
          body: Text(viewModel.course.title),
        ),
      ),
    );

// ViewModel
class CourseViewModel extends ChangeNotifier {
  late Course course;

  CourseViewModel(this.course);
}
