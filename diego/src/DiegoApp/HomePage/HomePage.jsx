import { useContext, useEffect, useState } from 'react'
import './HomePageStyle/homePageStyle.css'
import { DogContext } from '../app/context/DogContext'
import { UserContext } from '../app/context/UserContext'
import { Outlet } from 'react-router'

export default function HomePage() {

    const { myDogData , dogsToMeet } = useContext(DogContext);
    const { user } = useContext(UserContext);

    const [remainingDogs, setRemainingDogs] = useState([]); // עותק של הכלבים שטרם הוצגו
    const [dogIMightLike, setDogIMightLike] = useState();
    const [match, setMatch] = useState(false);
    const [matchList, setMatchList] = useState([]);

    // Initialize remainingDogs when dogsToMeet changes
    useEffect(() => {
        setRemainingDogs([...dogsToMeet]);
    }, [dogsToMeet]);

    useEffect(() => {
        if (myDogData?.matches) {
          setMatchList(myDogData.matches);
        } else {
          setMatchList([]);
        }
      }, [myDogData?.matches]);

    // Update matchList whenever myDogData changes (including when new matches are added)
    useEffect(() => {
        if (myDogData?.matches) {
          setMatchList([...myDogData.matches]);
        }
      }, [myDogData]);
  

    const { setIsPop, isPop } = useContext(DogContext)

    function openModal () {
        setIsPop(true)
    }

    function handleNextDog() {
        if (remainingDogs.length === 0) {
            setDogIMightLike(null);
            return;
        }

        const randomIndex = Math.floor(Math.random() * remainingDogs.length);
        const nextDog = remainingDogs[randomIndex];

        setDogIMightLike(nextDog);
        setRemainingDogs((prev) => prev.filter((_, i) => i !== randomIndex));
    }

    // Initialize first dog when remainingDogs is populated
    useEffect(() => {
        if (remainingDogs.length > 0 && !dogIMightLike) {
            handleNextDog();
        }
    }, [remainingDogs.length]);

 
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
                            <Outlet context={{
                                remainingDogs,
                                dogIMightLike,
                                setDogIMightLike,
                                setMatch,
                                setRemainingDogs,
                                match,
                                matchList,
                                handleNextDog
                            }}  />
                        </div>

                    </div>

                </div>
                


            </div>

        </>
    )
    
};
