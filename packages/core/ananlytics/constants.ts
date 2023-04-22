const APP_EVENT_CATEGORY = {
  ERROR: "error",
  INTERACTION: "interaction",
  IMPRESSION: "impression",
  CONVERSION: "conversion",
} as const;

const APP_FEATURE = {
  // FEATURE_NAME: "feature_name"
  SETTINGS: "settings",
} as const;

const APP_EVENT = {
  IMPRESSION_PAGE: "IMP_PAGE",
  IMPRESSION_AD: "IMP_AD",
} as const;

export { APP_EVENT, APP_EVENT_CATEGORY, APP_FEATURE };
