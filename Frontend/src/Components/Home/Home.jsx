import React, { useContext } from 'react'
import HowItWorks from './HowItWorks';
import PopularCategories from './PopularCategories';
import PopularCompanies from './PopularCompanies';

const Home = () => {
  const {isAuthorized}=useContext(context);
  if(!isAuthorized){
    return <Navigate to={'/login'}/>
  }
  return (
    <>
    <section className="homePage"> <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section></>
  )
}

export default Home;