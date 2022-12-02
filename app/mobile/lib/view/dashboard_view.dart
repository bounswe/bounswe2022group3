import 'dart:async';
import 'package:bucademy/view/intro/intro.dart';
import 'package:bucademy/view/profile/profile.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

import 'package:bucademy/services/locator.dart';
import 'package:uni_links/uni_links.dart';
import 'home/homepage.dart';

class DashboardView extends StatefulWidget {
  const DashboardView({super.key});

  @override
  State<DashboardView> createState() => _DashboardViewState();
}

class _DashboardViewState extends State<DashboardView> {
  StreamSubscription? _sub;

  @override
  void dispose() {
    if (_sub != null) _sub!.cancel();
    super.dispose();
  }

  void init(BuildContext? context) {
    // listen for changes in the link
    _sub = uriLinkStream.listen(
      (event) {
        handleInitialLink(event, context: context);
      },
      onError: (err) {
        print(err);
      },
      onDone: () {
        print('done done');
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    init(context);
    return PersistentTabView(
      context,
      controller: navigatorService.controller,
      screens: [
        homepageView(),
        profileView("63603cc10a14cd5cda504f15")
      ], //userService.user?.id ?? ''
      items: [
        PersistentBottomNavBarItem(
          icon: const Icon(Icons.home),
          title: "Homepage",
          activeColorPrimary: Colors.red,
          inactiveColorPrimary: Colors.grey,
        ),
        PersistentBottomNavBarItem(
          icon: const Icon(Icons.account_circle_outlined),
          title: "Profile",
          activeColorPrimary: Colors.blue,
          inactiveColorPrimary: Colors.grey,
        ),
      ],
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: true,
      decoration: NavBarDecoration(
        borderRadius: BorderRadius.circular(10.0),
        colorBehindNavBar: Colors.white,
      ),
      itemAnimationProperties: const ItemAnimationProperties(
        duration: Duration(milliseconds: 200),
        curve: Curves.ease,
      ),
      screenTransitionAnimation: const ScreenTransitionAnimation(
        animateTabTransition: true,
        curve: Curves.ease,
        duration: Duration(milliseconds: 200),
      ),
      navBarStyle: NavBarStyle.style9,
    );
  }
}
