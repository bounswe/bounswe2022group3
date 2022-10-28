import 'package:bucademy/services/course_service.dart';
import 'package:bucademy/services/content_service.dart';
import 'package:bucademy/services/navigator_service.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

GetIt $initGetIt(
  GetIt get, {
  String? environment,
  EnvironmentFilter? environmentFilter,
}) {
  final gh = GetItHelper(get, environment, environmentFilter);
  gh.lazySingleton<CourseService>((() => CourseService()));
  gh.lazySingleton<NavigatorService>((() => NavigatorService()));
  gh.lazySingleton<ContentService>((() => ContentService()));
  return get;
}
