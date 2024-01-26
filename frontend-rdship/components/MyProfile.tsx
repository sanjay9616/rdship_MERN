"use client"
import React, { useEffect } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoIosAddCircle } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";

import { AuthService } from '@/services/auth.service';


const MyProfile = () => {
  // call user Detail API
  useEffect(() => {
    (async () => {
      try {
        const authService = new AuthService();
        let result = await authService.getUserDetail("adityamaurya9717@gmail.com")
        console.log("userDetail", result)
      }
      catch (err) {
        console.log(err)
      }
    })()

  }, [])

  const rows: Array<any> = [
    { name: 'Frozen yoghurt', calories: 156, fat: 9.0, carbs: 7, protein: 4.0 },
    { name: 'Frozen yoghurt', calories: 156, fat: 9.0, carbs: 7, protein: 4.0 },
    { name: 'Frozen yoghurt', calories: 156, fat: 9.0, carbs: 7, protein: 4.0 },
  ];
  return (
    <section>
      <div className='p-4 bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] relative'>
        <div className='absolute top-[15px] z-[9] left-[469px] bg-[#c6e0ed] rotate-[-45deg] flex items-center justify-center h-[100px] w-[100px] rounded-[50%] opacity-[0.4] capitalize text-[#b81410]'>
          Verified
        </div>
        <div className='mb-4 text-[18px] font-[600]'>
          <span>Personal Information</span>
          <button className='ml-4 pl-4 pr-4 text-[#2874f0] bg-[#F2F2F2] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] text-[12px] h-[25px]'>Edit</button>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel>Full Name</InputLabel>
            <OutlinedInput type='text' label="Full Name" />
            <FormHelperText>{false ? 'Full Name Is Required' : ''}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel>Your Gender</InputLabel>
            <Select label="Your Gender">
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
            </Select>
            <FormHelperText>{false ? 'Full Name Is Required' : ''}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel>Email Address</InputLabel>
            <OutlinedInput type='text' label="Email Address" />
            <FormHelperText>{false ? 'Email Address Is Required' : ''}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel>Mobile Number</InputLabel>
            <OutlinedInput type='text' label="Mobile Number" />
            <FormHelperText>{false ? 'Mobile Number Is Required' : ''}</FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className='mt-4 p-4 bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
        <div className='mb-4 text-[18px] font-[600]'>
          <span>Delivery Addresses</span>
          <button className='ml-4 pl-4 pr-4 text-[#2874f0] bg-[#F2F2F2] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] text-[12px] h-[25px]'>Edit</button>
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
                {rows.map((row, i) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{i + 1}</TableCell>
                    <TableCell align="center">
                      <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <OutlinedInput type='text' />
                        <FormHelperText>{false ? 'Area Is Required' : ''}</FormHelperText>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <OutlinedInput type='text' />
                        <FormHelperText>{false ? 'City Is Required' : ''}</FormHelperText>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                        <OutlinedInput type='text' />
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
    </section>
  )
}

export default MyProfile