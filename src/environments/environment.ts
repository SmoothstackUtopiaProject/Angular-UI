// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  airportsEndpoint: 'http://localhost:8080/airports',
  airplanesEndpoint: 'http://localhost:8080/airplanes',
  authEndpoint: 'http://localhost:8080/auth',
  bookingsEndpoint: 'http://localhost:8080/bookings',
  flightsEndpoint: 'http://localhost:8080/flights',
  routesEndpoint: 'http://localhost:8080/routes',
  passengersEndpoint: 'http://localhost:8080/passengers',
  paymentsEndpoint: 'http://localhost:8080/payments',
  usersEndpoint: 'http://localhost:8080/users'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
