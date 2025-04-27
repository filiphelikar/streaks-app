import { Injectable } from '@angular/core';
import { Activity, NewActivity } from '../../interfaces/activity';

@Injectable({
  providedIn: 'root'
})

export class StreakService {
  private storageKey = 'my_streaks';

  private frequencyMap: Record<Activity['frequency'], number> = {
    'every day': 1,
    'every other day': 2,
    'once every two days': 3,
    'once every three days': 4,
    'once every four days': 5,
    'once every five days': 6,
    'once a week': 7,
    'once every two weeks': 14,
  }

  public getAll(): Activity[] {
    const raw = localStorage.getItem(this.storageKey)
    return raw ? JSON.parse(raw) : [];
  }

  public saveAll(activities: Activity[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(activities))
  }

  public addActivity(newActivity: NewActivity): void {
    const activity: Activity = {
      ...newActivity,
      createdAt: this.getStartOfToday(),
      lastStreak: this.getPastDateByFrequency(newActivity.frequency),
      nextStreak: this.getStartOfToday(),
      alertTime: '14:00',
      streaks: 0,
    };
    const activities = this.getAll();
    activities.push(activity);
    this.saveAll(activities);
  }

  public getByTitle(title: string): Activity {
    return this.getAll().find(a => a.title === title)!;
  }

  public editAlertTime(title: string, time: string): void {
    const activities = this.getAll();
    const index = activities.findIndex(a => a.title === title);
    const activity = activities[index];

    activity.alertTime = time;
    this.saveAll(activities);
  }

  public deleteActivity(title: string): void {
    const activities = this.getAll();
    const index = activities.findIndex(a => a.title === title);
    
    if (index !== -1) {
      activities.splice(index, 1);
      this.saveAll(activities);
    }
  }
  

  public markAsDone(title: string): void {
    this.checkAllForExpired()
    const activities = this.getAll();
    const index = activities.findIndex(a => a.title === title);

    const activity = activities[index];
    const today = this.getStartOfToday();
    const next = this.normalizeDateToMidnight(new Date(activity.nextStreak));
    const last = this.normalizeDateToMidnight(new Date(activity.lastStreak));

    const isNextStreakToday = this.countFullDaysBetween(today, next) === 0;

    const isLastStreakToday = this.countFullDaysBetween(last, today) === 0;

    if (isNextStreakToday) {

      if (isLastStreakToday) return

      activity.streaks += 1
      activity.lastStreak = today;
      activity.nextStreak = this.nextStreak(today, activity.frequency)

      this.saveAll(activities);
    }
  }

  public nextStreak(lastStreak: Date, frequency: Activity['frequency']): Date {
    const last = this.normalizeDateToMidnight(new Date(lastStreak));
    const days = this.frequencyMap[frequency];
    const next = new Date(last);
    next.setDate(next.getDate() + days);
    return next;
  }

  public checkAllForExpired(): void {
    const activities = this.getAll();
    const today = this.getStartOfToday();

    for (const activity of activities) {
      const last = this.normalizeDateToMidnight(new Date(activity.lastStreak));
      const diff = this.countFullDaysBetween(last, today);
      const maxAllowed = this.frequencyMap[activity.frequency];

      if (diff > maxAllowed) {
        activity.streaks = 0;
        activity.lastStreak = this.getPastDateByFrequency(activity.frequency);
        activity.nextStreak = this.getStartOfToday();
      }
    }

    this.saveAll(activities);
  }

  private normalizeDateToMidnight(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 0, 0);
  }

  private getStartOfToday(): Date {
    return this.normalizeDateToMidnight(new Date());
  }

  private countFullDaysBetween(from: Date, to: Date): number {
    const fromDate = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
    const toDate = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()));

    const diffInMs = toDate.getTime() - fromDate.getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }

  private getPastDateByFrequency(freq: Activity['frequency']): Date {
    const daysAgo = this.frequencyMap[freq];
    const now = this.getStartOfToday();
    now.setDate(now.getDate() - daysAgo);
    return now;
  }

}