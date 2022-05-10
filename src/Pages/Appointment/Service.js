import React from 'react';

const Service = ({service}) => {
    const {name, slots} = service
    return (
        <div class="card lg:max-w-lg bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{name} </h2>
          <p>{
              slots.length>0 ?  <span></span> : <span className='text-red-600 '>Try Another Date </span>
              }</p>
            <p> {slots.length} {slots.length > 1? 'Spaces' : 'Space'}  Available</p>
          <div class="card-actions justify-center">
            <button disabled={slots.length==0} class="btn btn-secondary text-white  uppercase">Book Appointment</button>
          </div>
        </div>
      </div>
    );
};

export default Service;