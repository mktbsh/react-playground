import { PropsWithChildren, useMemo } from "react";
import { createContext, useContext } from "react";

import { Analytics, NullAnalytics } from "core";

const AnalyticsContext = createContext<Analytics>(new NullAnalytics());

export function useAnalytics(): Analytics {
  return useContext(AnalyticsContext);
}

type AnalyticsProviderProps = {
  optOut?: boolean;
};

export function AnalyticsProvider({
  children,
  optOut = false,
}: PropsWithChildren<AnalyticsProviderProps>): React.ReactElement {
  const analytics = useMemo(() => {
    if (optOut) return new NullAnalytics();

    // TODO: Replace to use Sentry
    return new NullAnalytics();
  }, [optOut]);

  return (
    <AnalyticsContext.Provider value={new NullAnalytics()}>
      {children}
    </AnalyticsContext.Provider>
  );
}
