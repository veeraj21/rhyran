export class Contact {
  $key: string;
  contactName:string;
  contactEmail:string;
  subject:string;
  message:string;
  createdAt = (new Date()).toString(); 
}
