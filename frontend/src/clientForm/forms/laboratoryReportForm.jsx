import { useForm } from "react-hook-form";
const LaboratoryReportForm = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Laboratory Report</p>
      </div>
      <div className="card-content vscrollable">
        <div className="field-body mt-3">
          <div className="field">
            <label className="label is-small">Name</label>
            <p className="control is-expanded">
              <input className="input is-small" type="text" />
            </p>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Age</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="number" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Sex</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Date</label>
                <div className="control">
                  <input className="input is-small" type="date" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Specimen</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Provisional Diagnosis</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Bill To</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Patient</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Dr</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <label className="label is-small">HEAMATOLOGY</label>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">HB</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">PCV</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">WBC</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">ESR</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Platelets</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Rectics</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">RBC</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">MCV</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">MCHC</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">MCH</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Neutrolophills</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Lymphocytes</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Monocytes</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Eosinophils</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Basophils</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Pro-Myelocyte</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Meta-Myelocyte</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Nucleated RBC</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Genotype</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Blood Group</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <label className="label is-small">SEROLOGY</label>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">HBsAG</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">HCV</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">VDRL</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">RPHA</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">COOMBS</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">A.S.O Titre</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">SLE</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">R.A Factor</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">B-HCG</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">MANTOUX</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Blood Preg. Test</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">XYZ</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <label className="label is-small">BIOCHEMISTRY</label>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Glucose (Fasting)</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Glucose (Random)</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Urea</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Creatinne</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Uric Acid</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Sodium</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Potassium</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Bicarbonate</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Chloride</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Total Protein</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Albumin</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">T. Bilirubin</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">D.Bilirubin</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Cholesterol</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Triglyceride</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Phos</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Calcium</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">SGOT</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">SGPT</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">OGTT</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Alk Phos</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Acid Phos</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">ADH</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">APK</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Amylase</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">MICROBIOLOGY</label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Urinanalysis/Microscope</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Stool Analysis</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Stool Occult</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Semen Analysis</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Gram Stain</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">ZN Stain</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Mantoux Test</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Fungal Studies</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">M/C/S Urine</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">M/C/S Throat Swab</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">C/S/PUS/Aspirate/Discharge</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">C/S Wound Swab</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">M/C/S Semen</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">M/C/S Fluid</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">M/C/S Stool</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">C/S Endocervical Swab</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">M/C/S HVS</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">M/C/S Sputum</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">C/S Blood</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Microfilaria-Skin Snip</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Other Swab (Specify)</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Faecal Occult Blood</span>
          </label>
          <label class="checkbox me-3">
            <input type="checkbox" />
            <span className="ms-2 is-small">Salmonella/Shigella</span>
          </label>
        </div>
        <label className="label is-small">URINE</label>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Macroscopy</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Microscopy</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Pus Cells/hof</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Rbs/hpf</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Yeast Cells</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Bacteria</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Gasts</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Epith Cells</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Crystals</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">T.V</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Culture Yielded</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Malaria Parasite</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <label className="label is-small">URINALYSIS</label>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Appearance</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Color</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">PH</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Protein</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Sugar</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Ketones</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Blood</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Billirubin</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">S.G</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Nitrite</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Urobilin</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Uroblilinogen</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Leucocyte</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <label className="label is-small">STOOL</label>
        <div className="field">
          <label className="label is-small">Macro</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Micro</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Culture</label>
          <div className="control">
            <textarea className="textarea is-small"></textarea>
          </div>
        </div>
        <label className="label is-small">HVS CULTURE</label>
        <label className="label is-small mt-3">Wet Prep</label>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Pus cells'hpf</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Rbcs/hpf</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Yeast Cells</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Bacteria</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Casts</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Epith Cells</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Crystals</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">T.V</label>
                <p className="control is-expanded">
                  <input className="input is-small" type="text" />
                </p>
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

export default LaboratoryReportForm;
