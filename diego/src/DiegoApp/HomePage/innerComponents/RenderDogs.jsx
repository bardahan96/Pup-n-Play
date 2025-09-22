import { UserContext } from "../../app/context/UserContext";
import { useContext } from "react";
import { DogContext } from "../../app/context/DogContext";
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect } from "react";
import DogImgModal from "../HomePageComponents/DogImgModal";

export default function RenderDogs() {
  // const { user, signUpDB, onChangeUserData } = useContext(UserContext);
  const { myDogData, dogsToMeet } = useContext(DogContext);

  const [remainingDogs, setRemainingDogs] = useState([...dogsToMeet]); // עותק של הכלבים שטרם הוצגו
  const [dogIMightLike, setDogIMightLike] = useState();
  const [match, setMatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openImages() {
    setIsModalOpen(true);
  }

  function closeImages() {
    setIsModalOpen(false);
  }

  console.log(remainingDogs);
  console.log(`dogs`, dogsToMeet);
  useEffect(() => {
    handleNextDog();
  }, []);

  async function addLikeToDog(dogThatILike, currenUserId) {
    try {
      const dogRef = doc(db, "dogs", dogThatILike.id);

      await updateDoc(dogRef, {
        likes: arrayUnion(currenUserId.id),
      });

      console.log("Like added successfully");
    } catch (error) {
      console.error("Error adding like:", error);
    }
  }

  async function handleLike() {
    console.log(`current dog user:`, dogIMightLike);
    console.log(`dog from list:`, myDogData);

    await addLikeToDog(myDogData, dogIMightLike);

    const isMatch = await checkIfMatch(myDogData, dogIMightLike);
    if (isMatch) {
      console.log("MATCH!!!");
      setMatch(true);
      return;
    }
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
  async function checkIfMatch(myDogData, dogIMightLike) {
    console.log(`likes:`, dogIMightLike.likes);
    if (dogIMightLike.likes.includes(myDogData.id)) {
      return true;
    }
    return false;
  }

  return (
    <>
      <div>
        {dogIMightLike ? (
          <div>
            <h2>{dogIMightLike.name}</h2>
            <img src={dogIMightLike.imgs[0]} alt={dogIMightLike.name} width="200" onClick={openImages} style={{ cursor: "pointer" }} />
            {/* הוסף עוד שדות כמו גזע, גיל, וכו' אם יש */}
          </div>
        ) : (
          <p>{remainingDogs.length === 0 ? "נגמרו הכלבים להצגה" : "לחץ כדי להתחיל"}</p>
        )}
        {match && <h1>MATCHE!!!</h1>}
        {/* <button onClick={handleNextDog}>{remainingDogs.length === 0 ? "התחל מחדש" : "הצג כלב הבא"}</button> */}
        <button onClick={handleNextDog}>Dislike</button>
        <button onClick={handleLike}>Like</button>
        <DogImgModal isOpen={isModalOpen} images={dogIMightLike?.imgs || []} onClose={closeImages} />
      </div>
    </>
  );
}
