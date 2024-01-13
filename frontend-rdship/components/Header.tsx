"use client";
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaRegistered } from "react-icons/fa";



const Header = () => {

  return (
    <section className="sticky top-0 w-full z-50 bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)]">
      <div className='flex flex-row items-center bg-white pl-4 pt-2 pr-4'>
        <Link href={'/'}>Logo</Link>
        <div className='flex flex-row items-center justify-between w-1/3 border h-8 rounded ml-32'>
          <input type="text" className='focus:outline-none focus:ring-0 focus:border-searchBorder h-full w-full rounded-l pl-2 pr-2 text-[14px]' />
          <button type='button' className='pl-4 pr-4 text-lg bg-[#b81410] text-white font-medium h-full rounded-r'>
            <CiSearch className='font-medium rounded-r' />
          </button>
        </div>
        <div className='ml-auto mr-4 flex items-center'>
          <span className='mr-2 text-[#2874f0] font-medium'>Sanjay</span>
          <Fab className='text-[#2874f0] bg-[#F2F2F2] h-[35px] w-[35px] group relative'>
            <MdAccountCircle className='w-full h-full' />
            <div className='hidden group-hover:block absolute top-[35px] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
              <div className='bg-white flex flex-col items-start w-[140px] border border-solid border-[#ccc]'>
                <Link href={'/account/my-profile'} className='flex items-center text-[#333333db] font-[600] hover:text-[#2874f0] hover:bg-[#F2F2F2] w-full border-b border-solid border-[#ccc] p-[5px]'>
                  <MdAccountCircle className='h-[25px] w-[25px]' />
                  <div className='ml-2 text-[14px]'>My Profile</div>
                </Link>
                <Link href={'/'} className='flex items-center text-[#333333db] font-[600] hover:text-[#2874f0] hover:bg-[#F2F2F2] w-full border-b border-solid border-[#ccc] p-[5px]'>
                  <RiLogoutCircleFill className='h-[25px] w-[25px]' />
                  <div className='ml-2 text-[14px]' >Log Out</div>
                </Link>
                <Link href={'/login'} className='flex items-center text-[#333333db] font-[600] hover:text-[#2874f0] hover:bg-[#F2F2F2] w-full border-b border-solid border-[#ccc] p-[5px]'>
                  <RiLoginCircleFill className='h-[25px] w-[25px]' />
                  <div className='ml-2 text-[14px]'>Log In</div>
                </Link>
                <Link href={'/signup'} className='flex items-center text-[#333333db] font-[600] hover:text-[#2874f0] hover:bg-[#F2F2F2] w-full border-b border-solid border-[#ccc] p-[5px]'>
                  <FaRegistered className='h-[25px] w-[25px]' />
                  <div className='ml-2 text-[14px]'>Sign Up</div>
                </Link>
              </div>
            </div>
          </Fab>
        </div>
        <Link href={'/view-cart'} className='flex'>
          <Badge badgeContent={4} color="error" overlap="circular" className=''>
            <Fab className='text-[#2874f0] bg-[#F2F2F2] h-[45px] w-[45px] z-0'>
              <HiShoppingCart className='w-[60%] h-[60%]' />
            </Fab>
          </Badge>
        </Link>
      </div>
      <div className='flex flex-row items-center justify-around pl-4 pr-4 mt-2 bg-[#F2F2F2]'>
        <button type='button'>Grocery</button>
        <button type='button'>Medicine</button>
        <button type='button'>Home & Furniture</button>
        <button type='button'>Fashion</button>
        <button type='button'>Electronic</button>
        <button type='button'>Agricultural</button>
      </div>
    </section>
  )
}

export default Header