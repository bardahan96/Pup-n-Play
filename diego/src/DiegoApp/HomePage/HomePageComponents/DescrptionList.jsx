import { useState } from "react"
import '../HomePageStyle/HomePageStyle.css'


export default function DescrptionList() {

    const [hobbies, setHobbies] = useState([
        "running", "bite ppl", "sleeping", "bar" , "sdfs", "asdasd", "asdasdasdasd"
    ])
    const [dog, setDog] = useState({
        name: "Tiger",
        location: "Haifa",
    })

    return (
        <>
            <div className="profile-descrption">
                <div className='profile-descrption-header'>
                    <h3>{dog.name}</h3>
                    <div>{dog.location}</div>
                </div>
        
                <div className="descrption-list">
                    {hobbies.map((h) => {
                        return (
                        <div className='hobbies' > 
                            <span className='infoContainer'>{h}</span>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
    
};
