import React from 'react'
import { FiberLayout } from '../../components/landingpage/layout/FiberLayout'
import Head from 'next/head'
import {Box, Container, Divider, Stack, Typography} from '@mui/material'

const Page = () => {
  return (
    <>
      <Head>
        <title>
          PRIVACY NOTICE | RDNAKS ICT
        </title>
      </Head>
      <Box
      sx={{
        backgroundColor: "#FFFF", 
        paddingTop: "3rem", 
        minHeight: "100vh", 
        height: "fit-content", 
        paddingBottom: "3rem"
        }}
      >
        <Container>
          <Typography 
          sx={{fontSize: "12px", letterSpacing: "0.03em"}}
          >
            Last updated: <strong>May 17, 2023</strong>
          </Typography>
          <Box
          sx={{
            marginTop: "2rem"
          }}
          >
            <Typography
            sx={{
              fontSize: "2rem", 
              letterSpacing: "0.08em",
              fontWeight: "bold",
              textAlign: "center"
          }}
            >PRIVACY NOTICE</Typography>
            <Divider sx={{margin: "1rem 0 1.5rem 0"}}/>
            <Stack gap={5}>
              <Typography sx={{letterSpacing: "0.08em"}}>
                RDNAKS NETWORK AND DATA SOLUTION are committed to protecting the privacy and confidentiality of the 
                personal information we collect from internet applicants. This Privacy Policy outlines 
                how we collect, use, store, and disclose applicant information in accordance with applicable 
                privacy laws and regulations. By submitting your information through our online application 
                process, you agree to the terms outlined in this Privacy Policy.
              </Typography>
              <Typography sx={{letterSpacing: "0.08em"}}>
                We reserve the right to modify or amend this privacy statement whenever necessary to meet 
                with legal requirements. In any case, for your knowledge and future reference, we encourage 
                you to periodically read and review this Privacy Notice, which is accessible on our website or 
                application.
              </Typography>
              <Box
                sx={{
                  marginTop: "3rem",
                  padding: "0 1.5rem"
                }}
              >
                <ol>
                  <li><Typography sx={{letterSpacing: "0.05em", fontWeight: "bold"}}>Collection of Information:</Typography>
                    <ul 
                    style={{
                      marginLeft: "3rem",
                      }}>
                      <li><strong>Personal Information:</strong> We may collect personal information, such as your name, contact 
                        details, educational background, work history, skills, and other relevant information 
                        necessary for the recruitment and selection process.</li>
                      <li><strong>Cookies and Tracking Technologies:</strong> We may use cookies and similar tracking technologies 
                        to enhance your browsing experience on our website and gather non-personal information, 
                        such as your IP address, browser type, and referring pages.</li>
                    </ul>
                  </li>
                </ol>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
    <FiberLayout>
      {page}
    </FiberLayout>
  )

export default Page