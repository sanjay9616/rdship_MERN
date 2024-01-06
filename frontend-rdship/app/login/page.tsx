"use client";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Link from 'next/link';
import React, { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const page = () => {

    const [isPasswordVisible, setPasswordShow] = useState(false);

    function showPassword(value: boolean) {
        setPasswordShow(value);
    }
    return (
        <section className='flex-1 flex items-center justify-center w-full bg-white'>
            <div className='w-[40%] bg-white border border-solid border-[#ccc] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] rounded-[5px]'>
                <div className='m-8 flex flex-col justify-center'>
                    <div className='font-[600]'>Log In</div>
                    <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput type='text' label="Email" />
                        <FormHelperText>{false ? 'Email Is Required' : ''}</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput id="outlined-adornment-password" type={isPasswordVisible ? 'text' : 'password'} label="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" edge="end" onClick={() => showPassword(!isPasswordVisible)}>
                                        {isPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{false ? 'Password Is Required' : ''}</FormHelperText>
                    </FormControl>
                    <Link href={'/forget-password'} className='flex ml-auto mt-0 cursor-pointer text-[blue]'>Forget password</Link>
                    <button type='button' className='text-[#FFFFFF] border border-solid border-[#ccc] bg-[#fb641b] text-[14px] font-[600] rounded-[5px] h-[35px] mt-4'>
                        Log In
                    </button>
                </div>
            </div>
        </section>
    )
}

export default page