import { useForm } from "react-hook-form";

const ECGForm = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">ECG Request Form</p>
      </div>
      <div className="card-content vscrollable">
        <div className="field">
          <label className="label is-small">Name</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="field">
          <label className="label is-small">Hospital No</label>
          <p className="control is-expanded">
            <input className="input is-small" type="number" />
          </p>
        </div>
        <div className="field">
          <label className="label is-small">Private/Company</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="field-body">
          <div className="field">
            <label className="label is-small">Clinical History</label>
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Refering Doctor Name</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Date</label>
              <div className="control">
                <input className="input is-small" type="date" />
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

export default ECGForm;
