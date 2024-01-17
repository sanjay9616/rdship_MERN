"use client"
import './globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import * as React from "react";
import Loader from '@/components/Loader'
import { Provider } from 'react-redux'
import store from '@/stores/store'
import RouteGuard from '@/components/RouteGuard'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <RouteGuard >
            <main className='flex flex-col min-h-screen'>
              <Header />
              <div id="alert-message" className='absolute top-[5px] left-[60px] z-[1000] w-full flex justify-center'></div>
              <div id="loader" className='hidden'><Loader></Loader></div>
              <section className='flex-1 flex flex-col'>
                {children}
              </section>
              <Footer />
            </main>
          </RouteGuard>
        </Provider>
      </body>
    </html>
  )
}
