import { Button, DatePicker, Row, Select } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import CalenderImage from "../../assets/icons/Calendar.svg";
import { useState } from "react";
import "./date-picker.scss";
import ClickAwayListener from "react-click-away-listener";

const { RangePicker } = DatePicker;
interface ICalendarType {
  label: string;
  type: "date" | "week" | "month" | "year";
}
const calendarTypes: ICalendarType[] = [
  {
    label: "today",
    type: "date",
  },
  {
    label: "week",
    type: "week",
  },
  {
    label: "month",
    type: "month",
  },
  {
    label: "year",
    type: "year",
  },
  {
    label: "custom",
    type: "date",
  },
];

const DateRangePickerComp = (props: any) => {
  const [open, setOpen] = useState(false);
  const [datePickerType, setDatePickerType] = useState<ICalendarType>({ label: "today", type: "date" });
  const [dateRangeVal, setDateRangeVal] = useState<{ start: string; end: string }>({ start: "", end: "" });
  const handleFilter = () => { };
  const renderExtraFooter = () => {
    return (
      <div className="calendar_footer" style={{ gap: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="m-0 grey-color fs-12 line-height-16 fw-400">{dateRangeVal.start === dateRangeVal.end ? dateRangeVal.start : `${dateRangeVal.start} - ${dateRangeVal.end}`}</span>
        <Row style={{ gap: "0.75rem" }}>
          <Button className="btn-cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="btn-save" type="primary" htmlType="submit">
            Apply
          </Button>
        </Row>
      </div>
    );
  };

  const rangePresets: {
    label: any;
    value: [Dayjs, Dayjs];
  }[] =
    calendarTypes?.map(({ label, type }: ICalendarType) => ({
      label: (
        <p onClick={() => setDatePickerType({ type, label })} className={`cursor-pointer calendar_btn line-height-20 m-0 fs-12 ${datePickerType.label === label ? "selected_calendar_btn" : ""} capitalize`}>
          {label}
        </p>
      ),
      value: [dayjs(), dayjs()],
    })) ?? [];

  const onRangeChange = (dates: any, dateStrings: string[]) => {
    if (dates) {
      setDateRangeVal({ start: dayjs(dates[0]).format("MMMM DD,YYYY"), end: dayjs(dates[1]).format("MMMM DD,YYYY") });
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="date_picker">
        {props?.timeline ? (<>
          <Select
            className="select-input-theme"
            popupClassName="select-theme"
            defaultValue="Select"
            onClick={() => setOpen(!open)}
            open={false}
          // options={[
          //   { value: 'Buzz Hr', label: 'Buzz Hr' },
          //   { value: 'Web & app', label: 'Web & app' },
          //   { value: 'Screencasts', label: 'Screencasts' },
          // ]}
          />
        </>) : (<>
          <button className="btn-simple" style={{ height: "35px", display: "flex", alignItems: "center", gap: "11px", marginTop: 22 }} onClick={() => setOpen(!open)}>

            <img src={CalenderImage} alt="add_icon" className="white-img-theme-class cursor-pointer" />
            <span className="fs-16 fw-500">Date</span>
          </button>

        </>)}
        <RangePicker
          presets={rangePresets}
          showTime={datePickerType.type === "week"}
          format="YYYY/MM/DD"
          allowClear={false}
          superNextIcon={false}
          superPrevIcon={false}
          popupClassName="custom-date-range"
          style={{
            width: 100,
            height: 0,
            visibility: "hidden",
          }}
          open={open}
          dateRender={(current: any) => {
            const style: React.CSSProperties = {};
            style.borderRadius = "50%";
            return (
              <div className="ant-picker-cell-inner .ant-picker-cell-in-view" style={style}>
                {current.date()}
              </div>
            );
          }}
          picker={datePickerType.type}
          renderExtraFooter={renderExtraFooter}
          onChange={onRangeChange}
        />
      </div>
    </ClickAwayListener>
  );
};

export default DateRangePickerComp;
