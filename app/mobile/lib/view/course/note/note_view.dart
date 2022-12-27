import 'package:bucademy/classes/note/note.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import 'package:stacked/stacked.dart';

String initialText = "## Realism \n- Photorealism\n- Abstract\n- Surrealism ";

Widget noteView({required Note note}) =>
    ViewModelBuilder<NoteViewModel>.reactive(
      viewModelBuilder: () => NoteViewModel(note),
      builder: (context, viewModel, child) => Scaffold(
        appBar: AppBar(
          title: Text(note.title),
          backgroundColor: CustomColors.main,
          actions: [
            GestureDetector(
              child: const Icon(Icons.share),
              onTap: () {
                Share.share('${Constants.frontendUrl}/note/${note.id}');
              },
            ),
            if (note.creator.id != userService.user?.id)
              Row(
                children: [
                  const SizedBox(width: 10),
                  GestureDetector(
                    child: const Icon(Icons.copy),
                    onTap: () async {
                      Note? createdNote = await noteService.postNote(
                          title: note.title,
                          body: note.body,
                          resourceId: note.resource.id);
                      if (createdNote != null) {
                        // ignore: use_build_context_synchronously
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                            content:
                                Text('This note has been copied to your notes')));
                      }
                    },
                  ),
                ],
              )
          ],
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
                  disableEdit: note.creator.id != userService.user?.id,
                  disableSave: note.creator.id != userService.user?.id,
                ),
              ),
      ),
    );

class NoteViewModel extends ChangeNotifier {
  final Note note;
  bool loading = false;
  TextEditingController controller = TextEditingController();

  NoteViewModel(this.note) {
    controller.text = note.body;
  }

  Future updateBody() async {
    loading = true;
    notifyListeners();

    Note? updated =
        await noteService.updateNote(noteId: note.id, body: controller.text);
    if (updated != null) {
      note.body = updated.body;
    }
    loading = false;
    notifyListeners();
  }
}
