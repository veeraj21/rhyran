export class Review {
  $key: string;
  text: string;
  stars: number;
  createdBy:string;
  likes:number = 0;
  createdAt = (new Date()).toString();
  active: boolean = true;
}
