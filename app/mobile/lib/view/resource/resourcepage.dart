import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/resource/edit_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:stacked/stacked.dart';
import 'package:url_launcher/url_launcher.dart';

Widget resourcePageView(Resource r) =>
    ViewModelBuilder<ResourcePageViewModel>.reactive(
        viewModelBuilder: () => ResourcePageViewModel(),
        builder: (context, viewModel, child) {
          return viewModel.contentsLoading
              ? const Center(child: CircularProgressIndicator())
              : Scaffold(
                  appBar: AppBar(
                    iconTheme: const IconThemeData(color: Colors.white),
                    elevation: 0,
                    backgroundColor: CustomColors.main,
                    shadowColor: CustomColors.main,
                    foregroundColor: CustomColors.main,
                    title: FittedBox(
                      fit: BoxFit.fitWidth,
                      child: Text(
                        r.name,
                        style: TextStyles.pageTitle,
                      ),
                    ),
                  ),
                  body: Stack(children: [
                    SingleChildScrollView(
                      child: Column(
                        children: [
                          Markdown(
                            onTapLink: (text, href, title) async {
                              if (href == null) return;
                              if (!await launchUrl(Uri.parse(href))) {
                                print('Could not launch the url');
                              }
                            },
                            styleSheet: MarkdownStyleSheet(
                                blockquoteDecoration:
                                    const BoxDecoration(color: CustomColors.main)),
                            data: r.body,
                            shrinkWrap: true,
                            physics: const ClampingScrollPhysics(),
                          ),
                        ],
                      ),
                    ),
                    editResourceButton(r, context),
                  ]),
                );
        });

// ViewModel
class ResourcePageViewModel extends ChangeNotifier {
  String? title;
  bool contentsLoading = false;
  int counter = 0;
  ResourcePageViewModel() {
    counter++;
  }

  Future<void> getContents() async {
    contentsLoading = true;
    notifyListeners();

    title = await contentService.contents('Topic');
    contentsLoading = false;
    notifyListeners();
  }
}
