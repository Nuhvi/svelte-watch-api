const isRecentThan = (date: string, days: number): boolean =>
  new Date(date).getTime() > new Date().getTime() - days * 86400000;

const date = (str: string): Date =>
  str === 'now' ? new Date() : new Date(str);

export = { isRecentThan, date };
