import { APP_EVENT, APP_EVENT_CATEGORY, APP_FEATURE } from "./constants";

type AppEventCategoryObject = typeof APP_EVENT_CATEGORY;
type AppEventCategoryKeys = keyof AppEventCategoryObject;
export type AppEventCategory = AppEventCategoryObject[AppEventCategoryKeys];

type AppFeatureObject = typeof APP_FEATURE;
export type AppFeatureNames = keyof AppFeatureObject;
export type AppFeature = AppFeatureObject[AppFeatureNames];

export type AppEvent = keyof typeof APP_EVENT;

type JsonPrimitive = boolean | number | string | null;
type JsonArray = JsonPrimitive[] | JsonObject;
type JsonObject = {
  [key: string]: Date | JsonArray | JsonObject | JsonPrimitive;
};

export type LogEvent = {
  category: AppEventCategory;
  data?: JsonObject;
  event_name: AppEvent;
  feature?: AppFeature;
  timestamp: number;
};

export type Analytics = {
  sendLog(event: LogEvent): void | Promise<void>;
};
