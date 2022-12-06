import 'package:bucademy/resources/custom_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:markdown_editable_textinput/markdown_text_input.dart';
import 'package:stacked/stacked.dart';

Widget markdownInput(
  Future Function()? onSend,
  TextEditingController controller, {
  bool loading = false,
  int maxLines = 5,
  IconData sendIcon = Icons.send_outlined,
  String sendText = 'Send',
  bool prewiewFirst = false,
  bool withBorderRadius = false,
}) =>
    ViewModelBuilder<MarkdownInputViewModel>.reactive(
      viewModelBuilder: () => MarkdownInputViewModel(),
      onModelReady: (model) => model.updateScreen(isPreview: prewiewFirst),
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
                    color: CustomColors.main,
                    borderRadius: withBorderRadius
                        ? const BorderRadiusDirectional.only(topEnd: Radius.circular(10), topStart: Radius.circular(10))
                        : BorderRadiusDirectional.circular(0)),
                child: Row(
                  children: [
                    ChangeViewButton(
                      icon: Icons.edit,
                      text: 'Edit',
                      onTap: () => viewModel.updateScreen(isPreview: false),
                      isActive: viewModel.preview == false,
                      withBorderRadius: withBorderRadius,
                    ),
                    const SizedBox(width: 10),
                    ChangeViewButton(
                      icon: Icons.preview,
                      text: 'Preview',
                      onTap: () => viewModel.updateScreen(isPreview: true),
                      isActive: viewModel.preview == true,
                    ),
                    const Spacer(),
                    InkWell(
                      onTap: (() async {
                        if (onSend != null) {
                          await onSend();
                        }
                        viewModel.updateScreen(isPreview: viewModel.preview);
                      }),
                      child: Row(
                        children: [
                          if (onSend != null)
                            Icon(sendIcon, color: Colors.white),
                          const SizedBox(width: 5),
                          Text(sendText,
                              style: const TextStyle(color: Colors.white)),
                        ],
                      ),
                    ),
                    const SizedBox(width: 15),
                  ],
                ),
              ),
              loading
                  ? SizedBox(
                      height: maxLines * 32,
                      child: const Center(child: CircularProgressIndicator()))
                  : viewModel.preview
                      ? Container(
                          height: maxLines * 20.9,
                          decoration: BoxDecoration(
                            color: Theme.of(context).cardColor,
                            borderRadius: withBorderRadius
                                ? BorderRadiusDirectional.circular(10)
                                : BorderRadiusDirectional.circular(0),
                          ),
                          child:
                              Markdown(data: controller.text, shrinkWrap: true),
                        )
                      : MarkdownTextInput(
                          (String x) {},
                          controller.text,
                          label: 'Write here',
                          maxLines: maxLines,
                          controller: controller,
                          // actions: MarkdownType.values // can be customized
                        ),
            ],
          ),
        ),
      ),
    );

class ChangeViewButton extends StatelessWidget {
  final String text;
  final IconData icon;
  final void Function() onTap;
  final bool isActive;
  final bool withBorderRadius;
  const ChangeViewButton({
    Key? key,
    required this.text,
    required this.onTap,
    required this.isActive,
    required this.icon,
    this.withBorderRadius = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: withBorderRadius
              ? BorderRadiusDirectional.only(topStart: Radius.circular(10))
              : BorderRadiusDirectional.circular(0),
          color: isActive
              ? const Color.fromARGB(255, 61, 48, 154)
              : CustomColors.main.withOpacity(0.0),
        ),
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
        color: isActive
            ? const Color.fromARGB(255, 61, 48, 154)
            : CustomColors.main.withOpacity(0.0),
        child: Row(
          children: [
            Icon(icon, color: Colors.white, size: 18),
            const SizedBox(width: 5),
            Text(
              text,
              style: const TextStyle(color: Colors.white),
            ),
          ],
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
