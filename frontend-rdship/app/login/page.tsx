"use client";
import { MESSAGE } from '@/config/message';
import { AlertMessageService } from '@/services/alertmessage.service';
import { AuthService } from '@/services/auth.service';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Link from 'next/link';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { LoaderService } from '@/services/loader.service';
import { setIsAuthenticated } from '@/stores/reducers/authenticationSlice';
import { setUserDetails } from '@/stores/reducers/userSlice';
import { useRouter } from 'next/navigation';

type LoginFormInputs = {
    email: string,
    password: string,
};

const authService = new AuthService();
const alertMessage = new AlertMessageService();
const loaderService = new LoaderService();

const page = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => state.authenticationReducer.isAuthenticated);
    const user = useSelector((state: any) => state.userReducer);
    const [isPasswordVisible, setPasswordShow] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const router = useRouter();

    const showPassword = (value: boolean) => {
        setPasswordShow(value);
    }

    const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
        try {
            loaderService.showLoader();
            const res = await authService.login(data);
            if (res?.status == 200 && res?.success) {
                alertMessage.addSuccess(MESSAGE.SUCCESS.LOGIN_SUCCESSFULL).show();
                let responce: any = res?.data;
                let isAuthenticated: any = true;
                localStorage.setItem('_id', responce?._id);
                dispatch(setIsAuthenticated(isAuthenticated));
                dispatch(setUserDetails(responce));
                loaderService.hideLoader();
                router.push('/', { scroll: false });
            } else {
                alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
                loaderService.hideLoader();
            }
        } finally {
            loaderService.hideLoader();
        }
    }

    return (
        <section className='flex-1 flex items-center justify-center w-full bg-white'>
            <div className='w-[40%] bg-white border border-solid border-[#ccc] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] rounded-[5px] mt-8 mb-8'>
                <form className='m-8 flex flex-col justify-center' onSubmit={handleSubmit(onSubmit)}>
                    <div className='font-[600]'>Log In</div>
                    <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined" error={errors.email && errors.email.type == 'required' || errors.email && errors.email.type == 'pattern'}>
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput label="Email" type='text'
                            {...register('email', { required: true, pattern: { value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '' } })}
                        />
                        <FormHelperText>
                            {errors.email && errors.email.type == 'required' && 'Email is required.'}
                            {errors.email && errors.email.type == 'pattern' && 'Please enter a valid email'}
                        </FormHelperText>
                    </FormControl>
                    <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined" error={errors.password && errors.password.type == 'required' || errors.password && errors.password.type == 'minLength'}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            type={isPasswordVisible ? 'text' : 'password'}
                            label="Password"
                            {...register('password', { required: true, minLength: 8 })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" edge="end" onClick={() => showPassword(!isPasswordVisible)}>
                                        {isPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>
                            {errors.password && errors.password.type == 'required' && 'Password is required'}
                            {errors.password && errors.password.type == 'minLength' && 'Password is required'}
                        </FormHelperText>
                    </FormControl>
                    <Link href={'/forget-password'} className='flex ml-auto mt-0 cursor-pointer text-[blue]'>Forget password</Link>
                    <button type='submit' className='text-[#FFFFFF] border border-solid border-[#ccc] bg-[#fb641b] text-[14px] font-[600] rounded-[5px] h-[35px] mt-4'>
                        Log In
                    </button>
                </form>
            </div>
        </section>
    )
}

export default page