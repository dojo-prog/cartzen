const getReqEnv = (name: string) => {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required env ${name}`);
  }

  return value;
};

const env = {
  appName: getReqEnv("VITE_APP_NAME"),
  environment: "VITE_ENVIRONMENT",
  apiUrl: getReqEnv("VITE_API_URL"),
} as const;

export { env };
