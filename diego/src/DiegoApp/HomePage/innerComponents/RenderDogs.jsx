import { UserContext } from "../../app/context/UserContext";
import { useContext } from "react";
import { DogContext } from "../../app/context/DogContext";
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";


export default function RenderDogs({ dogs }) {
    // const { user, signUpDB, onChangeUserData } = useContext(UserContext);
  //   const {getAllDogs,signedIn, setSignedIn,  myDogData,  addDogForUser, isPop, dogs, setIsPop, dog, onChangeDogData } = useContext(DogContext)
    
  const [remainingDogs, setRemainingDogs] = useState([...dogs]); // עותק של הכלבים שטרם הוצגו
  const [currentDog, setCurrentDog] = useState();

  console.log(remainingDogs);

  async function addLikeToDog(dogThatILike, currenUserId) {
  try {
    const dogRef = doc(db, "dogs", dogThatILike);

    await updateDoc(dogRef, {
      likes: arrayUnion(currenUserId),
    });

    console.log("Like added successfully");
  } catch (error) {
    console.error("Error adding like:", error);
  }
}

  function handleLike(){
     console.log("like");
     addLikeToDog(currentDog,"VqFzxhGI8nbuzGQrzUMLiqOOpqn1") //(המשתמש הנוכחי, הכלב שעושים לו לייק)
     
    handleNextDog();
  }

  const handleNextDog = () => {
    if (remainingDogs.length === 0) {
      setCurrentDog(null); // כל הכלבים הוצגו
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingDogs.length);
    const nextDog = remainingDogs[randomIndex];

    // עדכון הכלב הנוכחי והסרתו מהרשימה
    setCurrentDog(nextDog);
    setRemainingDogs((prev) => prev.filter((_, i) => i !== randomIndex));
  };

  return (
    <>
      <div>
        {currentDog ? (
          <div>
            <h2>{currentDog}</h2>
            <img src={currentDog.imageUrl} alt={currentDog.name} width="200" />
            {/* הוסף עוד שדות כמו גזע, גיל, וכו' אם יש */}
          </div>
        ) : (
          <p>{remainingDogs.length === 0 ? "נגמרו הכלבים להצגה" : "לחץ כדי להתחיל"}</p>
        )}

        {/* <button onClick={handleNextDog}>{remainingDogs.length === 0 ? "התחל מחדש" : "הצג כלב הבא"}</button> */}
        <button onClick={handleNextDog}>Dislike</button>
        <button onClick={handleLike}>Like</button>
      </div>
    </>
  );
}
