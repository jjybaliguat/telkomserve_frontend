import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import OutlinedButton from "../Buttons/OutlinedButton";
import Title from "../Title";
import CheckIcon from '@mui/icons-material/Check';
import ApplyNowbtn from "../Buttons/ApplyNowbtn";

const planDescription = [
    "Unlimited Internet",
    "No data capping",
    "Fast instalation process",
    "No hidden charges",
]

const PricingCard = ({ title, price, speed, image }) => {
  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
        p: 4,
        borderRadius: "30px",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "30px",
          border: "1px solid transparent",
          background: "linear-gradient(120deg,#5f5f61,transparent) border-box",
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exlude",
        },
      }}
    >
      <Stack sx={{ height: "100%", color: "#fff" }} spacing={1}>
        <Title variant={{ xs: "h3", sm: "h2" }} sx={{textAlign: "center", color:"primary.main"}}>{title}</Title>
        <Title variant={{ xs: "h4", sm: "h3" }} sx={{color:"text.secondary2"}}>₱ {price}/month</Title>
        <Title variant={{ xs: "h5", sm: "h4" }}>{speed}</Title>

        {planDescription.map((item, index) => {
            return (
            <Stack key={index} direction="row" alignItems="center" spacing={1}>
                 <CheckIcon sx={{color: "primary.main"}} />
                <Typography variant="body2" sx={{color: "text.secondary2"}} >
                    {item}
                </Typography>
            </Stack>
            )
        })}

        <img
          src={image}
          height={20}
          style={{
            width: "100%",
            objectFit: "contain",
            flex: 1,
            marginBottom: "10px"
          }}
        />

        <OutlinedButton arrow fit>
          Apply Now
        </OutlinedButton>
      </Stack>
    </Box>
  );
};

export default PricingCard;