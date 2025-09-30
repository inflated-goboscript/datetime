costumes "blank.svg";

%include inflator/datetime

onflag {main;}
proc main {
    local datetime d = DT_NOW();
    say dt_to_isoformat(d);

    forever {
        ask "ISO format string:";
        datetime d = dt_from_isoformat(answer());
        say dt_str(d);
    }
}
