import { Directive, HostListener, ElementRef,Input } from '@angular/core';

@Directive({
  selector: '[appAppInputFormat]'
})
export class AppInputFormatDirective {
  @Input('appAppInputFormat') format:string;
  constructor(private ele:ElementRef) { }

  @HostListener('focus') onsdsdsd(){
    console.log("onFocus calledsdsd");
  }
  @HostListener('keyup') onsdsds12d(){
    let val : string = this.ele.nativeElement.value;
    this.ele.nativeElement.value = val.toUpperCase();
    console.log("onblur calledsdsd" +this.ele.nativeElement.value);
  }
}
