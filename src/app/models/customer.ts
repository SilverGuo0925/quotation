
export class Customer {


    contactPerson: string;
    companyName: string;
    phone: number;
    email: string;
    id:string;
    address: string;
    postcode : number;
    buidingFloorUnit : string;
    
    constructor(p_contactPerson: string,p_companyName: string,p_phone : number,p_email:string,p_customerId:string,p_address: string,p_postcode:number,p_buidingFloorUnit:string){

        this.contactPerson=p_contactPerson;
        this.companyName=p_companyName;
        this.phone=p_phone;
        this.email=p_email;
        this.id=p_customerId;
        this.address=p_address;
        this.postcode=p_postcode;
        this.buidingFloorUnit=p_buidingFloorUnit;
    }

  }