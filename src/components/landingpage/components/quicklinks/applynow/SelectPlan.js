import { Autocomplete, Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Radio, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep, setApplicantDetails, setSelectedAreaIndex, setSelectedindex } from '../../../../../redux/landing/quicklinksAction';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RouterIcon from '@mui/icons-material/Router';

const SelectPlan = () => {
  const dispatch = useDispatch()
  const [selectedPlan, setSelectedPlan] = useState(-1)

  const PlanList = [
    {
        name: "Plan 699",
        speed: "15 MBPS"
    },
    {
        name: "Plan 999",
        speed: "15 MBPS"
    },
    {
        name: "Plan 1299",
        speed: "35 MBPS"
    },
    {
        name: "Plan 1499",
        speed: "50 MBPS"
    },
  ]

  return (
    <Grid container flexDirection="column" alignItems="center" sx={{position: "relative"}}>
        <Button
          sx={{position: "absolute", top: 0, right: 0}}
          disabled={!(selectedPlan >= 0)}
          onClick={()=>{
            dispatch(setActiveStep(3));
          }}
          endIcon={<ArrowForwardIcon />}
        >
        </Button>
        <Button
          sx={{position: "absolute", top: 0, left: 0}}
          onClick={()=>{
            dispatch(setActiveStep(1));
          }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Grid item sx={{padding: "3rem 0 1rem"}}>
          <Typography sx={{ fontSize: "16px", textAlign: "center", fontWeight: "bold"}}>PLEASE SELECT YOUR DESIRED PLAN</Typography>
        </Grid>
        <Grid item >
          <Box sx={{marginTop: "1rem", display:"flex", justifyContent: "center", flexWrap:"wrap", gap: "1rem"}}>
            {PlanList.map((item, index)=>{
              return (
                <Card
                key={index}
                className={selectedPlan === index? 'selected-card' : ''} 
                variant="outlined" 
                sx={{padding: "5px", cursor: "pointer", position: "relative", width: "175px"}} 
                onClick={() => {setSelectedPlan(index)}}>
                  <Stack alignItems="center" sx={{width: "100%"}}>
                    <RouterIcon color="primary" sx={{height: "50px", width: "50px"}}/>
                    <Typography sx={{fontSize: "20px", textAlign: "center"}}>{item.name}</Typography>
                    <Typography sx={{fontSize: "16px", textAlign: "center"}}>Upto {item.speed}</Typography>
                    <Typography sx={{fontSize: "18px", textAlign: "center", fontWeight: "bold"}}>UNLIMITED INTERNET</Typography>
                  </Stack>
                  <Radio
                    checked={selectedPlan === index}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      '& .MuiSvgIcon-root': {
                        fontSize: 16,
                        color: 'primary.main',
                      },
                      '&.Mui-checked': {
                        color: 'primary.light',
                      },
                    }}
                  />
                </Card>
              )
            })}
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{marginTop: "3rem"}}>
          <Stack gap={2} sx={{marginTop: "1.5rem"}} alignItems="center">
                <Button 
                variant="contained"
                color="primary"
                onClick={()=>{
                  dispatch(setApplicantDetails({internetPlan: PlanList[selectedPlan].name}));
                  dispatch(setActiveStep(3))
                }}
                sx={{padding: "0.5rem 2rem", borderRadius: "24px", width: {md: "200px", xs: "250px"}}}
                disabled={!(selectedPlan >= 0)}
                >Continue</Button>
            </Stack>
          </Box>
        </Grid>
    </Grid>
  )
}

export default SelectPlan
