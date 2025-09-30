# convert datetimes to other formats

func dt_str(datetime dt) {
    return "datetime{year:"&$dt.year&",month:"&$dt.month&",day:"&$dt.day
        &",hour:"&$dt.hour&",minute:"&$dt.minute&",second:"&$dt.second&",microsecond:"&$dt.microsecond
        &",tzh:"&$dt.tzh&",tzm:"&$dt.tzm&"}";
}

# iso format string representation of datetime
func dt_to_isoformat(datetime dt) {
    local suffix = "";
    if $dt.hour != "null" {
        suffix &= "T" & zfill($dt.hour, 2) & ":" & zfill($dt.minute, 2) & ":" & zfill($dt.second, 2);
    }

    if $dt.microsecond != 0 {
        # add microseconds if applicable
        # according to the Wikipedia page: There is no limit on the number of decimal places for the decimal fraction
        suffix &= "." & floor($dt.microsecond);  
    }

    if $dt.tzh != "null" {
        # add optional timezone data
        if $dt.tzh == 0 and $dt.tzm == 0 {
            # if it's UTC, just add a Z
            suffix &= "Z";
        } else {
            if $dt.tzh[1] != "-" {
                suffix &= "+";
            }

            suffix &= zfill($dt.tzh, 2) & ":" & zfill($dt.tzm, 2);
        }
    }
    
    return $dt.year & "-" & zfill($dt.month, 2) & "-" & zfill($dt.day, 2) & suffix;
}

# https://en.wikipedia.org/wiki/Julian_day#Converting_Julian_calendar_date_to_Julian_day_number
# https://www.desmos.com/calculator/kzbktf0riu
func dt_to_julian_timestamp(datetime dt) {
    # you could also do unixTimeStamp / 86400 + 2440587.5
    return floor(1721455.25 + 365.2425 * ($dt.year + ($dt.month - 14) / 12)) + $dt.day + (
        ($dt.hour - $dt.tzh) - 12 + (
            ($dt.minute - $dt.tzm)  + (
                $dt.second + (
                    $dt.microsecond
                ) / 1000000
            ) / 60
        ) / 60
    ) / 24;
}

# https://www.desmos.com/calculator/kzbktf0riu
func dt_to_timestamp(datetime dt) {
    # note, 1 - "null" = 1, so we can just subtract the timezone offset
    return 86400 * floor($dt.day - 719558.86625 + 365.2425 * ($dt.year + $dt.month / 12))
        + 3600 * ($dt.hour - $dt.tzh) 
        + 60 * ($dt.minute - $dt.tzm) 
        + $dt.second 
        + 0.000001 * $dt.microsecond;
}
