import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

/*
  This code is taken from https://github.com/justinmc/flutter-text-selection-menu-examples and changed according to our needs.
*/
typedef AnnotationCallback = Function(TextSelectionDelegate delegate);

class _TextSelectionToolbarItemData {
  const _TextSelectionToolbarItemData({
    required this.label,
    required this.onPressed,
  });

  final String label;
  final VoidCallback? onPressed;
}

class SelectionControls extends MaterialTextSelectionControls {
  static const double _kToolbarContentDistanceBelow = 10.0;
  static const double _kToolbarContentDistance = 8.0;
  /* int start;
  int end;
  String selected;*/
  final AnnotationCallback onAnnotationPressed;
  SelectionControls({required this.onAnnotationPressed});
  @override
  Widget buildToolbar(
    BuildContext context,
    Rect globalEditableRegion,
    double textLineHeight,
    Offset selectionMidpoint,
    List<TextSelectionPoint> endpoints,
    TextSelectionDelegate delegate,
    ClipboardStatusNotifier? clipboardStatus,
    Offset? lastSecondaryTapDownPosition,
  ) {
    final TextSelectionPoint startTextSelectionPoint = endpoints[0];
    final TextSelectionPoint endTextSelectionPoint =
        endpoints.length > 1 ? endpoints[1] : endpoints[0];
    final Offset anchorAbove = Offset(
        globalEditableRegion.left + selectionMidpoint.dx,
        globalEditableRegion.top +
            startTextSelectionPoint.point.dy -
            textLineHeight -
            _kToolbarContentDistance);
    final Offset anchorBelow = Offset(
      globalEditableRegion.left + selectionMidpoint.dx,
      globalEditableRegion.top +
          endTextSelectionPoint.point.dy +
          _kToolbarContentDistanceBelow,
    );

    return MyTextSelectionToolbar(
      anchorAbove: anchorAbove,
      anchorBelow: anchorBelow,
      clipboardStatus: clipboardStatus,
      handleCopy: canCopy(delegate) && handleCopy != null
          ? () => handleCopy(delegate, clipboardStatus)
          : null,
      handleAnnotation: //onAnnotationPressed,
          () {
        onAnnotationPressed(delegate);
        /*
        // start = delegate.textEditingValue.selection.start;
        //end = delegate.textEditingValue.selection.end;
        //selected = delegate.textEditingValue.text.substring(start, end);
        delegate.userUpdateTextEditingValue(
            delegate.textEditingValue.copyWith(
                selection: TextSelection.collapsed(
                    offset: delegate.textEditingValue.selection.baseOffset)),
            SelectionChangedCause.toolbar);
*/
        delegate.hideToolbar();
      },
      handleCut: canCut(delegate) && handleCut != null
          ? () => handleCut(delegate)
          : null,
      handlePaste: canPaste(delegate) && handlePaste != null
          ? () => handlePaste(delegate)
          : null,
      handleSelectAll: canSelectAll(delegate) && handleSelectAll != null
          ? () => handleSelectAll(delegate)
          : null,
    );
  }
}

class MyTextSelectionToolbar extends StatefulWidget {
  const MyTextSelectionToolbar(
      {Key? key,
      required this.anchorAbove,
      required this.anchorBelow,
      this.clipboardStatus,
      this.handleCopy,
      this.handleCustomButton,
      this.handleCut,
      this.handlePaste,
      this.handleSelectAll,
      required this.handleAnnotation})
      : super(key: key);

  final Offset anchorAbove;
  final Offset anchorBelow;
  final ClipboardStatusNotifier? clipboardStatus;
  final void Function()? handleCopy;
  final VoidCallback? handleCustomButton;
  final VoidCallback? handleCut;
  final VoidCallback? handlePaste;
  final VoidCallback? handleSelectAll;
  final VoidCallback handleAnnotation;

  @override
  MyTextSelectionToolbarState createState() => MyTextSelectionToolbarState();
}

class MyTextSelectionToolbarState extends State<MyTextSelectionToolbar> {
  void _onChangedClipboardStatus() {
    setState(() {
      // Inform the widget that the value of clipboardStatus has changed.
    });
  }

  @override
  void initState() {
    super.initState();
    widget.clipboardStatus?.addListener(_onChangedClipboardStatus);
    widget.clipboardStatus?.update();
  }

  @override
  void didUpdateWidget(MyTextSelectionToolbar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.clipboardStatus != oldWidget.clipboardStatus) {
      widget.clipboardStatus?.addListener(_onChangedClipboardStatus);
      oldWidget.clipboardStatus?.removeListener(_onChangedClipboardStatus);
    }
    widget.clipboardStatus?.update();
  }

  @override
  void dispose() {
    super.dispose();
    widget.clipboardStatus?.removeListener(_onChangedClipboardStatus);
  }

  @override
  Widget build(BuildContext context) {
    assert(debugCheckHasMaterialLocalizations(context));
    final MaterialLocalizations localizations =
        MaterialLocalizations.of(context);

    final List<_TextSelectionToolbarItemData> itemDatas =
        <_TextSelectionToolbarItemData>[
      if (widget.handleCut != null)
        _TextSelectionToolbarItemData(
          label: localizations.cutButtonLabel,
          onPressed: widget.handleCut,
        ),
      if (widget.handleCopy != null)
        _TextSelectionToolbarItemData(
          label: localizations.copyButtonLabel,
          onPressed: widget.handleCopy,
        ),
      if (widget.handlePaste != null &&
          widget.clipboardStatus?.value == ClipboardStatus.pasteable)
        _TextSelectionToolbarItemData(
          label: localizations.pasteButtonLabel,
          onPressed: widget.handlePaste,
        ),
      if (widget.handleSelectAll != null)
        _TextSelectionToolbarItemData(
          label: localizations.selectAllButtonLabel,
          onPressed: widget.handleSelectAll,
        ),
      _TextSelectionToolbarItemData(
        onPressed: widget.handleAnnotation,
        label: 'Annotate',
      ),
    ];

    int childIndex = 0;
    return TextSelectionToolbar(
      anchorAbove: widget.anchorAbove,
      anchorBelow: widget.anchorBelow,
      toolbarBuilder: (BuildContext context, Widget child) {
        return Container(
          decoration: const BoxDecoration(
              color: Color.fromARGB(255, 242, 244, 250),
              borderRadius: BorderRadius.all(Radius.circular(6))),
          child: child,
        );
      },
      children: itemDatas.map((_TextSelectionToolbarItemData itemData) {
        return TextSelectionToolbarTextButton(
          padding: TextSelectionToolbarTextButton.getPadding(
              childIndex++, itemDatas.length),
          onPressed: itemData.onPressed,
          child: Text(itemData.label),
        );
      }).toList(),
    );
  }
}
