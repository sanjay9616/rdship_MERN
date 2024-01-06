import Filters from '@/components/Filters'
import Item from '@/components/Item'
import React from 'react'
import Pagination from '@mui/material/Pagination';

const page = ({ params }: { params: { itemId: string } }) => {
    return (
        <section>
            <div>
                <Filters />
            </div>
            <div className='mr-2 ml-2'>
                <div className='flex items-center flex-wrap bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] rounded-[5px] mt-2'>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
                <div className='flex items-center justify-between p-[5px] rounded-[5px] mb-2 mt-2 bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] rounded-[5px]'>
                    <div>Showing 10 out of 26 products</div>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </div>
            </div>
        </section>
    )
}

export default page