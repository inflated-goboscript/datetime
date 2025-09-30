# timedelta struct definition and constructors
struct TimeDelta {
    days = 0,
    seconds = 0,
    microseconds = 0
}

func td_to_seconds(TimeDelta td) {
    return ($td.days * 86400) + $td.seconds + ($td.microseconds / 1000000);
}

func td_str(TimeDelta td) {
    return "TimeDelta{days:"&$td.days&",seconds:"&$td.seconds&",microseconds:"&$td.microseconds&"}";
}

func td_from_seconds(secs) TimeDelta {
    local days = $secs // 86400;
    return TimeDelta {
        days: days,
        seconds: floor($secs - 86400 * days),
        microseconds: ($secs % 1) / 1000000
    };
}

func dt_sub(datetime a, datetime b) TimeDelta {
    assert $a.tzh == $b.tzh and $a.tzm == $b.tzm, "Timezone mismatch in datetime subtraction";
    return td_from_seconds(dt_to_timestamp($a) - dt_to_timestamp($b));
}

func dt_add(datetime a, TimeDelta b) datetime {
    return dt_from_timestamp(dt_to_timestamp($a) + td_to_seconds($b));
}
