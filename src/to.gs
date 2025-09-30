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
