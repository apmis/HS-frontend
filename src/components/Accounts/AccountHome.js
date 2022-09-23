import React from "react";
import AccountDashboard from "../UiHelper/@modules/AccountDashboard";

export default function AccountHome() {
  return (
    <>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <AccountDashboard />
        </div>
      </section>
    </>
  );
}
