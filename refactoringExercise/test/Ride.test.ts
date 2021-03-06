import DateAndTime from "../src/DateAndTime";
import FareCalculatorFactory from "../src/FareCalculatorFactory";
import Ride from "../src/Ride";

describe("CalculateRide", (): void => {

    const fareCalculatorFactory = new FareCalculatorFactory();
    const normalDay = "2021-03-01T10:00:00";
    const normalNight = "2021-03-01T23:00:00";
    const sunday = "2021-03-07T10:00:00";
    const sundayNight = "2021-03-07T23:00:00";

    test("Invalid date should Throw", (): void => {

        const ride = new Ride(fareCalculatorFactory);
        expect((): void => ride.addSegment(3, new DateAndTime("abcde"))).toThrow(new Error("Invalid Date"));
    });

    test("Invalid dist should throw", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        expect((): void => ride.addSegment(-3, new DateAndTime(normalDay))).toThrow(new Error("Invalid Distance"));
    });

    test("Normal fare", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(10, new DateAndTime(normalDay));
        expect(ride.finish()).toBe(21);
    });

    test("Normal Night", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(10, new DateAndTime(normalNight));
        expect(ride.finish()).toBe(39);
    });

    test("Sunday fare", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(10, new DateAndTime(sunday));
        expect(ride.finish()).toBe(29);
    });

    test("Sunday Night fare", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(10, new DateAndTime(sundayNight));
        expect(ride.finish()).toBe(50);
    });

    test("Many Segments", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(1, new DateAndTime(normalDay));    //  2.10
        ride.addSegment(10, new DateAndTime(normalNight)); // 39.00
        ride.addSegment(10, new DateAndTime(sunday));      // 29.00
        ride.addSegment(10, new DateAndTime(sundayNight)); // 50.00
        expect(ride.finish()).toBe(120.1);
    });

    test("Min fare", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(1, new DateAndTime(normalDay));
        expect(ride.finish()).toBe(10);
    });

});
