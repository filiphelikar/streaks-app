import { NgIcon, provideIcons } from '@ng-icons/core';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline'
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, NgIcon, NgClass,],
  template: `
  <div 
  class="flex justify-around h-12 bg-white dark:bg-gray-900 dark:border-none"
  [ngClass]="{
    'border-t w-screen': isMobile(),
    'border-b': !isMobile(),
  }"
  >
    <a routerLink="/" class="md:w-10 my-auto"> 
      <img class="h-8 float-left" src="favicon.png" alt="logo"/>
    </a>
    <a class="m-2" routerLink="/">Home</a>
    <a class="m-2" routerLink="/create">New</a>
    <button class="cursor-pointer" (click)="toggleTheme()">
      @if (isDark) {
        <ng-icon strokeWidth="2" size="17" name="heroMoon" />
      } @else {
        <ng-icon strokeWidth="2" size="17" name="heroSun" />
      }
    </button>
  </div>
  `,
  viewProviders: [provideIcons({ heroMoon, heroSun })]
})
export class NavComponent {
  isMobile = input(false);
  isDark = false;

  ngOnInit() {
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark', this.isDark);
  }
}