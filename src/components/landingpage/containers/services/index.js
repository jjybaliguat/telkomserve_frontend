import { Container, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { AboutPageContent } from "../../../../utils/contents/content";
import Title from "../../components/Title";
import OutlinedButton from "../../components/Buttons/OutlinedButton";

const { top, bottom } = AboutPageContent;

const Services = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Container sx={{ mt: { xs: 10, md: 20, lg: 25 } }} id="services">
      {/* TOP */}
      <Grid container spacing={10} flexWrap="wrap-reverse" alignItems="center">
        {/* Left */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <Title color="#fff" variant={{ xs: "h3", md: "h2" }}>{top.title}</Title>

            <Typography variant="body2" color="text.secondary2" sx={{ pb: 2 }}>
              {top.subtitle}
            </Typography>

            <OutlinedButton arrow fit>
              Learn more
            </OutlinedButton>
          </Stack>
        </Grid>

        {/* Right */}
        <Grid item xs={12} md={6}>
              <img
                src={top.image}
                style={{ width: "100%", objectFit: "contain"}}
              />
        </Grid>
      </Grid>

      {/* BOTTOM */}

      <Grid
        container
        spacing={15}
        flexWrap="wrap-reverse"
        alignItems="center"
        sx={{ mt: { xs: 5, md: 5 } }}
      >
        {/* Left */}
        <Grid item xs={12} md={6}>
          <img
            src={bottom.TABS[tabValue].image}
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Grid>

        {/* Right */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <Title variant={{ xs: "h3", md: "h2" }} color="#fff">{bottom.title}</Title>
            <Typography variant="body2" color="text.secondary2" sx={{ pb: 2 }}>
              {bottom.subtitle}
            </Typography>
            <Tabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {bottom.TABS.map(({ name }) => (
                <Tab
                  label={name}
                  key={name}
                  sx={{
                    color: "text.secondary2"
                    // minWidth: 60,
                    // "&.Mui-selected": { color: "text.primary" },
                  }}
                />
              ))}
            </Tabs>

            <Typography
              variant="body2"
              color="text.secondary2"
              sx={{ pb: 2, minHeight: 70 }}
            >
              {bottom.TABS[tabValue].subtitle}
            </Typography>

            <OutlinedButton arrow fit>
              Learn more
            </OutlinedButton>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Services;