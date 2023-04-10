import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import Title from "../../components/Title";
import { section2Content } from "../../../../utils/contents/content";
import ReactVisibilitySensor from "react-visibility-sensor";

const { items } = section2Content;

const CustomCounter = ({
  before = "",
  after = "",
  counter,
  subtitle,
  decimals = false,
}) => (
  <Stack spacing={{ xs: 1, md: 2 }} alignItems="center">
    <CountUp prefix={before} suffix={after} end={counter} decimals={decimals}> 
      {({ countUpRef, start }) => (
        <ReactVisibilitySensor onChange={start}>
        <Title variant={{ xs: "h4", md: "h2" }} sx={{ fontWeight: 400, color: "#fff" }}>
          <span ref={countUpRef} />
        </Title>
        </ReactVisibilitySensor>
      )}
    </CountUp>

    <Typography variant="body2" color="text.secondary2">
      {subtitle}
    </Typography>
  </Stack>
);

const Section2 = () => {
  return (
    <Container sx={{ mt: -8 }}>
      <Box
        sx={(theme) => ({
          position: "relative",
          py: 5,
          bgcolor: "background.dark",
          borderRadius: "50px",
          [theme.breakpoints.up("sm")]: {
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              border: "2px solid transparent",
              borderRadius: "50px",
              background: "linear-gradient(180deg,grey,transparent) border-box",
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exlude",
            },
          },
        })}
      >
        <Grid container spacing={3} justifyContent="space-between">
          {items.map((item) => (
            <Grid item xs={6} md={3} key={item.subtitle}>
              <CustomCounter {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Section2;