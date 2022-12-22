import 'package:map_location_picker/map_location_picker.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/course/coursepage.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:datetime_picker_formfield/datetime_picker_formfield.dart';
import '../../../classes/event/event.dart';

createEvent(BuildContext context, CoursePageViewModel viewModel) {
  String? title;
  DateTime? startDate;
  DateTime? endDate;
  String? description;
  Map<String, double>? location = {'latitude': 12.23, 'longitude': 23.34};
  int? quota;
  //String? visibility;
  //double? fee;
  //String? medium;

  final format = DateFormat('yyyy-MM-dd HH:mm');

  showDialog(
      context: context,
      builder: ((context) => AlertDialog(
            title: const Text('Enter the details of the event'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  onChanged: (value) => title = value,
                  decoration: const InputDecoration(hintText: "Title"),
                ),
                DateTimeField(
                    format: format,
                    decoration: const InputDecoration(
                        hintText: 'Set the starting date'),
                    onShowPicker: (context, currentValue) async {
                      final date = await showDatePicker(
                          context: context,
                          initialDate: currentValue ?? DateTime.now(),
                          firstDate: DateTime(1900),
                          lastDate: DateTime(2100));

                      if (date != null) {
                        final time = await showTimePicker(
                            context: context,
                            initialTime: TimeOfDay.fromDateTime(
                                currentValue ?? DateTime.now()));
                        final combined = DateTimeField.combine(date, time);
                        startDate = combined;
                        return combined;
                      } else {
                        startDate = currentValue;
                        return currentValue;
                      }
                    }),
                DateTimeField(
                    format: format,
                    decoration: const InputDecoration(
                        hintText: 'Set the ending date'),
                    onShowPicker: (context, currentValue) async {
                      final date = await showDatePicker(
                          context: context,
                          initialDate: currentValue ?? DateTime.now(),
                          firstDate: DateTime(1900),
                          lastDate: DateTime(2100));

                      if (date != null) {
                        final time = await showTimePicker(
                            context: context,
                            initialTime: TimeOfDay.fromDateTime(
                                currentValue ?? DateTime.now()));
                        final combined = DateTimeField.combine(date, time);
                        endDate = combined;
                        return combined;
                      } else {
                        endDate = currentValue;
                        return currentValue;
                      }
                    }),
                TextField(
                    keyboardType: TextInputType.number,
                    onChanged: (value) => quota = int.parse(value),
                    decoration: const InputDecoration(hintText: "Quota")),
                Flexible(
                  child: TextField(
                    onChanged: (value) => description = value,
                    decoration: const InputDecoration(hintText: "Description"),
                    maxLines: 15,
                  ),
                ),
                /*MapLocationPicker(
                        apiKey: 'AIzaSyAXTzbniq2PnBkL1GbxGzCqv4rFCgAaFpA',
                        canPopOnNextButtonTaped: true,
                        currentLatLng: const LatLng(29.121599, 76.396698),
                        onNext: (GeocodingResult? result) {
                          if (result != null) {
                            location = {
                              'latitude': result.geometry.location.lat,
                              'longitude': result.geometry.location.lng
                            };
                            address = result.formattedAddress ?? "";
                          }
                        },
                      ),*/
              ],
            ),
            actions: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                  color: CustomColors.main,
                  child: Text('Cancel', style: TextStyles.bodyWhite),
                ),
              ),
              GestureDetector(
                onTap: (title != null &&
                        title!.isNotEmpty &&
                        startDate != null &&
                        endDate != null &&
                        description != null &&
                        description!.isNotEmpty &&
                        quota != null
                    //&& visibility != null &&
                    //visibility!.isNotEmpty &&
                    //fee != null &&
                    //medium != null &&
                    //medium!.isNotEmpty &&
                    )
                    ? null
                    : () async {
                        Event? e = await eventService.createEvent(
                            spaceId: viewModel.course!.id,
                            creator: userService.user!.id,
                            title: title!,
                            startDate: startDate!.toIso8601String(),
                            endDate: endDate!.toIso8601String(),
                            location: location!,
                            description: description!,
                            quota: quota!);
                        //visibility: visibility!,
                        //fee: fee!,
                        //medium: medium!,
                        if (e != null) {
                          viewModel.addNewEvent(e);
                          print('Here!');
                        }
                        Navigator.pop(context);
                      },
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                  color: CustomColors.main,
                  child: Text('Create', style: TextStyles.bodyWhite),
                ),
              )
            ],
          )));
}
