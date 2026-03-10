const MAX_TRACKED_EVENTS = 5000;
const EVENT_TTL_MS = 1000 * 60 * 60 * 24;

const processedEvents = new Map<string, number>();

function pruneExpired(now: number) {
  for (const [eventId, timestamp] of processedEvents.entries()) {
    if (now - timestamp > EVENT_TTL_MS) {
      processedEvents.delete(eventId);
    }
  }

  if (processedEvents.size <= MAX_TRACKED_EVENTS) {
    return;
  }

  const overflow = processedEvents.size - MAX_TRACKED_EVENTS;
  const oldest = Array.from(processedEvents.entries())
    .sort((a, b) => a[1] - b[1])
    .slice(0, overflow);

  for (const [eventId] of oldest) {
    processedEvents.delete(eventId);
  }
}

export function hasProcessedEvent(eventId: string): boolean {
  const now = Date.now();
  pruneExpired(now);
  return processedEvents.has(eventId);
}

export function markEventProcessed(eventId: string): void {
  const now = Date.now();
  processedEvents.set(eventId, now);
  pruneExpired(now);
}
