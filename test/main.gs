costumes "blank.svg";

%include inflator/assert
%include inflator/datetime

onflag {main;}
proc main {
    datetime dt = datetime{
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
    assert_eq dt_str(dt), "2025-09-27T11:27:47.459000+01:00";

    assert_eq dt_get_weekday(DT_NOW()), CURRENT_WEEKDAY();

    log dt_str(dt_from_isoformat("2025-09-27T12:43:00"));
}
