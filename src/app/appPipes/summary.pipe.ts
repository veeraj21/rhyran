import {Pipe , PipeTransform} from '@angular/core'

@Pipe({
    name: 'summary'
})
export class SummaryPipe implements PipeTransform{

     transform(value:string, limit?: number){
       if(!value) return null;
       console.log("linit" +limit);
       let actual = (limit != undefined) ? limit : 15
        return value.substring(1, actual) +'...';
     }

}