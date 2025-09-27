# 'getter functions' for datetime struct

list DT_WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

# Get the day of the week for a date `$d`
# https://www.geeksforgeeks.org/dsa/zellers-congruence-find-day-date/
func dt_get_weekday_number(datetime d) {
    # uses zeller's rule but offset to match the DT_WEEKDAYS list
    return 1 + floor(
        $d.day + 
        (13 / 5) * ($d.month + 1) +
        1.25 * ($d.year % 100) +
        5.25 * ($d.year // 100)
        -2) % 7;
}
