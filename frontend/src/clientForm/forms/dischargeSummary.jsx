const DischargeSummary = () => {
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Discharge Summary</p>
      </div>
      <div className="card-content vscrollable">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label is-small">Date of Admission</label>
              <div className="control">
                <input className="input is-small" type="date" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Date of Discharge</label>
              <div className="control">
                <input className="input is-small" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Discharge Diagnoses</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Consultant</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="field">
          <label className="label is-small">Procedures</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">
            Brief History of Presenting Complaints
          </label>
          <p className="">
            {" "}
            This patient is an{" "}
            <input type="text" name="" id="" className="dotted_bottom" />{" "}
            year-old male/female history of: <br />
            <textarea className="textarea is-small mt-3"></textarea>
          </p>
        </div>
        <div className="field">
          <label className="label is-small">Diagnostic Studies</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">
            Discription of Hospital Details
          </label>
          <label className="label is-small">Discharge Disposition</label>
          <label class="checkbox">
            <input type="checkbox" />
            <span className="ms-2 is-small">Discharge Home</span>
          </label>
          <label class="checkbox ms-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">To a teaching hospital</span>
          </label>
          <label class="checkbox ms-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">To a facility abroad</span>
          </label>
        </div>
        <div className="field">
          <label className="label is-small">Activity Prescription</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Diet Prescribed</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Medications</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Follow- up</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field mt-4">
          <button className="button is-success is-small">Submit Form</button>
        </div>
      </div>
    </div>
  );
};

export default DischargeSummary;
