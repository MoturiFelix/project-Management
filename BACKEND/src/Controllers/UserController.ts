import { Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../Config/Config'

interface ExtendedRequest extends Request {
  body: {
    email: string
    pass: string
    name:string
  }
}
export const registerUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = uid()
    const { email, pass, name} = req.body
     
    console.log(req.body);
    
    const pool = await mssql.connect(sqlConfig)
    if(pool.connected){
      console.log("yes am connected to db....");
      
    }
    console.log(pool);
    
    await pool
      .request()
      .input('id', mssql.VarChar, id)
      .input('email', mssql.VarChar, email)
      .input('pass', mssql.VarChar, pass)
      .input('name', mssql.VarChar, name)
      .input('role', mssql.VarChar,"User")
      .execute('INSERT_USER')
      
    res.json({ message: 'Successfully registered...' })
  } catch (error) {
    res.json({ error })


    
  }
}

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig)
    const users = await pool.request().execute('GET_ALL_USERS')
    const { recordset } = users
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}

export const getUser: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    const pool = await mssql.connect(sqlConfig)
    const users = await pool
      .request()
      .input('id', mssql.VarChar, id)
      .execute('GET_SINGLE_USDER_By_ID')
    const { recordset } = users
    if (!users.recordset[0]) {
      res.json({ message: 'Users Not Found' })
    } else {
      res.json(recordset)
      // console.log(recordset);
      
    }
  } catch (error) {
    res.json({ error })
  }
}

export const updateUser: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  try {
    const id =req.params.id
    const pool = await mssql.connect(sqlConfig)
    const { email, pass, name } = req.body as {
      email: string
      pass: string
      name: string
      
    }
      const users = await pool
      .request()
      .input('id', mssql.VarChar, id)
      .execute('GET_SINGLE_USDER_By_ID')
      if(!users.recordset[0]){
         res.json({ message: 'User Not Found' })
      }else{

        await pool.request()
          .input('id', mssql.VarChar, id)
          .input('email', mssql.VarChar, email)
          .input('pass', mssql.VarChar, pass)
          .input('name', mssql.VarChar, name)
          .input('role', mssql.VarChar,"User")
          .execute('update_user_table')
          res.json({message:'User Updated ...'})
      }
 

  } catch (error:any) {
      res.json({ error })
  }
}


 
export const deleteUsers:RequestHandler<{id:string}> =async(req,res)=>{
    try {
    
        const id = req.params.id
        
        const pool = await mssql.connect(sqlConfig)
      
        const users = await pool
      .request()
      .input('id', mssql.VarChar, id)
      .execute('GET_SINGLE_USDER_By_ID')
      if(!users.recordset[0]){
         res.json({ message: 'User Could Not Found' })
      }else{
          // await pool.request().query(`DELETE FROM Products WHERE id='${id}'`)
        await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('DELETE_USER')
        res.json({message:'User Deleted'})
      }
    } catch (error:any) {
       res.json({ error }) 
    }
}






