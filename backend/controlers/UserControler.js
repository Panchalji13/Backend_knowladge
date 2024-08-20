import User from '../modle/UserModle.js'
import jwt from 'jsonwebtoken';
const secretKey = "secretKey";



   
export const UserSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        

      
        const existingUser = await User.findOne({ where: { email } }); 
        if (existingUser) {
            return res.status(400).json({ error: 'Account already exists with this email.' });
        }

      
        const user = await User.create({ name, email, password });
       const token= jwt.sign({user},secretKey, {expiresIn: "2hr"},(err,token)=>{
            
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
            token:token
        });
    });
      
    } catch (err) {
        console.error( err); 
        res.status(500).json({ error: 'Error signing up. Please try again.' });
    }
};

// export const UserLogin = async (req,res) => {
//     const { email,password } = req.body;
//     try{
//         const user = await User.findOne({ where: { email,password } });
//         res.status(201).json({
//             success: true,
//             massage: " Data get successfully....",
//             data: user
//           });
//     }
//     catch(err){
//         console.log(err)
//         res.status(400).json({ error: err });

//     }
// }
export const UserLogin = async (request, response, next) => {
    try {
        const user = await User.findOne({ where: { email: request.body.email } });

        if (!user) {
            return response.status(201).json({ Message: 'Invalid email' });
        }

        const isPasswordValid = User.checkPassword(request.body.password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ email: user.email, id: user.id }, 'userToken');
            return response.status(200).json({ Message: 'SignIn successfully...', user, token });
        }

        return response.status(201).json({ Message: 'Invalid password' });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ Error: 'Internal server error' });
    }
};



export const UpdateUser = async (req,res) => {
    const { email, ...updateData } = req.body;
    try{
        const user = await User.findOne({ where: { email } });
        if (user) {
            await user.update(updateData);
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } catch (error) {
            console.log(error);
          res.status(400).json({ error: error.message });
        }
}

export const UserDelete = async (req,res) => {
    const { email } = req.body;
    console.log(email)
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        
        if (user) {
            await user.destroy(); 
            res.status(201).json({
                massage: " Delete Data successfully....",
              });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// export const searchByCategory = (request, response, next) => {
//     let role = request.body.searchedList;

//     Category.findAll({
//         where: { role: { [Op.like]: `${role}%` } },
//         include: [{
//             model: SubCategory,
//             include: [{
//                 model: Player,
//             }]
//         }]
//     })
//         .then(result => {
//             return response.status(200).json({ Message: "Player data by searching", data: result });
//         })
//         .catch(error => {
//             console.log(error);
//             return response.status(500).json({ Error: "Internal server error...." });
//         });
// }

export default User;