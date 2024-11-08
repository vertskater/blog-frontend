import { useState, useEffect, useMemo } from "react";
import { useAuth } from "./useAuth.tsx";
import ApiKey from "./Classes/ApiKey.tsx";

export default function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [headers, setHeaders] = useState({});
  const { jwt } = useAuth();

  useMemo(() => {
    const headers = new Headers({ "Content-Type": "application/json" });
    headers.append("Authorization", `${jwt}`);
    setHeaders(headers);
  }, [jwt]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: headers,
    };
    (async () => {
      try {
        const keys = await fetch(
          "https://blog-api-production-2436.up.railway.app/users/api-keys",
          options
        );
        const keyObject = await keys.json();
        setApiKeys([...keyObject.keys]);
      } catch (err) {
        setError(err as Error);
      }
    })();
  }, [headers, setApiKeys]);

  const generateNewApiKey = async () => {
    const options = {
      method: "GET",
      headers: headers,
    };
    try {
      const apiKey = await fetch(
        "https://blog-api-production-2436.up.railway.app/users/api-key/new",
        options
      );

      const { key, metaData, success, msg } = await apiKey.json();
      if (!success) {
        return setError(new Error(msg));
      }
      const keyObject = new ApiKey(
        metaData.clientName,
        metaData.createdAt,
        null,
        metaData.id,
        key,
        metaData.maxRequests,
        metaData.ownerId,
        metaData.status,
        metaData.usageCount
      );
      setApiKeys((prevKeys) => [...prevKeys, keyObject]);
    } catch (err) {
      setError(err as Error);
    }
  };
  return [apiKeys, error, generateNewApiKey] as [
    ApiKey[],
    Error | null,
    () => Promise<void>
  ];
}
