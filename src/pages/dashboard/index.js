import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Applicants } from '../../components/dashboard/applicants';
import { TotalCustomers } from '../../components/dashboard/total-customers';
import { DueClients } from '../../components/dashboard/due-clients';
import { PaymentReceived } from '../../components/dashboard/payment-received';
import { PendingAmount } from '../../components/dashboard/pending-amount';
import { TotalAmount } from '../../components/dashboard/total-amount';
import { useGetallapplicantsMutation, useGetallclientsMutation } from '../../redux/authApiSlice';
import { setApplicantsAction } from '../../redux/applicantSlice';
import { useEffect } from 'react';
import { setClientsAction } from '../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardLayout } from '../../components/dashboard-layout';
import CustomerListResults from '../../components/customer/customer-list-results';
import Chart from '../../utils/Chart';
import PaymentHistory from '../../components/dashboard/PaymentHistory';
import { useRouter } from 'next/router';
import { TotalInvoice } from '../../components/dashboard/total-invoice';
import { PaidInvoices } from '../../components/dashboard/paid-invoices';
import { PartiallyPaidInvoices } from '../../components/dashboard/partially-paid-invoices';
import { OverdueInvoices } from '../../components/dashboard/overdue';
import Empty from '../../components/svgIcons/Empty';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { selectCurrentUser } from '../../redux/authSlice';
import { TotalJobOrders } from '../../components/dashboard/total-joborder';
import Alert from '@mui/material/Alert';
dayjs.extend(relativeTime)

const Page = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const clients = useSelector(store=>store.clients.clients)
  const invoices = useSelector(store => store.invoice?.invoices)
  const overDue = invoices?.filter((invoice) => invoice.dueDate <= new Date().toISOString() && invoice.status === "UNPAID")
  const [getallapplicans] = useGetallapplicantsMutation()
  const [getallclients] = useGetallclientsMutation()

  useEffect(()=>{
    // alert(getNuminDays(-1))
    // alert(dayjs().date(0).date())
  }, [])

  function getNuminDays(num){
    const today = dayjs().date()
    const daysinMonth = dayjs().daysInMonth()
    const lastDay_lastMonth = dayjs().date(0).date()
    const ans = today + num
    if(ans > daysinMonth){
      return ans - daysinMonth
    }else if(ans <= 0){
      return ans + lastDay_lastMonth
    }
    else{
      return ans
    }
  }

  let paymentHistory = []
    for(let i = 0; i < invoices?.length; i++) {
        let history = []
        if(invoices[i].paymentRecords !== undefined) {
            history = [...paymentHistory, invoices[i].paymentRecords]
            paymentHistory = [].concat.apply([], history);
        }
        
    }
    
    
    let totalPaid = 0
    for(let i = 0; i < invoices?.length; i++) {
        if(invoices[i].totalAmountReceived !== undefined) {
            totalPaid += invoices[i].totalAmountReceived
        }
        
    }

    let totalAmount = 0
    for(let i = 0; i < invoices?.length; i++) {
        totalAmount += invoices[i].total
    }
   

    const unpaidInvoice = invoices?.filter((invoice) => invoice.status === 'UNPAID')
    const paid = invoices?.filter((invoice) => invoice.status === 'PAID')
    const partial = invoices?.filter((invoice) => invoice.status === 'PARTIAL')

  useEffect(() => {
    getAllApplicants()
    getClients()
  }, [])
  

  async function getClients() {
    const data = await getallclients()
    const fetched = data.data?.clients
    dispatch(setClientsAction(fetched))
  }

  async function getAllApplicants() {
    try {
      const data = await getallapplicans()
      const fetched = data.data.applicants
      dispatch(setApplicantsAction(fetched))
    } catch (error) {
      console.log(error);
    }
  }

  if(!clients?.length || !clients){
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
    <Empty />
    <p style={{padding: '40px', color: 'gray'}}>No Clients As of Now. Click the plus icon annd start creating a client</p>
  </div>
  }
      return (
        <>
          <Head>
          <title>
            Dashboard | RDNAKS ICT
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <TotalCustomers sx={{ height: '90%'}} />
              </Grid>
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                 <Applicants sx={{ height: '90%' }} />
              </Grid>
              {/* <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <DueClients sx={{ height: '90%' }} />
              </Grid> */}
              {(user?.role !== "Collector") &&
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <TotalJobOrders sx={{ height: '90%'}} />
              </Grid>
              }
              {(user?.role !== "Installer") &&
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <TotalInvoice totalInvoice={invoices?.length} sx={{ height: '90%' }} />
              </Grid>
              }
              {(user?.role === "Super Admin" || user?.role === "Encoder") &&
              <>
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <PaidInvoices totalPaidInvoices={paid?.length} sx={{ height: '90%' }} />
              </Grid>
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <PartiallyPaidInvoices total={partial?.length} sx={{ height: '90%' }} />
              </Grid>
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <OverdueInvoices total={overDue?.length} sx={{ height: '90%' }} />
              </Grid>
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <PaymentReceived sx={{ height: '90%' }} totalPaid={totalPaid}/>
              </Grid>
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <PendingAmount sx={{ height: '90%' }} pendingAmount={totalAmount-totalPaid} />
              </Grid>
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <TotalAmount sx={{ height: '90%' }} totalAmount={totalAmount}/>
              </Grid>
              </>
              }
            </Grid>
          </Container>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 0,
          }}
        >
          <Container maxWidth={false}>
            {(user?.role === "Super Admin" || user?.role === "Encoder") &&
            <>
            <Box>
              {paymentHistory.length !== 0 && (
              <section>
                {(typeof window !== 'undefined') &&
                  <Chart paymentHistory={paymentHistory} />
                }
              </section>
              )}
            </Box>
            <Box>
              {paymentHistory?.length !== 0 && (
              <section>
                  <PaymentHistory paymentHistory={paymentHistory}/>
              </section>
              )}
            </Box>
            </>
            }
            <Box sx={{marginTop: "3rem"}}>
              <CustomerListResults />
            </Box>
          </Container>
        </Box>
      </>
    )
    }

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Page