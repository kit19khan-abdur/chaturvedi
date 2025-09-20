import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const StepSeven = ({ setRequiredFields, showErrors }) => {
  const [stepData, setStepData] = useState(() => {
    // load saved values on mount
    return JSON.parse(localStorage.getItem('stepData')) || {
      callExecutiveRefs: [],
      fieldExecutiveRefs: [],
      policyUnderwriter: '',
      pucAvailable: '',
      pucCertificateNumber: '',
      pucStartDate: '',
      pucEndDate: '',
      remarks: '',
    };
  });

  const callExecutivesOptions = [
    { value: 'Varsha Singhal', label: 'Varsha Singhal' },
    { value: 'Sarita Kumari', label: 'Sarita Kumari' },
    { value: 'Shilpi shukla', label: 'Shilpi shukla' },
    { value: 'Radha Kumari', label: 'Radha Kumari' },
    { value: 'Garima Yadav', label: 'Garima Yadav' },
    { value: 'tanisha', label: 'Tanisha' },
    { value: 'Anamika chaudhary', label: 'Anamika chaudhary' }
  ];


  const fieldExecutivesOptions = [
    { value: 'Yashpal Chaudhary', label: 'Yashpal Chaudhary' },
    { value: 'Self Office', label: 'Self Office' },
  ];

  const underwriterOptions = [
    { value: '', label: 'Select' },
    { value: 'Prashant Kumar', label: 'Prashant Kumar' },
    { value: 'Rishik', label: 'Rishik' },
    { value: 'Sarita Kumari', label: 'Sarita Kumari' },
    { value: 'Varsha Singhal', label: 'Varsha Singhal' },
    { value: 'Varsha Singhal', label: 'Varsha Singhal' },
    { value: 'Abhishek', label: 'Abhishek' },
  ];


  const pucOptions = [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ];

  // for normal inputs/selects
  const handleChangeStep = (e) => {
    const { name, value } = e.target;
    const updated = { ...stepData, [name]: value };
    setStepData(updated);
    localStorage.setItem('stepData', JSON.stringify(updated));
  };

  // for react-select
  const handleSelectChange = (selected, { name }) => {
    // if nothing selected, fallback to empty array
    const valuesOnly = (selected || []).map(opt => opt.value);

    const updated = { ...stepData, [name]: valuesOnly };
    setStepData(updated);
    localStorage.setItem('stepData', JSON.stringify(updated));
  };

  useEffect(() => {
    let fields = [];

    if (stepData.pucOptions === 'yes') {
      fields.push('pucCertificateNumber', 'pucStartDate', 'pucEndDate');
    }
    fields.push('callExecutiveRefs', 'fieldExecutiveRefs', 'remarks');

    setRequiredFields(fields);

  }, [stepData, stepData.pucOptions]);

  const isEmpty = (val) => {
    if (Array.isArray(val)) return val.length === 0;
    return val === undefined || val === null || val.toString().trim() === '';
  };

  useEffect(() => {
    console.clear()
  }, [stepData])


  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step7`;
  }, []);

  return (
    <div className="capitalize p-4 rounded-xl shadow-sm bg-white space-y-4">
      {/* Top multi selects */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">
            Call Executive Reference
          </label>
          <Select
            isMulti
            name="callExecutiveRefs"
            options={callExecutivesOptions}
            value={callExecutivesOptions.filter((opt, index) =>
              stepData.callExecutiveRefs?.includes(opt.value)
            )}
            onChange={handleSelectChange}
            classNamePrefix="react-select"
            className={`w-full border custom-select px-4 py-2 ${showErrors && isEmpty(stepData.callExecutiveRefs) ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
          />
          {showErrors && isEmpty(stepData.callExecutiveRefs) && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            Field Executive Reference
          </label>
          <Select
            isMulti
            name="fieldExecutiveRefs"
            options={fieldExecutivesOptions}
            value={fieldExecutivesOptions.filter(opt =>
              stepData.fieldExecutiveRefs?.includes(opt.value) // ✅ matches state key
            )}
            onChange={handleSelectChange}
            classNamePrefix="react-select"
            className={`w-full border custom-select px-4 py-2 ${showErrors && isEmpty(stepData.fieldExecutiveRefs) ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
          />
          {showErrors && isEmpty(stepData.fieldExecutiveRefs) && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
      </div>

      {/* Underwriter + PUC Available */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">
            Policy Underwriter Executive Reference
          </label>
          <select
            name="policyUnderwriter"
            value={stepData.policyUnderwriter}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.policyUnderwriter === "" && !stepData?.policyUnderwriter ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
          >
            {underwriterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {showErrors && stepData?.policyUnderwriter === "" && !stepData?.policyUnderwriter && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">PUC Available</label>
          <select
            name="pucAvailable"
            value={stepData.pucAvailable}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.pucAvailable === "" && !stepData?.pucAvailable ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
          >
            {pucOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {showErrors && stepData?.pucAvailable === "" && !stepData?.pucAvailable && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
      </div>

      {/* PUC certificate number */}
      {stepData.pucAvailable === 'yes' && (<>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">PUC Certificate Number</label>
            <input
              type="text"
              name="pucCertificateNumber"
              placeholder="Enter PUC Certificate Number"
              value={stepData.pucCertificateNumber}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.pucCertificateNumber === "" && !stepData?.pucCertificateNumber ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
            />
            {showErrors && stepData?.pucCertificateNumber === "" && !stepData?.pucCertificateNumber && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">PUC Start Date</label>
            <input
              type="date"
              name="pucStartDate"
              value={stepData.pucStartDate}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.pucStartDate === "" && !stepData?.pucStartDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
            />
            {showErrors && stepData?.pucStartDate === "" && !stepData?.pucStartDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>
        </div>

        {/* PUC End Date */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">PUC End Date</label>
            <input
              type="date"
              name="pucEndDate"
              value={stepData.pucEndDate}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.pucEndDate === "" && !stepData?.pucEndDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
            />
            {showErrors && stepData?.pucEndDate === "" && !stepData?.pucEndDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>
        </div>
      </>)}
      {/* Remarks */}
      <div>
        <label className="block font-medium mb-1">Remarks</label>
        <textarea
          type="text"
          name="remarks"
          height="350px"
          placeholder="Enter remarks here"
          value={stepData.remarks}
          onChange={handleChangeStep}
          className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.remarks === "" && !stepData?.remarks ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
        />
        {showErrors && stepData?.remarks === "" && !stepData?.remarks && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
    </div>
  );
};

export default StepSeven;
