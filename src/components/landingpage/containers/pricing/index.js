import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PricingPageContent } from "../../../../utils/contents/content";
import PricingCard from "../../components/Cards/PricingCard";
import Title from "../../components/Title";
import { db } from "../../../../utils/firebase";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";

Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}

const { title, ITEMS } = PricingPageContent;

const Pricing = () => {

  const [plans, setPlans] = useState([])
  
  useEffect(()=> {
    getPlans()
  }, [])

  const getPlans = () => {
    const internetPlans = collection(db, "internetPlans")

    const Snapshot = onSnapshot(internetPlans, (snapshot) => {
      const items = []
      snapshot.forEach((doc)=>{
        items.push(doc.data())
      })
      setPlans(items)
    })

    return () => {
      Snapshot()
    }
  }
  return (
    <Container sx={{ 
      mt: { xs: 10, md: 20, lg: 25 },
      paddingBottom: "5rem"
    }} id="pricing">
      <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: { xs: 5, md: 8 }, color: "#fff" }}>
        Fiber Plans
      </Title>

      <Grid container spacing={3}>
        {plans?.sortBy('date').map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <PricingCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing;