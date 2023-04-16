import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { DashboardLayout } from "../../../../components/dashboard-layout"
import Head from "next/head"
import { Box, Container } from "@mui/system"
import { Invoice } from "../../../../components/invoices/single-invoice"
import { EditInvoice } from "../../../../components/invoices/edit-invoice"


const Page = () => {
  const router = useRouter()
  const invoiceId = router.query.invoiceId

    // useEffect(() => {
    //     alert(invoiceId)
    // }, [])

    return(
        <>
        <Head>
          <title>
            Invoice | RDNAKS ICT
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
              <EditInvoice invoiceId={invoiceId} />
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