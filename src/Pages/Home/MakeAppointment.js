import React from 'react';
import doctor from '../../assets/images/doctor-small.png'
import appointment from '../../assets/images/appointment.png'

const MakeAppointment = () => {
    return (
        <section style={{
            background : `url(${appointment})`
        }} className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block '>
                <img className='mt-[-100px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 p-6'>
            <h1 className='text-xl font-bold text-primary'>Appointment</h1>
            <h1 className='text-3xl text-white font-bold py-5'>Make an appointment Today</h1>
            <h2 className='text-white'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</h2>
            </div>
        </section>
    );
};

export default MakeAppointment;