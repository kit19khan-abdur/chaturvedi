import React, { useEffect, useMemo, useState } from 'react';
import handleSubmit from '../../handleSubmit';
import StepSixcheck from './StepSixcheck';

const StepSix = ({ formData = {}, setFormData = () => { }, setRequiredFields, showErrors }) => {
  const [localData, setLocalData] = useState({ ...formData });
  const paymentOptions = [
    'Cash',
    'Cheque',
    'NEFT/RTGS',
    'Credit Card',
    'Debit Card',
    'PhonePe',
    'Google Pay',
    'Netbanking',
    'QR Code',
  ];
  const [stepData, setStepData] = useState({
    paymentStatus: "",
    checkbox: "",
    chequeNumber: "",
    transactionId: "",
    paymentDate: "",
    dueAmount: "",
    expectedClearDate: "",
    comments: "",
    paymentModessix: [],
    cashAmountsix: "",
    neftAmountsix: "",
    googlePayAmountsix: "",
    googlePayDetailsix: "",
    debitAmountsix: "",
    debitCardDetailsix: "",
    creditAmountsix: "",
    creditCardsix: "",
    creditCardDetailsix: "",
    netbankingAmountsix: "",
    netbankingDetailsix: "",
    chequeAmountsix: "",
    chequeDetailssix: "",
    phonepeAmountsix: "",
    phonepeDetailsix: "",
    agencyAmountsix: "",
    paymentDatesix: "",
    transactionIdsix: "",
    transactionIDsix: "",
    dueAmountLeftByCustomer: "",
    dueAmount: "",
  })


  const stepDataoflocal = useMemo(() => {
    return JSON.parse(localStorage.getItem("stepData")) || {};
  }, [localStorage.getItem("stepData")]);
  useEffect(() => {
    let fields = [];

    if (stepData.paymentStatus === 'Full Payment Received' || stepData.paymentStatus === 'Partial Payment Received') {


      // Cash
      if (stepData.paymentModessix?.includes("Cash")) {
        fields.push("cashAmountsix", "agencyAmountsix", "paymentDatesix");
      }

      // NEFT/RTGS
      if (stepData.paymentModessix?.includes("NEFT/RTGS")) {
        fields.push("neftAmountsix", "transactionIDsix"); // also push transactionID for NEFT
      }

      // Google Pay
      if (stepData.paymentModessix?.includes("Google Pay")) {
        fields.push("googlePayAmountsix", "googlePayDetailsix");
      }

      // Debit Card
      if (stepData.paymentModessix?.includes("Debit Card")) {
        fields.push("debitAmountsix", "debitCardDetailsix");
      }

      // Credit Card
      if (stepData.paymentModessix?.includes("Credit Card")) {
        fields.push("creditAmountsix", "creditCardsix");
      }

      // Netbanking
      if (stepData.paymentModessix?.includes("Netbanking")) {
        fields.push("netbankingAmountsix", "netbankingDetailsix");
      }

      // Cheque
      if (stepData.paymentModessix?.includes("Cheque")) {
        fields.push("chequeAmountsix", "chequeDetailssix");
      }

      // PhonePe
      if (stepData.paymentModessix?.includes("PhonePe")) {
        fields.push("phonepeAmountsix", "phonepeDetailsix");
      }

      if (stepDataoflocal?.paymentModessix?.length === 0) {
        fields.push("paymentModessix")
      }

      fields.push("paymentDate")
      // setRequiredFields(fields);
    } else if (stepData.paymentStatus === 'Total Amount Due') {
      // setRequiredFields(fields);
      fields.push("comments", "dueAmount", "expectedClearDate")
    }
    setRequiredFields(fields);

  }, [stepDataoflocal.paymentModessix, stepDataoflocal, stepData.paymentStatus]);


  const handleChangeStep = (e) => {
    const { name, type, checked, value } = e.target;
    const temp = JSON.parse(localStorage.getItem('stepData')) || {};
    const updated = { ...temp };

    if (type === "checkbox") {
      if (checked) {
        updated[name] = value;
      } else {
        delete updated[name]; // remove when unchecked
      }
    } else {
      updated[name] = value;
    }

    localStorage.setItem("stepData", JSON.stringify(updated));
    setStepData(updated);
    // handleChange()
  };

  const handleCheckboxChange = (option) => {
    const newMethods = stepData.paymentMethods.includes(option)
      ? stepData.paymentMethods.filter((m) => m !== option)
      : [...stepData.paymentMethods, option];

    setStepData((prev) => {
      const updated = {
        ...prev,
        paymentMethods: newMethods,
      };

      localStorage.setItem("stepData", JSON.stringify(updated));
      return updated;
    });

  };


  const {
    paymentStatus,
    paymentMethods,
    paymentDate,
    dueAmount,
    expectedClearDate,
    comments,
    chequeNumber,
    transactionId
  } = stepData;

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step6`
  }, [])

  return (
    <div className="capitalize p-4   rounded-xl shadow-sm bg-white">
      <div className="mb-4">
        <label className="block font-medium">Payment Received Status</label>
        <select
          name="paymentStatus"
          className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.paymentStatus === "" && !stepData?.paymentStatus ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
          value={stepData.paymentStatus}
          onChange={(e) => handleChangeStep(e)}
        >
          <option value="">Select Payment Status</option>
          <option value="Full Payment Received">Full Payment Received</option>
          <option value="Partial Payment Received">Partial Payment Received</option>
          <option value="Total Amount Due">Total Amount Due</option>
        </select>
        {showErrors && stepData?.paymentStatus === "" && !stepData?.paymentStatus && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>

      {(stepData.paymentStatus === 'Full Payment Received') && (
        <StepSixcheck formData={formData} setFormData={setFormData} setRequiredFields={setRequiredFields} showErrors={showErrors} paymentStatus={stepData.paymentStatus} />
      )}

      {(stepData.paymentStatus === 'Partial Payment Received') && (
        <>
          <StepSixcheck formData={formData} setFormData={setFormData} setRequiredFields={setRequiredFields} showErrors={showErrors} paymentStatus={stepData.paymentStatus} />

          <div className="mb-4">
            <label className="block font-medium">Date of Payment By Customer</label>
            <input
              type="date"
              name="paymentDate"
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.paymentDate === "" && !stepData?.paymentDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
              value={stepData.paymentDate}
              onChange={(e) => handleChangeStep(e)}
            />
            {showErrors && stepData?.paymentDate === "" && !stepData?.paymentDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>
        </>
      )}

      {(stepData.paymentStatus === 'Partial Payment Received' || stepData.paymentStatus === 'Total Amount Due') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium">Due Amount Left By Customer</label>
            <input
              type="text"
              name="dueAmount"
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.dueAmount === "" && !stepData?.dueAmount ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
              placeholder="Enter Due Amount"
              value={stepData.dueAmount}
              onChange={(e) => handleChangeStep(e)}
            />
            {showErrors && stepData?.dueAmount === "" && !stepData?.dueAmount && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Expected Pending Payment Clear Date</label>
            <input
              type="date"
              name="expectedClearDate"
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.expectedClearDate === "" && !stepData?.expectedClearDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
              value={stepData.expectedClearDate}
              onChange={(e) => handleChangeStep(e)}
            />
            {showErrors && stepData?.expectedClearDate === "" && !stepData?.expectedClearDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>
        </div>
      )}

      {(stepData.paymentStatus === 'Partial Payment Received' || stepData.paymentStatus === 'Total Amount Due') && (
        <>
          <div className="mb-4">
            <label className="block font-medium">Pending Payment Comments</label>
            <textarea
              name="comments"
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.comments === "" && !stepData?.comments ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
              rows="3"
              placeholder="Enter Comment"
              value={stepData.comments}
              onChange={(e) => handleChangeStep(e)}
            />
            {showErrors && stepData?.comments === "" && !stepData?.comments && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StepSix;
