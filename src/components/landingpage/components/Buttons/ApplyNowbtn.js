import { Button } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ApplyNowbtn = ({sx = {}, ...props}) => {
  return (
    <Button variant="contained" sx={{borderRadius: 1, ...sx}} {...props}
        endIcon={<ArrowForwardIosIcon />}
    >
        Apply Now
    </Button>
  )
}

export default ApplyNowbtn
