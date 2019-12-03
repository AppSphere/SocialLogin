import { Resource } from '../models/resource';

export class TokenResponse extends Resource {
    auth_token: string;
    expires_in: string;
}
