import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './correlationAgenda.css'
import Agendaicon from '../../assets/datetoptenIcon.svg';

const CorrelationAgenda = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const datePickerRef = useRef(null);

    const formatDate = (date) => {
        return date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null;
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        onDateChange({ start: formatDate(start), end: formatDate(end) });
        console.log(onDateChange);
    };

    const handleCancel = () => {
        setStartDate(null);
        setEndDate(null);
        onDateChange({ start: null, end: null });
    };

    const handleApply = () => {
        datePickerRef.current.setOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
            <div className="CorrelationDate_container">
                <div className="CorrelationDate_picker">
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select Date Range"
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        shouldCloseOnSelect={false}
                        ref={datePickerRef}
                        fixedHeight
                    >
                        <div className='CorrelationAgendaSelect'>Select</div>
                        <div className='correlationIconeAgenda'>{<img className='correlationIconAgenda' src={Agendaicon} alt="Agenda Icon" />}</div>
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

export default CorrelationAgenda;
