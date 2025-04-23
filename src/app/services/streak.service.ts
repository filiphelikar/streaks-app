import { Injectable } from '@angular/core';
import { Activity } from '../../interfaces/activity';

@Injectable({
  providedIn: 'root'
})

export class StreakService {
  private storageKey = 'my_streaks';

  private frequencyMap: Record<Activity['frequency'], number> = {
    'every day': 1,
    'every other day': 2,
    'once every two days': 2,
    'once every three days': 3,
    'once every four days': 4,
    'once every five days': 5,
    'once every six days': 6,
    'once a week': 7,
    'once every two weeks': 14,
  }

  constructor() { }

  public getAll(): Activity[] {
    const raw = localStorage.getItem(this.storageKey)
    return raw ? JSON.parse(raw) : [];
  }

  public saveAll(activities: Activity[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(activities))
  }

  public addActivity(newActivity: Activity): void {
    const activities = this.getAll();
    activities.push(newActivity);
    this.saveAll(activities);
  }

  public getByTitle(title: string): Activity {
    return this.getAll().find(a => a.title === title)!
  }

  public markAsDone(title: string): void {
    const activities = this.getAll();
    const index = activities.findIndex(a => a.title === title);

    if (index === -1) return;

    const activity = activities[index];
    const now = new Date();

    this.checkStreakValidity(title);

    activity.lastStreak = now;
    activity.streaks += 1;
    this.saveAll(activities);
  }

  public checkStreakValidity(title: string): boolean {
    const activity = this.getByTitle(title)
    const diffDays = this.countFullDaysBetween(new Date(activity.lastStreak), new Date());
    const minDays = this.frequencyMap[activity.frequency];

    if (diffDays >= minDays * 2) {
      activity.streaks = 0;
      return false;
    }

    return true;
  }

  private normalizeDateToMidnight(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private countFullDaysBetween(from: Date, to: Date): number {
    const fromMidnight = this.normalizeDateToMidnight(from);
    const toMidnight = this.normalizeDateToMidnight(to);
    const diffTime = toMidnight.getTime() - fromMidnight.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }
}