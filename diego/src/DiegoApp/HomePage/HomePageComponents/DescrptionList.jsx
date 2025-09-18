import { useContext, useState } from "react"
import '../HomePageStyle/HomePageStyle.css'
import { DogContext } from "../../app/context/DogContext"


export default function DescrptionList() {

const { myDogData } = useContext(DogContext)

    return (
        <>
            <div className="profile-descrption">
                <div className='profile-descrption-header'>
                    <h3>{myDogData.name}</h3>
                    <div>{myDogData.location}</div>
                </div>
        
                <div className="descrption-list">
                    <span>{myDogData.bread}</span>
                    <span>{myDogData.age}</span>
                    
                </div>
            </div>
        </>
    )
    
};
