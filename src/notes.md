# for the signup process
1. just get the data:{email:unique,password}
2. encrypt the password in the models folder using bcrypt.hashSync(user.password,+SALT_ROUNDS)

# for the signin process
1. get the data from the user   data:{email,password}
2. add a middleware to authenticate the user so that the email and password field cant be empty
3. find the user on the basis of email
4. check the password of the (data.password,user.password) since the user.password is encrypted
    we will use bcrypt.compreSync(plainPassword,encryptedPassword) 
5.  if password is matched then will create the jwt token and return the jwt token to the user
6. 

