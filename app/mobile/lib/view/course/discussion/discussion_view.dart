import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:bucademy/view/widgets/profile_picture.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:stacked/stacked.dart';

List<String> bodies = [
  for (var i = 0; i < 15; ++i) '### Title\n- Hello \n- Hii\n',
];
Widget discussionView() => ViewModelBuilder<DiscussionViewModel>.reactive(
      viewModelBuilder: () => DiscussionViewModel(),
      builder: (context, viewModel, child) => Scaffold(
        appBar: AppBar(
          title: const Text('Discussions'),
          backgroundColor: CustomColors.main,
        ),
        body: Column(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: ListView.separated(
                itemCount: bodies.length,
                controller: viewModel.scrollController,
                physics: const ClampingScrollPhysics(),
                shrinkWrap: true,
                itemBuilder: (context, index) => commentTile(bodies[index]),
                separatorBuilder: (BuildContext context, int index) =>
                    const Divider(thickness: 1.5),
              ),
            ),
            markdownInput(
                viewModel.updateText, viewModel.text, viewModel.sendDiscussion,
                loading: viewModel.loading),
          ],
        ),
      ),
    );

Container commentTile(String body) => Container(
      margin: const EdgeInsets.symmetric(vertical: 0, horizontal: 8),
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Row(
        children: [
          profilePicture(
              imagePath: 'https://randomuser.me/api/portraits/men/40.jpg'),
          const SizedBox(width: 10),
          Expanded(
              child: Markdown(
            onTapLink: (text, href, title) {
              print('href');
            },
            data: body,
            shrinkWrap: true,
            physics: const ClampingScrollPhysics(),
          )),
        ],
      ),
    );

class DiscussionViewModel extends ChangeNotifier {
  String text = "";
  bool loading = false;
  ScrollController scrollController = ScrollController();
  void updateText(String t) {
    text = t;
    notifyListeners();
  }

  Future sendDiscussion() async {
    loading = true;
    notifyListeners();

    await discussionService.postDiscussion(body: text);
    bodies.add(text);
    loading = false;
    text = "";

    notifyListeners();

    scrollController.animateTo(
      scrollController.position.maxScrollExtent + 50,
      duration: const Duration(milliseconds: 300),
      curve: Curves.fastOutSlowIn,
    );
  }
}
