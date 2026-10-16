export const userAnalytics = (userData = [], period = "weekly") => {
  const users = Array.isArray(userData) ? userData : [];

  const periodDays = {
    daily: 1,
    weekly: 7,
    monthly: 30,
  };

  const days = periodDays[period] ?? 7;

  const now = new Date();

  const today = new Date(now);
  today.setUTCHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setUTCDate(today.getUTCDate() - days + 1);

  const previousStart = new Date(startDate);
  previousStart.setUTCDate(startDate.getUTCDate() - days);

  const dailyCounts = {};

  let currentTotal = 0;
  let previousTotal = 0;

  users.forEach((user) => {
    if (!user?.createdAt) return;

    const date = new Date(user.createdAt);

    if (Number.isNaN(date.getTime())) return;

    const key = date.toISOString().slice(0, 10);

    if (date >= startDate && date <= now) {
      dailyCounts[key] = (dailyCounts[key] || 0) + 1;
      currentTotal++;
    } else if (date >= previousStart && date < startDate) {
      previousTotal++;
    }
  });

  const chartData = Array.from({ length: days }, (_, index) => {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + index);

    const key = date.toISOString().slice(0, 10);

    return {
      date: key,
      label: date.toLocaleDateString("en-US", {
        ...(period === "weekly"
          ? { weekday: "short" }
          : { month: "short", day: "numeric" }),
        timeZone: "UTC",
      }),
      users: dailyCounts[key] ?? 0,
    };
  });

  const growth =
    previousTotal === 0
      ? null
      : ((currentTotal - previousTotal) / previousTotal) * 100;

  return {
    chartData,
    currentTotal,
    previousTotal,
    growth,
  };
};
