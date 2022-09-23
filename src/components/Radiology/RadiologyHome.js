/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import Radiology, { StoreList } from "./Radiologys";
import { UserContext, ObjectContext } from "../../context";
import RadiologyDashboard from "../UiHelper/@modules/RadiologyDashboard";

export default function RadiologyHome() {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const { state, setState } = useContext(ObjectContext);
  const handleCloseModal = () => {
    state.showStoreModal = "modal";
    setState(state);
    console.log(state.showStoreModal);
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <RadiologyDashboard />
        </div>
      </section>
    </section>
  );
}
