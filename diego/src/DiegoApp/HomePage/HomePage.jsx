import { useContext, useEffect, useState } from 'react'
import './HomePageStyle/homePageStyle.css'
import DescrptionList from './HomePageComponents/DescrptionList'

import DogImgModal from './HomePageComponents/DogImgModal'
import { DogContext } from '../app/context/DogContext'
import { UserContext } from '../app/context/UserContext'

export default function HomePage() {

    const { myDogData } = useContext(DogContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log("user:",user);
    })

    useEffect(() => {
        console.log("mydog data" , myDogData);
    })


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
                            <img src='https://images.dog.ceo/breeds/hound-blood/n02088466_7046.jpg' alt="" />
                            <span>{myDogData.name}</span>
                        </div>
                        <div onClick={openModal} className="dog-main-img">
                            <img src="https://images.dog.ceo/breeds/hound-blood/n02088466_7046.jpg" alt="" />
                        </div>
                            <DescrptionList/>
                            

                     <div className='handleLikesContainer'>
                    <button className='likeBtn homePageBtn'>Like</button>
                    <button className='passBtn homePageBtn'>Pass</button>
                    </div>

                    </div>

                </div>
                <DogImgModal/>


            </div>

        </>
    )
    
};
