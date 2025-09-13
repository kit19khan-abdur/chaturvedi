import React, { useCallback, useEffect, useState } from "react";

const paymentModesList = [
  "Cash",
  "NEFT/RTGS",
  "Google Pay",
  "Debit Card",
  "Credit Card",
  "Netbanking",
  "Cheque",
  "PhonePe",
  "QR Code",
];

const StepFive = ({ formData = {}, setFormData = () => { }, setRequiredFields }) => {
  const [localData, setLocalData] = useState({ ...formData });
  const [stepData, setStepData] = useState({
    checkbox: "",
    cashAmount: "",
    neftAmount: "",
    googlePayAmount: "",
    googlePayDetail: "",
    debitAmount: "",
    debitCardDetail: "",
    creditAmount: "",
    creditCardDetail: "",
    netbankingAmount: "",
    netbankingDetail: "",
    chequeAmount: "",
    phonepeAmount: "",
    phonepeDetail: "",
    agencyAmount: "",
    paymentDate: "",
    transactionId: "",
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
  handleChange(e)
};



  // Sync external changes to localData
  useEffect(() => {
    setLocalData({ ...formData });
    // Run only once on mount
  }, []);

  // Sync localData back to parent in real time

  const togglePaymentMode = useCallback((mode) => {
    setLocalData((prev) => {
      const currentModes = prev.paymentModes || [];
      const updatedModes = currentModes.includes(mode)
        ? currentModes.filter((m) => m !== mode)
        : [...currentModes, mode];

      return { ...prev, paymentModes: updatedModes };
    });
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (typeof setFormData === "function") {
      setFormData(localData);
    }
  }, [localData]);

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step4`
  }, [])

   useEffect(() => {
      let fields = [];
  
      // if (stepData?.previousPolicy === "Yes") {
      //   if (stepData?.policyType === "OD Policy") {
      //     if (stepData?.previousPolicy === "No") {
      //       fields.push("ncbNewPolicy")
      //     }
      //     fields.push("insurerName", "policyNumber", "newOdPolicyStartDate", "newOdPolicyEndDate")
      //   } else if (stepData?.policyType === "TP Policy") {
      //     fields.push("insurerName", "policyNumber", "newTpPolicyStartDate", "newTpPolicyEndDate")
      //   } else if (stepData?.policyType === "Package Policy") {
      //     fields.push("insurerName", "policyNumber", "prevoiusPolicyStartDate", "prevoiusPolicyEndDate")
      //   }
      //   fields.push("policyType",);
      // }
  
      setRequiredFields(fields);
    }, []);


  return (
    <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Payment Mode Checkboxes */}
      <div className="col-span-2">
        <h2 className="font-semibold text-lg mb-2">Mode of Payment to Insurance Company</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {paymentModesList.map((mode) => (
            <label key={mode} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={mode}
                checked={localData.paymentModes?.includes(mode)}
                onChange={(e) => {
                  togglePaymentMode(mode);
                  handleChangeStep(e)
                }}
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Conditional Fields */}
      {localData.paymentModes?.includes("Cash") && (
        <div>
          <label>Cash Amount</label>
          <input
            type="text"
            name="cashAmount"
            className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
            value={stepData.cashAmount || ""}
            onChange={handleChangeStep}
          />
        </div>
      )}

      {localData.paymentModes?.includes("NEFT/RTGS") && (
        <div>
          <label>NEFT/RTGS Amount</label>
          <input
            type="text"
            name="neftAmount"
            className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
            value={stepData.neftAmount || ""}
            onChange={handleChangeStep}
          />
        </div>
      )}

      {localData.paymentModes?.includes("Google Pay") && (
        <>
          <div>
            <label>Google Pay Amount</label>
            <input
              type="text"
              name="googlePayAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.googlePayAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Google Pay UPI/Number</label>
            <input
              type="text"
              name="googlePayDetail"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.googlePayDetail || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModes?.includes("Debit Card") && (
        <>
          <div>
            <label>Debit Card Amount</label>
            <input
              type="text"
              name="debitAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.debitAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Debit Card Details</label>
            <input
              type="text"
              name="debitCardDetail"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.debitCardDetail || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModes?.includes("Credit Card") && (
        <>
          <div>
            <label>Credit Card Amount</label>
            <input
              type="text"
              name="creditAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.creditAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Credit Card Details</label>
            <input
              type="text"
              name="creditCardDetail"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.creditCardDetail || ""}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {localData.paymentModes?.includes("Netbanking") && (
        <>
          <div>
            <label>Netbanking Amount</label>
            <input
              type="text"
              name="netbankingAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.netbankingAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Netbanking Details</label>
            <input
              type="text"
              name="netbankingDetail"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.netbankingDetail || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModes?.includes("Cheque") && (
        <div>
          <label>Cheque Amount</label>
          <input
            type="text"
            name="chequeAmount"
            className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
            value={stepData.chequeAmount || ""}
            onChange={handleChangeStep}
          />
        </div>
      )}

      {localData.paymentModes?.includes("PhonePe") && (
        <>
          <div>
            <label>PhonePe Amount</label>
            <input
              type="text"
              name="phonepeAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.phonepeAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>PhonePe UPI/Number</label>
            <input
              type="text"
              name="phonepeDetail"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.phonepeDetail || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {/* Common Fields */}
      <div>
        <label>Total Amount Paid to Insurance Agency</label>
        <input
          type="text"
          name="agencyAmount"
          className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          value={stepData.agencyAmount || ""}
          onChange={handleChangeStep}
        />
      </div>

      <div>
        <label>Date of Payment</label>
        <input
          type="date"
          name="paymentDate"
          className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          value={stepData.paymentDate || ""}
          onChange={handleChangeStep}
        />
      </div>

      <div>
        <label>Transaction ID / Cheque No / UTR</label>
        <input
          type="text"
          name="transactionId"
          className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          value={stepData.transactionId || ""}
          onChange={handleChangeStep}
        />
      </div>
    </div>
  );
};

export default StepFive;
