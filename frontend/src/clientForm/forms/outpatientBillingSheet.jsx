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
              <input ref={register} name="patientName" className="input is-small" type="text" />
            </p>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Hospital Number</label>
                <p className="control is-expanded">
                  <input ref={register} name="hospNumb" className="input is-small" type="number" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Date</label>
                <div className="control">
                  <input ref={register} name="date" className="input is-small" type="date" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Registration</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="description" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tariff" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="officerName" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="sign" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Consultation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="description2" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tariff2" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="officerName2" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="sign2" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Specaialist Consultation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="description3" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tariff3" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="officerName3" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="sign" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Rehab</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="description4" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tariff4" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="officerName4" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="sign4" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Laboratory Investigation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="description5" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tarriff5" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="officerName5" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="sign5" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Pharmacy</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="descPharm" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tarriffPharm" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="pharmacist" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="signPharm" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Nursing Charge</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="descriptionNurse" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tarriffNurse" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="nurse" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="signNurse" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Feeding</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="descFeeding" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tarriffFeeding" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="officerFeeding" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="signFeeding" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Others</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea ref={register} name="descOthers" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input ref={register} name="tarriffOthers" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input ref={register} name="officerOthers" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input ref={register} name="signOthers" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Total</label>
          <div className="field">
            <div className="control">
              <input ref={register} name="total" className="input is-small" type="text" />
            </div>
          </div>
          <div className="columns mt-4">
            <div className="column">
              <div className="field">
                <label className="label is-small">Charge</label>
                <div className="control">
                  <input ref={register} name="charge" className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Payment</label>
                <div className="control">
                  <input ref={register} name="" className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Billing Officer</label>
                <div className="control">
                  <input ref={register} name="billingOfficer" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Balance Due</label>
                <div className="control">
                  <input ref={register} name="balDue" className="input is-small" type="number" />
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
