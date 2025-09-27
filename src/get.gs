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
    # 0 = Saturday, 1 = Sunday, 2 = Monday, ..., 6 = Friday
    # uses zeller's rule
    local q = $d.day;
    local m = $d.month;
    local K = $d.year % 100;
    local J = $d.year // 100;

    return floor(q + (13*(m+1))/5 + K + K/4 + J/4 + 5*J) % 7;
}
