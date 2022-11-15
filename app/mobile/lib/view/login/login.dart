import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/home/homepage.dart';
import 'package:bucademy/view/intro/intro.dart';
import 'package:bucademy/view/login/passwordBar.dart';
import 'package:bucademy/view/login/registration.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'emailBar.dart';

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

  Material loginForm() {
    return Material(
      child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                alignment: Alignment.center,
                height: 200,
                child: Image.network('https://raw.githubusercontent.com/bounswe/bounswe2022group3/master/app/client/public/education.png')
              ),
              const Padding(padding: EdgeInsets.only(bottom: 20.0)),
              emailBar(_emailController),
              passwordBar(_passwordController),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 16.0),
                child: ElevatedButton(
                  onPressed: () async {
                    // Validate returns true if the form is valid, or false otherwise.
                    if (_formKey.currentState!.validate()) {
                      bool loggedIn = await userService.login(email: _emailController.text, password: _passwordController.text);
                      if (loggedIn) {
                        //_viewModel.navigateToHomepage(context);
                        //PersistentNavBarNavigator.pushNewScreen(context,
                            //screen: const Scaffold(body: RegistrationForm()), withNavBar: false);
                           Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (context) => introView()), (route) => false);
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
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        color: Colors.white,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            GestureDetector(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 8.0),
                child: Text(
                  style: TextStyle(
                      fontSize: 17,
                      foreground: Paint()
                        ..strokeWidth = 6
                        ..color = CustomColors.main),
                  'Back home',
                  textAlign: TextAlign.left,
                ),
              ),
              onTap: () => _viewModel.navigateToHomepage(context),
            ),
            const SizedBox(height: 30),
            loginForm(),
            GestureDetector(
              child: Container(
                alignment: Alignment.center,
                child: const Text(
                  'Don\'t have an account? Register',
                ),
              ),
              onTap: () => _viewModel.navigateToRegister(context),
            ),
          ],
        ));
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
