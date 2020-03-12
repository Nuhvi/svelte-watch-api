const isRecentThanDaysAgo = (date: string, days = 0): boolean =>
  new Date(date).getTime() > new Date().getTime() - days * 86400000;

const date = (str: string): Date =>
  str === 'now' ? new Date() : new Date(str);

export = { isRecentThanDaysAgo, date };
