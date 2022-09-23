import { Box, Stack, Typography } from "@mui/material";
import React from "react";

import ViewCard from "./@sections/ViewCard";
import LineChart from "../charts/LineChart";
import ColumnChart from "../charts/ColumnChart";

import client from "../../../feathers";
import {
  TotalNumOfData,
  TotalNewClientWithinAMonth,
  TotalUpcomingAppointment,
  ClientPaymentMode,
  TotalDischargedPatient,
  TotalAdmittedPatient,
} from "../utils/chartData/chartDataHandler";
import { CircleSeriesData } from "../utils/chartData/circleSeries";
import { clientLineData } from "../utils/chartData/newClientPerMonthLineData";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import CircleChart from "../charts/CircleChart";

const ClinicDashboard = () => {
  const clientService = client.service("/client");
  const admissionService = client.service("/admission");
  const appointmentService = client.service("/appointments");
  const { totalValue } = TotalNumOfData(clientService);
  const { totalNewClient } = TotalNewClientWithinAMonth(appointmentService);
  const { totalUpcomingAppointment } = TotalUpcomingAppointment(clientService);
  const { monthNameForCurrentYear, newClientLineSeriesData } =
    clientLineData(clientService);
  const circleSeriesData = CircleSeriesData(clientService);
  const { paymentModeBarSeries } = ClientPaymentMode(clientService);
  const { totalDischargedPatient } = TotalDischargedPatient(admissionService);
  const { totalAdmittedPatient } = TotalAdmittedPatient(admissionService);
  const totalInPatient = totalAdmittedPatient - totalDischargedPatient;

  return (
    <DashboardPageWrapper>
      <Box>
        <Box>
          <Typography variant="h2">
            Hello <span>Alex John</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Client Module <span>@Your Company’s</span> Front
            Desk
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard count={totalValue} title="Total Clients" />
          <ViewCard
            count={totalUpcomingAppointment}
            title="Upcoming Appointments"
          />
          <ViewCard count={totalNewClient} title="Total New Clients" />
          <ViewCard count={30} title={`Doctor's on Duty`} />
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
            <Box sx={{ width: "100%", p: 2 }}>
              <ColumnChart
                title="Payment Mode"
                series={paymentModeBarSeries}
                xLabels={["Cash", "HMO", "Comp", "Family Plan", "All"]}
              />
            </Box>
            <Box sx={{ width: "100%", p: 2 }}>
              <LineChart
                title="New Clients"
                monthArray={monthNameForCurrentYear}
                series={newClientLineSeriesData}
              />
            </Box>
            <Box sx={{ width: "100%", p: 2 }}>
              <CircleChart
                series={circleSeriesData}
                labels={["Male", "Female", "Other"]}
              />
              <Stack direction="row">
                <ViewCard count={totalDischargedPatient} title="Out Patients" />
                <ViewCard count={totalInPatient} title="In Patients" />
              </Stack>
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default ClinicDashboard;
