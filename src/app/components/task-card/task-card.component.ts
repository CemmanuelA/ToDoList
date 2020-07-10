import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() data;
  @Output() itemDeleted = new EventEmitter();
  showOptions = false;
  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}
  handleShowOptions(bool = true) {
    this.showOptions = !bool ? bool: !this.showOptions;
  }

  handleDelete(task) {
    console.log(task)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter( taskItem => taskItem.id !== task.id);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    this.itemDeleted.emit(true);
  }

  getTimeLeft(date: number) {
    const currentDate = new Date();
    let diff =(date - currentDate.getTime()) / 1000;
    diff /= (60 * 60);
    const hours = Math.round(diff);
    return hours;
  }


}
