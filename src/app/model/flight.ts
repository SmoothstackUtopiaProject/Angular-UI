import { Airplane } from 'src/app/model/airplane';
import { Route } from './route';
export class Flight{
    flightId!: number;
    flightRoute!: Route;
    flightAirplane!: Airplane;
    flightDepartureTime!: string;
    flightSeatingId!: number;
    flightDuration!: number;
    flightStatus!: string;
}