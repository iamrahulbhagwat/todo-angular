import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe( item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      });

      //sort array isChecked false -> true
      //console.log(this.toDoListArray)
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
      
    });
  }

  onAdd(itemTitle){
    if(itemTitle.value){
      this.toDoService.addTitle(itemTitle.value);
      itemTitle.value = null;
    }
  }

  alterCheck(key,flag){
    this.toDoService.checkOrUncheckTitle(key,!flag);
  }

  removeToDo(key){
    this.toDoService.removeTitle(key);
  }

}
