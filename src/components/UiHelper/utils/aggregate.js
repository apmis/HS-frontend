import { useState, useEffect } from "react";

const useAggregate = (service, query) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const userDetails = localStorage.getItem("user");

  const facilityId = JSON.parse(userDetails).employeeData[0].facility;

  useEffect(() => {
    service
      .aggregate([
        // Stage 1: Filter pizza order documents by pizza size
        {
          $match: { gender: "male" },
        },
        // Stage 2: Group remaining documents by pizza name and calculate total quantity
        {
          $group: { _id: "$firstname" },
        },
      ])
      .then((result) => {
        console.log("result agrrgate ", { result: result });
        setIsPending(false);
        setData(result);
        setError(null);
      })
      .catch((e) => {
        console.log(e);
      });
    //   .find({
    //     query: { ...query, facility: facilityId },
    //   })
    //   .then((result) => {
    //     // Once both return, update the stat

    // setIsPending(false);
    // setData(result);
    // setError(null);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   })
    //   .finally(() => {
    //     setIsPending(false);
    //   });

    // service.on("created", (data) =>
    //   setData((currentData) => currentData.concat(data))
    // );
  }, [service, facilityId]);

  return { data, isPending, error };
};

export default useAggregate;
