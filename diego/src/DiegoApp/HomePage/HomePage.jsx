import { useContext, useEffect, useState } from 'react'
import './HomePageStyle/homePageStyle.css'
import DescrptionList from './HomePageComponents/DescrptionList'

import DogImgModal from './HomePageComponents/DogImgModal'
import { DogContext } from '../app/context/DogContext'
import { UserContext } from '../app/context/UserContext'
import { Outlet } from 'react-router'

export default function HomePage() {

    const { myDogData ,dogs } = useContext(DogContext);
    const { user } = useContext(UserContext);

  

    const { setIsPop, isPop } = useContext(DogContext)

    function openModal () {
        setIsPop(true)
    }

    return (
        <>

        
            <div className="homePage-container">
                <div className="main-profile">
                    <div className="main-profile-wrap">

                        <div className="main-profile-name">
<<<<<<< HEAD
                            <img src='https://images.dog.ceo/breeds/hound-blood/n02088466_7046.jpg' alt="" />
                            <span>{myDogData?.name}</span>
=======
                            <img src={myDogData.imgs[0]} alt="" />
                            <span>{myDogData.name}</span>
>>>>>>> origin/HomePage-branch
                        </div>
                            <Outlet/>

                    </div>

                </div>
                <DogImgModal/>


            </div>

        </>
    )
    
};
