import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/dashboard_view.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';
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
    if (await userService.isLoggedIn()) {
      await Future.wait([
        userService.refresh(),
        Future.delayed(const Duration(seconds: 1)),
      ]);
      if (!mounted) return;
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const DashboardView()),
          (route) => false);
    } else {
      if (!mounted) return;
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const LoginForm()),
          (route) => false);
    }
  }
}

handleInitialLink(Uri? initialLink, {BuildContext? context}) async {
  if (initialLink == null) return;
  if (initialLink.path.contains('confirmation/')) {
    // user clicked the link in the confirmation email
    List<String> parts = initialLink.path.split('confirmation/');
    if (parts.length < 2) return;
    String token = parts[1];
    bool isSucessful = await userService.confirmMail(code: token);
    if (!isSucessful) return;
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
    }
  }
}
