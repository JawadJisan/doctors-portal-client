import React from 'react';
import quote from '../../assets/icons/quote.svg'

const Testimonial = () => {
    return (
        <section className='my-28'>
            <div className='flex justify-between'>
               <div>
               <h1 className='text-xl text-primary font-bold'>Testimonial</h1>
               <h3 className='text-3xl '>What Our Patients Says</h3>
               </div>
               <div>
                    <img className='w-24 lg:w-48' src={quote} alt="" />
               </div>
            </div>
            <div>

            </div>
        </section>
    );
};

export default Testimonial;