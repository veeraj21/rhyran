export class Consultant {
    $key: string;
    fullName:string;
    contactEmail:string;
    contactPhone:string;
    contactAddress:string;
    location:string;
    visaType:string;
    technologies:string;
    qualification:string;
    experience:string;
    company:string;    
    travel:string;
    createdBy:string;
    active:string='A';
    createdAt = (new Date()).toString();
}
