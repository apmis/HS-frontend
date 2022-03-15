import { useForm } from "react-hook-form";

const PaymentVoucher = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Payment Voucher</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Date</label>
            <div className="control">
              <input ref={register} name="date" className="input is-small" type="date" />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Payee</label>
                <div className="control">
                  <input ref={register} name="payee" className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Address</label>
                <div className="control">
                  <input ref={register} name="add" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">SRV/LPO No</label>
                <div className="control">
                  <input ref={register} name="svrOrLpoNum" className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Invoice No</label>
                <div className="control">
                  <input ref={register} name="invoiceNum" className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Cash/Bank</label>
                <div className="control">
                  <input ref={register} name="cashOrBank" className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Cheque No</label>
                <div className="control">
                  <input ref={register} name="cheque" className="input is-small" type="number" />
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Code</label>
                <div className="control">
                  <input ref={register} name="code" className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Description/Analysis</label>
                <div className="control">
                  <input ref={register} name="descOrAnalysis" className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">DR</label>
                <div className="control">
                  <input ref={register} name="dr" className="input is-small" type="number" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">CR</label>
                <div className="control">
                  <input ref={register} name="cr" className="input is-small" type="number" />
                </div>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Narration</label>
              <div className="control">
                <textarea ref={register} name="narration" className="textarea is-small"></textarea>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <p className="label is-small">
              Amount in Words
              <input ref={register} name="amount" className="input is-small dotted_bottom" type="number" />
              <br />
              Prepared by
              <input ref={register} name="preparedBy" className="input is-small dotted_bottom" type="number" />
              Approved by
              <input ref={register} name="approvedBy" className="input is-small dotted_bottom" type="number" />
              Payee
              <input ref={register} name="payeeName" className="input is-small dotted_bottom" type="number" />
            </p>
          </div>
          <div className="field mt-4">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentVoucher;
