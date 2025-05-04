import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Activity } from '../../interfaces/activity';
import { CommonModule } from '@angular/common';
import { StreakService } from '../services/streak.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
})

export class CreateComponent {

  public isError = false;

  constructor(private streakService: StreakService, private router: Router) {
    this.activityForm.valueChanges.subscribe(() => {
      if (this.isError && this.activityForm.valid) {
        this.isError = false;
      }
    });
  }

  public frequencies = [
    'every day',
    'every other day',
    'once every two days',
    'once every three days',
    'once every four days',
    'once every five days',
    'once every six days',
    'once a week',
    'once every two weeks',
  ];

  public activityForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    frequency: new FormControl<Activity["frequency"]>('every day'),
  });

  public onSubmit() {
    if (!this.activityForm.valid) {
      this.isError = true
      return
    }

    const value = this.activityForm.value;
    this.isError = false
    this.streakService.addActivity({
      title: value.title ?? '',
      frequency: value.frequency ?? 'every day',
    });

    this.router.navigate(['/']);
  }
}