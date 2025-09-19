import React, { useCallback, useEffect, useState } from "react";

const paymentModessixList = [
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

const StepSixcheck = ({ setFormData = () => { }, setRequiredFields, showErrors, paymentStatus }) => {
    let formData = JSON.parse(localStorage.getItem("localData")) || [];
    const [stepData, setStepData] = useState({ ...formData });
    const [localData, setLocalData] = useState({
        checkboxsix: "",
        cashAmountsix: "",
        neftAmountsix: "",
        googlePayAmountsix: "",
        googlePayDetailsix: "",
        debitAmountsix: "",
        paymentModessix: [],
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
    })

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("localData"));
        if (saved) {
            setLocalData(saved);
            setLocalData((prev) => ({ ...prev, ...saved }));
        }
    }, []);


    const handleChangeStep = (e) => {
        const { name, type, checked, value } = e.target;

        // get whatever we saved before
        const temp = JSON.parse(localStorage.getItem("localData")) || { ...localData };
        const updated = { ...temp };

        if (type === "checkbox") {
            // if you really want to save checkboxes individually
            if (checked) {
                updated[name] = value;
            } else {
                delete updated[name];
            }
        } else {
            updated[name] = value;
        }

        // save to localStorage correctly
        localStorage.setItem("localData", JSON.stringify(updated));

        // update local state
        setLocalData(updated);

        // still update localData so parent receives it
        handleChange(e);
    };




    useEffect(() => {
        let fields = [];

        // Cash
        if (localData.paymentModessix?.includes("Cash")) {
            fields.push("cashAmountsix");
        }

        // NEFT/RTGS
        if (localData.paymentModessix?.includes("NEFT/RTGS")) {
            fields.push("neftAmountsix", "transactionIDsix"); // also push transactionID for NEFT
        }

        // Google Pay
        if (localData.paymentModessix?.includes("Google Pay")) {
            fields.push("googlePayAmountsix", "googlePayDetailsix");
        }

        // Debit Card
        if (localData.paymentModessix?.includes("Debit Card")) {
            fields.push("debitAmountsix", "debitCardDetailsix");
        }

        // Credit Card
        if (localData.paymentModessix?.includes("Credit Card")) {
            fields.push("creditAmountsix", "creditCardsix");
        }

        // Netbanking
        if (localData.paymentModessix?.includes("Netbanking")) {
            fields.push("netbankingAmountsix", "netbankingDetailsix");
        }

        // Cheque
        if (localData.paymentModessix?.includes("Cheque")) {
            fields.push("chequeAmountsix", "chequeDetailssix");
        }

        // PhonePe
        if (localData.paymentModessix?.includes("PhonePe")) {
            fields.push("phonepeAmountsix", "phonepeDetailsix");
        }



        // Always required fields
        fields.push("agencyAmountsix", "paymentDatesix");

        setRequiredFields(fields);

    }, [localData.paymentModessix, localData]);

    // Sync localData back to parent in real time

    const togglePaymentMode = (mode) => {
        setLocalData(prev => {
            const currentModes = prev.paymentModessix || [];
            const updatedModes = currentModes.includes(mode)
                ? currentModes.filter(m => m !== mode)
                : [...currentModes, mode];

            const updated = { ...prev, paymentModessix: updatedModes };

            // clear associated fields if unchecked
            if (!updatedModes.includes(mode)) {
                if (mode === "Cash") updated.cashAmountsix = "";
                if (mode === "NEFT/RTGS") {
                    updated.neftAmountsix = "";
                    updated.transactionIDsix = "";
                }
                // repeat for other modes as needed
            }

            localStorage.setItem("localData", JSON.stringify(updated));
            return updated;
        });
    };





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




    return (
        <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Mode Checkboxes */}
            <div className="col-span-2">
                <h2 className="font-semibold text-lg mb-2">Mode of Payment to Insurance Company</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {paymentModessixList.map((mode) => (
                        <label key={mode} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name={mode}
                                checked={localData.paymentModessix?.includes(mode)}
                                onChange={() => togglePaymentMode(mode)}
                            />
                            <span>{mode}</span>
                        </label>
                    ))}
                    {showErrors && localData?.paymentModessix?.length === 0 && (
                        <p className="text-sm text-red-500 mt-1">Select One Payment Method</p>
                    )}
                </div>
            </div>

            {/* Conditional Fields */}

            {localData.paymentModessix?.includes("Cash") && (
                <>
                    <div>
                        <label>Cash Amount Paid to Insurance Company</label>
                        <input
                            type="text"
                            name="cashAmountsix"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.cashAmountsix === "" && !localData?.cashAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            value={localData.cashAmountsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.cashAmountsix === "" && !localData?.cashAmountsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                </>
            )}

            {localData.paymentModessix?.includes("NEFT/RTGS") && (
                <>
                    <div>
                        <label>NEFT Or RTGS Amount Paid to Insurance Company</label>
                        <input
                            type="text"
                            name="neftAmountsix"
                            placeholder="NEFT Or RTGS Amount Paid to Insurance Company"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.neftAmountsix === "" && !localData?.neftAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            value={localData.neftAmountsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.neftAmountsix === "" && !localData?.neftAmountsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                    <div>
                        <label>UTR / Transaction ID / Cheque Details</label>
                        <input
                            type="text"
                            name="transactionIDsix"
                            placeholder="Enter UTR / Transaction ID / Cheque Details"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.transactionIDsix === "" && !localData?.transactionIDsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            value={localData.transactionIDsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.transactionIDsix === "" && !localData?.transactionIDsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                </>
            )}

            {localData.paymentModessix?.includes("Google Pay") && (
                <>
                    <div>
                        <label>Google Pay Amount Paid to Insurance Company</label>
                        <input
                            type="text"
                            name="googlePayAmountsix"
                            placeholder="Enter Google Pay Amount Paid to Insurance Company"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.googlePayAmountsix === "" && !localData?.googlePayAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            value={localData.googlePayAmountsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.googlePayAmountsix === "" && !localData?.googlePayAmountsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <select name="googlePayDetailsix" value={localData.googlePayDetailsix} onChange={handleChangeStep}
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.googlePayDetailsix === "" && !localData?.googlePayDetailsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
                            <option value="Chaturvedi Motors - HDFC BANK - C/A">Chaturvedi Motors - HDFC BANK - C/A</option>
                            <option value="Chaturvedi Motors - SBI BANK - C/A">Chaturvedi Motors - SBI BANK - C/A</option>
                            <option value="SatyaPrakash - SBI BANK - S/A">SatyaPrakash - SBI BANK - S/A</option>
                            <option value="SatyaPrakash - ICICI BANK - S/A">SatyaPrakash - ICICI BANK - S/A</option>
                            <option value="SatyaPrakash - HDFC BANK - S/A">SatyaPrakash - HDFC BANK - S/A</option>
                            <option value="Yatendra Kumar - SBI BANK - S/A">Yatendra Kumar - SBI BANK - S/A</option>
                            <option value="Yatendra Kumar - HDFC BANK - S/A">Yatendra Kumar - HDFC BANK - S/A</option>
                            <option value="Khem Chand - HDFC BANK - S/A">Khem Chand - HDFC BANK - S/A</option>
                            <option value="Rekha - HDFC BANK - S/A">Rekha - HDFC BANK - S/A</option>
                            <option value="Chitra - HDFC BANK - S/A">Chitra - HDFC BANK - S/A</option>
                            <option value="Chitra - SBI BANK - S/A">Chitra - SBI BANK - S/A</option>
                            <option value="Sapna - HDFC BANK - S/A">Sapna - HDFC BANK - S/A</option>
                            <option value="Sapna - SBI BANK - S/A">Sapna - SBI BANK - S/A</option>
                            <option value="Sangita - SBI BANK - S/A">Sangita - SBI BANK - S/A</option>
                            <option value="Dheeraj - AXIS BANK - S/A">Dheeraj - AXIS BANK - S/A</option>
                            <option value="Ravi Shankar - PNB BANK - S/A">Ravi Shankar - PNB BANK - S/A</option>
                            <option value="Priyanka Sharma - PNB BANK - S/A">Priyanka Sharma - PNB BANK - S/A</option>
                        </select>
                        {showErrors && localData?.googlePayDetailsix === "" && !localData?.googlePayDetailsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                </>
            )}

            {localData.paymentModessix?.includes("Debit Card") && (
                <>
                    <div>
                        <label>Debit Card Amount paid to Insurance Company</label>
                        <input
                            type="text"
                            name="debitAmountsix"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.debitAmountsix === "" && !localData?.debitAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            value={localData.debitAmountsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.debitAmountsix === "" && !localData?.debitAmountsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                    <div>
                        <label>Select Debit Card</label>
                        <select name="debitCardDetailsix" value={localData.debitCardDetailsix} onChange={handleChangeStep}
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.debitCardDetailsix === "" && !localData?.debitCardDetailsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
                            <option value="Chaturvedi Motors - SBI BANK - C/A">Chaturvedi Motors - SBI BANK - C/A</option>
                            <option value="Chaturvedi Motors - HDFC BANK - C/A">Chaturvedi Motors - HDFC BANK - C/A</option>
                            <option value="SatyaPrakash - SBI BANK - S/A">SatyaPrakash - SBI BANK - S/A</option>
                            <option value="SatyaPrakash - ICICI BANK - S/A">SatyaPrakash - ICICI BANK - S/A</option>
                            <option value="SatyaPrakash - HDFC BANK - S/A">SatyaPrakash - HDFC BANK - S/A</option>
                            <option value="Yatendra Kumar - SBI BANK - S/A">Yatendra Kumar - SBI BANK - S/A</option>
                            <option value="Yatendra Kumar - HDFC BANK - S/A">Yatendra Kumar - HDFC BANK - S/A</option>
                            <option value="Khem Chand - HDFC BANK - S/A">Khem Chand - HDFC BANK - S/A</option>
                            <option value="Rekha - HDFC BANK - S/A">Rekha - HDFC BANK - S/A</option>
                            <option value="Chitra - HDFC BANK - S/A">Chitra - HDFC BANK - S/A</option>
                            <option value="Chitra - SBI BANK - S/A">Chitra - SBI BANK - S/A</option>
                            <option value="Sapna - HDFC BANK - S/A">Sapna - HDFC BANK - S/A</option>
                            <option value="Sapna - SBI BANK - S/A">Sapna - SBI BANK - S/A</option>
                            <option value="Sangita - SBI BANK - S/A">Sangita - SBI BANK - S/A</option>
                            <option value="Dheeraj - AXIS BANK - S/A">Dheeraj - AXIS BANK - S/A</option>
                            <option value="Ravi Shankar - PNB BANK - S/A">Ravi Shankar - PNB BANK - S/A</option>
                            <option value="Priyanka Sharma - PNB BANK - S/A">Priyanka Sharma - PNB BANK - S/A</option>
                        </select>
                        {showErrors && localData?.debitCardDetailsix === "" && !localData?.debitCardDetailsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                </>
            )}

            {localData.paymentModessix?.includes("Credit Card") && (
                <>
                    <div>
                        <label>Credit Card Amount Paid to Insurance Company</label>
                        <input
                            type="text"
                            name="creditAmountsix"
                            placeholder="Enter Credit Card Amount Paid to Insurance Company"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.creditAmountsix === "" && !localData?.creditAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            value={localData.creditAmountsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.creditAmountsix === "" && !localData?.creditAmountsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                    <div>
                        <label>Select Credit Card</label>
                        <select name="creditCardsix" value={localData.creditCardsix} onChange={handleChangeStep}
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.creditCardsix === "" && !localData?.creditCardsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
                            <option value="Chaturvedi Motors - HDFC BANK - C/A">Chaturvedi Motors - HDFC BANK - C/A</option>
                            <option value="Chaturvedi Motors - SBI BANK - C/A">Chaturvedi Motors - SBI BANK - C/A</option>
                            <option value="SatyaPrakash - ICICI BANK - S/A">SatyaPrakash - ICICI BANK - S/A</option>
                        </select>
                        {showErrors && localData?.creditCardsix === "" && !localData?.creditCardsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                </>
            )}

            {localData.paymentModessix?.includes("Netbanking") && (
                <>
                    <div>
                        <label>Netbanking Amount Paid to Insurance Company</label>
                        <input
                            type="text"
                            placeholder="Enter Netbanking Amount Paid to Insurance Company"
                            name="netbankingAmountsix"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.netbankingAmountsix === "" && !localData?.netbankingAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            value={localData.netbankingAmountsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.netbankingAmountsix === "" && !localData?.netbankingAmountsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                    <div>
                        <label>Select Netbanking Detail</label>
                        <select name="netbankingDetailsix" value={localData.netbankingDetailsix} onChange={handleChangeStep}
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.netbankingDetailsix === "" && !localData?.netbankingDetailsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
                            <option value="Chaturvedi Motors - HDFC BANK - C/A">Chaturvedi Motors - HDFC BANK - C/A</option>
                            <option value="Chaturvedi Motors - SBI BANK - C/A">Chaturvedi Motors - SBI BANK - C/A</option>
                            <option value="SatyaPrakash - SBI BANK - S/A">SatyaPrakash - SBI BANK - S/A</option>
                            <option value="SatyaPrakash - ICICI BANK - S/A">SatyaPrakash - ICICI BANK - S/A</option>
                            <option value="SatyaPrakash - HDFC BANK - S/A">SatyaPrakash - HDFC BANK - S/A</option>
                            <option value="Yatendra Kumar - SBI BANK - S/A">Yatendra Kumar - SBI BANK - S/A</option>
                            <option value="Yatendra Kumar - HDFC BANK - S/A">Yatendra Kumar - HDFC BANK - S/A</option>
                            <option value="Khem Chand - HDFC BANK - S/A">Khem Chand - HDFC BANK - S/A</option>
                            <option value="Rekha - HDFC BANK - S/A">Rekha - HDFC BANK - S/A</option>
                            <option value="Chitra - HDFC BANK - S/A">Chitra - HDFC BANK - S/A</option>
                            <option value="Chitra - SBI BANK - S/A">Chitra - SBI BANK - S/A</option>
                            <option value="Sapna - HDFC BANK - S/A">Sapna - HDFC BANK - S/A</option>
                            <option value="Sapna - SBI BANK - S/A">Sapna - SBI BANK - S/A</option>
                            <option value="Sangita - SBI BANK - S/A">Sangita - SBI BANK - S/A</option>
                            <option value="Dheeraj - AXIS BANK - S/A">Dheeraj - AXIS BANK - S/A</option>
                            <option value="Ravi Shankar - PNB BANK - S/A">Ravi Shankar - PNB BANK - S/A</option>
                            <option value="Priyanka Sharma - PNB BANK - S/A">Priyanka Sharma - PNB BANK - S/A</option>
                        </select>
                        {showErrors && localData?.netbankingDetailsix === "" && !localData?.netbankingDetailsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                </>
            )}

            {localData.paymentModessix?.includes("Cheque") && (
                <>
                    <div>
                        <label>Cheque Amount Paid To Insurance Company</label>
                        <input
                            type="text"
                            name="chequeAmountsix"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.chequeAmountsix === "" && !localData?.chequeAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            placeholder="Enter Cheque Amount"
                            value={localData.chequeAmountsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.chequeAmountsix === "" && !localData?.chequeAmountsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                </>
            )}

            {localData.paymentModessix?.includes("PhonePe") && (
                <>
                    <div>
                        <label>Phonepe Amount Paid to Insurance Company</label>
                        <input
                            type="text"
                            name="phonepeAmountsix"
                            placeholder="Enter Phonepe Amount Paid to Insurance Company"
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.phonepeAmountsix === "" && !localData?.phonepeAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                            value={localData.phonepeAmountsix || ""}
                            onChange={handleChangeStep}
                        />
                        {showErrors && localData?.phonepeAmountsix === "" && !localData?.phonepeAmountsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                    <div>
                        <label>Select PhonePe Detail</label>
                        <select name="phonepeDetailsix" value={localData.phonepeDetailsix} onChange={handleChangeStep}
                            className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.phonepeDetailsix === "" && !localData?.phonepeDetailsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                        >
                            <option value="Yatendra Kumar SBI -7417227114">Yatendra Kumar SBI -7417227114</option>
                            <option value="Yatendra Kumar HDFC -7417227114">Yatendra Kumar HDFC -7417227114</option>
                            <option value="Khem chand HDFC -9410075685">Khem chand HDFC -9410075685</option>
                            <option value="Rekha HDFC -9837111044">Rekha HDFC -9837111044</option>
                            <option value="Chitra CHATURVEDI SBI -7417227114">Chitra CHATURVEDI SBI -7417227114</option>
                            <option value="Chaturvedi Motors HDFC 9837111044">Chaturvedi Motors HDFC 9837111044</option>
                        </select>
                        {showErrors && localData?.phonepeDetailsix === "" && !localData?.phonepeDetailsix && (
                            <p className="text-sm text-red-500 mt-1">This field is required.</p>
                        )}
                    </div>
                </>
            )}

            {localData.paymentModessix?.length > 0 && (
                <div>
                    <label>UTR / Transaction ID / Cheque Details</label>
                    <input
                        type="text"
                        name="chequeDetailssix"
                        className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.chequeDetailssix === "" && !localData?.chequeDetailssix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                        placeholder="Enter UTR / Transaction ID / Cheque Details"
                        value={localData.chequeDetailssix || ""}
                        onChange={handleChangeStep}
                    />
                    {showErrors && localData?.chequeDetailssix === "" && !localData?.chequeDetailssix && (
                        <p className="text-sm text-red-500 mt-1">This field is required.</p>
                    )}
                </div>
            )}

            {/* Common Fields */}
            <div>
                <label>Total Amount Paid to Insurance Agency</label>
                <input
                    type="text"
                    name="agencyAmountsix"
                    className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.agencyAmountsix === "" && !localData?.agencyAmountsix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                    value={localData.agencyAmountsix || ""}
                    onChange={handleChangeStep}
                />
                {showErrors && localData?.agencyAmountsix === "" && !localData?.agencyAmountsix && (
                    <p className="text-sm text-red-500 mt-1">This field is required.</p>
                )}
            </div>

            <div>
                <label>Date of Payment to Insurance Company</label>
                <input
                    type="date"
                    name="paymentDatesix"
                    className={`w-full border custom-select px-4 py-2 ${showErrors && localData?.paymentDatesix === "" && !localData?.paymentDatesix ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                    value={localData.paymentDatesix || ""}
                    onChange={handleChangeStep}
                />
                {showErrors && localData?.paymentDatesix === "" && !localData?.paymentDatesix && (
                    <p className="text-sm text-red-500 mt-1">This field is required.</p>
                )}
            </div>
        </div>
    );
};

export default StepSixcheck;
