import matchImg from "../../../Theme/ThemeStyle/Icons/Match-img.png";
import "./Match.css";
import { DogContext } from "../../../app/context/DogContext";
import { useContext } from "react";

export default function Match() {

  const { myDogData } = useContext(DogContext);

  const lastMatch = myDogData?.matches?.[myDogData.matches.length - 1];


  return (
    <>
      <div className="match">
        <div className="its-a-match">Its a Match!</div>
        <div className="match-row">
          <div className="user1-img "><img className="circle" style={{ width: "66px", height: "66px" }} src={myDogData.imgs[0]} alt="my profile photo" /></div>
          <div className="user2-img "><img className="circle" style={{ width: "66px", height: "66px" }} src={lastMatch.imgs[0]} alt="last match photo" /></div>
        </div>
          <img className="match-img" src={matchImg} alt="" />
      </div>
    </>
  );
}
