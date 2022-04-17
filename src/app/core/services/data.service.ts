import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messaageSource = new BehaviorSubject<string>("");
  currenctMessage = this.messaageSource.asObservable();

  constructor() { }

  changeMessage(message: string){
    this.messaageSource.next(message);

  }
}
