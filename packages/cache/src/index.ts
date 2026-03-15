// Mock Redis Cache implementation
export class RouterCache {
  private cache: Map<string, string> = new Map();

  async get(key: string): Promise<string | null> {
    return this.cache.get(key) || null;
  }

  async set(key: string, value: string, ttlSeconds: number = 3600): Promise<void> {
    this.cache.set(key, value);
    // Note: Mock implementation doesn't technically expire keys for simplicity
  }

  async generateCacheKey(prompt: string, model: string): Promise<string> {
    // Basic structural key
    const safePrompt = prompt.substring(0, 20).replace(/\s+/g, '_');
    return `prompt:${safePrompt}:model:${model}`;
  }
}

export const globalCache = new RouterCache();
