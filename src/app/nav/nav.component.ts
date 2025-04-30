import { NgIcon, provideIcons } from '@ng-icons/core';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline'
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, NgIcon, NgClass,],
  templateUrl: './nav.component.html',
  viewProviders: [provideIcons({ heroMoon, heroSun })]
})
export class NavComponent {
  public isMobile = input(false);
  public isDark = false;

  public ngOnInit() {
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  public toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    const html = document.documentElement;
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    html.classList.toggle('dark', this.isDark);
    metaThemeColor?.setAttribute("content", this.isDark ? "oklch(0.278 0.033 256.848)" : "#fff");
  }
}