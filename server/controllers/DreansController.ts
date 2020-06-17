import { route, GET, POST, DELETE } from 'awilix-express';
import ServerResponse from '../../Templates/ServerResponse';
import { Request, Response, NextFunction } from 'express';
import BaseContext from '../BaseContext';
import { IIdentity, USER_ROLE } from 'COMMON';

@route('/api/dreans')
export default class DreansController extends BaseContext {
    @GET()
    @route('/all')
    public getDreans(req: Request, res: Response) {
        const { DreansService, passport } = this.di;

        passport.authenticate('local-jwt', (err, identity: IIdentity) => {
            console.log('identity : ', identity);
            const owner_id =  identity.userId;
            
            DreansService.getAllDreansWithOwner(owner_id)
            .then(resolve => {
                const serRes: ServerResponse = {
                    error: (resolve == null ? true : false),
                    data: resolve,
                    message: (resolve == null ? 'Cant get all items!' : 'Successfully get all items!')
                }
                return res.json(serRes)
            })

            // const isLogged = identity && identity.userId && identity.role !== USER_ROLE.GUEST ? true : false;
            // const resource = req.path.replace(/\./g, '_');
            // console.log('req.method=', req.method, 'resource=', resource, 'isAllowed?', isLogged);
            // const userId = identity && identity.userId || null
            // if (!isLogged) {
            //     const isAPICall = resource.toLowerCase().includes('api');
            //       if (isAPICall) {
            //           return  res.status(401).json({
            //             error: false,
            //             data: null,
            //             message: 'You are not authorized to send this request!',
            //           });
            //       } else {
            //         return res.redirect('/error');
            //       }
            // }
        //   next();
        })(req, res);
        

        // DreansService.getAllDreans()
        //     .then(resolve => {
        //         const serRes: ServerResponse = {
        //             error: (resolve == null ? true : false),
        //             data: resolve,
        //             message: (resolve == null ? 'Cant get all items!' : 'Successfully get all items!')
        //         }
        //         return res.json(serRes)
        //     })
    }



    @GET()
    @route('/redact/:id')
    public getDreanById(req: Request, res: Response) {
        const { DreansService } = this.di;
        const id = req.params.id;

        if (id) {
            DreansService.getDreanByID(id)
                .then(resolve => {

                    const serRes: ServerResponse = {
                        error: (resolve == null ? true : false),
                        data: resolve,
                        message: (resolve == null ? 'Cant get item for redact!' : 'Successfully get item for redact!')
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
    public redactDrean(req: Request, res: Response, next: NextFunction) {
        const { DreansService, passport } = this.di;

        // /*
        let item = req.body;
        const id = item._id;

        if (id) {
            DreansService.updateDreanByID(id, item)
                .then(resolve => {
                    console.log('item for update : ', resolve);

                    const serRes: ServerResponse = {
                        error: (resolve == null ? true : false),
                        data: resolve,
                        message: (resolve == null ? 'Cant update item!' : 'Successfully update item!')
                    }

                    return res.json(serRes);
                })
        } else {
            DreansService.createDrean(item)
                .then(resolve => {
                    console.log('created item : ', resolve);

                    const serRes: ServerResponse = {
                        error: (resolve == null ? true : false),
                        data: resolve,
                        message: (resolve == null ? 'Cant create new item!' : 'Successfully crate new item!')
                    }

                    return res.json(serRes);
                })
        }
        // */
    }

    @DELETE()
    @route('/remove')
    public removeDrean(req: Request, res: Response, next: NextFunction) {
        const { DreansService, passport } = this.di;

        return passport.authenticate('local-jwt', (err, identity) => {
            console.log('err ', err);
            console.log('identity ', identity);
            
            
        })(req, res, next);

        const id = req.body._id;

        // console.log('id for delete : ', id);
        // DreansService.deleteDreanByID(id)
        //     .then(resolve => {
        //         console.log('item for delete : ', resolve);

        //         const serRes: ServerResponse = {
        //             error: (resolve == null ? true : false),
        //             data: resolve,
        //             message: (resolve == null ? 'Cant delete item!' : 'Successfully delete item!')
        //         }

        //         return res.json(serRes);
        //     })
    }
}

