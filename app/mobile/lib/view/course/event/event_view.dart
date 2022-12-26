import 'package:bucademy/classes/event/event.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:stacked/stacked.dart';
import 'package:maps_launcher/maps_launcher.dart';

Widget eventView({required String eventId}) =>
    ViewModelBuilder<EventViewModel>.reactive(
      viewModelBuilder: () => EventViewModel(eventId),
      onModelReady: (model) => model.init(),
      builder: (context, viewModel, child) => Scaffold(
        appBar: AppBar(
          title: Text(viewModel.event?.title ?? ""),
          backgroundColor: CustomColors.main,
        ),
        body: Column(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            viewModel.loading
                ? const Center(child: CircularProgressIndicator())
                : Expanded(
                    child: Column(
                    children: [
                      ListTile(
                        title: const Text('Event Start'),
                        subtitle: Text(DateFormat(
                                "'Date: 'dd MMMM yyyy  'Time: 'hh:mm")
                            .format(
                                DateTime.parse(viewModel.event!.startDate))),
                      ),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('Event End'),
                          subtitle: Text(viewModel.event!.endDate != null
                              ? DateFormat(
                                      "'Date: 'dd MMMM yyyy  'Time: 'hh:mm")
                                  .format(
                                      DateTime.parse(viewModel.event!.endDate!))
                              : 'Not provided.')),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('Description'),
                          subtitle: Text(viewModel.event!.description)),
                      const Divider(thickness: 1.5),
                      ListTile(
                        title: const Text('Location'),
                        subtitle: GestureDetector(
                          onTap: () => viewModel.directToMap(
                              viewModel.event!.location['longitude'],
                              viewModel.event!.location['latitude'],
                              viewModel.event!.title),
                          child: Container(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 6, horizontal: 8),
                              margin: const EdgeInsets.only(top: 10),
                              decoration: BoxDecoration(
                                  color: CustomColors.main,
                                  borderRadius: BorderRadius.circular(10)),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Show On Map',
                                      style: TextStyles.bodyWhite),
                                  const Icon(
                                    Icons.location_on_outlined,
                                    color: Colors.white,
                                  ),
                                ],
                              )),
                        ),
                      ),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('Quota'),
                          subtitle: Text(viewModel.event!.quota != null
                              ? viewModel.event!.quota.toString()
                              : 'Not provided.')),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('Registered'),
                          subtitle: Text(
                              viewModel.event!.participantCount.toString())),
                      viewModel.event!.participants.contains(userService.user)
                          ? Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 16.0),
                              child: ElevatedButton(
                                onPressed: () =>
                                    viewModel.unparticipate(context),
                                child: const Text('Unparticipate'),
                              ))
                          : Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 16.0),
                              child: ElevatedButton(
                                onPressed: () => viewModel.participate(context),
                                child: const Text('Participate'),
                              )),
                    ],
                  )),
          ],
        ),
      ),
    );

class EventViewModel extends ChangeNotifier {
  final String eventId;
  bool loading = false;
  Event? event;

  EventViewModel(this.eventId);

  init() async {
    loading = true;
    notifyListeners();

    event = await eventService.getEvent(eventId: eventId);
    if (event == null) return;

    loading = false;
    notifyListeners();
  }

  directToMap(latitude, longitude, title) {
    MapsLauncher.launchCoordinates(longitude, latitude, title);
  }

  participate(context) async {
    loading = true;
    notifyListeners();

    var message = await eventService.participateToEvent(event: event!);
    if (message == null) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Error')));
    } else if (message != "User participates in event") {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(message)));
    }

    loading = false;
    notifyListeners();
  }

  unparticipate(context) async {
    loading = true;
    notifyListeners();

    var message = await eventService.unparticipateToEvent(event: event!);
    if (message == null) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Error')));
    } else if (message != "User removed from participation list.") {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(message)));
    }

    loading = false;
    notifyListeners();
  }
}
