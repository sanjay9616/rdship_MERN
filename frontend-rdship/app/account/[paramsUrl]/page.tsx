import AllNotifications from '@/components/AllNotifications';
import Dashboard from '@/components/Dashboard';
import MyCoupons from '@/components/MyCoupons';
import MyOrders from '@/components/MyOrders';
import MyProfile from '@/components/MyProfile';
import MyWishlist from '@/components/MyWishlist';
import React from 'react'

const page = ({ params }: { params: { paramsUrl: string } }) => {

  const getComponent = (paramsUrl: string) => {
    switch (paramsUrl) {
      case 'my-profile':
        return <MyProfile />
        break;
      case 'my-orders':
        return <MyOrders />
        break;
      case 'my-wishlist':
        return <MyWishlist />
        break;
      case 'my-coupons':
        return <MyCoupons />
        break;
      case 'all-notifications':
        return <AllNotifications />
        break;
      case 'logout':
        return 'logout'
        break;
    }
  }

  return (
    <section className='flex w-full'>
      <Dashboard />
      <div className='mt-4 mr-4 mb-4 w-[80%]'>{getComponent(params.paramsUrl) || '404 | This page could not be found.'}</div>
    </section>
  )
}

export default page