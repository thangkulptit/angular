
export interface AlertInterface{
    type: TypeAlert;
    message: string;
}

export enum TypeAlert {
    Success = 'Success',
    Faild = 'Faild'
}