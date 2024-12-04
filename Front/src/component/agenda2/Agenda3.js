import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './agenda3.css';
import Agendaicon from '../../assets/datetoptenIcon.svg';

const Agenda3 = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const datePickerRef = useRef(null);

    const formatDate = (date) => {
        return date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateChange(formatDate(date));
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
            <div className="agenda3date_picker_container">
                <div className="date_picker0 Agenda3Date">
                    <DatePicker
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select Date"
                        showIcon
                        toggleCalendarOnIconClick
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        shouldCloseOnSelect={false}
                        ref={datePickerRef}
                        icon={<img className='iconTextInput0' src={Agendaicon} alt="Agenda Icon" />}
                        fixedHeight
                    >
                        <div className='AgendaSelect0'>Select</div>
                        <div className='iconeAgenda'>{<img className='iconAgenda0' src={Agendaicon} alt="Agenda Icon" />}</div>
                        <div className="agendaButtons">
                            <button className='agendaCancel0' onClick={handleCancel}>Cancel</button>
                            <button className='agendaApply0' onClick={handleApply}>Apply</button>
                        </div>
                    </DatePicker>
                </div>
            </div>
        </div>
    );
};

export default Agenda3;