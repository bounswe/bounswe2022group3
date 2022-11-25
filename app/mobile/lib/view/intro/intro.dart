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
      Navigator.of(context)
          .pushAndRemoveUntil(MaterialPageRoute(builder: (context) => const DashboardView()), (route) => false);
    } else {
      if (!mounted) return;
      Navigator.of(context)
          .pushAndRemoveUntil(MaterialPageRoute(builder: (context) => const LoginForm()), (route) => false);
    }
  }
}
