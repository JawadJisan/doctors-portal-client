import React from 'react';
import fluoride from '../../assets/images/fluoride.png'
import cavity from '../../assets/images/cavity.png'
import whitening from '../../assets/images/whitening.png'
import Service from './Service';
import ServiceInfo from './ServiceInfo';

const Services = () => {
    const services = [
        {_id:1, name: 'Fluoride Treatment', description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the', img:fluoride },
        {_id:2, name: 'Cavity Filling', description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the', img:cavity },
        {_id:3, name: 'Teeth Whitening', description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the', img:whitening } ,
    ]
    return (
        <div className='my-28'>
            <div className='text-center'>
            <h1 className='text-center text-primary text-xl font-bold'>OUR SERVICES</h1>
            <p className='text-4xl'>Services We Provide</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                {
                    services.map(service => <Service
                    key={service._id} service={service}
                    ></Service>)
                }
            </div>
            <ServiceInfo></ServiceInfo>
        </div>
    );
};

export default Services;