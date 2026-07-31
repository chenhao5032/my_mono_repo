import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Component({
    selector: 'child',
    templateUrl: './child.component.html',
    standalone: true,
    // changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChildComponent implements OnInit {
    @Input() data:string[] = []

    ngOnInit(){
        // this.ob$.subscribe((val)=>{console.log(val)});
        // setTimeout(() => {
        //     this.subject.next('hello');
            
        // }, 5000);
    }

    onClick(){

    }

}