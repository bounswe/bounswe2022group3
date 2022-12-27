import 'package:bucademy/classes/annotation/annotation.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/annotation/annotation_dialog.dart';
import 'package:bucademy/view/widgets/annotation/custom_selection.dart';
//import 'package:bucademy/view/widgets/annotation/custom_selection.dart';
import 'package:flutter/material.dart';

class AnnotatableText extends StatefulWidget {
  final BuildContext context;
  final String textBody;
  final Color? color; //= Colors.amber[100];
  final TextSelectionDelegate? delegate;
  final Function? onExistingAnnotationPressed;
  final double? textScaleFactor;
  final TextAlign? textAlign;
  final Function? onTapText;

  AnnotatableText(
      {Key? key,
      required this.context,
      required this.textBody,
      this.color,
      this.onExistingAnnotationPressed,
      this.delegate,
      this.textScaleFactor,
      this.onTapText,
      this.textAlign})
      : super(key: key);

  @override
  AnnotatableTextState createState() => AnnotatableTextState();
}

class AnnotatableTextState extends State<AnnotatableText> {
  List<Annotation> annotations = [];
  List<TextSpan> children = [];
  List<List<int>> indexes = [];

  @override
  void initState() {
    indexes = List.generate(widget.textBody.length, (index) => []);
    placeAnnotations();
    super.initState();
  }

  void placeAnnotations() {
    Annotation xx = Annotation(
        id: '007',
        resource: '638e2c787d27641963500dbb',
        body: [
          Body(
              purpose: 'commenting',
              type: 'TextualBody',
              value: 'hehehehehe',
              creator:
                  Creator(id: '63600785a9e01d1e420ed804', name: 'Şule Erkul'),
              created: DateTime.now().toString(),
              modified: DateTime.now().toString())
        ],
        target: Target(selector: [
          Selector(type: 'TextQuoteSelector', exact: 'rrraa'),
          Selector(type: 'TextPositionSelector', start: 3, end: 8)
        ]),
        context: 'http://www.w3.org/ns/anno.jsonld',
        type: 'Annotation');

    annotations.add(xx);
  }

  void onAnnotationPressed(TextSelectionDelegate delegate) async {
    int start = delegate.textEditingValue.selection.start;
    int end = delegate.textEditingValue.selection.end;
    String t = delegate.textEditingValue.text;
    String selected = t.substring(start, end);
    List<dynamic> res = await AnnotationDialog(context: context).createDialog();
    if (res[0] == DialogType.abort) {
      return;
    }
    String comment = res[1];
    annotate(start, end, selected, comment);
  }

  Future<void> annotate(
      int start, int end, String selected, String comment) async {
    String createdTime = DateTime.now().toString();
    Annotation a = Annotation(
        id: '007',
        resource: '638e2c787d27641963500dbb',
        body: [
          Body(
              purpose: 'commenting',
              type: 'TextualBody',
              value: comment,
              creator:
                  Creator(id: '63600785a9e01d1e420ed804', name: 'Şule Erkul'),
              created: createdTime,
              modified: createdTime)
        ],
        target: Target(selector: [
          Selector(type: 'TextQuoteSelector', exact: selected),
          Selector(type: 'TextPositionSelector', start: start, end: end)
        ]),
        context: 'http://www.w3.org/ns/anno.jsonld',
        type: 'Annotation');

    /* bool created = await annotationService.create(a);
    if (created) {
      setState(() {
        children = [];
        annotations.add(a);
      });
    }*/
  }

  @override
  Widget build(BuildContext context) {
    int index = 0;

    for (Annotation a in annotations) {
      int? start = a.target?.selector![1].start;
      int? end = a.target?.selector![1].end;
      if (start == null || end == null) {
        continue;
      }
      if (index < start) {
        TextSpan tmp = TextSpan(text: widget.textBody.substring(index, start));
        children.add(tmp);
        indexes[end].add(start);
      } else if (index > start) {
        int oldStart = indexes[index][0];
        TextSpan oldTotal = TextSpan(
            text: widget.textBody.substring(oldStart, index),
            style: TextStyle(backgroundColor: Colors.greenAccent.shade100));
        TextSpan tmp = TextSpan(
            text: widget.textBody.substring(start, index),
            style: const TextStyle(backgroundColor: Colors.greenAccent));

        TextSpan first = TextSpan(
            text: widget.textBody.substring(oldStart, start),
            style: TextStyle(backgroundColor: Colors.greenAccent.shade100));
        children.remove(oldTotal);
        children.add(first);
        children.add(tmp);
      }
      children.add(TextSpan(
          text: widget.textBody.substring(start, end),
          style: TextStyle(backgroundColor: Colors.greenAccent.shade100)));
      index = end;
    }
    children.add(TextSpan(text: widget.textBody.substring(index)));
    return SelectableText.rich(
      TextSpan(
        children: children,
      ),
      showCursor: true,
      selectionControls:
          SelectionControls(onAnnotationPressed: onAnnotationPressed),
    );
  }
}

class AnnotatedPart extends TextSpan {
  final TextSpan span;
  final TextStyle style;
  final Function? onClick;
  final int? length;
  final String? comment;

  const AnnotatedPart(this.style, this.onClick,
      {required this.span, this.length, this.comment});
}
