import { TypeAlert } from '../interface/alert-interface';
export class AlertModel {

    public type: TypeAlert;
    public message: string;
    constructor(type: TypeAlert, message: string){
        this.type = type;
        this.message = message;
    }
}