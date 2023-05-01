import React from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout';

const Page = () => (

  <>
    <div style={{display: 'flex', alignItems: 'center', 
      justifyContent: 'center', flexDirection: 'column', paddingTop: '20px',
      }}>
      <img 
          src='/static/images/underDevelopment.svg'
          style={{height: '300px'}}
      />
      <p style={{padding: '40px', color: 'gray'}}>Invoice Section is under development!</p>
    </div>
  </>
)

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;