import { Response } from 'express'
import { sign } from 'jsonwebtoken'
import User from '../model/user'

export const createToken = (user: InstanceType<typeof User>) => {
    return sign({
        uid: user.id,
        token_version: user.token_version
    }, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: "15m"})
}

export const refreshToken = (user: InstanceType<typeof User>) => {
    return sign({
        uid: user.id,
        token_version: user.token_version
    }, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: "7d"})
}

export const setRefreshToken = (response: Response, token: string) => {
    response.cookie("jsid", token, { httpOnly: true })
}