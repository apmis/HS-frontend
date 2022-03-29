   import { useForm } from "react-hook-form";

const FluidIntakeOutput = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Fluid Intake and Output Record</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Patient Name</label>
            <p className="control is-expanded">
              <input ref={register} name="patientName" className="input is-small" type="text" />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Ward</label>
            <p className="control is-expanded">
              <input ref={register} name="ward" className="input is-small" type="number" />
            </p>
          </div>
          <label className="label is-small">Intake</label>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Date & Time</label>
                <p className="control is-expanded">
                  <input ref={register} name="dateAndTime" className="input is-small" type="date" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Oral</label>
                <p className="control is-expanded">
                  <input ref={register} name="oral" className="input is-small" type="text" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Others</label>
                <p className="control is-expanded">
                  <input ref={register} name="others1" className="input is-small" type="text" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Amount</label>
                <p className="control is-expanded">
                  <input ref={register} name="amount" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <label className="label is-small mt-4">Output</label>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Voided</label>
                <p className="control is-expanded">
                  <input ref={register} name="voided" className="input is-small" type="text" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Catheter</label>
                <p className="control is-expanded">
                  <input ref={register} name="catheter" className="input is-small" type="text" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Stool</label>
                <p className="control is-expanded">
                  <input ref={register} name="stool" className="input is-small" type="text" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Vomitus</label>
                <p className="control is-expanded">
                  <input ref={register} name="vomitus" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Others</label>
              <div className="control">
                <textarea ref={register} name="others2" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="field mt-4">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FluidIntakeOutput;
