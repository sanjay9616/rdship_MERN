"use client"
import { MESSAGE } from '@/config/message';
import { AlertMessageService } from '@/services/alertmessage.service';
import { HomeService } from '@/services/home.service';
import { LoaderService } from '@/services/loader.service';
import { setWishList } from '@/stores/reducers/userSlice';
import { Button } from '@mui/material';
import React from 'react'
import { IoIosStar } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import Currency from './Currency';
import Decimal from './Decimal';

const homeService = new HomeService();
const alertMessage = new AlertMessageService();
const loaderService = new LoaderService();

const MyWishlist = () => {

  const wishList = useSelector((state: any) => state.userReducer.wishList);
  const userId = useSelector((state: any) => state.userReducer._id);
  const dispatch = useDispatch();

  const deleteFavoriteItem = async (itemId: string) => {
    try {
      loaderService.showLoader();
      const res = await homeService.deleteFavoriteItem(userId, itemId);
      if (res?.status == 200 && res?.success) {
        loaderService.hideLoader();
        alertMessage.addSuccess(MESSAGE.SUCCESS.ITEM_DELETED).show();
        dispatch(setWishList(res?.data));
      } else {
        alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
        loaderService.hideLoader();
      }
    } finally {
      loaderService.hideLoader();
    }
  }

  return (
    <section>
      <div className='bg-white p-4 text-[#111112] text-[16px] font-[600] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>My WishList ({wishList.length})</div>
      {wishList &&
        wishList.map((item: any) => {
          return (
            <div className='cursor-pointer bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] mt-2 p-4 flex'>
              <div className='w-[130px] h-[130px] flex items-center justify-center m-auto'>
                <img src="/1.webp" alt="" className='max-w-[100%] max-h-[100%]' />
              </div>
              <div className='ml-4 mr-4 w-[calc(100%-150px-1rem)]'>
                <div className='flex items-center justify-between'>
                  <div className='font-[600] text-[16px] flex-1 truncate'>
                    <span className=''>{item?.itemDescription} </span>
                    {
                      Object.entries(item.activeProduct).map(([key, val]: any, i: number) => {
                        return (
                          <span key={i}> ({(key).split('_').join(' ')}: {val}) </span>
                        )
                      }
                      )
                    }
                  </div>
                  <Button onClick={() => {deleteFavoriteItem(item._id)}} type='button' className='ml-4 h-[30px] text-[#498de5] hover:text-[#498de5] border border-solid border-[#498de5] bg-[#F2F2F2] hover:bg-[#F2F2F2] text-[12px] rounded-[4px] pl-4 pr-4'>Remove</Button>
                </div>
                <div className='mt-2 flex'>
                  <div className='flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                    <span>3.7</span>
                    <IoIosStar className='mb-[1px]' />
                  </div>
                  <div className='ml-2 text-[#878787] font-[500]'>{item?.ratingsAndReviewsDetails?.numberOfRating || 0} Ratings</div>
                  <div className='ml-2 text-[#878787] font-[500]'>&</div>
                  <div className='ml-2 text-[#878787] font-[500]'>{item?.ratingsAndReviewsDetails?.numberOfReview || 0} Reviews</div>
                </div>
                <div className='mt-2 text-[#388e3c] font-[600]'>Extra <Currency value={item.markedPrice - item.sellingPrice} /> off</div>
                <div className='mt-0 flex items-center'>
                  <div className='text-[28px] font-[600] text-[#212121]'><Currency value={item.sellingPrice} /></div>
                  <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'><Currency value={item.markedPrice} /></div>
                  <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'><Decimal value={item.discountPercent} />% off</div>
                </div>
              </div>
            </div>
          )
        })
      }
    </section>
  )
}

export default MyWishlist