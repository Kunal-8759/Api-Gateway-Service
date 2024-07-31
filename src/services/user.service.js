const {UserRepository}=require('../repositories')
const userRepo=new UserRepository();
//data :{email ,password}
async function create(data){
    try {
        const user =await userRepo.create(data);
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    create
}