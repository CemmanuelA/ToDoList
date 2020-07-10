import { Component, OnInit } from '@angular/core';
import { users } from '../../constants/people';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }
  date: string;
  people = users;
  days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  ngOnInit() {
    const currentDate: Date = new Date();
    const month = currentDate.getMonth();
    this.date = `${this.days[currentDate.getDay()]}, ${currentDate.getDate()} de ${this.months[month]}`;
  }

}
