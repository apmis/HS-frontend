import {
  TotalServiceData,
  FetchLocationWard,
  FetchDataWithInARange,
  FetchDataWithInAYear,
} from "./chartDataHandler";

import { getDayIntheOtherMonth } from "../getNameAndNumOfDaysArray.js";

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

export const PendingAdmission = (service) => {
  const { totalServiceData } = TotalServiceData(service, "order");

  const pendingAdmission = totalServiceData.filter((result) => {
    return result.order.order_status === "Pending";
  });

  const totalPendingAdmissions = pendingAdmission.length;
  return { totalPendingAdmissions };
};

export const TotalBedSpaces = (service) => {
  const { fetchLocationWard } = FetchLocationWard(service);
  var totalBedSpaces = 0;

  const wardDataArray = fetchLocationWard.map((result) => {
    const totalBedInSubLocation = result.sublocations.filter((subResult) => {
      return subResult.type === "Bed";
    });

    totalBedSpaces += totalBedInSubLocation.length;
    return totalBedInSubLocation.length;
  });

  return { wardDataArray, totalBedSpaces };
};

export const TotalModeltDataForPrevious = (service) => {
  const currentTime = new Date();
  const { numOfDayInmonthForCurrentYear } = getDayIntheOtherMonth();
  const { totalDataWithInARange: totalInPreviousDay } = FetchDataWithInARange(
    service,
    1,
    0
  );

  //for previous week
  const getDay = currentTime.getDay();
  const gtWeek = 7 + getDay;
  const { totalDataWithInARange: totalInPreviousWeek } = FetchDataWithInARange(
    service,
    gtWeek,
    getDay
  );

  //for previous month
  const getDate = currentTime.getDate();
  const gtMonth =
    numOfDayInmonthForCurrentYear[numOfDayInmonthForCurrentYear.length - 2] +
    getDate;
  const { totalDataWithInARange: totalInPreviousMonth } = FetchDataWithInARange(
    service,
    gtMonth,
    getDate
  );

  //for previous Quarter
  const currentMonth = currentTime.getMonth();
  const currentMonth_Int = Math.ceil(currentMonth / 3);
  const quarterList = [1, 2, 3, 4];

  const currentQuarter = quarterList.filter((result) => {
    return result === currentMonth_Int;
  });

  const prevQuarter = currentQuarter[0] - 1;
  var totalDaysInPreviousQuarter = 0;
  var startIndex = quarterList[0] + (prevQuarter - quarterList[0]) * 3 - 1;
  var lastMonthInPreviousQuarter = startIndex + 2;
  for (let i = startIndex; i < startIndex + 3; i++) {
    totalDaysInPreviousQuarter += numOfDayInmonthForCurrentYear[i];
  }

  var totalDaysBtwPrevAndCurrentQuarter = 0;

  for (let i = currentMonth; i > lastMonthInPreviousQuarter; i--) {
    totalDaysBtwPrevAndCurrentQuarter += numOfDayInmonthForCurrentYear[i];
  }

  const gtQuarter =
    totalDaysInPreviousQuarter + totalDaysBtwPrevAndCurrentQuarter;
  const ltQuarter = totalDaysBtwPrevAndCurrentQuarter;
  const { totalDataWithInARange: totalInPreviousQuarter } =
    FetchDataWithInARange(service, gtQuarter, ltQuarter);

  //for previous year
  const currentYear = currentTime.getFullYear();
  const prevYear = currentYear - 1;
  const ltCurrentYear_MS = new Date(currentYear).getTime();
  const gtPreviousYear_MS = new Date(prevYear).getTime();
  const { totalDataWithInAYear: totalInPreviousYear, isPending: isLoading } =
    FetchDataWithInAYear(service, gtPreviousYear_MS, ltCurrentYear_MS);

  const totalPreviousDataObject = {
    totalInPreviousDay: totalInPreviousDay,
    totalInPreviousWeek: totalInPreviousWeek,
    totalInPreviousMonth: totalInPreviousMonth,
    totalInPreviousQuarter: totalInPreviousQuarter,
    totalInPreviousYear: totalInPreviousYear,
  };

  return {
    totalPreviousDataObject,
    isLoading: isLoading,
  };
};

export const TotalNumOfAllGender = (service) => {
  const { totalServiceData: totalClient } = TotalServiceData(service, "gender");

  const totalMaleClient = totalClient.filter((result) => {
    return (
      (result.gender === "Male") |
      (result.gender === "male") |
      (result.gender === "MALE") |
      (result.gender === "M") |
      (result.gender === "m")
    );
  }).length;

  const totalFemaleClient = totalClient.filter((result) => {
    return (
      (result.gender === "Female") |
      (result.gender === "female") |
      (result.gender === "FEMALE") |
      (result.gender === "F") |
      (result.gender === "f")
    );
  }).length;

  const totalOtherClient =
    totalClient.length - totalMaleClient - totalFemaleClient;

  return { totalMaleClient, totalFemaleClient, totalOtherClient };
};
