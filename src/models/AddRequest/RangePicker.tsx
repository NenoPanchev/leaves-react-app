// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import RangePickerProps from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface DateRangePickerProps {
//   onChange: (startDate: Date | null, endDate: Date | null) => void;
//   startDate?: Date | null;
//   endDate?: Date | null;

// }

// const DateRangePicker: React.FC<DateRangePickerProps> = ({
//   onChange,
//   startDate,
//   endDate,

// }) => {
//   const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([
//     startDate || null,
//     endDate || null,
//   ]);

//   const handleChange: RangePickerProps = (range) => {
//     setSelectedRange(range);
//     onChange(range[0], range[1]);
//   };

//   return (
//     <DatePicker
//       // selected={selectedRange}
//       onChange={handleChange}
//       startDate={selectedRange[0]}
//       endDate={selectedRange[1]}
//       selectsRange
//     />
//   );
// };

// export default DateRangePicker;
