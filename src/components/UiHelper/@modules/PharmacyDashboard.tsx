import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ViewCard from "./@sections/ViewCard";
import AreaChart from "../charts/AreaChart";
import BubbleChart from "../charts/BubbleChart";
// import CircleChart from "../charts/CircleChart";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";

const PharmacyDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  useEffect(() => {
    const { userFullName, facilityFullName } = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  return (
    <DashboardPageWrapper>
      <Box>
        <Box>
          <Typography variant="h2">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Client Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          {/* <ViewCard count={20} title="Prescription Sent" hasFilter={true} />
          <ViewCard count={12} title="Prescription Billed" hasFilter={true} />
          <ViewCard count={5} title="Prescription Dispensed" hasFilter={true} />
          <ViewCard count={5} title="Prescription Pending" hasFilter={true} /> */}
          <ViewCard count={250} title="Total Stock" />
        </StartCardWapper>

        <DashboardContainer>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridGap: "10px",
              gridTemplateColumns: { lg: "repeat(3, 1fr)", xs: "1fr" },
            }}
          >
            <Box sx={{ width: "100%", p: 0, pt: 2, pb: 2 }}>
              <AreaChart height={200} title="Revenue" />
              <StartCardWapper>
                {/* <ViewCard
                  count={"20K"}
                  title="Total Stock Value"
                  hasFilter={true}
                />
                <ViewCard
                  count={"80K"}
                  title="Total Purchases"
                  hasFilter={true}
                /> */}
              </StartCardWapper>
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <AreaChart height={200} title="Prescription Overview" />
              <BubbleChart />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              {/* <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                Gender
              </Typography>
              <Typography variant="body2">Total Client by Gender</Typography> */}

              {/* <Stack
                direction='row'
                spacing={0.4}
                sx={{ mt: 4 }}
                justifyContent='center'
              >
                <Button>Male</Button>
                <Button>Female</Button>
                <Button>Others</Button>
              </Stack> */}
              {/* <CircleChart /> */}
              <StartCardWapper>
                {/* <ViewCard count={"80K"} title="Total Sales" hasFilter={true} /> */}
              </StartCardWapper>
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default PharmacyDashboard;
