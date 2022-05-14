import React, { useState } from 'react';
import chair from '../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import bg from '../../assets/images/bg.png'


const AppointmentBanner = ({date, setDate}) => {

    return (
        <div className="hero min-h-screen" style={{backgroundImage: `url(${bg})`,  backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} alt='Dentist Chair' className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <DayPicker
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    />


                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;