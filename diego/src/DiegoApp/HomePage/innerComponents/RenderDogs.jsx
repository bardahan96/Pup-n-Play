import { UserContext } from "../../app/context/UserContext";
import { useContext } from "react";
import { DogContext } from "../../app/context/DogContext";
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect } from "react";

export default function RenderDogs() {
  // const { user, signUpDB, onChangeUserData } = useContext(UserContext);
  const { getAllDogs, signedIn, setSignedIn, myDogData, addDogForUser, isPop, dogs, dogsToMeet, setIsPop, dog, onChangeDogData } = useContext(DogContext);

  const [remainingDogs, setRemainingDogs] = useState([...dogsToMeet]); // עותק של הכלבים שטרם הוצגו
  const [dogIMightLike, setDogIMightLike] = useState();

  console.log(remainingDogs);
  console.log(`dogs`, dogsToMeet);
  useEffect(() => {
    handleNextDog();
  }, []);

  async function addLikeToDog(dogThatILike, currenUserId) {
    try {
      const dogRef = doc(db, "dogs", dogThatILike.id);

      await updateDoc(dogRef, {
        likes: arrayUnion(currenUserId),
      });

      console.log("Like added successfully");
    } catch (error) {
      console.error("Error adding like:", error);
    }
  }

  function handleLike() {
    console.log(`current dog user:`, dogIMightLike);
    console.log(`dog from list:`, myDogData);

    addLikeToDog(myDogData, dogIMightLike);

    handleNextDog();
  }

  function handleNextDog() {
    if (remainingDogs.length === 0) {
      setDogIMightLike(null); // כל הכלבים הוצגו
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingDogs.length);
    const nextDog = remainingDogs[randomIndex];

    // עדכון הכלב הנוכחי והסרתו מהרשימה
    setDogIMightLike(nextDog);
    setRemainingDogs((prev) => prev.filter((_, i) => i !== randomIndex));
  }

  return (
    <>
      <div>
        {dogIMightLike ? (
          <div>
            <h2>{dogIMightLike.name}</h2>
            <img src={dogIMightLike.imageUrl} alt={dogIMightLike.name} width="200" />
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
