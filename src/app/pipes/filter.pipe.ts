import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allusers:[], searchKey:string, propName:string): any [] {
    if(!allusers || searchKey=="" || propName==""){
      return []
    }
    const result:any = [];


    allusers.forEach((user:any) => {
      if(user[propName].trim().toLowerCase().includes(searchKey.toLowerCase()))
      result.push(user)
    })


    return result;
  }

} 
