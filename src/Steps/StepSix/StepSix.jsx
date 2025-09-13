import React, { useEffect, useState } from 'react';
import handleSubmit from '../../handleSubmit';

const StepSix = () => {
 
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
comments: ""
  })

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

     useEffect(() =>{
        document.title = `Chaturvedi Motors Form || on Step5`
      },[])

  return (
    <div className="capitalize p-4   rounded-xl shadow-sm bg-white">
      <div className="mb-4">
        <label className="block font-medium">Payment Received Status</label>
        <select
          className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          name="paymentStatus"
          value={stepData.paymentStatus}
          onChange={(e) => handleChangeStep(e)}
        >
          <option value="">Select Payment Status</option>
          <option value="Full Payment Received">Full Payment Received</option>
          <option value="Partial Payment Received">Partial Payment Received</option>
          <option value="Total Amount Due">Total Amount Due</option>
        </select>
      </div>

      {(stepData.paymentStatus === 'Full Payment Received' || stepData.paymentStatus === 'Partial Payment Received') && (
        <>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Payment by Customer</h3>
            <div className="grid grid-cols-3 gap-2">
              {paymentOptions.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={option}
                    checked={stepData?.paymentMethods?.includes(option)}
                    onChange={(e) => {
                      handleCheckboxChange(option)
                      handleChangeStep(e)
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {stepData?.paymentMethods?.includes("Cheque") && (
            <div className="mb-4">
              <label className="block font-medium">Cheque Number</label>
              <input
                type="text"
                className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
                name="chequeNumber"
                placeholder="Enter Cheque Number"
                value={stepData.chequeNumber}
                onChange={(e) => handleChangeStep(e)}
              />
            </div>
          )}

          {["PhonePe", "Google Pay", "QR Code", "Netbanking", "NEFT/RTGS"].some(method => stepData?.paymentMethods?.includes(method)) && (
            <div className="mb-4">
              <label className="block font-medium">Transaction ID / Reference No.</label>
              <input
                type="text"
                className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
                name="transactionId"
                placeholder="Enter Transaction ID"
                value={stepData.transactionId}
                onChange={(e) => handleChangeStep(e)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block font-medium">Date of Payment By Customer</label>
            <input
              type="date"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              name="paymentDate"
              value={stepData.paymentDate}
              onChange={(e) => handleChangeStep(e)}
            />
          </div>
        </>
      )}

      {(stepData.paymentStatus === 'Partial Payment Received' || stepData.paymentStatus === 'Total Amount Due') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium">Due Amount Left By Customer</label>
            <input
              type="text"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              name="dueAmount"
              placeholder="Enter Due Amount"
              value={stepData.dueAmount}
              onChange={(e) => handleChangeStep(e)}
            />
          </div>

          <div>
            <label className="block font-medium">Expected Pending Payment Clear Date</label>
            <input
              type="date"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              name="expectedClearDate"
              value={stepData.expectedClearDate}
              onChange={(e) => handleChangeStep(e)}
            />
          </div>
        </div>
      )}

      {(stepData.paymentStatus === 'Partial Payment Received' || stepData.paymentStatus === 'Total Amount Due') && (
        <div className="mb-4">
          <label className="block font-medium">Pending Payment Comments</label>
          <textarea
            className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
            name="comments"
            rows="3"
            placeholder="Enter Comment"
            value={stepData.comments}
            onChange={(e) => handleChangeStep(e)}
          />
        </div>
      )}
    </div>
  );
};

export default StepSix;
