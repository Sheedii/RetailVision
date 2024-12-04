import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './agenda2.css'
import Agendaicon from '../../assets/iconAgenda.svg'

const Agenda2 = ({ onStartDateChange, onEndDateChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const startDatePickerRef = useRef(null);
    const endDatePickerRef = useRef(null);

    const formatDate = (date) => {
        return date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null;
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        onStartDateChange(formatDate(date));
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        onEndDateChange(formatDate(date));
    };

    const handleCancel = () => {
        setStartDate(null);
        setEndDate(null);
        onStartDateChange(null);
        onEndDateChange(null);
    };

    const handleEndDateCancel = () => {
        setEndDate(null);
        onEndDateChange(null);
    };

    const handleStartApply = () => {
        startDatePickerRef.current.setOpen(false);
    };
    const handleEndApply = () => {
        endDatePickerRef.current.setOpen(false);
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
            <div className="date_picker_container">
                <div className="date_picker0 agenda2date">
                    <div class="from">From</div>
                    <DatePicker
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select Start Date"
                        showIcon
                        toggleCalendarOnIconClick
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        shouldCloseOnSelect={false}
                        ref={startDatePickerRef}
                        icon={<img className='iconTextInput0' src={Agendaicon} alt="Agenda Icon" />}
                        fixedHeight
                    >
                        <div className='AgendaSelect0'>Select</div>
                        <div className='iconeAgenda'>{<img className='iconAgenda0' src={Agendaicon} alt="Agenda Icon" />}</div>
                        <div className="agendaButtons">
                            <button className='agendaCancel' onClick={handleCancel}>Cancel</button>
                            <button className='agendaApply' onClick={handleStartApply}>Apply</button>
                        </div>
                    </DatePicker>
                    <div class="to">To</div>
                    <DatePicker
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select End Date"
                        showIcon
                        toggleCalendarOnIconClick
                        selected={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        shouldCloseOnSelect={false}
                        ref={endDatePickerRef}
                        icon={<img className='iconTextInput0' src={Agendaicon} alt="Agenda Icon" />}
                        fixedHeight
                    >
                        <div className='AgendaSelect0'>Select</div>
                        <div className='iconeAgenda0'>{<img className='iconAgenda0' src={Agendaicon} alt="Agenda Icon" />}</div>
                        <div className="agendaButtons">
                            <button className='agendaCancel' onClick={handleEndDateCancel}>Cancel</button>
                            <button className='agendaApply' onClick={handleEndApply}>Apply</button>
                        </div>
                    </DatePicker>
                </div>

            </div>
        </div>
    );
};

export default Agenda2
