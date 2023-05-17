import { Autocomplete, Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Radio, Stack, TextField, Typography } from '@mui/material'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import data from '../../../../../utils/locations.json'
import phil, { getBarangayByMun, getCityMunByProvince, getProvincesByRegion } from 'phil-reg-prov-mun-brgy'
import axios from 'axios';
import { setActiveStep, setApplicantDetails, setSelectedAreaIndex, setSelectedindex } from '../../../../../redux/landing/quicklinksAction';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CheckAvailability = () => {
  const dispatch = useDispatch()
  const GOOGLE_API = process.env.GOOGLE_API
  const APP_URL = process.env.nodeEnv === "production"? process.env.PRODUCTION_APP_API : process.env.DEV_APP_API
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [barangays, setBarangays] = useState([])
  const [areas, setAreas] = useState([])
  const [clientArea, setClientArea] = useState({
    region: {},
    province: {},
    city: {},
    brgy: {},
    area: ''
  })
  const selectedAreaIndex = useSelector(store => store.fiber.selectedAreaIndex)
  const [selectedArea, setSelectedArea] = useState(null)

  useEffect(() => {
    // getMap()
  },[])

  const getMap = async() => {
    const map = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API}`)
    console.log(map);
  }

  useEffect(() => {
    getProvinces()
    setClientArea({...clientArea, brgy: {}})
  }, [clientArea.region])

  useEffect(() => {
    getCities()
  }, [clientArea.province])

  useEffect(() => {
    getBarangays()
  }, [clientArea.city])

  useEffect(() => {
    const brgy = clientArea?.brgy?.name
    getSpecificArea(brgy)
  }, [clientArea.brgy])

  const getProvinces = async() => {
    try {
        const provinces = await getProvincesByRegion(clientArea?.region.reg_code)
        setProvinces([...provinces])
    } catch (error) {
        console.log(error);
    }
  }
  const getCities = async() => {
    try {
        const cities = await getCityMunByProvince(clientArea?.province.prov_code)
        setCities([...cities])
    } catch (error) {
        console.log(error);
    }
  }
  const getBarangays = async() => {
    try {
        const barangays = await getBarangayByMun(clientArea?.city.mun_code)
        setBarangays([...barangays])

    } catch (error) {
        console.log(error);
    }
  }
  const getSpecificArea = async(brgy) => {
    try {
        const area = await axios.get(`${APP_URL}/serviceable/${brgy}`)
        if(area){
            area.data.map((item) => {
                setAreas([...item.areas])
            })
        }
    } catch (error) {
        console.log(error);
    }
  }

  const regionProps = {
    options: phil.regions,
    getOptionLabel: (option) => option.name
  };
  const provinceProps = {
    options: provinces,
    getOptionLabel: (option) => option.name
  };
  const cityProps = {
    options: cities,
    getOptionLabel: (option) => option.name
  };
  const brgyProps = {
    options: barangays,
    getOptionLabel: (option) => option.name
  };
  const areasProps = {
    options: areas,
    getOptionLabel: (option) => option.name
  };

  const CustomPaper = (props) => {
    return <Paper elevation={3} {...props} />;
};

const availableAreas = [
  {
    province: 'Rizal',
    municipality: 'Rodriguez(Montalban)',
    brgy: 'SAN ISIDRO'
  },
  {
    province: 'Rizal',
    municipality: 'Rodriguez(Montalban)',
    brgy: 'SAN JOSE'
  },
  {
    province: 'Rizal',
    municipality: 'Rodriguez(Montalban)',
    brgy: 'SAN RAFAEL'
  },
]

  return (
    <Grid container flexDirection="column" alignItems="center" sx={{position: "relative"}}>
        <Button
        sx={{position: "absolute", top: 0, right: 0}}
        disabled={!(selectedAreaIndex >= 0)}
        onClick={()=>{
          dispatch(setApplicantDetails({...selectedArea}));
          dispatch(setSelectedindex(1)); 
          dispatch(setSelectedAreaIndex(selectedAreaIndex));
          dispatch(setActiveStep(1))
        }}
        endIcon={<ArrowForwardIcon />}
        >
        </Button>
        <Grid item sx={{padding: "3rem 1rem"}}>
          <Typography sx={{ fontSize: "16px", textAlign: "center", fontWeight: "bold"}}>CHECK AVAILABILITY</Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: "1rem", textAlign: "center"}}>As of now, below are the serviceable areas by RDNAKS NETWORK.</Typography>
          <Typography sx={{ fontSize: "1rem", textAlign: "center"}}>If you think you are covered by one of this areas, you can proceed
          by selecting your area.</Typography>
        </Grid>
        <Grid item sx={{marginTop: "1rem"}}>
          <Typography sx={{textAlign: "center"}}>Please select your area</Typography>
          <Box sx={{marginTop: "1rem", display:"flex", justifyContent: "center", flexWrap:"wrap", gap: "1rem"}}>
            {availableAreas.map((item, index)=>{
              return (
                <Card
                key={index}
                className={selectedAreaIndex === index? 'selected-card' : ''} 
                variant="outlined" 
                sx={{padding: "5px", cursor: "pointer", position: "relative"}} 
                onClick={() => {dispatch(setSelectedAreaIndex(index)); setSelectedArea({...availableAreas[index]})}}>
                  <Stack alignItems="center" sx={{width: "125px"}}>
                    <img src="/static/images/googlemap.png" height={50} width={50} />
                    <Typography sx={{fontSize: "12px", textAlign: "center"}}>{`${item.brgy}, ${item.municipality}, ${item.province}`}</Typography>
                  </Stack>
                  <Radio
                    checked={selectedAreaIndex === index}
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
                {/* <FormGroup sx={{width: {md: "50%", xs: "100%"}}}>
                    <FormControlLabel control={
                    <Checkbox
                    // disabled={!(formik.isValid && formik.dirty)}
                    // checked={formik.values.termsAccepted}
                    // onChange={(e) => handleClickTerm(e)}
                    />} 
                    label={<Typography sx={{fontSize: "14px"}}>I want to proceed with the application process.</Typography>} />
                </FormGroup> */}
                {selectedArea &&
                  <Typography>{`${selectedArea?.brgy}, ${selectedArea?.municipality}, ${selectedArea?.province}`}</Typography>
                }
                <Button 
                variant="contained"
                color="primary"
                onClick={()=>{
                  dispatch(setApplicantDetails({...selectedArea}));
                  dispatch(setSelectedindex(1)); 
                  dispatch(setSelectedAreaIndex(selectedAreaIndex));
                  dispatch(setActiveStep(1))
                }}
                sx={{padding: "0.5rem 2rem", borderRadius: "24px", width: {md: "200px", xs: "250px"}}}
                disabled={!(selectedAreaIndex >= 0)}
                >Continue</Button>
            </Stack>
          </Box>
        </Grid>
    </Grid>
  )
}

export default CheckAvailability
