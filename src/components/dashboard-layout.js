import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './navbar/dashboard-navbar';
import { DashboardSidebar } from './sidebar/dashboard-sidebar';
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { useGetadminMutation, useGetallapplicantsMutation, useGetallclientsMutation, useLoginstatusMutation, useLogoutMutation } from '../redux/authApiSlice';
import { getFetchedClients, getLoginStatus, logOut, setApplicantsAction, setClientsAction, setLoggedIn, updateUserAction } from '../redux/authSlice';
import { textAlign } from '@mui/system';
import FabButton from './Fab/Fab';
import { selectCurrentUser } from '../redux/authSlice';
import { useGetallinvoiceMutation } from 'src/redux/invoiceApiSlice';
import { setInvoiceAction } from 'src/redux/invoiceAction';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  }
}));

export const DashboardLayout = (props) => {
  const dispatch = useDispatch()
  const [loginstatus] = useLoginstatusMutation()
  const [logout] = useLogoutMutation()
  const [getallclients] = useGetallclientsMutation()
  const [getallapplicants] = useGetallapplicantsMutation()
  const [getallinvoice] = useGetallinvoiceMutation()
  const [getadmin] = useGetadminMutation()
  const logged_in = useSelector(getLoginStatus)
  const user = useSelector(selectCurrentUser)
  const { children } = props;
  // console.log(session);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // const [clients, setClients] = useState([])

  useEffect(() => {
    getAdmin()
    LoginStatus()
    getInvoices()
  }, [])


  async function getInvoices(){
    const result = await getallinvoice()
    if(result){
      dispatch(setInvoiceAction(result.data))
    }
  }

  async function LoginStatus() {
    try {
      const data = await loginstatus()
      if(!data.data.logged_in){
        await logout()
        dispatch(logOut())
        Router.push("/")
      }
      else{
        dispatch(setLoggedIn(data.data))
      }
    } catch (error) {
      console.log(error);
    }
  }
    
  // async function getAllClients() {
  //   try {
  //     const data = await getallclients()
  //     const fetched = data.data.clients
  //     dispatch(setClientsAction(fetched))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function getAdmin() {
    try {
      const user = await getadmin()
      dispatch(updateUserAction(user.data))
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
  // async function getAllApplicants() {
  //   try {
  //     const data = await getallapplicants()
  //     const fetched = data.data.applicants
  //     dispatch(setApplicantsAction(fetched))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function getAdmin() {
    try {
      const user = await getadmin()
      dispatch(updateUserAction(user.data))
    } catch (error) {
      console.log(error);
    }
  }


      return (
        logged_in? 
        <>
        <DashboardLayoutRoot open={isSidebarOpen}>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%',
              paddingBottom: '6rem'
            }}
          >
            {children}
          </Box>
          {user?.role === "Super Admin" || user?.role === "Encoder" ? <FabButton /> : ""}
        </DashboardLayoutRoot>
        <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)}/>
        <DashboardSidebar
          onClose={() => setSidebarOpen(false)}
          open={isSidebarOpen}
        />
      </> : <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
              <CircularProgress size={100}/>
            </div>
    )
};


