import React from 'react';
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../Shared/PrimaryButton';
const Contact = () => {
    return (
        <div className="bg-primary px-10 py-14" style={{backgroundImage: `url(${appointment})`,  backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}
        >
            <div className='text-center pb-14 text-white bg-clip-text bg-gradient-to-br from-accent to-secondary'>
            <p className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary'>Contact Us</p>
            <h3 className='text-4xl'>Stay connected with us</h3>
            </div>
            <div className='grid grid-cols-1 justify-items-center gap-5'>
                <input
                type='text'
                placeholder='Email Address'
                className='input w-full max-w-md'
                
                >
                </input>
                <input
                type='text'
                placeholder='Subject'
                className='input w-full max-w-md'
                
                >
                </input>
                <textarea
                className='textarea w-full max-w-md'
                placeholder='Your Massage'
                rows={6}
                >
                </textarea>
                <PrimaryButton>Submit</PrimaryButton>
            </div>
            
        </div>
    );
};

export default Contact;