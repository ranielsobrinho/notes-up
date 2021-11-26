import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../domain/entity";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jwt-simple'

class AuthController {
    async authenticate(req: Request, res: Response){
        const repository = getRepository(User)
        const { username, password } = req.body

        const user = await repository.findOne({ where: { username } }).then(
            user => {
                if(!user){
                    return res.status(404).json({message: 'No existing user.'})
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err){
                        return res.status(400).json({message: 'Fail authentication.'})
                    }
                    if(!result){
                        return res.status(401).json({message: 'Invalid password.'})
                    }
                    const payload = {id: user.id}
                    return res.json({
                        token: jwt.encode( payload, '0187263r' )
                    })
                })
            }
        ).catch((err)=> res.status(500).json(err))
    }
}

export default new AuthController()