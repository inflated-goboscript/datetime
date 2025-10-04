%include inflator/time
%include inflator/string
%include inflator/assert

# internal macros and const lists go here; undefined at bottom
%define _DT_YEAR_OFFSET(y) (y - 1968) // 4 - (y - 2000) // 100 + (y - 2000) // 400 

list _dt_month_day_index = [
    0,
    31,
    59,
    90,
    120,
    151,
    181,
    212,
    243,
    273,
    304,
    334,
    365
];

%include inflator/datetime/src/struct
%include inflator/datetime/src/to
%include inflator/datetime/src/get
%include inflator/datetime/src/timedelta

%undef _DT_YEAR_OFFSET
