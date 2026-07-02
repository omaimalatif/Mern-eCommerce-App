import React from 'react'
import UserLayout from '../components/Layout/UserLayout'
import HomeProductsSection from '../components/HomeProductsSection'
import Footer from '../components/Common/Footer'


const Home = () => {
  return (
    <>
    <UserLayout />
    <HomeProductsSection />
    <Footer />
    </>
  )
}

export default Home