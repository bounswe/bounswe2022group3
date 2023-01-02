import 'package:bucademy/view/widgets/annotation/annotated_text.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget annotationView() => ViewModelBuilder<AnnotationTrialView>.reactive(
    viewModelBuilder: () => AnnotationTrialView(),
    onModelReady: (model) => model.getContent(),
    builder: (context, viewModel, child) => Scaffold(
        appBar: AppBar(title: const Text('Annotation Example')),
        body: !viewModel.gotText
            ? const Center(child: CircularProgressIndicator())
            : Padding(
                padding: const EdgeInsets.all(20),
                child: AnnotatableText(
                    context: context,
                    textBody: viewModel.text,
                    viewModel: viewModel),
              ))); //);

class AnnotationTrialView extends ChangeNotifier {
  late int startInd;
  late int endInd;
  bool isLoading = false;
  bool gotText = false;
  String text = '';
  List<String> allAnnotations = [];

  Future<void> getContent() async {
    isLoading = true;
    notifyListeners();
    await Future.delayed(const Duration(seconds: 2));
    text =
        'Lorem Ipsum is simply dummy text of the printing and typesetting \nindustry. Lorem Ipsum has been the industry\'s standard dummy\ntext ever since the 1500s, when an unknown printer took a galley\nof type and scrambled it to make a type specimen book. It has\nsurvived not only five centuries, but also the leap into electronic\ntypesetting, remaining essentially unchanged. It was popularised in\nthe 1960s with the release of Letraset sheets containing Lorem\nIpsum passages, and more recently with desktop publishing\nsoftware like Aldus PageMaker including versions of Lorem Ipsum.';
    isLoading = false;
    gotText = true;
    notifyListeners();
  }
}
