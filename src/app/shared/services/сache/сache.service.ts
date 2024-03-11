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
    let deepCopiedValue;
    const cachedEntry = this.cache.get(key);
    if (cachedEntry) deepCopiedValue = JSON.parse(JSON.stringify(cachedEntry.data));

    return cachedEntry ? deepCopiedValue : undefined;
  }

  getEtag(key: string): string | undefined {
    const cachedEntry = this.cache.get(key);
    return cachedEntry ? cachedEntry.etag : undefined;
  }

  set(key: string, etag: string, value: object): void {
    const isSet = this.getEtag(etag) === undefined
    if (!isSet) return;
    const deepCopiedValue = JSON.parse(JSON.stringify(value));
    this.cache.set(key, { data: deepCopiedValue, etag: etag });
    localStorage.setItem(this.cacheKey, JSON.stringify(Array.from(this.cache.entries())));
  }
}
