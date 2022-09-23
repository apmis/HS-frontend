import React from "react";
import ReferralDashboard from "../UiHelper/@modules/ReferralDashboard";

export default function ReferralHome() {
  return (
    <>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <ReferralDashboard />
        </div>
      </section>
    </>
  );
}
