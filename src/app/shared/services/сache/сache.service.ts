import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cacheKey = 'myAppCache';

  constructor() {
    const cachedData = localStorage.getItem(this.cacheKey);
    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      this.cache = new Map<string, { data: object, etag: string }>(parsedCache);
    } else {
      this.cache = new Map<string, { data: object, etag: string }>();
    }
  }

  private cache: Map<string, { data: object, etag: string }>;

  get(key: string): object | undefined {
    const cachedEntry = this.cache.get(key);
    return cachedEntry ? cachedEntry.data : undefined;
  }

  getEtag(key: string): string | undefined {
    const cachedEntry = this.cache.get(key);
    return cachedEntry ? cachedEntry.etag : undefined;
  }

  set(key: string, etag: string, value: object): void {
    this.cache.set(key, { data: value, etag: etag });
    localStorage.setItem(this.cacheKey, JSON.stringify(Array.from(this.cache.entries())));
  }

  clear(): void {
    this.cache.clear();
    localStorage.removeItem(this.cacheKey);
  }
}
