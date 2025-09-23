import { useContext, useEffect, useState } from 'react'
import './HomePageStyle/homePageStyle.css'
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
                            
                            <img src={myDogData.imgs?.[0] || ''} alt="" />
                            <span>{myDogData.name || 'No name'}</span>
                        </div>
                        <div className="render_dogs_container">
                            <Outlet/>
                        </div>

                    </div>

                </div>
                


            </div>

        </>
    )
    
};
