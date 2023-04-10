import React, { useState } from 'react'
import Router from 'next/router'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddClientFormDialog from '../dialogs/AddClientFormDialog';
import { useRegisterclientMutation } from '../../redux/authApiSlice';
import { addClientAction } from '../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../dialogs/Notification';
import { selectCurrentUser } from '../../redux/authSlice';
import AddEmmployeeFormDialog from '../dialogs/AddEmployeeForm';
import { useCreateemployeeMutation } from 'src/redux/employeeApiSlice';
import { addEmplloyeeAction, addEmployeeAction } from 'src/redux/employeesAction';


const FabButton = () => {
    const dispatch = useDispatch()
    const [createemployee] = useCreateemployeeMutation()
  const mainButtonStyles = {backgroundColor: '#1976D2'}
  const [openPopup, setOpenPopup] = useState(false)
  const [addEmployeePopup, setAddEmployeePopup] = useState(false)
  const [registerclient] = useRegisterclientMutation()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [loading, setLoading] = useState(false)


  const addClient = async(data, resetForm) => {
    setLoading(true)
    const client = await registerclient(data)
    if(!client.error){
      dispatch(addClientAction(client.data))
    //   getClients()
      setNotify({
        isOpen: true,
        message: 'Client added Successfully',
        type: 'success'
    })
    setLoading(false)
    setOpenPopup(false)
    resetForm()
    }else{
      setNotify({
        isOpen: true,
        message: client.error?.data.message,
        type: 'error'
    })
    setLoading(false)
    }
}

const addEmployee = async(data, resetForm) => {
  setLoading(true)
  const employee = await createemployee(data)
  console.log(employee);
  if(!employee.error){
    dispatch(addEmployeeAction(employee.data))
    setNotify({
      isOpen: true,
      message: 'Employee added Successfully',
      type: 'success'
    })
    setLoading(false)
    resetForm()
    setAddEmployeePopup(false)
  }else{
    setNotify({
      isOpen: true,
      message: client.error?.data.message,
      type: 'error'
  })
  setLoading(false)
  }
}

    return (
        <div>
        <AddClientFormDialog
            openPopup={openPopup} 
            setOpenPopup={setOpenPopup} 
            addClient={addClient}
            loading={loading}>
         </AddClientFormDialog>
         <AddEmmployeeFormDialog
            openPopup={addEmployeePopup} 
            setAddEmployeePopup={setAddEmployeePopup} 
            addEmployee={addEmployee}
            loading={loading}
         />
         <Notification
            notify={notify}
            setNotify={setNotify}
            />
            <Fab
              mainButtonStyles={mainButtonStyles}
              icon={ <AddIcon />}
              alwaysShowTitle={true}
            >

              {location.pathname !== '/dashboard/invoice' && (
                <Action
                    text="Create Invoice"
                    // onClick={() =>  history.push(`/invoice`)}
                  //   onClick={() => window.location.href='/invoice'}
                  onClick={() => Router.push("/dashboard/invoice")}
                  >
                    <BorderColorIcon />
                </Action>
              )}

              <Action
                  text="Add Client"
                  onClick={() => setOpenPopup(true)}
                >
                  <PersonAddIcon />
              </Action>
              <Action
                  text="Create Employee"
                  onClick={() => setAddEmployeePopup(true)}
                >
                  <PersonAddIcon />
              </Action>

            </Fab>
        </div>
    )
}

export default FabButton
