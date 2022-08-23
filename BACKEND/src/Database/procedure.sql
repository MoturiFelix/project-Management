CREATE TABLE Users
(
user_id varchar(255) NOT NULL ,
user_email varchar(255) NOT NULL  ,
user_password varchar(255) NOT NULL,
user_role varchar(255),
user_name varchar(255),
  PRIMARY KEY (user_id),
);

CREATE TABLE Projects (
  project_id varchar(255),
  project_name varchar(255) NOT NULL,
  project_description varchar(255) NOT NULL,
  completion_date DATE  NOT NULL,
  Assigned_to varchar(255),
  Is_completed bit
  PRIMARY KEY (project_id),
  FOREIGN KEY (Assigned_to)
      REFERENCES Users (user_id)
      ON DELETE CASCADE
);

--PROCEDURE TO INSERT DATA TO USER TABLE

CREATE PROCEDURE INSERT_USER(@id varchar(255),@email varchar(255),@pass varchar(255),@role varchar(255),@name varchar(255))
AS 
BEGIN
INSERT INTO Users(user_id,user_email,user_password,user_role,user_name) VALUES(@id,@email,@pass,@role,@name)
END

--TESTING IF THE PROCEDURE IS WORKING
execute INSERT_USER '0203e66c-d7b0-42fb-a413-d116ce84f58T', 'felix@gmail.com','felix1234','admin','moturi';

select * from Users

--Procedure to update user table

CREATE PROCEDURE update_user_table(@id varchar(255),@email varchar(255),@pass varchar(255),@role varchar(255),@name varchar(255))
AS
BEGIN
UPDATE Users SET user_id=@id,user_email=@email,user_password=@pass,user_role=@role,user_name=@name WHERE user_id=@id
END
--TESTING IF THE update_user_table PROCEDURE

EXECUTE update_user_table @id='0203e66c-d7b0-42fb-a413-d116ce84f583',@email='felix@gmail.com',@pass='felix1234',@role='USERS',@name='EVANS';

--CREATE PROCEDURE TO DELETE A USER
CREATE PROCEDURE DELETE_USER(@id varchar(255))
AS 
BEGIN
DELETE FROM Users WHERE user_id=@id
END
--TEST THE DELETE_USER PROCEDURE
EXECUTE DELETE_USER '0203e66c-d7b0-42fb-a413-d116ce84f583'

--CREATE PROCEDURE TO GET A USER BY ID

CREATE PROCEDURE GET_SINGLE_USDER_By_ID(@id varchar(255))
AS
BEGIN
SELECT * FROM Users WHERE user_id=@id
END

EXECUTE GET_SINGLE_USDER_By_ID '0203e66c-d7b0-42fb-a413-d116ce84f58T'

--CREATE A PROCEDURE TIO GET ALL USERS
CREATE PROCEDURE GET_ALL_USERS 
AS 
BEGIN
SELECT * FROM Users
END

--TESTING THE PROCEDURE GET_ALL_USERS

EXECUTE GET_ALL_USERS
