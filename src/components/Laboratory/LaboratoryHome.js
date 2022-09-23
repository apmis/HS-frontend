/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import Store, { StoreList } from "./Labs";
import { UserContext, ObjectContext } from "../../context";
import LaboratoryDashboard from "../UiHelper/@modules/LaboratoryDashboard";

export default function InventoryHome() {
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
          <LaboratoryDashboard />
        </div>
      </section>
    </section>
  );
}
