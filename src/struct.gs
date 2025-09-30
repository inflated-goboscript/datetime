# Struct definition and constructors

# also serves the same role as python's datetime.date
# Gregorian date
struct datetime {
    year = 1970,
    month = 1,
    day = 1,
    hour = 0, # either hour or "null". If null, implies no minutes or seconds, and no microseconds.
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

enum _dt_from_isoformat_part {
    year,
    month,
    day,
    hour,
    minute,
    second,
    microsecond,
    tzh,
    tzm,
    done
}

func dt_from_isoformat(isoformat) datetime {
    # requires YYYY-MM-DD
    # if you want time, add T & hh:mm:ss
        # if you want seconds fraction, add . & ms
    # if you want tz, add Z (utc) OR (+ OR - & HH:MM)

    # possible ends: day, second, ms, tzm, tzh (z)
    
    local year = 1970;
    local month = 1;
    local day = 1;
    local hour = "null";
    local minute = 0;
    local second = 0;
    local microsecond = 0;
    local tzh = "null";
    local tzm = 0;

    local i = 0;
    local token = "";
    local part = _dt_from_isoformat_part.year;
    # include an empty character too as a signal that it's the end.
    repeat length $isoformat + 1 {
        i++;
        local c = $isoformat[i];
        if part == _dt_from_isoformat_part.year {
            if length token == 8 {
                # if the token is 8 chars long, its the YYYYMMDD format.
                local year = token[1] & token[2] & token[3] & token[4];
                local month = token[5] & token[6];
                local day = token[7] & token[8];

                # we'll just ignore the current char and now send to the hour handler
                part = _dt_from_isoformat_part.hour;
                token = "";

            } elif c == "-" {
                local year = token;
                token = "";
                part = _dt_from_isoformat_part.month;
            } else {
                token &= c;
            }
        } elif part == _dt_from_isoformat_part.month {
            if c == "-" {
                local month = token;
                token = "";
                part = _dt_from_isoformat_part.day;
            } else {
                token &= c;
            }
        } elif part == _dt_from_isoformat_part.day {
            if c == "T" {
                local day = token;
                token = "";
                part = _dt_from_isoformat_part.hour;
            } elif c in "+-Z" {
                # or end of string
                local day = token;
                token = c;
                part = _dt_from_isoformat_part.tzh;
            } else {
                token &= c;
            }
        } elif part == _dt_from_isoformat_part.hour {
            if c == ":" {
                local hour = token;
                token = "";
                part = _dt_from_isoformat_part.minute;
            } else {
                token &= c;
            }
        } elif part == _dt_from_isoformat_part.minute {
            if c == ":" {
                local minute = token;
                token = "";
                part = _dt_from_isoformat_part.second;
            } elif c in "+-Z" {
                # or end of string
                local minute = token;
                token = c;
                part = _dt_from_isoformat_part.tzh;
            } else {
                token &= c;
            }
        } elif part == _dt_from_isoformat_part.second {
            if c == "." {
                local second = token;
                token = "";
                part = _dt_from_isoformat_part.microsecond;
            } elif c in "+-Z" {
                # or end of string
                local second = token;
                token = c;
                part = _dt_from_isoformat_part.tzh;
            } else {
                token &= c;
            }
        } elif part == _dt_from_isoformat_part.microsecond {
            if c in "+-Z" {
                # or end of string
                local microsecond = token;
                token = c;
                part = _dt_from_isoformat_part.tzh;
            } else {
                token &= c;
            }
        } elif part == _dt_from_isoformat_part.tzh {
            if token == "Z" {
                local tzh = 0;
                local tzm = 0;
                part = "done";
            } elif token == "+" {
                token = "";
            }

            if c == ":" {
                local tzh = token;
                token = "";
                part = _dt_from_isoformat_part.tzm;
            } else {
                token &= c;
            }
        } elif part == _dt_from_isoformat_part.tzm {
            if c == "" {
                local tzm = token;
            } else {
                token &= c;
            }
        }
    }

    return datetime{
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        microsecond: microsecond,
        tzh: tzh,
        tzm: tzm
    };
}

func dt_from_julian_timestamp(j) datetime {
    local y = 4716;
    local v = 3;
    local j = 1401;
    local u = 5;
    local m = 2;
    local s = 153;
    local n = 12;
    local w = 2;
    local r = 4;
    local B = 274277;
    local p = 1461;
    local C = -38;

    local f = $j + j + (((4 * $j + B) // 146097) * 3) // 4 + C;
    local e = r * f + v;
    local g = (e % p) // r;
    local h = u * g + w;
    local D = (h % s) // u + 1;
    local M = (h // s + m) % n + 1;
    local Y = e // p - y + (n + m - M) // n;

    log Y;
    log M;
    log D;

}

# [2025,9,30,14,21,20,100]
func dt_from_timestamp(t) datetime {
    # year/month/day
    local value = $t // 86400;
    local c1 = value // 365.2425;
    value -= 365.2425 * c1;

    local c2 = value // 30.436875;
    value -= 30.436875 * c2;

    local c3 = floor(value);

    # hour/mins/secs/micro
    value = $t % 86400;
    local c4 = value // 3600;
    value -= 3600 * c4;
    
    local c5 = value // 60;
    value -= 60 * c5;

    local c6 = floor(value);
    value -= c6;

    # local c7 = value;
    # just use value directly

    return datetime {
        year: c1 + 1970,
        month: c2 + 1,
        day: c3 + 1,
        hour: c4,
        minute: c5,
        second: c6,
        microsecond: value
    };
}