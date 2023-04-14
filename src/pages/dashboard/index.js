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
import Chart from 'src/utils/Chart';
import PaymentHistory from 'src/components/dashboard/PaymentHistory';
import { useRouter } from 'next/router';
import { TotalInvoice } from 'src/components/dashboard/total-invoice';
import { PaidInvoices } from 'src/components/dashboard/paid-invoices';
import { PartiallyPaidInvoices } from 'src/components/dashboard/partially-paid-invoices';
import { OverdueInvoices } from 'src/components/dashboard/overdue';
import Empty from 'src/components/svgIcons/Empty';

const Page = () => {
  const dispatch = useDispatch()
  const clients = useSelector(store=>store.clients.clients)
  const invoices = useSelector(store => store.invoice?.invoices)
  const overDue = invoices?.filter((invoice) => invoice.dueDate <= new Date().toISOString() && invoice.status === "UNPAID")
  const [getallapplicans] = useGetallapplicantsMutation()
  const [getallclients] = useGetallclientsMutation()

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
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <DueClients sx={{ height: '90%' }} />
              </Grid>
              <Grid
                item
                xl={3}
                lg={4}
                sm={12}
                xs={12}
              >
                <TotalInvoice totalInvoice={invoices?.length} sx={{ height: '90%' }} />
              </Grid>
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