import 'package:bucademy/resources/custom_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:markdown_editable_textinput/format_markdown.dart';
import 'package:markdown_editable_textinput/markdown_text_input.dart';
import 'package:stacked/stacked.dart';

Widget markdownInput(Function onChange, String text) =>
    ViewModelBuilder<MarkdownInputViewModel>.reactive(
      viewModelBuilder: () => MarkdownInputViewModel(),
      builder: (context, viewModel, child) => Theme(
        data: Theme.of(context).copyWith(
            cardColor: Colors.white,
            colorScheme: Theme.of(context)
                .colorScheme
                .copyWith(secondary: Colors.white)),
        child: Container(
          decoration: BoxDecoration(
              color: Colors.white, borderRadius: BorderRadius.circular(10)),
          child: Column(
            children: [
              Container(
                decoration: BoxDecoration(
                    color: CustomColors.main.withOpacity(0.5),
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(10),
                      topRight: Radius.circular(10),
                    )),
                child: Row(
                  children: [
                    const SizedBox(width: 20),
                    ChangeViewButton(
                      text: 'Edit',
                      onTap: () => viewModel.updateScreen(isPreview: false),
                      isActive: viewModel.preview == false,
                    ),
                    const SizedBox(width: 10),
                    ChangeViewButton(
                      text: 'Preview',
                      onTap: () => viewModel.updateScreen(isPreview: true),
                      isActive: viewModel.preview == true,
                    ),
                  ],
                ),
              ),
              viewModel.preview
                  ? Container(
                      height: 160,
                      color: Theme.of(context).cardColor,
                      child: Markdown(data: text, shrinkWrap: true),
                    )
                  : MarkdownTextInput(
                      onChange,
                      text,
                      label: 'Write here',
                      maxLines: 5,
                      // actions: MarkdownType.values // can be customized
                    ),
            ],
          ),
        ),
      ),
    );

class ChangeViewButton extends StatelessWidget {
  final String text;
  final void Function() onTap;
  final bool isActive;
  const ChangeViewButton({
    Key? key,
    required this.text,
    required this.onTap,
    required this.isActive,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 6),
        color: isActive
            ? CustomColors.main.withOpacity(0.6)
            : CustomColors.main.withOpacity(0.1),
        child: Text(
          text,
          style: const TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}

class MarkdownInputViewModel extends ChangeNotifier {
  bool preview = false;

  updateScreen({bool isPreview = false}) {
    preview = isPreview;
    notifyListeners();
  }
}
