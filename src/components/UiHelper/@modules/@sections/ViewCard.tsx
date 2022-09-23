import { Box, Card, Checkbox, Stack, Typography } from "@mui/material";
import React from "react";
interface ViewCardProps {
  count: any;
  title: string;
  hasFilter?: boolean;
}

const ViewCard: React.FC<ViewCardProps> = ({
  title,
  count,
  hasFilter = false,
}) => {
  const renderFilterGroup = () => {
    return (
      <>
        <Stack direction="column">
          {["Daily", "Weekly", "Monthly", "Quaterly", "Anually"].map(
            (value, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  m: 0,
                  p: 0,
                }}
              >
                <label>{value}</label>
                <Checkbox sx={{ m: 0, p: 0, ml: 2 }} size="small" />
              </Box>
            )
          )}
        </Stack>
      </>
    );
  };

  const isFilterObject = () => {
    if (hasFilter) return { padding: 3, width: "75%" };
    return { padding: 6, width: "75%" };
  };
  return (
    <Card
      sx={{
        p: isFilterObject().padding,
        background: "#f9f9f9",
        boxShadow: "0",
        borderRadius: 4,
        width: { xs: "100%" },
        textAlign: "center",
        mr: 2,
        mb: { xs: 2 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: isFilterObject().width }}>
        <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "25px" }}>
          {count}
        </Typography>
        <Typography>{title}</Typography>
      </Box>
      {hasFilter && renderFilterGroup()}
    </Card>
  );
};

export default ViewCard;
