export const paymentTotal = (queryResults) => {
  var paymentModeObject = {
    totalCash: 0,
    totalHMO: 0,
    totalComp: 0,
    totalFamilyPlan: 0,
    totalAll: 0,
  };

  paymentModeObject.totalAll += queryResults.length;
  queryResults.forEach((result) => {
    const totalCash = result.paymentinfo.filter((paymentinfoArr) => {
      return paymentinfoArr.paymentmode === "Cash";
    });

    const totalHMO = result.paymentinfo.filter((paymentinfoArr) => {
      return paymentinfoArr.paymentmode === "HMO";
    });

    const totalComp = result.paymentinfo.filter((paymentinfoArr) => {
      return paymentinfoArr.paymentmode === "Comp";
    });

    const totalFamilyPlan = result.paymentinfo.filter((paymentinfoArr) => {
      return paymentinfoArr.paymentmode === "Family plan";
    });

    paymentModeObject.totalCash += totalCash.length;
    paymentModeObject.totalHMO += totalHMO.length;
    paymentModeObject.totalComp += totalComp.length;
    paymentModeObject.totalFamilyPlan += totalFamilyPlan.length;
    return paymentModeObject;
  });
  const paymentModeData = [
    paymentModeObject.totalCash,
    paymentModeObject.totalHMO,
    paymentModeObject.totalComp,
    paymentModeObject.totalFamilyPlan,
    paymentModeObject.totalAll,
  ];
  return { paymentModeData };
};

// const { paymentModeObject } = paymentTotal();

// console.log({ paymentModeObject: paymentModeObject });
