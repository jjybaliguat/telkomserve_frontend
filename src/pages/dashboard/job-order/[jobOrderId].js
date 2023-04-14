import { DashboardLayout } from "../../../components/dashboard-layout"
import Head from "next/head"
import { Box, Container } from "@mui/system"
import { InvoiceDetails } from "../../../components/invoices/invoice-details"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { JobOrderDetails } from "src/components/job-orders/job-order-details"


const Page = () => {
    // const router = useRouter()
    // const jobOrderId = router.query.jobOrderId
    // const joborders = useSelector(store => store.joborders.jobOrders)
    // const singleJobOrder =  joborders?.find(jobOrder => jobOrder._id === jobOrderId)

    return(
        <>
        <Head>
          <title>
          Job Order | RDNAKS ICT
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
            <Box>
              <JobOrderDetails />
            </Box>
          </Container>
        </Box>
      </>
    );
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );


export default Page