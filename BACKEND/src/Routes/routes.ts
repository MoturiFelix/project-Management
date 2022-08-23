import{ Router} from 'express'
import {  deleteUsers, getUser, getUsers, registerUser, updateUser } from '../Controllers/UserController'

const router =Router()


router.post('/', registerUser)
router.get('/', getUsers)
router.get('/:id',getUser)
router.put('/update/:id',updateUser)
router.delete('/:id', deleteUsers)


        

export default router