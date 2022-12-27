import 'package:bucademy/classes/note/note.dart';
import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget postNoteView(String resourceId) =>
    ViewModelBuilder<PostNoteViewModel>.reactive(
      viewModelBuilder: () => PostNoteViewModel(),
      builder: (context, viewModel, child) => Scaffold(
          appBar: AppBar(
            iconTheme: const IconThemeData(color: Colors.white),
            elevation: 0,
            backgroundColor: CustomColors.main,
            shadowColor: CustomColors.main,
            foregroundColor: CustomColors.main,
            title: const FittedBox(
              fit: BoxFit.fitWidth,
              child: Text(
                "Create New Note",
                style: TextStyles.pageTitle,
              ),
            ),
          ),
          body: SingleChildScrollView(
            child: Form(
              key: viewModel._formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Padding(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                    child: TextFormField(
                      controller: viewModel.controller_title,
                      decoration: const InputDecoration(
                        enabledBorder: const OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: CustomColors.main)),
                        border: OutlineInputBorder(),
                        labelText: 'Enter Note Title',
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please Enter Some Text';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Container(
                          child: Text(
                        "Enter Note Body:",
                        style: TextStyle(
                          fontSize: 16,
                        ),
                      )),
                    ),
                  ),
                  viewModel.isLoading
                      ? loadingIndicator()
                      : Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8),
                          child: Container(
                            decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 242, 241, 248),
                              borderRadius:
                                  BorderRadiusDirectional.circular(10),
                              border: Border.all(color: CustomColors.main),
                            ),
                            child: markdownInput(null, viewModel.controller,
                                loading: viewModel.isLoading,
                                maxLines: 20,
                                sendText: '',
                                sendIcon: Icons.abc,
                                withBorderRadius: true),
                          ),
                        ),
                  GestureDetector(
                    onTap: () async {
                      if (viewModel._formKey.currentState!.validate()) {
                        Note? created = await noteService.postNote(
                            title: viewModel.controller_title.text,
                            body: viewModel.controller.text,
                            resourceId: resourceId);
                        if (created!.id.isNotEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Successfully Posted!')),
                          );
                          Navigator.pop(context);
                          viewModel.notifyListeners();
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Could Not Post Note!')),
                          );
                          viewModel.notifyListeners();
                        }
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      margin: const EdgeInsets.symmetric(vertical: 8),
                      width: 120,
                      decoration: BoxDecoration(
                        borderRadius:
                            BorderRadius.circular(Constants.borderRadius),
                        color: CustomColors.main,
                      ),
                      child: Center(
                          child: Text(
                        "Post",
                        style: TextStyles.bodyWhite,
                      )),
                    ),
                  ),
                ],
              ),
            ),
          )),
    );

// ViewModel
class PostNoteViewModel extends ChangeNotifier {
  String? title;
  String? body;
  bool isLoading = false;

  final _formKey = GlobalKey<FormState>();

  TextEditingController controller = TextEditingController();
  TextEditingController controller_title = TextEditingController();
}

Widget loadingIndicator() => const Padding(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      child: CircularProgressIndicator(),
    );
