import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/services/persistence_service.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

class ApiInterceptors extends Interceptor {
  @override
  Future<void> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    print('requesting');
    String token = await persistenceService.get(PersistenceKeys.accessToken);

    options.headers.addAll({"Authorization": "Bearer $token"});
    // do something befor e request is sent
    print(
        "${options.method} | ${options.baseUrl}  | ${options.headers} | ${options.path} | ${options.uri} | ${options.data}");
    super.onRequest(options, handler); //add this line
  }
}

@lazySingleton
class DioService {
  Dio get _dio => Dio(BaseOptions(
        connectTimeout: 5000,
        receiveTimeout: 5000,
        baseUrl: Constants.backendUrl,
      ));

  Dio get dio => addInterceptors(_dio);

  Dio addInterceptors(Dio dio) {
    return dio..interceptors.add(ApiInterceptors());
  }

  dynamic requestInterceptor(RequestOptions options) async {
    String token = await persistenceService.get(PersistenceKeys.accessToken);

    options.headers.addAll({"Authorization": "Bearer: $token}"});

    return options;
  }

  dynamic responseInterceptor(Response options) async {
    print(options);
    return options;
  }
}
