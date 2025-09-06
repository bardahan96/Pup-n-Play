import { useContext, useEffect, useState } from 'react'
import './HomePageStyle/homePageStyle.css'
import DescrptionList from './HomePageComponents/DescrptionList'
import { DogContext } from '../app/context/DogContext'
import DogImgModal from './HomePageComponents/DogImgModal'

export default function HomePage() {

    //demo state (will be in context)
    const [dog, setDog] = useState({
        name: "Tiger",
        location: "Haifa",
    })

    const { setIsPop, isPop } = useContext(DogContext)

    function openModal () {
        setIsPop(true)
    }
    useEffect(() => {
        console.log(isPop);
    })



    return (
        <>
            <div className="homePage-container">
                <div className="main-profile">
                    <div className="main-profile-wrap">

                        <div className="main-profile-name">
                            <img src='https://images.dog.ceo/breeds/hound-blood/n02088466_7046.jpg' alt="" />
                            <span>bar dahan</span>
                        </div>
                        <div onClick={openModal} className="dog-main-img">
                            <img src="https://images.dog.ceo/breeds/hound-blood/n02088466_7046.jpg" alt="" />
                        </div>
                            <DescrptionList/>
                    </div>
                </div>
                <DogImgModal/>

            </div>

        </>
    )
    
};
