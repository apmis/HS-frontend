import { useForm } from "react-hook-form";

const ReferralFormForConsultation = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Referral Form For Consultation</p>
      </div>
      <div className="card-content vscrollable">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label is-small">From</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Unit</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Name of Referral MD</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Referral Phone Number</label>
              <div className="control">
                <input className="input is-small" type="number" />
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Date of Referral</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Name of Patient</label>
              <div className="control">
                <input className="input is-small" type="number" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Patient Date of Birth</label>
              <div className="control">
                <input className="input is-small" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Patient Phone Number</label>
          <div className="control">
            <input className="input is-small" type="tel" />
          </div>
        </div>
        <div className="field">
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Inpatient</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Outpatient</span>
          </label>
        </div>
        <div className="field w-100 mt-3">
          <label className="label is-small">
            Speciality Consultation Requested
          </label>
          <p className="control">
            <textarea
              className="textarea is-small"
              cols="30"
              rows="10"
            ></textarea>
          </p>
        </div>
        <div className="field w-100 mt-3">
          <label className="label is-small">
            Speciality Consultation Requested
          </label>
          <p className="control">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="textarea is-small"
            ></textarea>
          </p>
        </div>
        <div className="field w-100 mt-3">
          <label className="label is-small">Name of Consulting Physician</label>
          <p className="control">
            <input type="text" className="input is-small" />
          </p>
        </div>
        <div className="field w-100 mt-3">
          <label className="label is-small">Reason For Consult</label>
          <p className="control">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="textarea is-small"
            ></textarea>
          </p>
        </div>
        <label className="label is-small">How Urgent?</label>
        <div className="field">
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Routine</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Urgent</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">STAT</span>
          </label>
        </div>
        <div className="field">
          <label className="label is-small">Name of Referring Doctor</label>
          <p className="control">
            <input type="text" className="input is-small" />
          </p>
        </div>
        <div className="field">
          <label className="label is-small">Date</label>
          <p className="control">
            <input type="date" className="input is-small" />
          </p>
        </div>
        <div className="field mt-4">
          <button className="button is-success is-small">Submit Form</button>
        </div>
      </div>
    </div>
  );
};

export default ReferralFormForConsultation;
