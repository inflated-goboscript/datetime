costumes "blank.svg";

%include inflator/datetime

onflag {main;}
nowarp proc main {
    local datetime d = DT_NOW();
    out = dt_to_isoformat(d);

    forever {
        ask out & "\n ISO format string:";
        datetime d = dt_from_isoformat(answer());
        out = dt_to_timestamp(d);
    }
}
