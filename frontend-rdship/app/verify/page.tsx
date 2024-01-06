import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <section className='flex-1 flex items-center justify-center w-full bg-white'>
            <div className='w-[40%] bg-white border border-solid border-[#ccc] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] rounded-[5px]'>
                <div className='m-8 flex flex-col justify-center'>
                    <div className='font-[600]'>Verify your account</div>
                    <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <InputLabel>Enter Email</InputLabel>
                        <OutlinedInput type='text' label="Enter Email" />
                        <FormHelperText>{false ? 'Email Is Required' : ''}</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <InputLabel>Enter Mobile Numer</InputLabel>
                        <OutlinedInput type='text' label="Enter Mobile Numer" />
                        <FormHelperText>{false ? 'Mobile Number Is Required' : ''}</FormHelperText>
                    </FormControl>
                    <button type='button' className='text-[#FFFFFF] border border-solid border-[#ccc] bg-[#fb641b] text-[14px] font-[600] rounded-[5px] h-[35px] mt-4'>
                        Verify
                    </button>
                </div>
            </div>
        </section>
    )
}

export default page