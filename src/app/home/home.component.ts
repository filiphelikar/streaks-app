import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [TableComponent],
  template: `
  <h1 class='font-(family-name:--font-bangers) text-6xl text-center'>Streaks</h1>
  <app-table />
  `,
})
export class HomeComponent {

}