import useFetch from "../usefetch";
import { paymentTotal } from "./queryHandler";
import useFetchData from "../useFetchData";

export const TotalNumOfData = (service) => {
  const query = {
    $sort: { createdAt: -1 },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalValue = Number(data.total);
  // console.log("admission documnet ", {
  //   admission: data,
  // });

  let err = error;
  return {
    totalValue,
    isPending,
    err,
  };
};

export const TotalNumOfMaleClient = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["gender"],
    gender: "Male",
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNumMaleClient = Number(data.total);
  let err = error;
  return {
    totalNumMaleClient,
    isPending,
    err,
  };
};

export const TotalNumOfFemaleClient = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["gender"],
    gender: "female",
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNumFemaleClient = Number(data.total);

  let err = error;
  return {
    totalNumFemaleClient,
    isPending,
    err,
  };
};

export const TotalNumOfOtherGenderClient = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["gender"],
    gender: "",
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNumOtherGenderClient = Number(data.total);
  let err = error;
  return {
    totalNumOtherGenderClient,
    isPending,
    err,
  };
};

export const TotalUpcomingAppointment = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    appoint_status: "pending",
  };
  const { data, isPending, error } = useFetch(service, query);

  let totalUpcomingAppointment = Number(data.total);
  let err = error;
  return {
    totalUpcomingAppointment,
    isPending,
    err,
  };
};

export const TotalNewClientWithinAMonth = (service) => {
  const getNumDaysInCurrentMonth = new Date().getDate();
  const DAY_MS = 24 * 60 * 60 * 1000 * getNumDaysInCurrentMonth;
  const query = {
    $sort: { createdAt: -1 },
    createdAt: {
      $gt: new Date().getTime() - DAY_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNewClient = Number(data.total);
  let err = error;
  return {
    totalNewClient,
    isPending,
    err,
  };
};

export const TotalNewClientWithinARangeOf30Day = (service) => {
  const DAY_MS60 = 24 * 60 * 60 * 1000 * 21;
  // const DAY_MS30 = 24 * 60 * 60 * 1000 * currentState;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt"],
    createdAt: {
      $gt: new Date().getTime() - DAY_MS60,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  // console.log("result data agrrgate ", {
  //   resultData: data,
  // });
  let totalNewClientWithin300Day = Number(data.total);
  let err = error;
  return {
    totalNewClientWithin300Day,
    isPending,
    err,
  };
};

export const ClientPaymentMode = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "paymentinfo"],
  };
  const { data, isPending, error } = useFetchData(service, query);
  let queryResults = data;

  let { paymentModeData } = paymentTotal(queryResults);
  let err = error;

  var paymentModeBarSeries = [
    {
      name: "mode of payment",
      data: paymentModeData,
    },
  ];
  return {
    paymentModeBarSeries,
    isPending,
    err,
  };
};

export const TotalDischargedPatient = (service) => {
  const query = {
    $sort: { end_time: -1 },
    $select: ["createdAt", "end_time"],
    end_time: {
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetch(service, query);

  let totalDischargedPatient = data.total;
  let err = error;
  return {
    totalDischargedPatient,
    isPending,
    err,
  };
};

export const TotalAdmittedPatient = (service) => {
  const query = {
    $sort: { start_time: -1 },
    $select: ["createdAt", "start_time"],
    start_time: {
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalAdmittedPatient = data.total;
  let err = error;
  return {
    totalAdmittedPatient,
    isPending,
    err,
  };
};

export const TotalPaymentMode = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "paymentinfo"],
  };
  const { data, isPending, error } = useFetchData(service, query);
  let queryResults = data;

  let { paymentModeData } = paymentTotal(queryResults);
  let err = error;

  var paymentModeBarSeries = [
    {
      name: "mode of payment",
      data: paymentModeData,
    },
  ];
  return {
    paymentModeBarSeries,
    isPending,
    err,
  };
};

export const TotalServiceData = (service, selectQuery) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: [selectQuery],
  };
  const { data, isPending, error } = useFetchData(service, query);
  let totalServiceData = data;
  let err = error;
  return {
    totalServiceData,
    isPending,
    err,
  };
};

export const TotalBedAvailable = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $selete: ["status"],
    status: "occupied",
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalBedAvailable = data.total;
  let err = error;
  return {
    totalBedAvailable,
    isPending,
    err,
  };
};

export const FetchLocationWard = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["sublocations", "locationType"],
    locationType: "Ward",
  };
  const { data, isPending, error } = useFetchData(service, query);
  let fetchLocationWard = data;
  let err = error;
  return {
    fetchLocationWard,
    isPending,
    err,
  };
};

export const FetchDataWithInARange = (service, gt, lt) => {
  const GT_MS = 24 * 60 * 60 * 1000 * gt;
  const LT_MS = 24 * 60 * 60 * 1000 * lt;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "start_time"],
    start_time: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime() - LT_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalDataWithInARange = data.total;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchDataWithInAYear = (
  service,
  gtPreviousYear_MS,
  ltCurrentYear_MS
) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "start_time"],
    start_time: {
      $gt: gtPreviousYear_MS,
      $lt: ltCurrentYear_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);

  let totalDataWithInAYear = data.total;

  // console.log("usefetch ===>", {
  //   isPending: isPending,
  //   data: Number(data.total),
  // });
  let err = error;
  return {
    totalDataWithInAYear,
    isPending,
    err,
  };
};

export const ModelResult = (service) => {
  // const query = {
  //   $sort: { createdAt: +1 },
  //   // $select: ["createdAt", "start_time"],
  //   // $select: ["sublocations", "locationType"],
  //   // locationType: "Ward",
  //   // // $select: ["bed", "bed_id", "end_time"],
  // };

  const query = {
    $sort: { createdAt: 1 },
    $select: ["createdAt"],
  };

  const { data: modelResult, isPending, error } = useFetchData(service, query);

  let err = error;
  return {
    modelResult,
    isPending,
    err,
  };
};
