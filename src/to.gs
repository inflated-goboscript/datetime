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
func dt_to_julian_timestamp(datetime dt) {
    local day_number = floor((1461 * ($dt.year + 4800 + ($dt.month-14)/12) - 3 * ($dt.year + 4900 + ($dt.month-14)/12)/100) / 4
        + 367/12 * ($dt.month - 2 - ($dt.month-14))
        + $dt.day - 32075);

    return day_number + ($dt.hour - 12) / 24 + $dt.minute/1440 + ($dt.second + $dt.microsecond / 1000000)/86400;
}