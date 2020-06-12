import { route, GET, POST, DELETE } from 'awilix-express';
import ServerResponse from '../../Templates/ServerResponse';
import DreanItem from '../../Templates/DreanItem';
import { Request, Response } from 'express';
import BaseContext from './BaseContext';

@route('/api/dreans')
export default class DreansController extends BaseContext {
    @GET()
    @route('/all')
    async getLeads(req: Request, res: Response) {
        console.log('get all function ')
        const { DreanModel } = this.di;

        DreanModel.find({})
            .then(resolve => {
                const serRes: ServerResponse = {
                    error: (resolve == null ? true : false),
                    data: resolve,
                    message: (resolve == null ? 'Cant get all items!' : 'Successfully get all items!')
                }
                return res.json(serRes)
            })
    }

    @GET()
    @route('/redact/:id')
    public getDreanById(req: Request, res: Response) {
        const { DreanModel } = this.di;
        const id = req.params.id;

        if (id) {
            DreanModel.findById(id)
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
    public redactDrean(req: Request, res: Response) {
        const { DreanModel } = this.di;
        let item = req.body as DreanItem;
        const id = item._id;

        if (id) {
            DreanModel.findByIdAndUpdate(id, item)
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
            DreanModel.insertMany(item)
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
    }

    @DELETE()
    @route('/remove')
    public removeDrean(req: Request, res: Response) {
        const { DreanModel } = this.di;
        const id = req.body._id;

        console.log('id for delete : ', id);
        DreanModel.findByIdAndRemove(id)
            .then(resolve => {
                console.log('item for delete : ', resolve);

                const serRes: ServerResponse = {
                    error: (resolve == null ? true : false),
                    data: resolve,
                    message: (resolve == null ? 'Cant delete item!' : 'Successfully delete item!')
                }

                return res.json(serRes);
            })
    }
}

