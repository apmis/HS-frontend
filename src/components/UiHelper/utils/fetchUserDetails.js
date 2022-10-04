export const userDetails = () => {
  const userDetails = localStorage.getItem("user");

  const parse = JSON.parse(userDetails); // ok

  const userFullName = `${parse.lastname} ${parse.firstname}`;

  const facilityFullName = parse.employeeData[0].facilityDetail.facilityName;

  return { userFullName, facilityFullName };
};
