import {ErrorHandler} from '@angular/core';

export class AppErrorHandler implements ErrorHandler{

    handleError(error:any){
      //alert("Some unexpected error occured here");
      console.log("Some unexpected error occured here"+error);
    }

}