import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  template: `
  <div class="hidden md:block">
    <app-nav />
  </div>
  <div class="min-h-screen w-full md:w-2xl md:mx-auto xl:w-5xl">
    <router-outlet />
    <div class="md:hidden fixed bottom-0">
      <app-nav [isMobile]="true" />
    </div>
  </div>
  `,
})
export class AppComponent {
  title = 'streaks-app';
}