import { DashboardLayout } from "../../../components/dashboard-layout"
import Head from "next/head"
import { Box, Container } from "@mui/system"
import { InvoiceDetails } from "../../../components/invoices/invoice-details"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


const Page = () => {
    const router = useRouter()
    const invoiceId = router.query.invoiceId
    const invoices = useSelector(store => store.invoice.invoices)
    const singleInvoice =  invoices?.find(invoice => invoice._id === invoiceId)
    const [clientName, setClientName] = useState('')

    useEffect(() => {
      if(invoiceId){
          // dispatch(setSingleInvoice(singleInvoice))
          if(singleInvoice){
            setClientName(singleInvoice.client.name)
          }
    }
  }, [router])

    return(
        <>
        <Head>
          <title>
          {clientName}-Invoice | RDNAKS ICT
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
              <InvoiceDetails />
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