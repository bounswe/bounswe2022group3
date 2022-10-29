import 'package:bucademy/services/course_service.dart';
import 'package:bucademy/services/dio_service.dart';
import 'package:bucademy/services/navigator_service.dart';
import 'package:bucademy/services/persistence_service.dart';
import 'package:bucademy/services/user_service.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

import '../locator.config.dart';

@injectableInit
void configureDependencies() {
  $initGetIt(GetIt.I);
}

Future<void> resetGetIt() async {
  await GetIt.I.reset(dispose: true);
}

CourseService get courseService => GetIt.I<CourseService>();
NavigatorService get navigatorService => GetIt.I<NavigatorService>();
PersistenceService get persistenceService => GetIt.I<PersistenceService>();
DioService get dioService => GetIt.I<DioService>();
UserService get userService => GetIt.I<UserService>();
