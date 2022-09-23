// import React, { useState, useContext, useEffect } from "react";
// import { UserContext, ObjectContext } from "../context";

import ClinicDashboard from "./UiHelper/@modules/ClinicDashboard";
import LandingPageDashboard from "./UiHelper/@modules/LandingPageDashboard";

// import useFetch from "./UiHelper/utils/usefetch";
// import client from "../feathers";

export default function LandingPage() {
  // const userService = client.service("/users");
  // const clientService = client.service("/client");

  //  const { data, isPending } = useFetch(userService);
  // const { data, isPending, error } = useFetch(clientService);

  // console.log("client details latest", {
  //   clientData: data.data,
  //   totalClient: data.total,
  //   // facilityId: DataParser.employeeData[0].facility,
  // });

  // const { state, setState } = useContext(ObjectContext);

  // const handleClick = async () => {
  //   //console.log(state.showpanel)
  //   await setState((prevstate) => ({ ...prevstate, showpanel: true }));
  //   //console.log(state)
  // };

  return (
    <div>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          {/* <div className="container has-text-centered">
                    <h1 className="title">
                       Welcome!!
                    </h1>
                    <h2 className="subtitle">
                        Have fun working today!
                    </h2>
                    <button className="button is-info minHt pullup  startbutton " onClick={()=>handleClick()}>
                    Start Here !!
                    </button>
                    </div> */}

          {/* <LandingPageDashboard /> */}
          <ClinicDashboard />
        </div>
      </section>
    </div>
  );
}
