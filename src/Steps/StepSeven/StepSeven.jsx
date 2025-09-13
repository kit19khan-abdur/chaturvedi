import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const StepSeven = () => {
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

  const callExecutivesOptions = [
    { value: 'varsha_singhal', label: 'Varsha Singhal' },
    { value: 'shipli_shukla', label: 'Shipli Shukla' },
    { value: 'other_exec', label: '...' }
  ];

  const fieldExecutivesOptions = [
    { value: 'yashpal_chaudhary', label: 'Yashpal Chaudhary' },
    { value: 'other_field', label: '...' }
  ];

  const underwriterOptions = [
    { value: '', label: 'Select' },
    { value: 'underwriter_1', label: 'Underwriter 1' },
    { value: 'underwriter_2', label: 'Underwriter 2' }
  ];

  const pucOptions = [
    { value: '', label: 'Select' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSelectChange = (selected, { name }) => {
  // Update React state
  setStepData(prev => ({ ...prev, [name]: selected }));

  // Update localStorage
  const temp = JSON.parse(localStorage.getItem('stepData')) || {};
  const updated = {
    ...temp,
    [name]: selected,
  };

  localStorage.setItem("stepData", JSON.stringify(updated));
  setStepData(updated);
};


     useEffect(() =>{
        document.title = `Chaturvedi Motors Form || on Step7`
      },[])

  return (
    <div className="capitalize p-4  rounded-xl shadow-sm bg-white space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Call Executive Reference</label>
          <Select
            isMulti
            name="callExecutiveRefs"
            options={callExecutivesOptions}
            value={stepData.callExecutiveRefs}
            onChange={handleSelectChange}
            className="text-sm"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Field Executive Reference</label>
          <Select
            isMulti
            name="fieldExecutiveRefs"
            options={fieldExecutivesOptions}
            value={stepData.fieldExecutiveRefs}
            onChange={handleSelectChange}
            className="text-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Policy Underwriter Executive Reference</label>
          <select
            name="policyUnderwriter"
            value={stepData.policyUnderwriter}
            onChange={(e) => handleChangeStep(e)}
            className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          >
            {underwriterOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">PUC Available</label>
          <select
            name="pucAvailable"
            value={stepData.pucAvailable}
            onChange={(e) => handleChangeStep(e)}
            className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          >
            {pucOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Remarks</label>
        <input
          type="text"
          name="remarks"
          placeholder="Enter remarks here"
          value={stepData.remarks}
          onChange={(e) => handleChangeStep(e)}
          className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
        />
      </div>
    </div>
  );
};

export default StepSeven;
