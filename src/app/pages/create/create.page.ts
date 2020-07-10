import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter} from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { users } from '../../constants/people';

@Component({
  selector: 'app-create',
  templateUrl: 'create.page.html',
  styleUrls: ['create.page.scss']
})
export class CreatePage implements OnInit {
  statusList = [
    {
      value: 0,
      label: 'Activa'
    },
    {
      value: 1,
      label: 'Finalizada'
    },
  ]
  people = users
  form = this.fb.group({
    assign: ['', [Validators.required]],
    time: [''],
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(250)]],
    status: [this.statusList[0], [Validators.required]]

  })
  task;

  
  constructor(private fb: FormBuilder, private router: Router, public toastController: ToastController) {}

  ngOnInit() {
    
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const data = this.router.getCurrentNavigation().extras.state;
      if (data && data.task) {
        this.task = data.task;
        this.form.setValue({
          assign: this.task.assign,
          time: this.task.time,
          title: this.task.content.title,
          description: this.task.content.description,
          status: this.statusList.find(status => this.task.status.value === status.value)
        });
      }
    }); 
  }

  handleCreate() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const dt = new Date();
    const time = dt.setHours( dt.getHours() + parseInt(this.form.get('time').value))
    console.log(time)
    console.log(new Date(time));
    const task =  {
      id: this.form.get('title').value + Math.floor(Math.random() * 100),
      status: this.form.get('status').value,
      assign: this.form.get('assign').value,
      time: this.form.get('time').value === '' ? null : time ,
      content: {
        title: this.form.get('title').value,
        description: this.form.get('description').value
      }
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    this.form.reset();
    this.form.controls.status.setValue(this.statusList[0]);
    this.presentToast('Tarea creada con exito');
  }

  handleUpdate() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task =  {
      id: this.task.id,
      status: this.form.get('status').value,
      assign: this.form.get('assign').value,
      time: this.form.get('time').value,
      content: {
        title: this.form.get('title').value,
        description: this.form.get('description').value
      }
    }
    const index = tasks.findIndex( taskItem => taskItem.id === this.task.id);
    tasks[index] = task;
    localStorage.setItem('tasks',JSON.stringify(tasks));
    this.form.reset();
    this.form.controls.status.setValue(this.statusList[0]);
    this.presentToast('Tarea actualizada');
    setTimeout(() => {
      this.router.navigate(['/list']);
    }, 2000);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
