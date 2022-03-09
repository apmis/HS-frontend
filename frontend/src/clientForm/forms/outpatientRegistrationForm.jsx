import { useForm } from "react-hook-form";

const OutpatientRegistrationForm = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Patient Registration Form</p>
      </div>
      <div className="card-content vscrollable">
        <div className="field">
          <label className="label is-small">Full Name</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">State of Origin</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Nationality</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Address</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Date of Birth</label>
              <p className="control is-expanded">
                <input className="input is-small" type="date" />
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Sex</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Mobile Phone</label>
              <p className="control is-expanded">
                <input className="input is-small" type="tel" />
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Email</label>
              <p className="control is-expanded">
                <input className="input is-small" type="email" />
              </p>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Occupation</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Religion</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
        </div>
        <label className="label is-small">MARITAL STATUS</label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Single</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Married</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Others</span>
        </label>
        <div className="field">
          <label className="label is-small">Place of Work</label>
          <p className="control is-expanded">
            <textarea className="textarea is-small" type="text"></textarea>
          </p>
        </div>
        <div className="field">
          <label className="label is-small">Employer Address</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <label className="label is-small">ALLERGIES</label>
        <div className="field w-100 mt-3">
          <div className="control">
            <label className="radio">
              <input type="radio" name="drink-alcohol" />
              <span className="ms-2">Yes</span>
            </label>
            <label className="radio">
              <input type="radio" name="drink-alcohol" />
              <span className="ms-2">No</span>
            </label>
          </div>
        </div>
        <label className="label is-small">
          HAVE YOU HAD ANY OF THE FOLLOWING?
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Chest Pain</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Heart Disease</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Magranes</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Infection</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Cancer</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Insomnia</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Diabetes/Hypertension</span>
        </label>
        <div className="field">
          <label className="label is-small">If yes, state type</label>
          <p className="control is-expanded">
            <textarea className="textarea is-small" type="text"></textarea>
          </p>
        </div>
        <div className="field">
          <label className="label is-small">Patient Next of Kin</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="field-body">
          <div className="field">
            <label className="label is-small">Address</label>
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field">
              <label className="label is-small">Mobile Phone</label>
              <div className="control">
                <input className="input is-small" type="number" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Relationship</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
        </div>
        <label className="label is-small">SOCIAL HISTORY</label>
        <div className="field w-100 mt-3">
          <label className="label is-small">Do you drink Alcohol?</label>
          <div className="control">
            <label className="radio">
              <input type="radio" name="drink-alcohol" />
              <span className="ms-2">Yes</span>
            </label>
            <label className="radio">
              <input type="radio" name="drink-alcohol" />
              <span className="ms-2">No</span>
            </label>
          </div>
        </div>
        <div className="field w-100 mt-3">
          <label className="label is-small">Do you use Tobacco?</label>
          <div className="control">
            <label className="radio">
              <input type="radio" name="drink-alcohol" />
              <span className="ms-2">Yes</span>
            </label>
            <label className="radio">
              <input type="radio" name="drink-alcohol" />
              <span className="ms-2">No</span>
            </label>
          </div>
        </div>
        <label className="label is-small">FAMILY HISTORY</label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Diabetic</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Hypertension</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Cancer</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Arthritis</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Heart Problems</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Stroke</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Stroke</span>
        </label>
        <div className="field">
          <label className="label is-small">Others</label>
          <div className="control">
            <input className="input is-small" type="text" />
          </div>
        </div>{" "}
        <label className="label is-small">
          HAVE YOU DONE ANY SURGERY BEFORE?
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Yes</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">No</span>
        </label>
        <label className="label is-small">If yes, state type?</label>
        <textarea className="textarea is-small" type="text"></textarea>
        <div className="field">
          <label className="label is-small mt-4">
            List any medications you are currently taking
          </label>
          <div className="control">
            <div className="field">
              <div className="control">
                <textarea className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
        </div>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Private Patient?</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Corporate Patient?</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">HMO/Health Insurance</span>
        </label>
        <label className="label is-small">
          HOSPITAL BILLS TO BE SETTLED BY
        </label>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label is-small">Name of Payee</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Phone Number</label>
              <div className="control">
                <input className="input is-small" type="tel" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Email</label>
              <div className="control">
                <input className="input is-small" type="email" />
              </div>
            </div>
          </div>
        </div>
        <label className="label is-small">Corporate Patient</label>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label is-small">Name of Payee (Company)</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Phone Number</label>
              <div className="control">
                <input className="input is-small" type="tel" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Office Address</label>
              <div className="control">
                <input className="input is-small" type="tel" />
              </div>
            </div>
          </div>
        </div>
        <label className="label is-small">Authorisation Letter Attached</label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">Yes</span>
        </label>
        <label class="checkbox me-3">
          <input type="checkbox" />
          <span className="ms-2 is-small">No</span>
        </label>
        <label className="label is-small">HMO/HEALTH INSURANCE</label>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label is-small">Name</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Phone Number</label>
              <div className="control">
                <input className="input is-small" type="tel" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-small">Email</label>
              <div className="control">
                <input className="input is-small" type="email" />
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

export default OutpatientRegistrationForm;
