import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Login = () => {

    const { signIn } = useContext(AuthContext);

    const [disabled, setDisabled] = useState(true);

    //private route
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                Swal.fire({
                    title: 'Login Successful !',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })

    }
    //captcha
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    // const captchaRef = useRef(null);
    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        // console.log(user_captcha_value)
        if (validateCaptcha(user_captcha_value) == true) {
            setDisabled(false);
            alert('Captcha Matched');
        }

        else {
            setDisabled(true);
            alert('Captcha Does Not Match');
        }
    }



    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Login now!</h1>
                        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} class="card-body">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" class="input input-bordered" />
                                <label class="label">
                                    <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Please type the captcha" class="input input-bordered" />
                                {/* <button  className="btn btn-xs">Validate</button> */}
                            </div>
                            <div class="form-control mt-6">
                                <input class="btn btn-primary" disabled={disabled} type='submit' value='login'></input>
                            </div>
                        </form>
                        <p><small>New here ? <Link to='/signup'>Create An Account</Link></small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;