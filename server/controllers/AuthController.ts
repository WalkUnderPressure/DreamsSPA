import { route, GET, POST, DELETE } from 'awilix-express';
import ServerResponse from '../../Templates/ServerResponse';
import { Request, Response, NextFunction } from 'express';
import BaseContext from '../BaseContext';

@route('/api/auth')
export default class AuthController extends BaseContext {

    @POST()
    @route('/register')
    // @before([check('confirm')
    //         .custom((value, { req }) => {
    //             if (value !== req.body.password) {
    //                 throw new Error('Passwords don\'t match.');
    //             } else {
    //                 return value;
    //             }
    //         })
    //         .withMessage('Passwords don\'t match')
    //     ])
    public register(req: Request, res: Response, next: NextFunction) {
        const { passport } = this.di;

        // const errors: Result<ValidationError> = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.answer(null, convertExpressValidatorErrors(errors), status.BAD_REQUEST, ResCode.FORM);
        // }

        // tslint:disable-next-line: no-shadowed-variable

        return passport.authenticate('local-signup', (errors, identity) => {

            if (errors) {
                const serRes = {
                    error: true,
                    data: null,
                    message: errors
                } as ServerResponse;
                res.json(serRes);
            } else if (identity) {
                const serRes = {
                    error: false,
                    data: identity,
                    message: 'You have successfully registered! Now you should be able to log in.'
                } as ServerResponse;
                res.json(serRes);
            } else {
                const serRes = {
                    error: false,
                    data: null,
                    message: 'Could not process the form.'
                } as ServerResponse;
                res.json(serRes);
            }
        })(req, res, next);
    }

    @POST()
    @route('/login')
    // @before([check('confirm')
    //         .custom((value, { req }) => {
    //             if (value !== req.body.password) {
    //                 throw new Error('Passwords don\'t match.');
    //             } else {
    //                 return value;
    //             }
    //         })
    //         .withMessage('Passwords don\'t match')
    //     ])
    public login(req: Request, res: Response, next: NextFunction) {
        const { passport } = this.di;
        const JST_EXPIRE = 3;
        const REMEMBER_ME_EXPIRE = 30;
        return passport.authenticate('local-login', (err, identity) => {
            console.log('err ', err);
            console.log('identity ', identity);

            if (err) {
                const serRes = {
                    error: true,
                    data: null,
                    message: err
                } as ServerResponse;
                res.json(serRes);
            }
            let expire = JST_EXPIRE;

            if (req.body.rememberMe) {
                expire = REMEMBER_ME_EXPIRE;
            }

            res.cookie('token', identity.token, { maxAge: 1000 * 60 * 60 * 24 * expire });

            const serRes = {
                error: false,
                data: identity,
                message: 'You have successfully logged in!'
            } as ServerResponse;
            res.json(serRes);

        })(req, res, next);
    }
}