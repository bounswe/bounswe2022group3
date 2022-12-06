import 'dart:io';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/intro/intro.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}

void main() {
  HttpOverrides.global = MyHttpOverrides();
  configureDependencies();
  navigatorService.controller = PersistentTabController(initialIndex: 0);
  WidgetsFlutterBinding.ensureInitialized();
  //persistenceService.clear();
  // userService.login(email: 'dotedi9105@probdd.com', password: "Password123*");
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]).then(
    (_) => runApp(const MyApp()),
  );
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
          appBar: AppBar(
              toolbarHeight: 0,
              elevation: 0,
              backgroundColor: CustomColors.main),
        ),
      );
}
