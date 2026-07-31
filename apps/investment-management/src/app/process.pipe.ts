import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'process',
  standalone: true,
  // pure: false
})
export class ProcessPipe implements PipeTransform {
  transform(value: string[]){
    // "empty pipe": pass-through, no transformation.
    return value.filter(t=> !['a','b'].includes(t))
  }
}

