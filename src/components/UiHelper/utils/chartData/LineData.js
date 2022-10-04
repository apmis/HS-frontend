import { getDayIntheOtherMonth } from "../getNameAndNumOfDaysArray.js";
import useFetch from "../usefetch";

const TotalNewClientWithinARangeOf30Day = (service, lt, gt) => {
  var dayGT = 24 * 60 * 60 * 1000 * gt;
  var dayLT = 24 * 60 * 60 * 1000 * lt;

  var query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt"],
    createdAt: {
      $gt: new Date().getTime() - dayGT,
      $lt: new Date().getTime() - dayLT,
    },
  };
  var { data, isPending, error } = useFetch(service, query);
  let totalNewClientWithin30Day = Number(data.total);
  let err = error;
  return {
    totalNewClientWithin30Day,
    isPending,
    err,
  };
};

export const clientLineData = (service) => {
  const { monthNameForCurrentYear, numOfDayInmonthForCurrentYear } =
    getDayIntheOtherMonth();
  const length = numOfDayInmonthForCurrentYear.length;

  var prevState = numOfDayInmonthForCurrentYear[length - 1];
  var newClientLineData = [];

  for (let i = length - 2; i >= 0; i--) {
    let lt = prevState;
    let gt = prevState + numOfDayInmonthForCurrentYear[i];
    const { totalNewClientWithin30Day } = TotalNewClientWithinARangeOf30Day(
      service,
      lt,
      gt
    );

    newClientLineData.unshift(totalNewClientWithin30Day);
    prevState = prevState + numOfDayInmonthForCurrentYear[i];
  }

  const { totalNewClientWithin30Day } = TotalNewClientWithinARangeOf30Day(
    service,
    0,
    numOfDayInmonthForCurrentYear[length - 1]
  );

  newClientLineData.push(totalNewClientWithin30Day);
  // console.log("result day details", {
  //   dayDetail: newClientLineData,
  // });

  var newClientLineSeriesData = [
    {
      name: "2022",
      data: newClientLineData,
    },
  ];

  return { monthNameForCurrentYear, newClientLineSeriesData };
};

const TotalResultWithinARangeOf30Day = (service, query) => {
  var { data, isPending, error } = useFetch(service, query);
  let resultWithin30Day = Number(data.total);
  let err = error;
  return {
    resultWithin30Day,
    isPending,
    err,
  };
};

export const AdmittedPatientLineData = (service) => {
  const { monthNameForCurrentYear, numOfDayInmonthForCurrentYear } =
    getDayIntheOtherMonth();
  const length = numOfDayInmonthForCurrentYear.length;

  var prevState = numOfDayInmonthForCurrentYear[length - 1];
  var admittedPatientLineData = [];

  for (let i = length - 2; i >= 0; i--) {
    let lt = prevState;
    let gt = prevState + numOfDayInmonthForCurrentYear[i];
    let dayGT = 24 * 60 * 60 * 1000 * gt;
    let dayLT = 24 * 60 * 60 * 1000 * lt;

    //Query for the previous months
    let query = {
      $sort: { start_time: -1 },
      $select: ["start_time"],
      start_time: {
        $gt: new Date().getTime() - dayGT,
        $lt: new Date().getTime() - dayLT,
      },
    };

    const { resultWithin30Day: totalAdmittedPatientWithin30Day } =
      TotalResultWithinARangeOf30Day(service, query);

    admittedPatientLineData.unshift(totalAdmittedPatientWithin30Day);
    prevState = prevState + numOfDayInmonthForCurrentYear[i];
  }
  let dayGT = 24 * 60 * 60 * 1000 * numOfDayInmonthForCurrentYear[length - 1];

  //Query for the current month
  let query = {
    $sort: { start_time: -1 },
    $select: ["start_time"],
    start_time: {
      $gt: new Date().getTime() - dayGT,
      $lt: new Date().getTime(),
    },
  };
  const { resultWithin30Day: totalAdmittedPatientWithin30Day } =
    TotalResultWithinARangeOf30Day(service, query);

  admittedPatientLineData.push(totalAdmittedPatientWithin30Day);

  var admittedPatientLineSeriesData = {
    name: "Admitted Patient",
    data: admittedPatientLineData,
  };

  return { monthNameForCurrentYear, admittedPatientLineSeriesData };
};

export const DischargedPatientLineData = (service) => {
  const { monthNameForCurrentYear, numOfDayInmonthForCurrentYear } =
    getDayIntheOtherMonth();
  const length = numOfDayInmonthForCurrentYear.length;

  var prevState = numOfDayInmonthForCurrentYear[length - 1];
  var dischargedPatientLineData = [];

  for (let i = length - 2; i >= 0; i--) {
    let lt = prevState;
    let gt = prevState + numOfDayInmonthForCurrentYear[i];
    let dayGT = 24 * 60 * 60 * 1000 * gt;
    let dayLT = 24 * 60 * 60 * 1000 * lt;

    //Query for the previous months
    let query = {
      $sort: { end_time: -1 },
      $select: ["end_time"],
      end_time: {
        $gt: new Date().getTime() - dayGT,
        $lt: new Date().getTime() - dayLT,
      },
    };

    const { resultWithin30Day: totalDischargedPatientWithin30Day } =
      TotalResultWithinARangeOf30Day(service, query);

    dischargedPatientLineData.unshift(totalDischargedPatientWithin30Day);
    prevState = prevState + numOfDayInmonthForCurrentYear[i];
  }
  let dayGT = 24 * 60 * 60 * 1000 * numOfDayInmonthForCurrentYear[length - 1];

  //Query for the current month
  let query = {
    $sort: { end_time: -1 },
    $select: ["end_time"],
    end_time: {
      $gt: new Date().getTime() - dayGT,
      $lt: new Date().getTime(),
    },
  };
  const { resultWithin30Day: totalDischargedPatientWithin30Day } =
    TotalResultWithinARangeOf30Day(service, query);

  dischargedPatientLineData.push(totalDischargedPatientWithin30Day);

  var dischargedPatientLineSeriesData = {
    name: "Discharged Patient",
    data: dischargedPatientLineData,
  };

  return { monthNameForCurrentYear, dischargedPatientLineSeriesData };
};

export const AdmittedAndDischargedPatientLineData = (service) => {
  const { monthNameForCurrentYear, admittedPatientLineSeriesData } =
    AdmittedPatientLineData(service);

  const { dischargedPatientLineSeriesData } =
    DischargedPatientLineData(service);

  const admittedAndDischargedPatientLineSeriesData = [
    admittedPatientLineSeriesData,
    dischargedPatientLineSeriesData,
  ];
  return {
    monthNameForCurrentYear,
    admittedAndDischargedPatientLineSeriesData,
  };
};