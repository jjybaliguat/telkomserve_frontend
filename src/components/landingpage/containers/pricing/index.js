import { Container, Grid } from "@mui/material";
import React from "react";
import { PricingPageContent } from "../../../../utils/contents/content";
import PricingCard from "../../components/Cards/PricingCard";
import Title from "../../components/Title";

const { title, ITEMS } = PricingPageContent;

const Pricing = () => {
  return (
    <Container sx={{ mt: { xs: 10, md: 20, lg: 25 }}} id="pricing">
      <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: { xs: 5, md: 8 }, color: "#fff" }}>
        {title}
      </Title>

      <Grid container spacing={3}>
        {ITEMS.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <PricingCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing;