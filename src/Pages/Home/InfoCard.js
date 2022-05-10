import React from 'react';

const InfoCard = ({img, cardTitle, bgClass}) => {
    return (
        <div class={`card lg:card-side  shadow-xl ${bgClass}`}>
        <figure className='pl-5 pt-2'><img src={img} alt="Album"/></figure>
        <div class="card-body">
          <h2 class="card-title text-white">{cardTitle} </h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          
        </div>
      </div>
    );
};

export default InfoCard;