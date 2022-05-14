import React from 'react';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';




const Signup = () => {
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, uerror] = useUpdateProfile(auth);

  const navigate = useNavigate();
  let signInError;

  const onSubmit = async data => {
    console.log(data)
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    console.log('dis',data.name );
    navigate('/appointment')

  };
  if(loading || gloading || updating){
    return <Loading/>
  }
  if(error || gerror || uerror){
    signInError = <p className='text-red-800 text-xs p-3'>{error?.message || gerror?.message || uerror?.message} </p>
  }



  if (guser || user) {
    console.log(guser || user)
  }

  

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-xl font-bold">Sign Up</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
{/* name */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs"
              {...register("name", {
                required:{
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
                required:{
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
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"
              {...register("password", {
                required:{
                  value: true,
                  message: 'Password is Required'
                },
                minLength: {
                  value: 6,
                  message: 'Must be six charecter or longer' 
                }
              })}
              />
              <label className="label">
              {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message} </span>}
              {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message} </span>}

                
              </label>
            </div>

              {signInError}
            <input className='btn w-full max-w-xs' value='Sign Up' type="submit" />
          </form>
              <p className='text-sm text-center p-2 mt-2'>Already Have an account? <Link  className='text-secondary' to='/login'>Please Login</Link> </p>
          <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-accent">CONTINUE WITH GOOGLE</button>



        </div>
      </div>
    </div>
  );
};

export default Signup;
