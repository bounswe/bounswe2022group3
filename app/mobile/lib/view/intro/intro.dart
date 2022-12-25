import 'package:bucademy/classes/note/note.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/note/note_view.dart';
import 'package:bucademy/view/dashboard_view.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:stacked/stacked.dart';
import 'package:uni_links/uni_links.dart';
import '../login/login.dart';

Widget introView() => ViewModelBuilder<IntroViewModel>.reactive(
    viewModelBuilder: () => IntroViewModel(),
    builder: (context, viewModel, child) {
      viewModel.init(context);
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          toolbarHeight: 0,
        ),
        backgroundColor: Colors.white,
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(40.0),
            child: Image.asset('assets/images/icon.jpg'),
          ),
        ),
      );
    });

class IntroViewModel extends ChangeNotifier {
  init(BuildContext context, [bool mounted = true]) async {
    if (!await userService.isLoggedIn()) {
      if (!mounted) return;
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const LoginForm()),
          (route) => false);
      return;
    }
    // Get the initial link
    Uri? initialLink = await getInitialUri();
    await userService.refresh();
    if (!mounted) return;
    bool isRedirected = await handleInitialLink(initialLink, context: context);
    if (isRedirected) return;
    Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => const DashboardView()),
        (route) => false);
  }
}

Future<bool> handleInitialLink(Uri? initialLink,
    {BuildContext? context}) async {
  // initialLink = Uri(path: "note/638b4d8935ed7f33a041b4e3"); // this is left for testing purposes since testing deep links is not trivial

  if (initialLink == null) return false;
  if (initialLink.path.contains('confirmation/')) {
    // user clicked the link in the confirmation email
    List<String> parts = initialLink.path.split('confirmation/');
    if (parts.length < 2) return false;
    String token = parts[1];
    bool isSucessful = await userService.confirmMail(code: token);
    if (!isSucessful) return false;
    if (context != null) {
      await Future.any([
        Future.delayed(const Duration(seconds: 5)),
        showDialog(
            context: context,
            builder: ((context) => AlertDialog(
                  backgroundColor: Colors.white,
                  actionsAlignment: MainAxisAlignment.center,
                  actions: [
                    GestureDetector(
                      child: Container(
                          decoration: const BoxDecoration(
                            borderRadius: BorderRadius.all(
                                Radius.circular(Constants.borderRadius)),
                            color: CustomColors.main,
                          ),
                          padding: const EdgeInsets.symmetric(
                            vertical: 6,
                            horizontal: 12,
                          ),
                          child: Text('Okay', style: TextStyles.bodyWhite)),
                      onTap: () => Navigator.of(context).pop(),
                    ),
                  ],
                  title: Center(
                    child: Text(
                      'Your account has been confirmed.',
                      style: TextStyles.bodyBlack,
                      textAlign: TextAlign.center,
                    ),
                  ),
                )))
      ]);
      // ignore: use_build_context_synchronously
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => introView()),
          (route) => false);
      return true;
    }
  } else if (initialLink.path.contains('note/')) {
    List<String> parts = initialLink.path.split('note/');
    if (parts.length < 2) return false;
    String noteId = parts[1];

    Note? note = await noteService.getNote(noteId: noteId);
    if (note == null || context == null) return false;

    // ignore: use_build_context_synchronously
    Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => const DashboardView()),
        (route) => false);
    // ignore: use_build_context_synchronously
    PersistentNavBarNavigator.pushNewScreen(context,
        screen: noteView(note: note), withNavBar: false);
    return true;
  }
  return false;
}
