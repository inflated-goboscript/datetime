costumes "blank.svg";

%include inflator/assert
%include inflator/datetime

onflag {main;}
proc main {
    datetime dt = datetime {
        year: 2025,
        month: 9,
        day: 27,
        hour: 11,
        minute: 27,
        second: 47,
        microsecond: 459000,
        tzh: 1,
        tzm: 0,
    };
    assert_eq dt_to_isoformat(dt_from_isoformat("2025-09-27T11:27:47.459000+01:00")), "2025-09-27T11:27:47.459000+01:00";
    assert_eq dt_to_isoformat(dt_from_timestamp(1758968867.459)), "2025-09-27T10:27:47.459000Z";
    assert_eq dt_to_isoformat(dt_from_julian_timestamp(2460945.935965961)), "2025-09-27T10:27:47.459017Z";

    assert_eq dt_get_weekday(dt), "Saturday";
    assert_eq dt_get_weekday(DT_NOW()), CURRENT_WEEKDAY();

    assert_eq dt_to_isoformat(dt), "2025-09-27T11:27:47.459000+01:00";
    assert_eq dt_to_julian_timestamp(dt), 2460945.935965961;
    assert_eq dt_to_timestamp(dt), 1758968867.459;
    log dt_str(dt);

    log td_str(dt_sub(dt, dt_from_isoformat("2025-09-25T12:20:30.123456+01:00")));
}
