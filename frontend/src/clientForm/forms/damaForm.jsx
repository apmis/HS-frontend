import "../_style.css";

const DamaForm = () => {
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Dama Form</p>
      </div>
      <div className="card-content vscrollable">
        <div className="content mt-4">
          <p className="label is-small">
            This is to certify that, I <input className="dotted_bottom" type="text" name="" id="" /> a
            patient at <input className="dotted_bottom" type="text" name="" id="" /> (fill in the name of
            te hospital), am refusing at my own insistence and without authority
            of and against the advice of my attending physician(s). <br />{" "}
            <br />
            I, <input className="dotted_bottom" type="text" name="" id="" /> request to leave against
            medical advice. The medical risks/benefits have been explained to me
            by the physician and i understand those risks. <br /> <br /> I
            hereby release the hospital, its administration, personnel, and my
            attending and or resident physician(s) from any responsibility for
            all consequences, which may result by my leaving under these
            circumstances
          </p>
        </div>
        <div className="field-body mt-3">
          <div className="field">
            <label className="label is-small">MEDICAL RISKS</label>
            <p className="label is-small">
              Death <input className="dotted_bottom" type="text" name="" id="" /> Additional pain and/or
              suffering <input className="dotted_bottom" type="text" name="" id="" /> Permanent
              disability/disfigurement <input className="dotted_bottom" type="text" name="" id="" />
            </p>
          </div>
        </div>
        <div className="field-body mt-3">
          <div className="field">
            <label className="label is-small mt-3">MEDICAL BENEFITS</label>
            <p className="label is-small">
              History/physical examination, further additional testing and
              treatments radiological imaging such as: <br /> CAT Scan{" "}
              <input className="dotted_bottom" type="text" name="" id="" /> X-rays{" "}
              <input className="dotted_bottom" type="text" name="" id="" /> Ultrasound (Sonogram){" "}
              <input className="dotted_bottom" type="text" name="" id="" /> Laboratory Testing{" "}
              <input className="dotted_bottom" type="text" name="" id="" /> Potential Admission and / or
              follow-up <input className="dotted_bottom" type="text" name="" id="" /> medications as
              indicated for infection, Pain, Blood Pressure, etc{" "}
              <input className="dotted_bottom" type="text" name="" id="" /> Others{" "}
              <input className="dotted_bottom" type="text" name="" id="" />
            </p>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Patient Signature</label>
              <div className="control">
                <input className="input is-small dotted_bottom" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Date</label>
              <div className="control">
                <input className="input is-small dotted_bottom" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label is-small">Physician Name/Signature</label>
              <div className="control">
                <input className="input is-small dotted_bottom" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Date</label>
              <div className="control">
                <input className="input is-small dotted_bottom" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label is-small">Witness Name/Signature</label>
              <div className="control">
                <input className="input is-small dotted_bottom" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Date</label>
              <div className="control">
                <input className="input is-small dotted_bottom" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="field mt-4">
          <button className="button is-success is-small">Submit Form</button>
        </div>
      </div>
    </div>
  );
};

export default DamaForm;
