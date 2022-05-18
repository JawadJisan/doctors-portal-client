import React, { useEffect } from 'react';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UseToken from '../../Hooks/UseToken';




const Login = () => {
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [token] = UseToken(user|| guser);

  useEffect(()=>{
    if (token) {

      navigate(from, { replace: true });
    }
  },[token ])

  let signInError;

  const onSubmit = data => {
    console.log(data)
    signInWithEmailAndPassword(data.email, data.password);
  };
  if(loading || gloading){
    return <Loading/>
  }
  if(error || gerror){
    signInError = <p className='text-red-800 text-xs p-3'>{error?.message || gerror?.message} </p>
  }



 

  

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-xl font-bold">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>

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
            <input className='btn w-full max-w-xs' value='Login' type="submit" />
          </form>
          
              <p className='text-sm text-center p-2 mt-2'>New to Doctors Portal? <Link  className='text-secondary' to='/signup'>Create new account</Link> </p>
          <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-accent">CONTINUE WITH GOOGLE</button>



        </div>
      </div>
    </div>
  );
};

export default Login;