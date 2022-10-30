import 'package:injectable/injectable.dart';

class Content {
  String title;
  String body;
  String? course;

  Content(this.title, this.body, {this.course});
}

List<Content> mockContents = [];

@lazySingleton
class ContentService {
  contents(String title) {
    List<Content> temp = [
      for (var i = 0; i < 100; ++i)
        Content('$title - ${i.toString()}',
            "Interested in learning more about data science, but don’t know where to start?" * 10)
    ];
    mockContents.addAll(temp);
    return temp;
  }
}
