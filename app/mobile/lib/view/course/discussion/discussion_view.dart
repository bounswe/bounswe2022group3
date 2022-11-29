import 'package:bucademy/classes/discussion/comment.dart';
import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:bucademy/view/widgets/profile_picture.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:stacked/stacked.dart';

Widget discussionView({required String discussionId}) => ViewModelBuilder<DiscussionViewModel>.reactive(
      viewModelBuilder: () => DiscussionViewModel(discussionId),
      onModelReady: (model) => model.init(),
      builder: (context, viewModel, child) => Scaffold(
        appBar: AppBar(
          title: Text(viewModel.discussion?.title ?? ""),
          backgroundColor: CustomColors.main,
        ),
        body: Column(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            viewModel.loading
                ? const Center(child: CircularProgressIndicator())
                : Expanded(
                    child: ListView.separated(
                      itemCount: viewModel.discussion!.comments.length,
                      controller: viewModel.scrollController,
                      physics: const ClampingScrollPhysics(),
                      shrinkWrap: true,
                      itemBuilder: (context, index) => commentTile(viewModel.discussion!.comments[index]),
                      separatorBuilder: (BuildContext context, int index) => const Divider(thickness: 1.5),
                    ),
                  ),
            markdownInput(viewModel.sendDiscussion, viewModel.controller, loading: viewModel.sendLoading),
          ],
        ),
      ),
    );

Container commentTile(Comment c) => Container(
      margin: const EdgeInsets.symmetric(vertical: 0, horizontal: 8),
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Row(
        children: [
          profilePicture(imagePath: 'https://randomuser.me/api/portraits/men/40.jpg'),
          const SizedBox(width: 10),
          Expanded(
              child: Markdown(
            onTapLink: (text, href, title) {
              print('href');
            },
            data: c.comment,
            shrinkWrap: true,
            physics: const ClampingScrollPhysics(),
          )),
        ],
      ),
    );

class DiscussionViewModel extends ChangeNotifier {
  final String discussionId;
  String text = "";
  bool loading = false, sendLoading = false;
  ScrollController scrollController = ScrollController();
  TextEditingController controller = TextEditingController();
  Discussion? discussion;

  DiscussionViewModel(this.discussionId);

  init() async {
    loading = true;
    notifyListeners();

    discussion = await discussionService.getDiscussion(discussionId: discussionId);
    if (discussion == null) return;

    loading = false;
    notifyListeners();
  }

  void updateText(String t) {
    text = t;
    notifyListeners();
  }

  Future sendDiscussion() async {
    sendLoading = true;
    notifyListeners();

    Comment? createdComment = await discussionService.postComment(body: controller.text, discussionId: discussionId);
    controller.clear();
    if (createdComment == null) return;
    discussion?.comments.add(createdComment);
    sendLoading = false;
    text = "";

    notifyListeners();

    scrollController.animateTo(
      scrollController.position.maxScrollExtent + 50,
      duration: const Duration(milliseconds: 300),
      curve: Curves.fastOutSlowIn,
    );
  }
}
