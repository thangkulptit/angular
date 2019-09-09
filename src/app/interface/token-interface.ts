export interface Token {
    token: string;
}

export interface TokenPayloadUser {
    id? : number;
    username : string;
    password : string;
    fullname?: string;
    email?: string;
 
}