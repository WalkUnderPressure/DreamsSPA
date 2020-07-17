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

        console.log('Registration =====>');
        // const errors: Result<ValidationError> = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.answer(null, convertExpressValidatorErrors(errors), status.BAD_REQUEST, ResCode.FORM);
        // }

        // tslint:disable-next-line: no-shadowed-variable

        return passport.authenticate('local-signup', (errors, identity) => {

            console.log('err ', errors);
            console.log('identity ', identity);

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
        console.log('<---- LOG IN ---->', req.body);
        return passport.authenticate('local-login', (err, identity) => {
            console.log('err ', err);
            console.log('identity ', identity);

            if (err || identity === false) {
                const serRes = {
                    error: true,
                    data: null,
                    message: 'Email or password not entered!',
                } as ServerResponse;
                return res.json(serRes);
            }
            let expire = JST_EXPIRE;

            if (req.body.rememberMe) {
                expire = REMEMBER_ME_EXPIRE;
            }

            res.cookie('token', identity.token, { maxAge: 1000 * 60 * 60 * 24 * expire });

            delete identity.token;

            // console.log('identity => ', identity);
            const serRes = {
                error: false,
                data: identity,
                message: 'You have successfully logged in!'
            } as ServerResponse;
            res.json(serRes);

        })(req, res, next);
    }

    @POST()
    @route('/logout')
    public logout(req: Request, res: Response, next: NextFunction) {
        const { passport } = this.di;

        return passport.authenticate('local-logout', (err, identity) => {
            if (err) {
                const serRes = {
                    error: true,
                    data: null,
                    message: err
                } as ServerResponse;
                res.json(serRes);
            }

            const result: boolean = identity === null || identity === false;

            if (!result) {
                for (let field in req.cookies) {
                    res.clearCookie(field);
                }
                delete req.session;
                console.log('session after clear ', req.session);
            }

            const message = !result ? 'You have successfully logged out!' : 'Cant LogOut something went wrong!';
            const serRes = {
                error: result,
                data: identity,
                message: message,
            } as ServerResponse;
            res.json(serRes);
        })(req, res, next);
    }

    @POST()
    @route('/updateProfile')
    public updateProfile(req: Request, res: Response, next: NextFunction) {
        const { UserService, initSession } = this.di;

        const data = req.body;
        const user = req.session.identity;
        const userId = user && user.userId;

        console.log('data - ', data);
        console.log('userId - ', userId);
        UserService.updateUserProfile( userId, data)
            .then(updatedUser => {
                const identity = initSession(req, updatedUser);
                delete identity.token;
                const serRes: ServerResponse = {
                    error: identity? false : true,
                    data: identity? identity : null,
                    message: identity ? 'User profile was successfully updated!' : 'We can\'t update user profile!'
                };
                res.json(serRes);
            })
    }

    @POST()
    @route('/checkEmail')
    public checkEmail(req: Request, res: Response, next: NextFunction) {
        const { UserService } = this.di;

        const email = req.body.email;
        UserService.findUserByEmail(email)
            .then(user => {
                const userExist = user !== null;

                const serRes: ServerResponse = {
                    error: userExist,
                    data: userExist? user.email : null,
                    message: userExist ? 'User with this email already exist!' : 'You can use this email!'
                };
                res.json(serRes);
            })
    }
}