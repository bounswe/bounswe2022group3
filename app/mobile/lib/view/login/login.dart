import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/home/homepage.dart';
import 'package:bucademy/view/intro/intro.dart';
import 'package:bucademy/view/login/passwordBar.dart';
import 'package:bucademy/view/login/registration.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:stacked/stacked.dart';
import 'emailBar.dart';

Widget loginView() => ViewModelBuilder<LoginViewModel>.reactive(
    viewModelBuilder: () => LoginViewModel(),
    builder: (context, viewModel, child) => LoginFormState().build(context));

// Made use of https://docs.flutter.dev/cookbook/forms/validation.
class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  LoginFormState createState() {
    return LoginFormState();
  }
}

// Create a corresponding State class.
// This class holds data related to the form.
class LoginFormState extends State<LoginForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();
  final _viewModel = LoginViewModel();

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: SingleChildScrollView(
            // thanks to https://stackoverflow.com/questions/51774252/bottom-overloaded-by-213-pixels-in-flutter
            child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 30),
            Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                        alignment: Alignment.center,
                        height: 200,
                        child: Image.network(
                            'https://raw.githubusercontent.com/bounswe/bounswe2022group3/master/app/client/public/education.png')),
                    const Padding(padding: EdgeInsets.only(bottom: 20.0)),
                    emailBar(_emailController),
                    passwordBar(_passwordController),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 16.0),
                      child: ElevatedButton(
                        onPressed: () async {
                          // Validate returns true if the form is valid, or false otherwise.
                          if (_formKey.currentState!.validate()) {
                            bool loggedIn = await userService.login(
                                email: _emailController.text,
                                password: _passwordController.text);
                            if (loggedIn) {
                              Navigator.of(context).pop();
                              Navigator.of(context).pushAndRemoveUntil(
                                  MaterialPageRoute(
                                      builder: (context) => introView()),
                                  (route) => false);
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Login failed.')),
                              );
                            }
                          }
                        },
                        child: const Text('Submit'),
                      ),
                    ),
                  ],
                )),
            GestureDetector(
              child: Container(
                alignment: Alignment.center,
                child: const Text(
                  'Don\'t have an account? Sign up',
                ),
              ),
              onTap: () => _viewModel.navigateToRegister(context),
            ),
          ],
        )));
  }
}

// ViewModel
class LoginViewModel extends ChangeNotifier {
  String? title;
  bool isLoading = false;

  void navigateToRegister(BuildContext context) {
    PersistentNavBarNavigator.pushNewScreen(context,
        screen: const Scaffold(body: RegistrationForm()), withNavBar: false);
  }

  void navigateToHomepage(BuildContext context) {
    PersistentNavBarNavigator.pushNewScreen(context, screen: homepageView());
  }
}
