export interface Country {
    [key: string]: string | number;
    id: number;
    name: string;
    flag: string;
    area: number;
    population: number;
}


export interface User{
    user_name:string;
    user_email:string;
    user_type:string;
    user_status:string;
}
