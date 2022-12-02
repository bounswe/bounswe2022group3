import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

String initialText = "## Realism \n- Photorealism\n- Abstract\n- Surrealism ";

Widget noteView({required String noteId}) =>
    ViewModelBuilder<NoteViewModel>.reactive(
      viewModelBuilder: () => NoteViewModel(noteId),
      onModelReady: (model) => model.init(),
      builder: (context, viewModel, child) => Scaffold(
        appBar: AppBar(
          title: const Text("My Note"),
          backgroundColor: CustomColors.main,
        ),
        body: viewModel.loading
            ? const Center(child: CircularProgressIndicator())
            : SingleChildScrollView(
                child: markdownInput(
                  viewModel.updateBody,
                  viewModel.controller,
                  loading: viewModel.loading,
                  maxLines: 20,
                  sendText: "Save",
                  sendIcon: Icons.save_rounded,
                  prewiewFirst: true,
                ),
              ),
      ),
    );

class NoteViewModel extends ChangeNotifier {
  final String noteId;
  String? body = initialText;
  bool loading = false;
  TextEditingController controller = TextEditingController();

  NoteViewModel(this.noteId);

  Future updateBody() async {
    body = controller.text;
    await Future.delayed(const Duration(milliseconds: 1));
    notifyListeners();
  }

  init() async {
    loading = true;
    controller.text = initialText;
    notifyListeners();

    // discussion = await discussionService.getDiscussion(discussionId: noteId);
    // if (discussion == null) return;

    loading = false;
    notifyListeners();
  }
}
