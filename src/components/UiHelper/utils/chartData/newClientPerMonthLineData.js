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
  //   console.log("result data agrrgate ", {
  //     resultData: data,
  //   });
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
    // console.log("result day details", {
    //   i: i,
    //   gt: gt,
    //   lt: lt,
    // });
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
