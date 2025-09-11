// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import HomePage from "../HomePage/HomePage";
// import UserWrapper from "./context/UserWrapper";
// import SignUp from "../Auth/SignUp";
// import Login from "../Auth/Login";
// import SignOut from "../Auth/SignOut";
import Header from "../Theme/Header";
import Footer from "../Theme/Footer";
import Match from "../HomePage/innerComponents/MatchList/Match";

export default function DiegoApp() {
  return (
    <>
      <Header />
      <Match />
      <Footer />
    </>
  );
}
