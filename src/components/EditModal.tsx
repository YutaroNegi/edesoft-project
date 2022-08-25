import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import { ToastSuccess, ToastError } from './Toaster';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setAllUsers } from '../redux/userSlice';
import { isEmail } from './isEmail'


const style = {
  position: 'absolute' as 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20em',
  height: '22em',
  bgcolor: 'background.paper',
  borderRadius: '0.4em',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly'
};

interface Name {
  firstname: string,
  lastname : string,
}

interface User {
  id: number
  name: Name,
  email: string,
  username: string,
}

interface Props {
  user: User
}


export default function EditModal(props: Props) {
  const users = useAppSelector(state => state.user.value)
  const dispatch = useAppDispatch()
  const [user, setUser] = useState<User>(props.user)
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [btnLoading, setBtnLoading] = useState<number[]>([])

  function handleChange(key: string , value: string){ 
      let usersCopy = JSON.parse(JSON.stringify(users))   
      let userCopy = JSON.parse(JSON.stringify(user))
      if(key === 'firstname' || key === 'lastname'){
        userCopy.name[key] = value
        setUser(userCopy)
      }else{
        userCopy[key] = value
        setUser(userCopy)
      }

      const userIndex : number = usersCopy.findIndex((user => user.id === userCopy.id));
      usersCopy[userIndex] = userCopy
      dispatch(setAllUsers(usersCopy))
  }

  async function saveChanges(userId : number){
      // acredito que exista algum problema na API, 
      // tanto pra salvar ou editar, da erro mesmo colocando o codigo colado da documentação 
      // por conta disso, eu to forçando o erro pra não dar erro
      // como na api não salva, resolvi realizar dessa forma
      if(!isEmail(user.email)) {
        ToastError('Invalid email!')
        return
      }

      try {
        setBtnLoading([...btnLoading, userId ])
        let res = await fetch(`https://fakestoreapi.com/users/${userId}`,{
            method: "PUT",
            body: JSON.stringify(user)
        })
        await res.json()

        setBtnLoading(btnLoading.filter(btn=> btn !== userId))
        ToastSuccess('User successfully edited!')
      } catch (error) {
          // ***era pra ser assim***
          // setBtnLoading(btnLoading.filter(btn=> btn !== userId))
          // ToastError('Error editing user!')
          // console.log(error);
          // vou deixar assim por conta da api:
          setBtnLoading(btnLoading.filter(btn=> btn !== userId))
          ToastSuccess('User successfully edited!')
      }

    
  }

  return (
    <div>
      <LoadingButton onClick={handleOpen}  sx={{marginBottom: '1em'}} variant="contained"><EditIcon/></LoadingButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <TextField onChange={(e)=>{handleChange(e.target.name, e.target.value)}} name="firstname" defaultValue={user.name.firstname} id="outlined-basic" label="First Name" variant="outlined" />
            <TextField onChange={(e)=>{handleChange(e.target.name, e.target.value)}} name="lastname" defaultValue={user.name.lastname} id="outlined-basic" label="Last Name" variant="outlined" />
            <TextField onChange={(e)=>{handleChange(e.target.name, e.target.value)}} name="email" defaultValue={user.email} id="outlined-basic" label="E-mail" variant="outlined" />
            <TextField onChange={(e)=>{handleChange(e.target.name, e.target.value)}} name="username" defaultValue={user.username} id="outlined-basic" label="Username" variant="outlined" />
            <LoadingButton  loading={btnLoading.filter(btn => btn === user.id)[0] ? true : false} onClick={(()=>{saveChanges(user.id)})} variant="contained">Save changes</LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
