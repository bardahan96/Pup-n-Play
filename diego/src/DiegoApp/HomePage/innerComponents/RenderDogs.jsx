import { UserContext } from "../../app/context/UserContext";
import { useContext } from "react";
import { DogContext } from "../../app/context/DogContext";
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect } from "react";
import DogImgModal from "../HomePageComponents/DogImgModal";
import { useOutletContext, useNavigate } from "react-router";
import Match from "./MatchList/Match";

export default function RenderDogs() {
  // const { user, signUpDB, onChangeUserData } = useContext(UserContext);
  const { myDogData, dogsToMeet, getAllDogs } = useContext(DogContext);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useOutletContext
  const { remainingDogs, dogIMightLike, match, setDogIMightLike, setMatch, setRemainingDogs } = useOutletContext();


  const navigate = useNavigate();
  
  function openImages() {
    setIsModalOpen(true);
  }

  function closeImages() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    handleNextDog();
  }, []);

  async function addLikeToDog(dogThatILike, currenUserId) {
    try {
      // Add the liked dog's ID to your dog's likes array
      const myDogRef = doc(db, "dogs", currenUserId.id);
      await updateDoc(myDogRef, {
        likes: arrayUnion(dogThatILike.id),
      });

    } catch (error) {
      console.error("Error adding like:", error);
    }
  }

  async function handleLike() {

    await addLikeToDog(dogIMightLike, myDogData);

    const isMatch = await checkIfMatch(myDogData, dogIMightLike);
    if (isMatch) {
      setMatch(true);
      return;
    }
    handleNextDog();
  }

  function handleNextDog() {
    if (remainingDogs.length === 0) {
      setDogIMightLike(null); 
      return;
    }

    const availableDogs = remainingDogs.filter(dog => !myDogData.likes.includes(dog.id));
    if (availableDogs.length === 0) {
      setDogIMightLike(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableDogs.length);
    const nextDog = availableDogs[randomIndex];

    // עדכון הכלב הנוכחי והסרתו מהרשימה
    setDogIMightLike(nextDog);
    setRemainingDogs((prev) => prev.filter(dog => dog.id !== nextDog.id));

  }



  
  async function checkIfMatch(myDogData, dogIMightLike) {
    if (myDogData.likes.includes(dogIMightLike.id)) {
      

      updateDoc(doc(db, "dogs", myDogData.id), {
        matches: arrayUnion(dogIMightLike)
      });
      updateDoc(doc(db, "dogs", dogIMightLike.id), {
        matches: arrayUnion(myDogData)
      });
      
      // Refresh the dogs data to update matchList in real-time
      await getAllDogs();
      
      navigate("match");

      return true
    }
    return false;
  }

  useEffect(() => {
  }, [dogIMightLike]);

  return (
    <>
      <div>
        {dogIMightLike ? (
          <div>
            <div className="dogForRender_img_container">
            <img className="dogForRender_img" src={dogIMightLike.imgs[0]} alt={dogIMightLike.name} width="180" onClick={openImages} style={{ cursor: "pointer" }} />
            </div>
            <div className="dog_info">
              <h2>{dogIMightLike.name}</h2>
              <div className="info_bubble">
                <span className="info_label">Breed:</span>
                <span className="info_value">{dogIMightLike.bread}</span>
              </div>
              <div className="info_bubble">
                <span className="info_label">Age:</span>
                <span className="info_value">{dogIMightLike.age}</span>
              </div>
              <div className="info_bubble">
                <span className="info_label">Size:</span>
                <span className="info_value">{dogIMightLike.size}</span>
              </div>
              <div className="info_bubble">
                <span className="info_label">Location:</span>
                <span className="info_value">{dogIMightLike.location}</span>
              </div>
              <div className="description">
                {dogIMightLike.description}
              </div>
            </div>
          </div>
        ) : (
          <p>{remainingDogs.length === 0 ? "נגמרו הכלבים להצגה" : "לחץ כדי להתחיל"}</p>
        )}

        <div className="button_container">
          <button onClick={handleNextDog}>Dislike</button>
          <button onClick={handleLike}>♡</button>
        </div>
        <DogImgModal isOpen={isModalOpen} images={dogIMightLike?.imgs || []} onClose={closeImages} />
      </div>
    </>
  );
}
