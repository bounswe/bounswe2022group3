import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget addContentView(TopicDetailed c, ChangeNotifier topicPageView,) =>
    ViewModelBuilder<HomeViewModel>.reactive(
      viewModelBuilder: () => HomeViewModel(),
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
                "Create New Resource",
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
                        labelText: 'Enter Resource Name',
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
                        "Enter Resource Body:",
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
                        Resource? created =
                            await contentService.createNewResource(
                                topicId: c.id,
                                name: viewModel.controller_title.text,
                                body: viewModel.controller.text);
                        if (created!.id.isNotEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Successfully Created!')),
                          );
                          viewModel.addNewResource(c, created, topicPageView);
                          Navigator.pop(context);
                          viewModel.notifyListeners();
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Could Not Create Resource!')),
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
                        "Create",
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
class HomeViewModel extends ChangeNotifier {
  String? title;
  String? body;
  bool isLoading = false;

  final _formKey = GlobalKey<FormState>();

  TextEditingController controller = TextEditingController();
  TextEditingController controller_title = TextEditingController();

  void addNewResource(TopicDetailed t, Resource r,  ChangeNotifier topicPageView) {
    t.resources.insert(0, r);
    topicPageView.notifyListeners();
    notifyListeners();
  }
}

Widget loadingIndicator() => const Padding(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      child: CircularProgressIndicator(),
    );
