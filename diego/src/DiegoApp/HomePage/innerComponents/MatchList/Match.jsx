import matchImg from "../../../Theme/ThemeStyle/Icons/Match-img.png";
import "./Match.css";

export default function Match() {
  return (
    <>
      <div className="match">
        <div className="its-a-match">Its a Match!</div>
        <div className="match-row">
          <div className="user1-img circle">User1 photo</div>
          <img className="match-img" src={matchImg} alt="" />
          <div className="user2-img circle">User2 photo</div>
        </div>
      </div>
    </>
  );
}
