import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

Widget profileView() => ViewModelBuilder<ProfileView>.reactive(
      viewModelBuilder: () => ProfileView(),
      builder: (context, viewModel, child) => const Scaffold(body: Center(child: Text('profile page'))),
    );

// ViewModel
class ProfileView extends ChangeNotifier {}
