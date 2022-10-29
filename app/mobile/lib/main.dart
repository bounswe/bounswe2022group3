import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/intro/intro.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

Future<void> main() async {
  configureDependencies();
  navigatorService.controller = PersistentTabController(initialIndex: 0);
  WidgetsFlutterBinding.ensureInitialized();
  await userService.login(email: "your_email", password: "your_password");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'BUcademy',
        theme: ThemeData(
          fontFamily: 'Lato',
        ),
        home: Scaffold(
          body: SafeArea(child: introView()),
          appBar: AppBar(toolbarHeight: 0, elevation: 0, backgroundColor: CustomColors.main),
        ),
      );
}
