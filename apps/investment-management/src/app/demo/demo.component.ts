import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChildComponent } from "./child.component";
import { ProcessPipe } from "../process.pipe";


@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    imports:[ChildComponent,ProcessPipe],
    standalone: true,
    // changeDetection: ChangeDetectionStrategy.OnPush

})
export class DemoComponent implements OnInit {
    subject = new BehaviorSubject<string>('0');
    ob$ = this.subject.asObservable();
    @Input() data:string[] = []
    @Input() vasa:string = 'haoooooo'
    private ws: WebSocket | null = null;//浏览器原生websocket对象

       ngOnInit(){
        this.ob$.subscribe((val)=>{console.log(val)});
        this.ws = new WebSocket('ws://localhost:8080');
        this.ws.onopen = () => {
            console.log('连接成功');
        }
        this.ws.onmessage = (event) => {
            console.log(event.data);
        }
        this.ws.onerror = (error) => {
            console.log(error);
        }
        this.ws.onclose = () => {
            console.log('连接关闭');
        }
        setTimeout(() => {
            console.log('--------')
            // this.data.push('h');
            // this.data = [...this.data,'v']
            // this.subject.next('hello');
            
        }, 5000);
    }



    getDate(){
        console.log('angular check')
        return Date.now();
    }

    onClick(){

    }

}