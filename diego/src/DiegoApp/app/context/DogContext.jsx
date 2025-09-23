import { useState, useEffect, useContext, useMemo } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { db } from "../../config/firebase";
import { getDocs, setDoc, collection, doc } from "firebase/firestore";
import { UserContext } from "./UserContext";

export const DogContext = createContext();

export default function DogProvider({ children }) {

  //import context from user
  const { user , authReady } = useContext(UserContext);


  //define states
  const [dogs, setDogs] = useState([]);
  //REMOVED: dogsLoading moved to ConnectedUser wrapper for better architecture
  const [dog, setDog] = useState({
    name: "",
    size: "",
    id: "",
    imgs: [],
    age: "",
    bread: "",
    description: "",
    likes: [],
    location: "",
  });
  //img modal swiper
  const [isPop, setIsPop] = useState(false);
  // ================= //

  //database function
  async function addDogForUser(uid, dogData = dog) {
    try {
      const userDogsCollectionRef = doc(db, "dogs", uid);
  
      await setDoc(userDogsCollectionRef, {
        ...dogData,
        id: uid,
      });
  
    } catch (err) {
      console.error(err);
    }
  }

  async function getAllDogs() {
    try {
      //REMOVED: Loading state management moved to ConnectedUser wrapper
      const dogsCollectionRef = collection(db, "dogs");
      const dogsSnapshot = await getDocs(dogsCollectionRef);

      const dogsList = dogsSnapshot.docs.map((doc) => doc.data());
      setDogs(dogsList);
    } catch (error) {
      console.error("Error fetching dogs:", error);
      return [];
    }
  }

  // ================== //

  //handle the input form data dog state
  function onChangeDogData(e) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    const files = e.currentTarget.files;
    const type = e.currentTarget.type;
  
    setDog(prev => {
      if (field === "imgs" && files?.length) {
        return {
          ...prev,
          imgs: [...(Array.isArray(prev.imgs) ? prev.imgs : []), ...Array.from(files)],
        };
      }
      return { ...prev, [field]: value };
    });
  }

  

  // define variabls for dog use
  const myDogData = useMemo(
    () => (authReady && user?.id) ? dogs.find(d => d.id === user.id) : null,
    [authReady, dogs, user?.id]
  );



  const dogsToMeet = useMemo(() => {
    if (!user?.id) return [];
    return dogs.filter(d => d.id !== user.id);
  }, [dogs, user?.id]);



  useEffect(() => {
  }, [dogs, myDogData, dogsToMeet])

  // ============ //

  
  return <DogContext.Provider value={{getAllDogs,setDog, addDogForUser,myDogData, isPop, dogs, setIsPop, dog, onChangeDogData, dogsToMeet }}>{children}</DogContext.Provider>;
}
