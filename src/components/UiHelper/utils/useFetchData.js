// import { useState, useEffect } from "react";

// const useFetchOne = async (service, query) => {
//   const [data, setData] = useState([]);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//   const userDetails = localStorage.getItem("user");

//   const facilityId = JSON.parse(userDetails).employeeData[0].facility;

//   useEffect(() => {
//     Promise.all([
//       service.find({
//         query: {
//           ...query,
//           facility: facilityId,
//         },
//       }),
//     ]).then(([servicePage]) => {
//       // We want the latest messages but in the reversed order
//       const messagesResult = servicePage.data.reverse();
//       console.log("lenth of messages: " + messagesResult.length);

//       setIsPending(false);
//       setData(messagesResult);
//       setError(null);
//     });
//   }, [service, facilityId]);

//   return { data, isPending, error };
// };
import { useState, useEffect } from "react";

const useFetchData = (service, query) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const userDetails = localStorage.getItem("user");

  const facilityId = JSON.parse(userDetails).employeeData[0].facility;

  useEffect(() => {
    service
      .find({
        query: { ...query, facility: facilityId },
      })
      .then((result) => {
        // Once both return, update the stat

        const resultArr = result.data.reverse();
        // console.log("lenth of messages: ", {
        //   result: resultArr,
        // });

        setIsPending(false);
        setData(resultArr);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });

    service.on("created", (data) =>
      setData((currentData) => currentData.concat(data))
    );
  }, [service, facilityId]);

  return { data, isPending, error };
};

export default useFetchData;
