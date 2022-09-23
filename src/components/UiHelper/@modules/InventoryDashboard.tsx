import { Box, Typography } from "@mui/material";
import React from "react";

import ViewCard from "./@sections/ViewCard";
import AreaChart from "../charts/AreaChart";
import BarChart from "../charts/BarChart";
import BubbleChart from "../charts/BubbleChart";
// import CircleChart from "../charts/CircleChart";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";

const InventoryDashboard = () => {
  return (
    <DashboardPageWrapper>
      <Box>
        <Box>
          <Typography variant="h2">
            Hello <span>Alex John</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Inventory Module <span>@Your Company’s</span> Front
            Desk
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard count={25} title="Patients Count At Pharmacy" />
          <ViewCard count={"50K"} title="Total Sales" hasFilter={true} />
          <ViewCard count={"250K"} title="Total Stock" hasFilter={true} />
          <ViewCard count={"50%"} title="Available Stock" />
          <ViewCard count={80} title="Total Supplied Products" />
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
              <AreaChart height={200} title="Recorder Level Monthly" />
              <StartCardWapper>
                <ViewCard
                  count={"20K"}
                  title="Total Stock Value"
                  hasFilter={true}
                />
                <ViewCard
                  count={"80K"}
                  title="Total Purchases"
                  hasFilter={true}
                />
              </StartCardWapper>
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <BarChart title="Payment Mode" />
              <BubbleChart />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <BubbleChart />
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
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default InventoryDashboard;
