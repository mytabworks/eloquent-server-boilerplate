import { Request, Response } from 'express'
import Validozer from 'validozer'
import User from '../model/user'
import Activity from '../model/activity'

export default class ActivityController {
    
    public static async getAll(_request: Request, response: Response) {
        try {
            const activities = await Activity
                .orderBy('id', 'ASC')
                .with({user: ($userQuery) => $userQuery.select("*", "id as password")})
                .get()
                
            return response.status(200).send({ 
                status: "ok", 
                data: activities.toJSON()
            });
        } catch (error) {
            console.error(error)
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async get(request: Request, response: Response) {
        const { id } = request.params
        try {
            const activity = await Activity.find(id, ["*"], 'user')

            return response.status(200).send({ 
                status: "ok", 
                data: activity.toJSON()
            });
        } catch (error) {
            console.error(error)
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async create(request: Request, response: Response) {
        const { uid } = request.params
        const data = request.body
        
        const rules = {
            description: {
                label: "Description",
                rules: "required|alpha_space",
            }
        }

        const validator = Validozer.make(data, rules)

        if(validator.fails()) {
            const errors = validator.errors().values()

            return response.status(200).send({
                status: "error",
                message: [...errors]
            })
        }

        try {
            const user = await User.find(uid)
            if(!user.hasItem) {
                return response.status(500).send({
                    status: "error",
                    message: `user ${uid} doesn't exists`
                });
            }
            const activity = user.activity().create()
            activity.description = data.description
            await activity.save()

            return response.status(203).send({
                status: "ok", 
                id: activity.id
            });
        } catch (error) {
            console.error(error)
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async update(request: Request, response: Response) {
        const { id } = request.params
        const data = request.body
        const rules = {
            description: {
                label: "Description",
                rules: "required|alpha_space",
            }
        }

        const validator = Validozer.make(data, rules)

        if(validator.fails()) {
            const errors = validator.errors().values()

            return response.status(200).send({
                status: "error",
                message: [...errors]
            })
        }

        try {
            const activity = await Activity.find(id)

            if(!activity.hasItem) {
                return response.status(500).send({
                    status: "error",
                    message: `user ${id} doesn't exists`
                });
            }

            activity.description = data.description

            await activity.save()

            return response.status(203).send({
                status: "success", 
                id: activity.id
            });
        } catch (error) {
            console.log(error)
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }


    public static async delete(request: Request, response: Response) {
        const { id } = request.params
        try {
            await Activity.where('id', id).delete()

            response.status(203).send({
                status: "ok",
            });
        } catch (error) {
            console.error(error)
            response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

}