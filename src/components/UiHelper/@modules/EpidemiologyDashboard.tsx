import { Box, Typography } from "@mui/material";
import React from "react";

import ViewCard from "./@sections/ViewCard";
import AreaChart from "../charts/AreaChart";
import BarChart from "../charts/BarChart";
import BubbleChart from "../charts/BubbleChart";
import CircleChart from "../charts/CircleChart";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";

const EpidemiologyDashboard = () => {
  return (
    <DashboardPageWrapper>
      <Box>
        <Box>
          <Typography variant="h2">
            Hello <span>Alex John</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Epidemiology Module <span>@Your Company’s</span>{" "}
            Front Desk
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard count={40} title="Total Clients" />
          <ViewCard count={16} title="Upcoming Appointments" hasFilter={true} />
          <ViewCard count={56} title="Total New Clients" />
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
              <AreaChart height={200} title="Trends" />
              <AreaChart height={200} title="New Clients" />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <BarChart title="Payment Mode" />
              <BubbleChart />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                Gender
              </Typography>
              <Typography variant="body2">Total Client by Gender</Typography>

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
              <CircleChart />
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default EpidemiologyDashboard;
