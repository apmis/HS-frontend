import {
  TotalNumOfMaleClient,
  TotalNumOfFemaleClient,
  TotalNumOfOtherGenderClient,
} from "./chartDataHandler";

export const CircleSeriesData = (service) => {
  const { totalNumMaleClient } = TotalNumOfMaleClient(service);
  const { totalNumFemaleClient } = TotalNumOfFemaleClient(service);
  const { totalNumOtherGenderClient } = TotalNumOfOtherGenderClient(service);

  let circleSeriesArray = [
    totalNumMaleClient,
    totalNumFemaleClient,
    totalNumOtherGenderClient,
  ];

  return circleSeriesArray;
};
