import { Component } from '@angular/core';
import { StreakService } from '../services/streak.service';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCog8Tooth } from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';
import { Activity } from '../../interfaces/activity';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgIcon, FormsModule],
  viewProviders: [provideIcons({ heroCog8Tooth })],
  templateUrl: './table.component.html',
})
export class TableComponent {
  isModalOpen = false;
  selectedActivity: Activity | null = null;
  alertTime: string = '';

  constructor(public streakService: StreakService) {
    this.streakService.checkAllForExpired();
  }

  public Save() {
    if (this.selectedActivity && this.alertTime)
      this.streakService.editAlertTime(this.selectedActivity.title, this.alertTime)
    this.closeModal()
  }

  public deleteActivity(): void {
    if (this.selectedActivity) {
      this.streakService.deleteActivity(this.selectedActivity.title)
      this.closeModal()
    }
  }

  public openModal(activity: Activity): void {
    this.selectedActivity = activity;
    this.alertTime = activity.alertTime || '';
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
    this.selectedActivity = null;
    this.alertTime = '';
  }

}