export interface Activity {
    title: string;
    frequency: 'every day' | 'every other day' | 'once every two days' | 'once every three days' | 'once every four days' | 'once every five days' | 'once a week' | 'once every two weeks';
    createdAt: Date;
    lastStreak: Date;
    nextStreak: Date;
    alertTime: string;
    streaks: number;
}

export interface NewActivity {
    title: string;
    frequency: 'every day' | 'every other day' | 'once every two days' | 'once every three days' | 'once every four days' | 'once every five days' | 'once a week' | 'once every two weeks';
}