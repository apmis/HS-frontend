import { useForm } from "react-hook-form";

const VitalSignsFlowSheet = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Vital Signs Flow Sheet</p>
      </div>
      <div className="card-content vscrollable">
        <div className="field">
          <label className="label is-small">Patient</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">D.O.B</label>
              <p className="control is-expanded">
                <input className="input is-small" type="date" />
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">M/F</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Physician</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
        </div>
        <div className="field-body">
          <div className="field">
            <label className="label is-small">Notes</label>
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Date</label>
              <div className="control">
                <input className="input is-small" type="date" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Weight</label>
              <div className="control">
                <input className="input is-small" type="number" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">BP</label>
              <div className="control">
                <input className="input is-small" type="number" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Pulse</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Respiration</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Pain</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Initials</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">O2 Sat</label>
              <div className="control">
                <input className="input is-small" type="text" />
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

export default VitalSignsFlowSheet;
