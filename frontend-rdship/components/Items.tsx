"use client"
import { MESSAGE } from '@/config/message';
import { AlertMessageService } from '@/services/alertmessage.service';
import { HomeService } from '@/services/home.service';
import { LoaderService } from '@/services/loader.service';
import { Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Filters from './Filters'
import Item from './Item';

const homeService = new HomeService();
const alertMessage = new AlertMessageService();
const loaderService = new LoaderService();

const Items = (props: any) => {

    const [productInfo, setProductInfo] = useState<any>({});
    const [payload, setPayload] = React.useState<any>({
        searchStr: props.params?.searchStr?.length ? props.params.searchStr : null,
        category: props.params?.category?.length ? props.params.category : [],
        subCategories: [],
        brands: [],
        sellingPrice: null,
        rating: null,
        discountPercent: null,
        itemsPerPage: 10,
        currentPage: 1
    })

    const getProductDetails = async () => {
        try {
            loaderService.showLoader();
            const res = await homeService.getProductDetails(payload)
            if (res?.status == 200 && res?.success) {
                setProductInfo(res?.data);
                loaderService.hideLoader();
            } else {
                alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
                loaderService.hideLoader();
            }
        } finally {
            loaderService.hideLoader();
        }
    }

    const handleParentCallback = (message: any) => {
        console.log('handleParentCallback', message)
    }

    useEffect(() => {
        getProductDetails();
    }, [props])

    return (
        <section>
            <div>
                {payload && productInfo?.subCategories && productInfo?.brands &&
                    <Filters payload={...payload} subCategories={productInfo?.subCategories} brands={...productInfo?.brands} parentCallback={handleParentCallback} />
                }
            </div>
            <div className='mr-2 ml-2'>
                <div className='flex items-center flex-wrap bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] rounded-[5px] mt-2'>
                    {productInfo.items && productInfo.items.map((item: any, i: number) => {
                        return (
                            <Item {...item} key={i} />
                        )
                    })}
                </div>
                <div className='flex items-center justify-between p-[5px] rounded-[5px] mb-2 mt-2 bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] rounded-[5px]'>
                    <div>Showing 10 out of 26 products</div>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </div>
            </div>
        </section>
    )
}

export default Items