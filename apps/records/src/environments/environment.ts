interface CustomWindow extends Window {
  env?: {
    apiUrl?: string;
    debug?: boolean;
  };
}

declare const window: CustomWindow;

export const environment = {
  production: false,
  apiUrl: window["env"]?.apiUrl || "default",
  debug: window["env"]?.debug || false
};
