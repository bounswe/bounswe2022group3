import 'package:bucademy/classes/discussion/comment.dart';
import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/discussion/comment_tile.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget discussionView({required String discussionId}) =>
    ViewModelBuilder<DiscussionViewModel>.reactive(
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
                      padding: const EdgeInsets.only(bottom: 10),
                      itemBuilder: (context, index) => commentTile(
                          viewModel.discussion!.comments[index], context),
                      separatorBuilder: (BuildContext context, int index) =>
                          const Divider(thickness: 1.5),
                    ),
                  ),
            markdownInput(viewModel.sendDiscussion, viewModel.controller,
                loading: viewModel.sendLoading),
          ],
        ),
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

    discussion =
        await discussionService.getDiscussion(discussionId: discussionId);
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

    Comment? createdComment = await discussionService.postComment(
        body: controller.text, discussionId: discussionId);
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
