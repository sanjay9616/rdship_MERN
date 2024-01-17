"use client";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import http from '../service/httpService'
import { ApiService } from '../../services/api.service'
import EndPoint from '../constant/EndPoint';
import { AuthService } from '@/services/auth.service';
import { AlertMessageService } from '@/services/alertmessage.service';
import { MESSAGE } from '@/config/message';
type form = {
    email: string,
    mobile: string,
    password: string,
    reEnterPassword: string
}
const alertMessage = new AlertMessageService();

const page = () => {
    const { register, handleSubmit, watch, formState: { errors } ,reset} = useForm<form>()
    const [clearFrom,setClearForm] = useState<number>(1); 

    const [isPasswordVisible, setPasswordShow] = useState(false);
    const [isRePasswordVisible, setRePasswordShow] = useState(false);

    function showPassword(value: boolean) {
        setPasswordShow(value);
    }

    function showRePassword(value: boolean) {
        setRePasswordShow(value);
    }
    function validatePassword(data: string) {
        return watch().password !== data ? "PassWord Does Not Match" : true;

    }
    function clearForm(){
        console.log("called reset")
        reset({
            email: '',
            mobile: '',
            password: '',
            reEnterPassword: ''
        })
        setClearForm(preState=>preState+1);
    }

    function onSubmit(data: any) {
        const authService = new AuthService();
        console.log(data);
        (async () => {
            try {
                const response = await authService.signUp(data)
                console.log(response)
                if (response?.status == 200 && response?.success) {
                    alertMessage.addSuccess(MESSAGE.SUCCESS.ACCOUNT_CREATED).show();
                    clearForm()
                } else {
                    const message = response.message;
                    alertMessage.addError(message).show();
                }
            }
            catch (err:any) {
                console.log("error=",err)
                alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
            }
        })()

    }
   
    return (
        <section className='flex-1 flex items-center justify-center w-full bg-white'>
            <div className='w-[40%] bg-white border border-solid border-[#ccc] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] rounded-[5px]'>
                <div className='m-8 flex flex-col justify-center'>
                    <div className='font-[600]'>Sign Up</div>
                    <div className='flex items-center justify-between'>
                        <FormControl sx={{ mt: 2, width: '49%' }} variant="outlined">
                            <InputLabel>Enter Email</InputLabel>
                            <OutlinedInput
                                {...register("email", {
                                    required: "Email Should be Required",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid Email Format" }
                                })}
                                type='text' label="Enter Email" />
                            <FormHelperText>{errors.email ? errors.email.message : ''}</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ mt: 2, width: '49%' }} variant="outlined">
                            <InputLabel>Enter Mobile</InputLabel>
                            <OutlinedInput
                                {...register("mobile", { required: "Mobile Should be Required", pattern: { value: /^\d+$/, message: "Mobile Number Should contain only numeric character" } })}
                                type='text' label="Enter Mobile" />
                            <FormHelperText>{errors.mobile ? errors.mobile.message : ''}</FormHelperText>
                        </FormControl>
                    </div>
                    <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Enter Password</InputLabel>
                        <OutlinedInput
                            {...register("password", { required: "Password is Required", pattern: { value: /^.{9,}$/, message: "password Should be Greater than 9 character" } })}
                            id="outlined-adornment-password" type={isPasswordVisible ? 'text' : 'password'} label="Enter Password" placeholder='Enter Password'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" edge="end" onClick={() => showPassword(!isPasswordVisible)}>
                                        {isPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>password re</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Re Enter Password</InputLabel>
                        <OutlinedInput
                            {...register("reEnterPassword", { required: "Re Enter Password Required", validate: (data) => validatePassword(data) })}
                            id="outlined-adornment-password" type={isRePasswordVisible ? 'text' : 'password'} label="Re Enter Password" placeholder='Re Enter Password'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" edge="end" onClick={() => showRePassword(!isRePasswordVisible)}>
                                        {isRePasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>reenter password</FormHelperText>
                    </FormControl>
                    <div className='flex items-center'>
                        <div className='font-[500]'>Don't have an account?</div>
                        <Link href={'/login'} className='flex ml-4 mt-0 cursor-pointer text-[blue]'>Log In</Link>
                    </div>
                    <button onClick={handleSubmit(onSubmit)} type='button' className='text-[#FFFFFF] border border-solid border-[#ccc] bg-[#fb641b] text-[14px] font-[600] rounded-[5px] h-[35px] mt-4'>
                        Submit
                    </button>
                </div>
            </div>
        </section>
    )
}

export default page

