import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter} from 'rxjs/operators';
import { users } from '../../constants/people';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  assings = '';
  tasks = [];
  people = users;
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.getTasks()
    }); 
  }

  getTasks() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const listTasksUser = this.tasks.filter(task => task.assign.id === this.people[0].id);
    if (listTasksUser.length > 0) {
      this.assings = `(${listTasksUser.length} asignadas)`;
    } else {
      this.assings = '';
    }
  }

}
