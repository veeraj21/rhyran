import {AbstractControl, ValidationErrors} from '@angular/forms';

export class LastnameValidator {
   // Made static to use with the class name.
    static cannotContainSpace(control:AbstractControl) : ValidationErrors | null{
       if((control.value as string).indexOf(' ') >= 0)
          return {cannotContainSpace:true};
       else
       return null;
     }

     static checkExistance(control:AbstractControl) : ValidationErrors | null{
        return  ((control.value as string) === 'Jack') ? {checkExistance:true}:  null;           
      }

     static shouldBeUnique(control:AbstractControl) : Promise<ValidationErrors | null>{
        return new Promise((resolve,reject) =>{
            setTimeout(() => {
                console.log("control.value:::>>>>"+control.value);
                if(control.value === 'Jack') 
                    resolve({shouldBeUnique  : true});
                else 
                    resolve(null);
            },3000);
         })
     }

    }
