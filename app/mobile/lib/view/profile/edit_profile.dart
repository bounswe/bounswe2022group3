import 'dart:io';

import 'package:bucademy/classes/profile/profile.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/profile/profile.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:stacked/stacked.dart';

Widget editProfileView(Profile p) => ViewModelBuilder<EditProfileView>.reactive(
    viewModelBuilder: () => EditProfileView(),
    builder: (context, viewModel, child) => Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(color: Colors.white),
          elevation: 0,
          backgroundColor: CustomColors.main,
          shadowColor: CustomColors.main,
          foregroundColor: CustomColors.main,
          title: const FittedBox(
            fit: BoxFit.fitWidth,
            child: Text(
              "Edit Profile",
              style: TextStyles.pageTitle,
            ),
          ),
        ),
        body: Container(
          padding: const EdgeInsets.only(top: 25, right: 15, left: 15),
          child: GestureDetector(
            onTap: () {
              FocusScope.of(context).unfocus();
            },
            child: ListView(children: [
              Center(
                child: Stack(
                  children: [
                    Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                          border:
                              Border.all(width: 4, color: CustomColors.main),
                          boxShadow: [
                            BoxShadow(
                                spreadRadius: 2,
                                blurRadius: 10,
                                color: Colors.blue.shade900.withOpacity(0.4))
                          ],
                          shape: BoxShape.circle,
                          image: DecorationImage(
                              fit: BoxFit.cover,
                              image: NetworkImage(fullImagePath(p.image!)))),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: GestureDetector(
                        onTap: () {},
                        child: Container(
                          height: 40,
                          width: 40,
                          decoration: const BoxDecoration(
                              shape: BoxShape.circle, color: CustomColors.main),
                          child: const Icon(Icons.edit, color: Colors.white),
                        ),
                      ),
                    )
                  ],
                ),
              ),
              buildFormField(
                  viewModel._nameController, 'First Name', p.name ?? 'Name'),
              buildFormField(viewModel._surnameController, 'Last Name',
                  p.surname ?? 'Last Name'),
              buildFormField(viewModel._bioController, 'About You',
                  p.personal_info?.bio ?? 'Tell us about yourself!'),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Make my profile Private',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
                  Transform.scale(
                    scale: 0.7,
                    child: CupertinoSwitch(
                        value: viewModel.isPrivate ?? false,
                        onChanged: (val) {
                          viewModel.isPrivate = val;
                        }),
                  )
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  OutlinedButton(
                      style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(horizontal: 50),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10))),
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text(
                        'Cancel',
                        style: TextStyle(
                            fontSize: 16,
                            letterSpacing: 1.8,
                            color: CustomColors.main),
                      )),
                  ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          backgroundColor: CustomColors.main,
                          padding: const EdgeInsets.symmetric(horizontal: 50),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10))),
                      onPressed: () async {
                        bool ok = await viewModel.updateProfile(p);
                        String snacBarContent = ok
                            ? 'Your Profile Has Been Updated Successfully'
                            : 'Your Profile Could Not Be Updated';
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text(snacBarContent),
                            duration: const Duration(milliseconds: 200)));

                        ok
                            ? PersistentNavBarNavigator.pushNewScreen(context,
                                screen: profileView(viewModel.id),
                                withNavBar: true)
                            : null;
                      },
                      child: const Text(
                        'Update',
                        style: TextStyle(
                            fontSize: 16,
                            letterSpacing: 1.8,
                            color: Colors.white),
                      ))
                ],
              )
            ]),
          ),
        )));

class EditProfileView extends ChangeNotifier {
  final TextEditingController _bioController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _surnameController = TextEditingController();
  final TextEditingController _imageController = TextEditingController();
  bool? isPrivate = false;
  String id = '';
  File? picture;

  Future<bool> updateProfile(Profile p) async {
    id = p.id;
    String? bio = _bioController.text;
    String? name = _nameController.text;
    String? surname = _surnameController.text;
    //_bioController.text;
    String? image = _imageController.text;
    PersonalInfo? p_info = p.personal_info != null
        ? PersonalInfo(
            id: p.personal_info!.id,
            bio: p.personal_info!.bio != bio && bio.isNotEmpty
                ? bio
                : p.personal_info!.bio,
            personal_achievements: p.personal_info!.personal_achievements,
            activities: p.personal_info!.activities,
            knowledge: p.personal_info!.knowledge,
            interest_badges_selected: p.personal_info!.interest_badges_selected,
            interests: p.personal_info!.interests,
            badges: p.personal_info!.badges)
        : null;
    Profile tmp = Profile(p.id,
        name: p.name != name && name.isNotEmpty ? name : p.name,
        surname:
            p.surname != surname && surname.isNotEmpty ? surname : p.surname,
        email: p.email,
        enrollments: p.enrollments,
        created_spaces: p.created_spaces,
        followed_users: p.followed_users,
        follower_users: p.followed_users,
        blocked_users: p.blocked_users,
        personal_info: p_info,
        is_private: isPrivate,
        createdAt: p.createdAt,
        updatedAt: DateTime.now().toString(),
        image: p.image);

    bool isUpdated = await profileService.editProfile(
        p.personal_info!.bio != bio && bio.isNotEmpty
            ? bio
            : p.personal_info!.bio,
        p.name != name && name.isNotEmpty ? name : p.name,
        p.surname != surname && surname.isNotEmpty ? surname : p.surname,
        p.personal_info!.interests,
        p.personal_info!.knowledge,
        false);
    return isUpdated;
  }
}

Widget buildFormField(
    TextEditingController controller, String label, String placeHolder) {
  return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2, horizontal: 4),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontSize: 16.0,
              decoration: TextDecoration.underline,
            ),
          ),
          const SizedBox(height: 7),
          TextFormField(
            controller: controller,
            decoration: InputDecoration(
              hintText: placeHolder,
              hintStyle: TextStyles.helperText,
              border: const OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please Enter Your $label';
              }
              return null;
            },
          ),
        ],
      ));
}
