import { route, GET, POST, DELETE } from 'awilix-express';
import ServerResponse from '../../Templates/ServerResponse';
import { Request, Response, NextFunction } from 'express';
import BaseContext from '../BaseContext';
import { IIdentity, USER_ROLE } from 'COMMON';

@route('/api/dreans')
export default class DreansController extends BaseContext {
    @GET()
    @route('/allMyDreans')
    public getAllMyDreans(req: Request, res: Response) {
        const { DreansService } = this.di;

        const user = req.session.identity;
        const owner_id = user && user.userId;
        DreansService.getAllDreansWithOwner(owner_id)
            .then(resolve => {
                const serRes: ServerResponse = {
                    error: (resolve == null ? true : false),
                    data: resolve,
                    message: (resolve == null ? 'Cant get all my dreans!' : 'Successfully get all my dreans!')
                }
                return res.json(serRes)
            })
    }

    @GET()
    @route('/allDreans')
    public getAllDreans(req: Request, res: Response) {
        const { DreansService } = this.di;

        DreansService.getAllPublicDreansWithOwner()
            .then(resolve => {
                const serRes: ServerResponse = {
                    error: (resolve === null ? true : false),
                    data: resolve,
                    message: (resolve === null ? 'Cant get all public dreans!' : 'Successfully get all public dreans!')
                }
                return res.json(serRes)
            })
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
                        data: [resolve],
                        message: (resolve == null ? 'Cant get drean for redact!' : 'Successfully get drean for redact!')
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
        const { DreansService } = this.di;

        let item = req.body;
        const id = item.id;
        if (id) {
            DreansService.updateDreanByID(id, item)
                .then(resolve => {
                    const updatesItem = resolve? item : resolve;
                    const serRes: ServerResponse = {
                        error: (resolve == null ? true : false),
                        data: [updatesItem],
                        message: (resolve == null ? 'Cant update item!' : 'Successfully update item!')
                    }

                    return res.json(serRes);
                })
        } else {
            const user = req.session.identity;
            const ownerId = user && user.userId;
            
            DreansService.createDrean( ownerId, item)
                .then(resolve => {
                    const serRes: ServerResponse = {
                        error: (resolve == null ? true : false),
                        data: [resolve],
                        message: (resolve == null ? 'Cant create new item!' : 'Successfully create new item!')
                    }
                    return res.json(serRes);
                })
        }
    }

    @DELETE()
    @route('/remove')
    public removeDrean(req: Request, res: Response, next: NextFunction) {
        const { DreansService } = this.di;

        const id = req.body.id;
        
        DreansService.deleteDreanByID(id)
            .then(resolve => {
                const serRes: ServerResponse = {
                    error: (resolve == null ? true : false),
                    data: resolve,
                    message: (resolve == null ? 'Cant delete item!' : 'Successfully delete item!')
                }

                return res.json(serRes);
            })
    }
}

