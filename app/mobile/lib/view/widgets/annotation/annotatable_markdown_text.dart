import 'package:bucademy/view/widgets/annotation/annotated_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:markdown/markdown.dart' as md;

class AnnotatableMarkdownBuilder extends MarkdownBuilder {
  BuildContext context;
  final MarkdownBuilderDelegate delegate;
  final bool selectable;
  final MarkdownStyleSheet styleSheet;
  final String? imageDirectory;
  final MarkdownImageBuilder? imageBuilder;
  final MarkdownCheckboxBuilder? checkboxBuilder;
  final MarkdownBulletBuilder? bulletBuilder;
  final Map<String, MarkdownElementBuilder> builders;
  final Map<String, MarkdownPaddingBuilder> paddingBuilders;

  final bool fitContent;
  final MarkdownListItemCrossAxisAlignment listItemCrossAxisAlignment;
  final VoidCallback? onTapText;
  final bool softLineBreak;
/*
  final List<String> _listIndents = <String>[];
  final List<_BlockElement> _blocks = <_BlockElement>[];
  final List<_TableElement> _tables = <_TableElement>[];
  final List<_InlineElement> _inlines = <_InlineElement>[];
  final List<GestureRecognizer> _linkHandlers = <GestureRecognizer>[];
  String? _currentBlockTag;
  String? _lastVisitedTag;
  bool _isInBlockquote = false;
*/
  //@override
  AnnotatableMarkdownBuilder(
      {required this.delegate,
      required this.selectable,
      required this.styleSheet,
      required this.imageDirectory,
      required this.imageBuilder,
      required this.checkboxBuilder,
      required this.bulletBuilder,
      required this.builders,
      required this.paddingBuilders,
      required this.listItemCrossAxisAlignment,
      required this.context,
      this.fitContent = false,
      this.onTapText,
      this.softLineBreak = false})
      : super(
            delegate: delegate,
            selectable: true,
            styleSheet: styleSheet,
            imageDirectory: '',
            imageBuilder: imageBuilder,
            checkboxBuilder: checkboxBuilder,
            bulletBuilder: bulletBuilder,
            builders: builders,
            paddingBuilders: paddingBuilders,
            listItemCrossAxisAlignment: listItemCrossAxisAlignment,
            onTapText: onTapText);

  @override
  Widget _buildRichText(TextSpan? text,
      {TextAlign? textAlign,
      String? key,
      Map<int, TextSpan>? annotation_info}) {
    final Key k = key == null ? UniqueKey() : Key(key);
    return AnnotatableText(
      context: context,
      textBody: text!.toPlainText(includeSemanticsLabels: false),
      textScaleFactor: styleSheet.textScaleFactor,
      textAlign: textAlign ?? TextAlign.start,
      onTapText: onTapText,
      key: k,
    );
  }
}



/*
class AnnotationMarkdownWidgetState extends State<Markdown> {
  @override 
  final builder = AnnotatableMarkdownBuilder(delegate: super, selectable: true, styleSheet: widget.styleSheet, imageDirectory: widget.imageDirectory, imageBuilder: widget.imageBuilder, checkboxBuilder: checkboxBuilder, bulletBuilder: bulletBuilder, builders: builders, paddingBuilders: paddingBuilders, listItemCrossAxisAlignment: listItemCrossAxisAlignment, context: context)


  @override
  Widget build(BuildContext context) {
  }}

class AnnotatableMarkdownText extends MarkdownWidget{
  @override 
  final builder = AnnotatableMarkdownBuilder()
}*/