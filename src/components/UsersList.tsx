import { useEffect } from "react";
import List from '@mui/material/List';

import UserListItem from "./UserListItem";
import AddUser from './AddUser'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setAllUsers } from '../redux/userSlice'

function UserList(){
    const users = useAppSelector(state => state.user.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchAllUsers()
    }, []);

    async function fetchAllUsers() {
        const response = await fetch('https://fakestoreapi.com/users');
        const data = await response.json()
    
        dispatch(setAllUsers(data))

        setTimeout(() => {
            console.log(users);
        }, 1000);
    }

    return(
        <>
            <AddUser/>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'block', margin: '0.6em auto auto auto'}}>
                {users.map((user)=>{
                    return(
                        <UserListItem key={user.id} user={user}/>
                    )
                })}
            </List>
        </>
    )
}

export default UserList