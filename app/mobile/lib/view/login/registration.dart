import 'package:bucademy/view/home/homepage.dart';
import 'package:bucademy/view/login/surnameBar.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import '../../services/locator.dart';
import 'package:bucademy/view/login/passwordBar.dart';
import 'emailBar.dart';
import 'login.dart';
import 'nameBar.dart';

// Made use of https://docs.flutter.dev/cookbook/forms/validation.
class RegistrationForm extends StatefulWidget {
  const RegistrationForm({super.key});

  @override
  RegistrationFormState createState() {
    return RegistrationFormState();
  }
}

// Create a corresponding State class.
// This class holds data related to the form.
class RegistrationFormState extends State<RegistrationForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();
  final _viewModel = RegistrationViewModel();

  final _nameController = TextEditingController();
  final _surnameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _checked = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SingleChildScrollView( // thanks to https://stackoverflow.com/questions/51774252/bottom-overloaded-by-213-pixels-in-flutter
        child: Container(
            color: Colors.white,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Padding(padding: EdgeInsets.only(bottom: 80.0)),
                Container(
                    alignment: Alignment.center,
                    height: 200,
                    child: Image.network('https://raw.githubusercontent.com/bounswe/bounswe2022group3/master/app/client/public/education.png')
                ),
                const Padding(padding: EdgeInsets.only(bottom: 20.0)),
                Form(
                  key: _formKey,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      nameBar(_nameController),
                      surnameBar(_surnameController),
                      emailBar(_emailController),
                      passwordBar(_passwordController),
                      Row(
                          children: [
                            Checkbox(
                              value: _checked,
                              onChanged: (bool? value) {
                                setState(() {
                                  _checked = value!;
                                });
                              },
                            ),
                            const Text('I agree to the Terms of Use and Privacy Policy.'),]
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 16.0),
                        child: ElevatedButton(
                          onPressed: () async {
                            // Validate returns true if the form is valid, or false otherwise.
                            if (_formKey.currentState!.validate()) {
                              bool registered = await userService.register(
                                name:
                                _nameController.text,
                                surname: _surnameController.text,
                                email: _emailController.text,
                                password: _passwordController.text,
                                agreement: _checked,
                                context: context);
                              if (registered) {
                                _viewModel.navigateToLogin(context);
                              } /*else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text( 'Registration failed.')),
                                );
                              }*/
                            }
                          },
                          child: const Text('Register'),
                        ),
                      ),
                    ],
                  )
                ),
                GestureDetector(
                  child: Container(
                    alignment: Alignment.center,
                    child: const Text(
                      'Already have an account? Log in',
                    ),
                  ),
                  onTap: () => _viewModel.navigateToLogin(context),
                ),
              ],
            )
        ),
      )
    );
  }
}

// ViewModel
class RegistrationViewModel extends ChangeNotifier {
  String? title;
  bool isLoading = false;

  void navigateToLogin(BuildContext context) {
    Navigator.of(context)
        .pushAndRemoveUntil(
        MaterialPageRoute(
            builder: (context) => LoginFormState().build(context)),
            (route) => false
    );
  }

  void navigateToHomepage(BuildContext context) {
    PersistentNavBarNavigator.pushNewScreen(context, screen: homepageView());
  }
}