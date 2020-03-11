interface Stats {
  updatedAt: string;
  data: Library[];
}

type Library = Record<string, string | boolean | number>;
