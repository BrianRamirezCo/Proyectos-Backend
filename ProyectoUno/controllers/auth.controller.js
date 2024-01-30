import { User } from "../models/User.js"

export const register =  ('', async (req, res) => {
    const { username, email , password} = req.body
    try {
        let user = await User.findOne({username,email});
        if(user) throw{ code:11000 };

        user = new User({username, email , password})
        await user.save()
        return res.json({ok:"register"})

    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: 'User or email already registered'})
        }
        return res.status(500).json({error: 'Error of server'})
    }
})

export const login = async (req, res) => {

    try {
        const { email , password } = req.body;
        let user = await User.findOne({ email })
        if (!user) { return res.status(400).json({error: 'User not found'});}
        
        const responsePassword = await user.comparePassword(password)
        if (!responsePassword) {
            return res.status(403).json({ error: 'Password incorrect'});
        }
    return res.json({ok:"login"})
    } catch (error) {
        
    }
}