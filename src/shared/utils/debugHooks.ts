/**
 * Debug utility to track hook calls and identify "more hooks than previous render" issues
 */

let renderCounter = 0;
let componentHookCounters: Record<string, number> = {};
let previousHookCounts: Record<string, number> = {};

export const resetHookCounter = (componentName: string) => {
  renderCounter++;
  const previousCount = previousHookCounts[componentName] || 0;

  console.log(
    `🔍 [${componentName}] Render #${renderCounter} - Previous hook count: ${previousCount}`,
  );

  // Reset this component's hook counter
  componentHookCounters[componentName] = 0;
  return { renderCount: renderCounter, previousHookCount: previousCount };
};

export const trackHook = (
  componentName: string,
  hookName: string,
  params?: any,
) => {
  componentHookCounters[componentName] =
    (componentHookCounters[componentName] || 0) + 1;
  const currentCount = componentHookCounters[componentName];

  console.log(
    `🪝 [${componentName}] Hook ${currentCount}: ${hookName}`,
    params ? `with params: ${JSON.stringify(params)}` : "",
  );
  return currentCount;
};

export const finalizeHookCount = (componentName: string) => {
  const finalCount = componentHookCounters[componentName] || 0;
  const previousCount = previousHookCounts[componentName] || 0;

  if (previousCount > 0 && finalCount !== previousCount) {
    console.error(
      `❌ [${componentName}] HOOK COUNT MISMATCH! Previous: ${previousCount}, Current: ${finalCount}`,
    );
  } else if (previousCount > 0) {
    console.log(`✅ [${componentName}] Hook count consistent: ${finalCount}`);
  } else {
    console.log(`🆕 [${componentName}] First render with ${finalCount} hooks`);
  }

  previousHookCounts[componentName] = finalCount;
  return finalCount;
};
