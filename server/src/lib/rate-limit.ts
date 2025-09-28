// Jednostavan rate limiter
const requests = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  ip: string,
  limit: number = 100,
  windowMs: number = 1 * 60 * 1000
) {
  const now = Date.now();

  if (!requests.has(ip)) {
    requests.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  const data = requests.get(ip)!;

  if (now > data.resetTime) {
    data.count = 1;
    data.resetTime = now + windowMs;
    return { success: true, remaining: limit - 1 };
  }

  if (data.count >= limit) {
    return { success: false, remaining: 0 };
  }

  data.count++;
  return { success: true, remaining: limit - data.count };
}
