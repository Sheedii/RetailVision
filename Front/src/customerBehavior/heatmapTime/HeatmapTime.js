import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Agendaicon from '../../assets/datetoptenIcon.svg';
import './heatmapTime.css';

const HeatmapTime = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const datePickerRef = useRef(null);

    // Format the date in the required format: Oct 10, 2024 @ 09:43:57.824
    const formatDisplayDate = (date) => {
        if (!date) return '';
    
        // Get each part of the date
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    
        // Format the time part with milliseconds
        const time = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    
        return `${month} ${day}, ${year} @ ${time}`;
    };
    

    const handleDateChange = (date) => {
        const formattedDate = formatDisplayDate(date);
        setSelectedDate(date); // Keep original Date object for `selected` prop
        onDateChange(formattedDate); // Pass formatted date to parent component
    };

    const handleCancel = () => {
        setSelectedDate(null);
        onDateChange(null);
    };

    const handleApply = () => {
        datePickerRef.current.setOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
            <div className="heatmapDate_container">
                <div className="heatmapDate_picker">
                    <DatePicker
                        placeholderText="Select Date"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        shouldCloseOnSelect={false}
                        ref={datePickerRef}
                        icon={<img className='iconTextInput0' src={Agendaicon} alt="Agenda Icon" />}
                        fixedHeight
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa" // This is just the display format within the picker
                        showTimeInput
                    >
                        <div className='AgendaSelect0'>Select</div>
                        <div className='iconeAgenda0'>
                            <img className='iconAgenda0' src={Agendaicon} alt="Agenda Icon" />
                        </div>
                        <div className="agendaButtons">
                            <button className='agendaCancel' onClick={handleCancel}>Cancel</button>
                            <button className='agendaApply' onClick={handleApply}>Apply</button>
                        </div>
                    </DatePicker>
                </div>
            </div>
        </div>
    );
};

export default HeatmapTime;
