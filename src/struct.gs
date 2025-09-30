# Struct definition and constructors

# also serves the same role as python's datetime.date
# Gregorian date
struct datetime {
    year = 1970,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    microsecond = 0,
    tzh=0, # either timezone hour, or "null". If null, implies there is no timezone data attached.
    tzm=0 # timezone minute. If tzh is null, ignore tzm, so default is "00"
}

%define DT_NOW() datetime{ \
    year: current_year(), \
    month: current_month(), \
    day: current_date(), \
    hour: current_hour(), \
    minute: current_minute(), \
    second: current_second(), \
    microsecond: floor(CURRENT_MILLISECOND() * 1000), \
    tzh: TIMEZONE(),\
    tzm: 0}

func dt_from_isoformat(isoformat) datetime {
    split $isoformat, "-";
    assert length split > 2, "splitlen2";
    
    local year = split[1];
    local month = split[2];

    local s3 = split[3];
    if length split > 3 {
        assert_eq length split, 4;
        s3 &= "-" & split[4];
    }

    local t_split = findchar(s3, "T");
    log s3;
    log t_split;
    if t_split == 0 {
        # no extra data
        local day = s3;
        
        local hour = 0;
        local minute = 0;
        local second = 0;
        local microsecond = 0;
        local tzh = 0;
        local tzm = 0;
    } else {
        local day = slice(split[3], 1, t_split);
        local time_data = slice(split[3], t_split+1, length split[3] + 1);
        log time_data;

        split time_data, ":";
        assert length split > 2, "splitlen1";
        
        local hour = split[1];
        local minute = split[2];
        
        local final_portion = split[3];
        if length split > 3 {
            assert_eq length split, 4, "splitlen2";
            final_portion &= ":" & split[4];
        }

        log final_portion;

        # final portion is in format ss.mmmmmm (+OR- hh:mm)OR-Z
        if final_portion[length final_portion] == "Z" {
            local s_split = length final_portion;
        } else {
            local s_split = findchar(final_portion, "+");
            if s_split == 0 {
                s_split = findchar(final_portion, "-");
            }
        }

        if s_split == 0 {
            # no timezone information
            local seconds_portion = final_portion;
            local tzh = "null";
            local tzm = 0;
        } else {
            # there is timezone information. parse it.
            local seconds_portion = slice(final_portion, 1, s_split);
            local tz_portion = slice(final_portion, s_split, length final_portion + 1);

            if tz_portion == "Z" {
                local tzh = 0;
                local tzm = 0;
            } else {
                split tz_portion, ":";
                local tzh = split[1];
                local tzm = split[2];

                if tzh[1] == "+" {
                    tzh = slice(tzh, 2, length tzh + 1);
                }
            }

        }

        # parse seconds portion
    }
    log "Out";
    log year;
    log month;
    log day;
    log hour;
    log minute;
    log seconds_portion;
    log tzh;
    log tzm;
}