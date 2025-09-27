# 'getter functions' for datetime struct


# Get the day of the week idx for a date `$d`, starting with 1=Monday
# https://www.geeksforgeeks.org/dsa/zellers-congruence-find-day-date/
func dt_get_weekday_number(datetime d) {
    # uses zeller's rule but offset to match the TIME_WEEKDAYS list
    return 1 + floor(
        $d.day + 
        (13 / 5) * ($d.month + 1) +
        1.25 * ($d.year % 100) +
        5.25 * ($d.year // 100)
        -2) % 7;
}

# Get the day of the week for a date `$d`
func dt_get_weekday(datetime d) {
    return TIME_WEEKDAYS[dt_get_weekday_number($d)];
}
