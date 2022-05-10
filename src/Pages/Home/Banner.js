import React from 'react';
import chair from '../../assets/images/chair.png'
import bg from '../../assets/images/bg.png'
import PrimaryButton from '../Shared/PrimaryButton';

const Banner = () => {
    return (
        <div className="bg-cover bg-center" style={{backgroundImage: `url(${bg})`,  backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
            <div class="hero min-h-screen ">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <img src={chair} class="max-w-sm rounded-lg shadow-2xl px-3" />
    <div className='px-3'>
      <h1 class="text-5xl font-bold">Your New Smile Starts <br /> Here</h1>
      <p class="py-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br /> Lorem Ipsum has been the industry's standard dummy text ever since the</p>
     <PrimaryButton>Get Started </PrimaryButton>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;