import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProcessPipe } from '../process.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, fromEvent, interval, startWith, Subject, switchMap, takeUntil, throttleTime } from 'rxjs';
import { DemoComponent } from '../demo/demo.component';
import { ChildComponent } from '../demo/child.component';

@Component({
  selector: 'my-mono-repo-test',
  imports: [ProcessPipe, ReactiveFormsModule, DemoComponent, ChildComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush, 
  //开启onpush模式，只有当组件的输入属性发生变化时，才会重新渲染组件
  //
  // 虽然此时有些绑定的数据已经发生变化，只有等到UI发生change或者输入属性发生变化或者手动触发change才会重新渲染）
})
export class TestComponent implements OnInit {
  data = ['a','b','c','d','m'];
  arr = ['a','b','c','d','m'];
  vasa = 'first'
  myForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
  })
  nameControl(){
    return this.myForm.get('name') as FormControl;
  }
  value = 1;
  stepChange$ = new Subject<number>();
  stop$ = new Subject<void>();
  currentStep$ = this.stepChange$.pipe(startWith(3), takeUntil(this.stop$))
  constructor() {
    const a = [1,2,4,3];

    // console.log(a.splice(1,1))
    // console.log(a)
    //es2023新特性 immutable 不可变，返回新数组
    console.log(a.toSpliced(1,1))
    console.log(a.toReversed())
    console.log(a.toSorted())
    console.log(a.with(1,99))
    console.log(a.toSpliced(1,0,99))
    const data =  Array(10).fill(0).map((_,t)=>t);
    console.log(data);
    //数组去重
    const arr1 = [2,1,1,4];
    const newArr = arr1.reduce<number[]>((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }
      return acc;
    }, []);
    //
    setTimeout(() => {
      // this.arr.push('a');
      // this.arr.push('e')
      this.arr = [...this.arr,'v']

this.data = [...this.data,'v']
this.vasa = 'later'
console.log('completed') 
    }, 2000);
    
  }

  ngOnInit(){
    this.currentStep$.subscribe((val)=>{console.log(val)});
    this.stepChange$.next(5);
    this.stop$.next();
    this.stepChange$.next(9);

    //防抖：在一定时间内没有新事件触发，则执行最后一次事件
    this.nameControl().valueChanges.pipe(debounceTime(500)).subscribe(t=>{
      console.log(t)
    })
    //节流：在一定时间内只执行一次
    this.nameControl().valueChanges.pipe(throttleTime(1000)).subscribe(t=>{
      console.log(t)
    })
    //interval 每隔指定时间发出一个从0开始的递增数
    const source$ = interval(1000);
    // source$.subscribe(t=>{
    //   console.log(t)
    // })
    const button = document.getElementById('btn');
    if (button) {
      const click$ = fromEvent(button, 'click');
      click$.pipe(switchMap(()=>interval(1000))).subscribe((val) => {
        console.log('button clicked', val);
      });
    }
    
  }

  getValue(){
    console.log('print')
    return 1;
  }
}
