import React from "react";
import ClinicDashboard from "../UiHelper/@modules/ClinicDashboard";

export default function FacilityHome() {
  return (
    <>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          {/* <div className="container has-text-centered">
                    <h1 className="title">
                       Admin Module
                    </h1>
                    <h2 className="subtitle">
                        Have fun working today!
                    </h2>
                    </div> */}
          <ClinicDashboard />
        </div>
      </section>
    </>
  );
}
