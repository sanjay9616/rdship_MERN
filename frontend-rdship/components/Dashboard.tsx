"use client"
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdAccountBox } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoPower } from "react-icons/io5";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Dashboard = () => {
    const pathname = usePathname()

    return (
        <div className='m-4 w-[20%]'>
            <div className='flex items-center p-[10px] bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
                <div className='flex items-center justify-center'>
                    <CgProfile className='h-[45px] w-[45px] text-[#b81410]' />
                </div>
                <div className='ml-4'>
                    <div className='text-[#b81410]'>Name</div>
                    <div className='text-[#b81410] text-[16px] font-[600] capitalize'>Sanjay Kumar</div>
                </div>
            </div>
            <div className='mt-4 bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
                <Link href='/account/my-profile' className={`flex items-center p-[10px] border-b border-solid border-[#ccc] cursor-pointer hover:text-[#b81410] ${pathname === '/account/my-profile' ? 'text-[#b81410]' : ''}`}>
                    <div className='flex items-center justify-center'>
                        <MdAccountBox className='h-[25px] w-[25px]' />
                    </div>
                    <div className='ml-4'>My Profile</div>
                </Link>
                <Link href='/account/my-orders' className={`flex items-center p-[10px] border-b border-solid border-[#ccc] cursor-pointer hover:text-[#b81410] ${pathname === '/account/my-orders' ? 'text-[#b81410]' : ''}`}>
                    <div className='flex items-center justify-center'>
                        <CiViewList className='h-[25px] w-[25px]' />
                    </div>
                    <div className='ml-4'>My Orders</div>
                </Link>
                <Link href='/account/my-wishlist' className={`flex items-center p-[10px] border-b border-solid border-[#ccc] cursor-pointer hover:text-[#b81410] ${pathname === '/account/my-wishlist' ? 'text-[#b81410]' : ''}`}>
                    <div className='flex items-center justify-center'>
                        <MdFavorite className='h-[25px] w-[25px]' />
                    </div>
                    <div className='ml-4'>My Wishlist</div>
                </Link>
                <Link href='/account/my-coupons' className={`flex items-center p-[10px] border-b border-solid border-[#ccc] cursor-pointer hover:text-[#b81410] ${pathname === '/account/my-coupons' ? 'text-[#b81410]' : ''}`}>
                    <div className='flex items-center justify-center'>
                        <MdAccountBalanceWallet className='h-[25px] w-[25px]' />
                    </div>
                    <div className='ml-4'>My Coupons</div>
                </Link>
                <Link href='/account/all-notifications' className={`flex items-center p-[10px] border-b border-solid border-[#ccc] cursor-pointer hover:text-[#b81410] ${pathname === '/account/all-notifications' ? 'text-[#b81410]' : ''}`}>
                    <div className='flex items-center justify-center'>
                        <IoMdNotifications className='h-[25px] w-[25px]' />
                    </div>
                    <div className='ml-4'>All Notifications</div>
                </Link>
                <Link href='/' className={`flex items-center p-[10px] border-b border-solid border-[#ccc] cursor-pointer hover:text-[#b81410] ${pathname === '/' ? 'text-[#b81410]' : ''}`}>
                    <div className='flex items-center justify-center'>
                        <IoPower className='h-[25px] w-[25px]' />
                    </div>
                    <div className='ml-4'>Logout</div>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard