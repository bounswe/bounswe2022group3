import 'package:bucademy/resources/custom_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:markdown_editable_textinput/markdown_text_input.dart';
import 'package:stacked/stacked.dart';

Widget markdownInput(Future Function()? onSend, TextEditingController controller, {bool loading = false}) =>
    ViewModelBuilder<MarkdownInputViewModel>.reactive(
      viewModelBuilder: () => MarkdownInputViewModel(),
      builder: (context, viewModel, child) => Theme(
        data: Theme.of(context).copyWith(
            cardColor: Colors.white, colorScheme: Theme.of(context).colorScheme.copyWith(secondary: Colors.white)),
        child: Container(
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)),
          child: Column(
            children: [
              Container(
                decoration: const BoxDecoration(
                  color: CustomColors.main,
                ),
                child: Row(
                  children: [
                    ChangeViewButton(
                      icon: Icons.edit,
                      text: 'Edit',
                      onTap: () => viewModel.updateScreen(isPreview: false),
                      isActive: viewModel.preview == false,
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
                        viewModel.updateScreen();
                      }),
                      child: Row(
                        children: const [
                          Icon(Icons.send_outlined, color: Colors.white),
                          SizedBox(width: 5),
                          Text('Send', style: TextStyle(color: Colors.white)),
                        ],
                      ),
                    ),
                    const SizedBox(width: 15),
                  ],
                ),
              ),
              loading
                  ? const SizedBox(height: 160, child: Center(child: CircularProgressIndicator()))
                  : viewModel.preview
                      ? Container(
                          height: 160,
                          color: Theme.of(context).cardColor,
                          child: Markdown(data: controller.text, shrinkWrap: true),
                        )
                      : MarkdownTextInput(
                          (String x) {},
                          controller.text,
                          label: 'Write here',
                          maxLines: 5,
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
  const ChangeViewButton({
    Key? key,
    required this.text,
    required this.onTap,
    required this.isActive,
    required this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
        color: isActive ? const Color.fromARGB(255, 61, 48, 154) : CustomColors.main.withOpacity(0.0),
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
