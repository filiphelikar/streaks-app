import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  template: `
  <div class="min-h-screen">
    <div class="hidden md:block">
      <app-nav />
    </div>
    <div class="w-full md:w-2xl md:mx-auto xl:w-5xl pt-8 md:pt-20 px-5 md:px-0">
       <router-outlet />
    </div>
    <div class="md:hidden fixed bottom-0">
      <app-nav [isMobile]="true" />
      <div class='h-5 bg-white dark:bg-gray-900'></div>
    </div>
  </div>
  `,
})
export class AppComponent {
  title = 'streaks-app';
}