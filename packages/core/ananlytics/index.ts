import { APP_EVENT_CATEGORY, APP_FEATURE } from "./constants";
import type {
  AppEvent,
  AppEventCategory,
  AppFeatureNames,
  Analytics,
  LogEvent,
} from "./interface";

type CreateLogEventOptions = {
  data?: LogEvent["data"];
  feature?: AppFeatureNames;
};

export function getEventCategory(event: AppEvent): AppEventCategory {
  switch (event) {
    case "IMPRESSION_AD":
    case "IMPRESSION_PAGE":
      return APP_EVENT_CATEGORY.IMPRESSION;
  }
}

export function createLogEvent(
  event: AppEvent,
  options?: CreateLogEventOptions
): LogEvent {
  return {
    category: getEventCategory(event),
    data: options?.data,
    event_name: event,
    feature: options?.feature && APP_FEATURE[options.feature],
    timestamp: Date.now(),
  };
}

export class NullAnalytics implements Analytics {
  public sendLog(event: LogEvent) {}
}

export type { Analytics, LogEvent };
