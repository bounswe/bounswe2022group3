import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/home/appbar.dart';
import 'package:bucademy/view/home/search_bar.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget addContentView(Topic c) => ViewModelBuilder<HomeViewModel>.reactive(
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
          body: Form(
            key: viewModel._formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                  child: TextFormField(
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
                //markdownInput(viewModel, controller),
                GestureDetector(
                  onTap: () async {
                    if (viewModel._formKey.currentState!.validate()) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Processing Data')),
                      );
                    }
                    viewModel.notifyListeners();
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
                // ElevatedButton(
                //   onPressed: () {
                //     if (viewModel._formKey.currentState!.validate()) {
                //       ScaffoldMessenger.of(context).showSnackBar(
                //         const SnackBar(content: Text('Processing Data')),
                //       );
                //     }
                //   },
                //   child: const Text('Submit'),
                // ),
              ],
            ),
          )),
    );

// ViewModel
class HomeViewModel extends ChangeNotifier {
  String? title;
  bool isLoading = false;
  bool isSearchScreen = false;

  final _formKey = GlobalKey<FormState>();

  Future<void> search(String keyword) async {
    bool newState = keyword.isNotEmpty;
    if (newState != isSearchScreen) {
      isSearchScreen = newState;
      notifyListeners();
    }

    isLoading = true;
    notifyListeners();

    // searchResults = await contentService.createNewTopic();
    isLoading = false;
    notifyListeners();
  }

  
}

Widget loadingIndicator() => const Padding(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      child: CircularProgressIndicator(),
    );
