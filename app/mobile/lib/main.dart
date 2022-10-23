import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/dashboard_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

void main() {
  configureDependencies();
  navigatorService.controller = PersistentTabController(initialIndex: 0);
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
            body: const SafeArea(child: DashboardView()),
            appBar: AppBar(toolbarHeight: 0, elevation: 0, backgroundColor: CustomColors.main)),
      );
}
