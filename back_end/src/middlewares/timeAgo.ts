export function formatTimeAgo(createdAt: Date): string {
    if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
        throw new Error('Invalid date');
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;

    const days = Math.floor(diffInSeconds / secondsInDay);
    const hours = Math.floor((diffInSeconds % secondsInDay) / secondsInHour);
    const minutes = Math.floor((diffInSeconds % secondsInHour) / secondsInMinute);
    const seconds = diffInSeconds % secondsInMinute;

    let result = '';
    if (days > 0) {
        result += `${days}d `;
    } else if (hours > 0) {
        result += `${hours}h `;
    } else if (minutes > 0) {
        result += `${minutes}m `;
    } else {
        result += `${seconds}s `;
    }

    return result.trim() || 'Just now';
}
