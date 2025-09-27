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
