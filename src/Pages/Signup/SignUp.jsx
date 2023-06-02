import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = data => {

        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile updated');
                        reset();
                        Swal.fire({
                            title: 'Successfully Registered !',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        });
                        navigate('/');
                    })
                    .catch(error => console.log(error))
            })
    };

    // console.log(watch("example"));


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Register</title>
            </Helmet>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Signup now!</h1>
                        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} class="card-body">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">name</span>
                                </label>
                                <input type="text" name='name' {...register("name", { required: true })} placeholder="name" class="input input-bordered" />
                                {errors.name && <span>Name is required</span>}
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" class="input input-bordered" />
                                {errors.photoURL && <span>Photo URL is required</span>}
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" name='email' {...register("email", { required: true })} placeholder="email" class="input input-bordered" />
                                {errors.email && <span>Email is required</span>}
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" name='password' {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                                    placeholder="password" class="input input-bordered" />
                                {errors.password?.type === 'required' && <p>password is required</p>}
                                {errors.password?.type === 'minLength' && <p>password must have minimum 6 letters</p>}
                                {errors.password?.type === 'pattern' && <p>password must one uppercare , one lowercase, one digit and one special character</p>}
                                <label class="label">
                                    <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div class="form-control mt-6">
                                <input type='submit' value='sign up' class="btn btn-primary"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;