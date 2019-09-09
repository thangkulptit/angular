export interface User {
    id?: number;
    username: string;
    passwords: Password;
    fullname: string;
    email: string;
}

export interface Password {
    password: string;
    c_password: string
}