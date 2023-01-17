import { QueryClient, QueryCache } from "react-query";

export const getQueryClient = (() => {
  let client;

  return () => {
    if (!client)
      client = new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            console.log("onError", error);
          },
          onSuccess: (data) => {
            console.log("onSuccess", data);
          },
        }),
      });
    return client;
  };
})();
