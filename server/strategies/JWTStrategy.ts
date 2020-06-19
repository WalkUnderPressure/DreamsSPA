import { Request } from 'express';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import config from '../../config';
import BaseContext from '../BaseContext';
import { IContextContainer } from '../container';
import { IIdentity } from 'COMMON';


export default class JwtStrategy extends BaseContext {
    private _strategy: Strategy;
    private _request: Request;

    get strategy() {
        return this._strategy;
    }

    constructor(opts: IContextContainer) {
        super(opts);
        console.log('jwt: initialization JWT strategy');

        this.verifyRequest = this.verifyRequest.bind(this);
        this.getJwtFromRequest = this.getJwtFromRequest.bind(this);

        this._strategy = new Strategy({
            jwtFromRequest: this.getJwtFromRequest,
            secretOrKey: config.jwtSecret,
        }, this.verifyRequest);
    }

    public async verifyRequest(jwtPayload: any, done: VerifiedCallback) {

        if (this._request) {
            const sub = jwtPayload.sub;

            const { UserModel, initSession } = this.di;
            const user = await UserModel.findById(sub);
            if (user) {
                const identity = initSession(this._request, user);
                return done(null, identity);
            }
            return done('User was not found');

            // const identity: IIdentity = this._request.session.identity;
            // const updatedAt = this._request.session.updatedAt;
            // const isNeedReload = this._request.session.isNeedReload ? true : false;
            // const isLogged = identity && identity.userId && identity.userId.toString() === jwtPayload.sub;

            // if (isLogged && !isNeedReload && updatedAt > Date.now() - TIME_UPDATE_SESSION) {
            //     return done(null, identity);
            // } else {
            // }
        }
        return done('jwt error: request is empty');
    }

    public getJwtFromRequest(req: Request) {
        this._request = req;
        const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
        return getToken(req) || req.cookies['token'] || null;
    }
}