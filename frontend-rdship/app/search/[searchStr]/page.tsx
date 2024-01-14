"use client"
import React from 'react'
import Items from '@/components/Items';

const page = (props: any) => {

    return (
        <section>
            <Items {...props} />
        </section>
    )
}

export default page