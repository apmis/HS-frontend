import { useForm } from "react-hook-form";

const Receipt = ({onSumbit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Receipt</p>
      </div>
      <div className="card-content vscrollable">
        <div className="field">
          <label className="label is-small">Date</label>
          <div className="control">
            <input className="input is-small" type="date" />
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Received From</label>
          <div className="control">
            <input className="input is-small" type="text" />
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Cheque Number</label>
              <div className="control">
                <input className="input is-small" type="number" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Dated</label>
              <div className="control">
                <input className="input is-small" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="field-body">
          <div className="field">
            <label className="label is-small">The Sum of</label>
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
        </div>
        <div className="field-body">
          <div className="field">
            <label className="label is-small">Being paid for</label>
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">For and on behalf of</label>
          <div className="control">
            <input className="input is-small" type="text" />
          </div>
        </div>
        <div className="field mt-4">
          <button className="button is-success is-small">Submit Form</button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
