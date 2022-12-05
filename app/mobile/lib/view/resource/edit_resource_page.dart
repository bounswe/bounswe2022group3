import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget editResourceView(Resource r) =>
    ViewModelBuilder<EditResourceViewModel>.reactive(
      viewModelBuilder: () => EditResourceViewModel(r),
      builder: (context, viewModel, child) => Scaffold(
          appBar: AppBar(
            iconTheme: const IconThemeData(color: Colors.white),
            elevation: 0,
            backgroundColor: CustomColors.main,
            shadowColor: CustomColors.main,
            foregroundColor: CustomColors.main,
            title: FittedBox(
              fit: BoxFit.fitWidth,
              child: Text(
                "Edit Resource",
                style: TextStyles.pageTitle,
              ),
            ),
          ),
          body: SingleChildScrollView(
            child: Form(
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
                        labelText: 'Resource Name',
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
                        "Resource Body:",
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
                      Resource? created = await contentService.editResource(
                          viewModel.controller_title.text,
                          viewModel.controller.text,
                          resourceId: r.id);
                      if (created != null) {
                        if (created!.id.isNotEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Successfully Editted!')),
                          );
                          Navigator.pop(context);
                          viewModel.notifyListeners();
                        }
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                              content: Text('Could Not Edit Resource!')),
                        );
                        viewModel.notifyListeners();
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
                        "Save",
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
class EditResourceViewModel extends ChangeNotifier {
  TextEditingController controller = TextEditingController();
  TextEditingController controller_title = TextEditingController();

  bool isLoading = false;

  EditResourceViewModel(Resource r) {
    init(r);
  }

  void init(Resource r) {
    controller.text = r.body;
    controller_title.text = r.name;
  }
}

Widget loadingIndicator() => const Padding(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      child: CircularProgressIndicator(),
    );
