import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Activity } from '../../interfaces/activity';
import { CommonModule } from '@angular/common';
import { StreakService } from '../services/streak.service';

@Component({
  standalone: true,
  selector: 'app-create',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1 class="text-center text-xl mb-6">Create new Activity</h1>
    <form [formGroup]="activityForm" (ngSubmit)="onSubmit()">
      <div class="flex flex-col md:flex-row md:items-end md:gap-6 gap-4 max-w-3xl mx-auto">
        <div class="flex flex-col w-full md:w-1/2">
          <label for="title" class="mb-1 text-sm font-medium">Title</label>
          <input 
            required
            minlength="3"
            placeholder="Aa"
            id="title"
            formControlName="title"
            type="text"
            class="placeholder-gray-400 dark:placeholder-gray-500 rounded-md border border-gray-300 bg-gray-100 dark:bg-gray-900 p-2 text-sm shadow-sm focus:border-black focus:outline-none"
          />
        </div>
        @if (isError) {
          <div class="static md:hidden block">
            <span class="absolute text-red-500">Title must be at least 3 characters</span>
            <br>
          </div>
        }
        <div class="flex flex-col w-full md:w-1/2">
          <label for="frequency" class="mb-1 text-sm font-medium ">Choose a frequency</label>
          <select
            id="frequency"
            formControlName="frequency"
            class=" rounded-md border border-gray-300 bg-gray-100 dark:bg-gray-900 p-2 text-sm shadow-sm focus:border-black focus:outline-none"
          >
            <option *ngFor="let freq of frequencies" [value]="freq" class="bg-gray-100 dark:bg-gray-900 rounded-none">{{ freq }}</option>
          </select>
        </div>
      </div>
      @if (isError) {
          <div class="mx-auto mt-2 w-fit hidden md:block">
            <span class="text-red-500">Title must be at least 3 characters</span>
            <br>
          </div>
        }
      <div class="mx-auto mt-10 w-fit">
      <button
      type="submit"
      class="cursor-pointer relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white"
      >
        <span
          class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent active:bg-gray-200 dark:active:bg-gray-800"
        >
          Create
        </span>
      </button>
    </div>
    </form>
  `,
})

export class CreateComponent {

  public isError = false;

  constructor(private streakService: StreakService) {
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
  }
}