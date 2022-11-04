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
      for (var i = 1; i <= 100; ++i)
        MockContent(
            '$title - ${i.toString()}',
            "Interested in learning more about data science, but don’t know where to start?" *
                10)
    ];
    mockContents.addAll(temp);
    if (title == "Event") {
      return [
        MockContent('Orientation', 'Mock'),
        MockContent('Introductory Meeting', 'Mock'),
        MockContent('Game Night', 'Mock'),
        MockContent('Information Sharing Meeting', 'Mock'),
        MockContent('Barbecue Weekend', 'Mock'),
        MockContent('Happy Hour', 'Mock'),
        MockContent('Online Planning Meeting', 'Mock'),
        MockContent('Weekly Meeting', 'Mock'),
        MockContent('Beer Night', 'Mock'),
      ];
    }
    return temp;
  }
}
