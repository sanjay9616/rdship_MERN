"use client"
import Category from '@/components/Category'
import Item from '@/components/Item'
import { MESSAGE } from '@/config/message'
import { AlertMessageService } from '@/services/alertmessage.service'
import { AuthService } from '@/services/auth.service'
import { HomeService } from '@/services/home.service'
import { LoaderService } from '@/services/loader.service'
import React, { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'

const categoryList: Array<any> = [
  { type: 'Grocery', url: '/assets/img/grocery/1.webp', routerLink: "/items/12" },
  { type: 'Medicines', url: '/assets/img/medicines/1.webp', routerLink: "/items/12" },
  { type: 'Furniture', url: '/assets/img/furniture/1.webp', routerLink: "/items/12" },
  { type: 'Electronics', url: '/assets/img/electronics/1.webp', routerLink: "/items/12" },
  { type: 'Fashion', url: '/assets/img/fashion/1.webp', routerLink: "/items/12" },
  { type: 'Agricultural', url: '/assets/img/agricultural/1.jpg', routerLink: "/items/12" },
]
const homeService = new HomeService();
const alertMessage = new AlertMessageService();
const loaderService = new LoaderService();

const Home = () => {

  const [recentlyViewItems, setRecentlyViewItems] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const _id: string = useSelector((state: any) => state.userReducer._id);

  useEffect(() => {
    const getHomeDetails = async () => {
      try {
        loaderService.showLoader();
        const res = await homeService.getHomeDetails(_id)
        if (res?.status == 200 && res?.success) {
          setRecentlyViewItems(res?.data?.recentlyViewItems);
          setTopSellingProducts(res?.data?.topSellingProducts);
          loaderService.hideLoader();
        } else {
          alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
          loaderService.hideLoader();
        }
      } finally {
        loaderService.hideLoader();
      }
    }
    getHomeDetails();
  }, [_id])

  return (
    <section>
      <div className='bg-white'>
        <div className='flex items-center justify-center p-4 border-t border-b border-solid border-[#F2F2F2]'>
          <div className='text-[#2874f0] font-[600] text-[22px] leading-[30px] tracking-[.5px]'>
            OUR CATEGORIES
          </div>
        </div>
        <div className='flex p-[1rem] scrollbar'>
          {categoryList.map((category: any, i: number) => {
            return (
              <Category {...category} key={i} />
            )
          })}
        </div>
      </div>
      {recentlyViewItems?.length &&
        <div className='bg-white'>
          <div className='flex items-center justify-center p-4 border-t border-b border-solid border-[#F2F2F2]'>
            <div className='text-[#2874f0] font-[600] text-[22px] leading-[30px] tracking-[.5px]'>
              RECENTLY VIEWED
            </div>
          </div>
          <div className='flex p-[1rem] scrollbar'>
            {recentlyViewItems.map((item: any, i: number) => {
              return (
                <Item {...item} key={i} />
              )
            })}
          </div>
        </div>
      }
      {topSellingProducts?.length &&
        <div className='bg-white'>
          <div className='flex items-center justify-center p-4 border-t border-b border-solid border-[#F2F2F2]'>
            <div className='text-[#2874f0] font-[600] text-[22px] leading-[30px] tracking-[.5px]'>
              TOP SELLING PRODUCTS
            </div>
          </div>
          <div className='flex p-[1rem] scrollbar'>
          {topSellingProducts.map((item: any, i: number) => {
              return (
                <Item {...item} key={i} />
              )
            })}
          </div>
        </div>
      }
    </section>
  )
}

export default Home
