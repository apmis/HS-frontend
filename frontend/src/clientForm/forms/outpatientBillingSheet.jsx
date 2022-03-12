import { useForm } from "react-hook-form";

const OutpatientBillingSheet = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Outpatient Billing Sheet</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Name of Patient</label>
            <p className="control is-expanded">
              <input className="input is-small" type="text" />
            </p>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Hospital Number</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="number" />
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
          <label className="label is-small">Registration</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Consultation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Specaialist Consultation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Rehab</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Laboratory Investigation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Pharmacy</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Nursing Charge</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Feeding</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Others</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Total</label>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="text" />
            </div>
          </div>
          <div className="columns mt-4">
            <div className="column">
              <div className="field">
                <label className="label is-small">Charge</label>
                <div className="control">
                  <input className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Payment</label>
                <div className="control">
                  <input className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Billing Officer</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Balance Due</label>
                <div className="control">
                  <input className="input is-small" type="number" />
                </div>
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

export default OutpatientBillingSheet;
