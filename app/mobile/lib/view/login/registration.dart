import 'package:bucademy/resources/custom_colors.dart';
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

  Form registrationForm() {
    return Form(
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
                  _checked = value!;
                },
              ),
              const Text('I have read and accepted the GDPR.'),]
            ),


            Padding(
              padding: const EdgeInsets.symmetric(vertical: 16.0),
              child: ElevatedButton(
                onPressed: () async {
                  // Validate returns true if the form is valid, or false otherwise.
                  if (_formKey.currentState!.validate()) {
                    bool registered = await userService.register(name: _nameController.text, surname: _surnameController.text, email: _emailController.text, password: _passwordController.text, checked: _checked);
                    if (registered) {
                      _viewModel.navigateToLogin(context);
                      Navigator.of(context)
                        .pushAndRemoveUntil(MaterialPageRoute(builder: (context) => LoginFormState().build(context)), (route) => false);
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Registration failed.')),
                      );
                  }
                  }
                },
                child: const Text('Register'),
              ),
            ),
          ],
        ));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        color: Colors.white,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(padding: EdgeInsets.only(bottom: 80.0)),
            GestureDetector(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 20.0),
                child: Text(
                  style: TextStyle(
                      fontSize: 17,
                      foreground: Paint()
                        ..strokeWidth = 6
                        ..color = CustomColors.main
                  ),
                  'Back home',
                  textAlign: TextAlign.left,
                ),
              ),
              onTap: () => _viewModel.navigateToHomepage(context),
            ),
            registrationForm(),
            GestureDetector(
              child: Container(
                alignment: Alignment.center,
                child: const Text(
                  'Already have an account? Login',
                ),
              ),
              onTap: () => _viewModel.navigateToLogin(context),
            ),
          ],
        )
    );
  }
}

// ViewModel
class RegistrationViewModel extends ChangeNotifier {
  String? title;
  bool isLoading = false;

  Future<String> register({required String email, required String password}) async {
    await Future.delayed(const Duration(microseconds: 600));
    return "Registration Successful";
  }

  void navigateToLogin(BuildContext context) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginForm()));
  }

  void navigateToHomepage(BuildContext context) {
    PersistentNavBarNavigator.pushNewScreen(context, screen: homepageView());
  }
}
