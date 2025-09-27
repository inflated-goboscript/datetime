costumes "blank.svg";

%include inflator/datetime

onflag {main;}
proc main {
    local datetime d = DT_NOW();
    say dt_str(d);

    say dt_get_weekday_number(d);
}
