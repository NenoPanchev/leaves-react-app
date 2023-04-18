// import React, { useState } from 'react';
// import { DateRangePicker } from 'react-bootstrap-daterangepicker';
// import dayjs, { Dayjs } from 'dayjs';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-daterangepicker/daterangepicker.css';

// interface DateRangePickerProps {
//     label: string;
//     onChange: (startDate: Dayjs, endDate: Dayjs) => void;
//     startDate: Dayjs;
//     endDate: Dayjs;
// }

// const CustomDateRangePicker: React.FC<DateRangePickerProps> = ({ label, onChange, startDate, endDate }) => {
    
//     const [selectedDates, setSelectedDates] = useState({
//         startDate: startDate.toDate(),
//         endDate: endDate.toDate(),
//     });

//     const handleDateChange = (event: any, picker: DateRangePicker) => {
//         setSelectedDates(picker);
//         onChange(dayjs(picker.startDate), dayjs(picker.endDate));
//     };

//     return (
//         <div>
//             <label>{label}</label>
//             <DateRangePicker startDate={selectedDates.startDate} endDate={selectedDates.endDate} onApply={handleDateChange} />
//         </div>
//     );
// };

// export default CustomDateRangePicker;
