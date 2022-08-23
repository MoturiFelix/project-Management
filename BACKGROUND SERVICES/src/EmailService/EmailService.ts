import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/Config'
dotenv.config()
import sendMail from '../Helpers/Email'
interface Task{
    id:number
    user_name:string
    user_email:string
    user_password:string
    user_role:string
}


const SendEmails= async()=>{
const pool = await mssql.connect(sqlConfig)
const tasks:Task[]= await(await pool.request().query(
`SELECT * FROM dbo.Users WHERE user_role='User'`)).recordset
console.log(tasks);


 for(let task of tasks){
console.log(task);

    ejs.renderFile('templates/registration.ejs',{user_name:task.user_name,task:task.user_role} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:task.user_email,
            subject:"HR4U Task Manager",
            html:data,
            attachments:[
                {
                    filename:'task.txt',
                    content:`You have been assigned a task: you are now a HR4U Member${task.user_role}`
                }
            ]
        }   

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE dbo.Users SET user_role='Member' WHERE id = ${task.id}`)
            console.log('Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default SendEmails