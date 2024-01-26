"use client"
import React, { useEffect } from 'react'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoIosAddCircle } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { AuthService } from '@/services/auth.service';


const MyProfile = () => {

  const user = useSelector((state: any) => state.userReducer);
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset, control } = useForm();

  useEffect(() => {
    setValue('name', user.name);
    setValue('gender', user.gender);
    setValue('email', user.email);
    setValue('mobileNo', user.mobileNo);
    for (let i = 0; i < user.address.length; i++) {
      setValue(`address.${i}.area`, user.address[i].area);
      setValue(`address.${i}.city`, user.address[i].city);
      setValue(`address.${i}.pinCode`, user.address[i].pinCode);
    }
  }, [user, useForm])

  const demo = () => {
    console.log('demo', watch())
  }

  return (
    <form>
      <div className='p-4 bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] relative'>
        <div className='absolute top-[15px] z-[9] left-[469px] bg-[#c6e0ed] rotate-[-45deg] flex items-center justify-center h-[100px] w-[100px] rounded-[50%] opacity-[0.4] capitalize text-[#b81410]'>
          Verified
        </div>
        <div className='mb-4 text-[18px] font-[600]'>
          <span>Personal Information</span>
          <Button type='button' onClick={demo} className='ml-4 pl-4 pr-4 text-[#2874f0] hover:text-[#2874f0] bg-[#F2F2F2] hover:bg-[#F2F2F2] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] text-[12px] h-[25px]'>Edit</Button>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel>Full Name</InputLabel>
            <OutlinedInput type='text' label="Full Name"
              value={watch().name || ''}
              {...register('name')}
            />
            <FormHelperText>{false ? 'Full Name Is Required' : ''}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel>Your Gender</InputLabel>
            <Select label="Your Gender"
              value={watch().gender || ''}
              {...register('gender')}
            >
              <MenuItem key={'male'} value={'male'}>Male</MenuItem>
              <MenuItem key={"female"} value={'female'}>Female</MenuItem>
            </Select>
            <FormHelperText>{false ? 'Full Name Is Required' : ''}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel>Email Address</InputLabel>
            <OutlinedInput type='text' label="Email Address"
              value={watch().email || ''}
              {...register('email')}
            />
            <FormHelperText>{false ? 'Email Address Is Required' : ''}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel>Mobile Number</InputLabel>
            <OutlinedInput type='text' label="Mobile Number"
              value={watch().mobileNo || ''}
              {...register('mobileNo')}
            />
            <FormHelperText>{false ? 'Mobile Number Is Required' : ''}</FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className='mt-4 p-4 bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
        <div className='mb-4 text-[18px] font-[600]'>
          <span>Delivery Addresses</span>
          <Button type='button' onClick={demo} className='ml-4 pl-4 pr-4 text-[#2874f0] hover:text-[#2874f0] bg-[#F2F2F2] hover:bg-[#F2F2F2] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] text-[12px] h-[25px]'>Edit</Button>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S. No.</TableCell>
                  <TableCell align="center">Area, Street, Sector, Village</TableCell>
                  <TableCell align="center">City/District/Town</TableCell>
                  <TableCell align="center">Pin Code</TableCell>
                  <TableCell align="center">	Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {watch("address") && watch("address").map((formGroup: any, i: any) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{i + 1}</TableCell>
                    <TableCell align="center">
                      <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <OutlinedInput type='text'
                          {...register(`address.${i}.area` as const)}
                        />
                        <FormHelperText>{false ? 'Area Is Required' : ''}</FormHelperText>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <OutlinedInput type='text'
                          {...register(`address.${i}.city` as const)}
                        />
                        <FormHelperText>{false ? 'City Is Required' : ''}</FormHelperText>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <OutlinedInput type='text'
                          {...register(`address.${i}.pinCode` as const)}
                        />
                        <FormHelperText>{false ? 'City Is Required' : ''}</FormHelperText>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <div className='flex items-center pl-2 pr-2'>
                        <button type='button' className='h-[25px] w-[25px] flex items-center justify-center text-[#2C82DB]'>
                          <IoIosAddCircle className='w-full h-full' />
                        </button>
                        <button type='button' className='h-[25px] w-[25px] flex items-center justify-center text-[#2C82DB] ml-auto mr-4'>
                          <IoMdRemoveCircle className='h-full w-full' />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </form>
  )
}

export default MyProfile