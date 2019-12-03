import { Resource } from '../models/resource';

export class SignUpViewModel extends Resource {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    acceptsMarketingEmail: string;
    phonNumber: string;
    avatarUrl: string;
    ssoToken: string;
}
