const getPercentileThreshold = (
  arr = [{}],
  property: string,
  percentile = 10,
): number => {
  const sorted = arr.sort((a, b) => a[property] - b[property]);

  const itemAtPercentile =
    sorted[Math.ceil((sorted.length * percentile) / 100)];

  return itemAtPercentile[property];
};

const calculateScore = (libraries: Library[]): Library[] => {
  const starsThreshold = getPercentileThreshold(libraries, 'starsCount');
  const downloadsThreshold = getPercentileThreshold(
    libraries,
    'recentDownloadsCount',
  );

  return libraries.map(
    (library: Library): Library => {
      const withTopStarsDownloads = {
        ...library,
        hasTopStars: library.starsCount >= starsThreshold,
        hasTopRecentDownloads:
          library.recentDownloadsCount >= downloadsThreshold,
      };

      const score = Object.keys(withTopStarsDownloads).filter(
        (key) => withTopStarsDownloads[key] === true,
      ).length;

      return { ...withTopStarsDownloads, score };
    },
  );
};

export = calculateScore;
