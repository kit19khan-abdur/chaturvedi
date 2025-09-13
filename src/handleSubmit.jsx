const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const year = tomorrow.getFullYear();

  return `${day}/${month}/${year}`;
};
const toISTDateString = (dateInput) => {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset from UTC in ms
  const istDate = new Date(date.getTime() + istOffset);

  return istDate.toISOString().split("T")[0]; // yyyy-mm-dd
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const finalData = JSON.parse(localStorage.getItem("stepData")) || {};

  // Construct the payload as per API expectations
  const payload ={
    Username: "SATYA1060025",
    Password: "4596",
    PersonName: finalData.customername,
    MobileNo: finalData.primaryPhone,
    MobileNo1: finalData.contact3 || "",
    MobilNo2: finalData.contact4 || "",
    CountryCode1: "+91",
    CountryCode2: "+91",
    whatsappNumber: finalData.whatsappNumber || "",
    whatsappSame: finalData.whatsappSame || "",
    whatsappSameCor: finalData.whatsappSameCor || "",
    PinCode: finalData.pincode || "",
    Title: finalData.title || "",
    Country: finalData.country || "",
    City: finalData.city || "",
    ncbPolicy: finalData.ncbPolicy || "",
    State: finalData.state || "",
    fueltype: finalData.fueltype || "",
    totalPremium: finalData.totalPremiumWithGst || "",
    brokerAgencyName: finalData.brokerAgencyName || "",
    locality: finalData.locality || "",
    OdPolicyStartDate: finalData.odPolicyStartDate || "", // Add this
    OdPolicyEndDate: finalData.odPolicyEndDate || "", // Add this
    ResidentialAddress: finalData.address || "",
    newPolicyStartDate: toISTDateString(finalData.newPolicyStartDate) || "", // Add this
    newPolicyEndDate: toISTDateString(finalData.newPolicyEndDate) || "",     // Add this
    serviceBook: finalData.serviceBook || "",
    fatherName: finalData.fatherName || "",
    dob: toISTDateString(finalData.dob) || "",
    CompanyName: finalData.companyName || "",
    ucName: finalData.ucName || "",
    proposalType: finalData.proposalType || "",
    policyType: finalData.policyType || "",
    prevPolicyType: finalData.prevPolicyType || "",
    receiptNumber: finalData.receiptNumber || "",
    receiptDate: toISTDateString(finalData.receiptDate) || "",
    vehicleYear: finalData.vehicleYear || "",
    registrationNumber: finalData.registrationNumber || "",
    registrationDate: toISTDateString(finalData.registrationDate) || "",
    chassisNumber: finalData.chassisNumber || "",
    engineNumber: finalData.engineNumber || "",
    manufacturingYear: finalData.manufacturingYear || "",
    rtoState: finalData.rtoState || "",
    rtoCity: finalData.rtoCity || "",
    product: finalData.product || "",
    manufacturerType: finalData.manufacturerType || "",
    model: finalData.model || "",
    varience: finalData.varience || "",
    newOdPolicyStartDate: toISTDateString(finalData.newOdPolicyStartDate) || "",
    newOdPolicyEndDate: toISTDateString(finalData.newOdPolicyEndDate) || "",
    newTpPolicyStartDate: toISTDateString(finalData.newTpPolicyStartDate) || "",
    newTpPolicyEndDate: toISTDateString(finalData.newTpPolicyEndDate) || "",
    prevoiusPolicyStartDate: toISTDateString(finalData.prevoiusPolicyStartDate) || "",
    prevoiusPolicyEndDate: toISTDateString(finalData.prevoiusPolicyEndDate) || "",
    ncbNewPolicy: finalData.ncbNewPolicy || "",
    brokerName: finalData.brokerName || "",
    policyNumber: finalData.policyNumber || "",
    insurerName: finalData.insurerName || "",
    policyIssueDate: toISTDateString(finalData.policyIssueDate) || "",
    idv: finalData.idv || "",
    paCover: finalData.paCover || "",
    addon: finalData.addon || "",
    odAmount: finalData.odAmount || "",
    tpAmount: finalData.tpAmount || "",
    netTotal: finalData.netTotal || "",
    gstAmount: finalData.gstAmount || "",
    totalPremiumWithGst: finalData.totalPremiumWithGst || "",
    breakingCharge: finalData.breakingCharge || "",
    waiverAmount: finalData.waiverAmount || "",
    netPayable: finalData.netPayable || "",
    paymentModesOptions: Array.isArray(finalData.paymentModesOptions)
      ? finalData.paymentModesOptions.join(" ")
      : finalData.paymentModesOptions || "",
    agencyAmount: finalData.agencyAmount || "",
    paymentDate: toISTDateString(finalData.paymentDate) || "",
    paymentModes: Array.isArray(finalData.paymentModes)
      ? finalData.paymentModes.join(" ")
      : finalData.paymentModes || "",
    cashAmount: finalData.cashAmount || "",
    neftAmount: finalData.neftAmount || "",
    googlePayAmount: finalData.googlePayAmount || "",
    googlePayDetail: finalData.googlePayDetail || "",
    debitAmount: finalData.debitAmount || "",
    debitCardDetail: finalData.debitCardDetail || "",
    creditAmount: finalData.creditAmount || "",
    creditCardDetail: finalData.creditCardDetail || "",
    netbankingAmount: finalData.netbankingAmount || "",
    netbankingDetail: finalData.netbankingDetail || "",
    chequeAmount: finalData.chequeAmount || "",
    phonepeAmount: finalData.phonepeAmount || "",
    phonepeDetail: finalData.phonepeDetail || "",
    paymentStatus: finalData.paymentStatus || "",
    paymentMethods: Array.isArray(finalData.paymentMethods)
      ? finalData.paymentMethods.join(", ")
      : finalData.paymentMethods || "",
    chequeNumber: finalData.chequeNumber || "",
    transactionId: finalData.transactionId || "",
    expectedClearDate: toISTDateString(finalData.expectedClearDate) || "",
    comments: finalData.comments || "",
    callExecutiveRefs: Array.isArray(finalData.callExecutiveRefs)
      ? finalData.callExecutiveRefs.map(item => item.label).join(", ")
      : "",
    fieldExecutiveRefs: Array.isArray(finalData.fieldExecutiveRefs)
      ? finalData.fieldExecutiveRefs.map(item => item.label).join(", ")
      : "",
    policyUnderwriter: finalData.policyUnderwriter || "",
    pucAvailable: finalData.pucAvailable || "",
    remarks: finalData.remarks || "",
    SourceName: "Chaturvedi Motors Form",
    MediumName: "Website",
    CountryCode: "+91",
    FollowupStatus: "Call-Back",
    AssignedTo: "SATYA1060025", // Or appropriate field
    NextStatusDate: getTomorrowDate(),
    Time: "10:02:00",
    Amount: "0",
    FollowupRemarks: "Chaturvedi Motors Form",
    Remarks: "Chaturvedi Motors Form",
    LeadNo: "0",
    Update: "1"
  };

  try {
    const res = await fetch("https://sipapi.crmapp.in.net/Lead/FB8BF7C6-D8D5-464A-A274-5258CC63C157/AddLeadAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data) {
      alert("Form submitted successfully!");
      console.log("API Response:", data);
      localStorage.removeItem("chaturvediFormData");
      // localStorage.clear('stepData')
    } else {
      console.error("Submission failed:", data);
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error connecting to server.");
  }
};


export default handleSubmit;