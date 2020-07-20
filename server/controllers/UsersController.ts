import { route, GET, POST, DELETE } from 'awilix-express';
import ServerResponse from '../../Templates/ServerResponse';
import { Request, Response, NextFunction } from 'express';
import BaseContext from '../BaseContext';
import { IIdentity, USER_ROLE } from 'COMMON';
import { DataToArray } from '../../Helpers';

@route('/api/users')
export default class UsersController extends BaseContext {
    @GET()
    @route('/allUsers')
    public getAllUsers(req: Request, res: Response) {
        const { UserService } = this.di;

        UserService.getAllUsers()
            .then(resolve => {
                const serRes: ServerResponse = {
                    error: (resolve == null ? true : false),
                    data: DataToArray(resolve),
                    message: (resolve == null ? 'Cant get all users!' : 'Successfully get all users!'),
                }
                return res.json(serRes)
            })
    }

    @GET()
    @route('/redact/:id')
    public getUserById(req: Request, res: Response) {
        const { UserService } = this.di;
        const id = req.params.id;

        if (id) {
            UserService.getUserByID(id)
                .then(resolve => {
                    const serRes: ServerResponse = {
                        error: (resolve == null ? true : false),
                        data: [resolve],
                        message: (resolve == null ? 'Cant get user for redact!' : 'Successfully get user for redact!')
                    }
                    return res.json(serRes);
                })
        } else {
            const serRes: ServerResponse = {
                error: false,
                data: {},
                message: 'Cant get item for this id!'
            }
            return res.json(serRes);
        }
    }

    @POST()
    @route('/redact')
    public redactUser(req: Request, res: Response, next: NextFunction) {
        const { UserService } = this.di;

        let item = req.body;
        const id = item.id;
        if (id) {
            UserService.updateUserProfile(id, item)
                .then(resolve => {
                    const updatesItem = resolve? item : resolve;
                    
                    const serRes: ServerResponse = {
                        error: (resolve == null ? true : false),
                        data: DataToArray(updatesItem),
                        message: (resolve == null ? 'Cant update user!' : 'Successfully update user!')
                    }
                    return res.json(serRes);
                })
        } else {
            const user = req.session.identity;
            const ownerId = user && user.userId;
            
            UserService.createUser(item)
                .then(resolve => {
                    const serRes: ServerResponse = {
                        error: (resolve == null ? true : false),
                        data: DataToArray(resolve),
                        message: (resolve == null ? 'Cant create new user!' : 'Successfully create new user!')
                    }
                    return res.json(serRes);
                })
        }
    }

    @DELETE()
    @route('/remove')
    public removeUser(req: Request, res: Response, next: NextFunction) {
        const { UserService } = this.di;

        const id = req.body.id;
        UserService.deleteUserByID(id)
            .then(resolve => {
                const serRes: ServerResponse = {
                    error: (resolve == null ? true : false),
                    data: DataToArray(resolve),
                    message: (resolve == null ? 'Cant delete user!' : 'Successfully delete user!')
                }
                return res.json(serRes);
            })
    }
}

