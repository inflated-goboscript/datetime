# Struct definition and constructors

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
