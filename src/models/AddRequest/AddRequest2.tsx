// import React, { useState } from 'react';
// import DatePicker, { registerLocale } from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import bg from 'date-fns/locale/bg-BG'; // or any other locale you want to use

// registerLocale('bg', bg); // register the locale with react-datepicker

// interface DateRangePickerProps {
//   startDate: Date | null;
//   endDate: Date | null;
//   onDatesChange: (startDate: Date | null, endDate: Date | null) => void;
// }

// const DateRangePicker: React.FC<DateRangePickerProps> = ({
//   startDate,
//   endDate,
//   onDatesChange,
// }) => {
//   const [focusedInput, setFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

//   const handleDatesChange = (dates: [Date | null, Date | null]) => {
//     const [newStartDate, newEndDate] = dates;
//     onDatesChange(newStartDate, newEndDate);
//   };

//   return (
//     <DatePicker.RangePicker
//       startDate={startDate}
//       endDate={endDate}
//       onDatesChange={handleDatesChange}
//       focusedInput={focusedInput}
//       onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
//       locale="en"
//       showClearDates
//       numberOfMonths={2}
//       withPortal
//     />
//   );
// };

// export default DateRangePicker;
