import 'package:injectable/injectable.dart';

class MockContent {
  String name;
  String body;
  String? course;

  MockContent(this.name, this.body, {this.course});
}

List<MockContent> mockContents = [];

@lazySingleton
class MockContentService {
  contents(String title) {
    List<MockContent> temp = [
      for (var i = 0; i < 100; ++i)
        MockContent('$title - ${i.toString()}',
            "Interested in learning more about data science, but don’t know where to start?" * 10)
    ];
    mockContents.addAll(temp);
    return temp;
  }
}
