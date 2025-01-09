export const logError = (message: string, error: unknown, context?: string) => {
  console.error(`[ERROR] ${message}`);
  if (context) {
    console.error(`Context: ${context}`);
  }

  if (error instanceof Error) {
    console.error(`Details: ${error.name} - ${error.message}`);
    if ('code' in error && typeof (error as { code?: string }).code === 'string') {
      console.error(`Error Code: ${(error as { code: string }).code}`);
    }
  } else if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>;
    if (typeof errorObj.code === 'string') {
      console.error(`Error Code: ${errorObj.code}`);
    }
    console.error(`Details:`, errorObj);
  } else {
    console.error(`Details:`, error);
  }
};
