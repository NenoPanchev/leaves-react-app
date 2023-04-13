// import React, { useState } from "react";
// import { DateRangePicker as MuiDateRangePicker, DesktopDatePickerProps, DatePicker } from "@mui/x-date-pickers";
// import { Dayjs } from "dayjs";
//
// const DateRangePicker = () => {
//     const [dateRange, setDateRange] = useState<{ start: Dayjs | null; end: Dayjs | null }>({
//         start: null,
//         end: null,
//     });
//
//     const handleDateRangeChange = (date: DateRange<Dayjs>) => {
//         setDateRange({
//             start: date[0],
//             end: date[1],
//         });
//     };
//
//     const DateRangePickerToolbar = () => (
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <DatePicker
//                 label="Start Date"
//                 value={dateRange.start}
//                 onChange={(date) => setDateRange((prevState) => ({ ...prevState, start: date }))}
//                 TextFieldComponent={(props) => <div {...props} />}
//             />
//             <DatePicker
//                 label="End Date"
//                 value={dateRange.end}
//                 onChange={(date) => setDateRange((prevState) => ({ ...prevState, end: date }))}
//                 TextFieldComponent={(props) => <div {...props} />}
//             />
//         </div>
//     );
//
//     return (
//         <MuiDateRangePicker
//             startText="Start Date"
//             endText="End Date"
//             value={[dateRange.start, dateRange.end]}
//             onChange={handleDateRangeChange}
//             renderInput={(startProps, endProps) => (
//                 <React.Fragment>
//                     <DatePicker {...startProps} TextFieldComponent={(props) => <div {...props} />} />
//                     <DatePicker {...endProps} TextFieldComponent={(props) => <div {...props} />} />
//                 </React.Fragment>
//             )}
//             toolbarTitle="Select Date Range"
//             ToolbarComponent={DateRangePickerToolbar}
//         />
//     );
// };
//
// export default DateRangePicker;
