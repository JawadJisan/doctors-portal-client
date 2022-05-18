import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const { data: services, isLoading } = useQuery('/service', () => fetch('https://calm-escarpment-43051.herokuapp.com/service').then(res => res.json()))


    /* 
    * Three Way to store images
    *   Third party storage  // Free open public storage is ok for Practice project
    *   Your own storage in your own server(file system)
    *   Database: Mongadb
    * 
    * YUP: to validate file: Search: YUP file validation for react hook form
    * 
    */

   const imageStorageKey='87dddf2da47f63b4b871952317bd5a8b';

    const onSubmit = async data => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url =`https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url,{
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.success){
                const img = result.data.url;
                const doctor ={
                    name: data.name,
                    email: data.email,
                    speciality: data.speciality,
                    img: img,
                }
                // send doctors info to your database
                fetch('https://calm-escarpment-43051.herokuapp.com/doctor',{
                    method: 'POST',
                    headers:{
                        'content-type':'application/json',
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res=>res.json())
                .then(inserted=>{
                    // console.log('doctor added', inserted)
                    if(inserted.insertedId){
                        toast.success('Doctor added successfully')
                        reset();
                    }
                    else{
                        toast.error('Faild to add Doctor')
                    }
                })
            }
            console.log('imagebb', result)
        })
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1 className='text-2xl'>Add a New Doctor </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* name */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            },

                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message} </span>}


                    </label>
                </div>
                {/* email */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
                                message: 'Provide a Valid Email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message} </span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message} </span>}


                    </label>
                </div>
                {/* pass */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Speciality</span>
                    </label>
                    <select {...register("speciality")} class="select select-bordered w-full max-w-xs">
                        {
                            services.map(service => <option
                            key={service._id}
                            value={service.name}
                            >{service.name} </option>)
                        }
                        
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" placeholder="Your Name" className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            },

                        })}
                    />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message} </span>}


                    </label>
                </div>

                <input className='btn w-full max-w-xs' value='Add' type="submit" />
            </form>        </div>
    );
};

export default AddDoctor;