import ApiKey from "../Classes/ApiKey.tsx";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function ApiKeysAdmin() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const data = useLoaderData() as {
    success: boolean;
    msg: string;
    apiKeys: ApiKey[];
  };

  if (!data.success) {
    setError(new Error("Sorry, we could not load any api Keys"));
  }

  useEffect(() => {
    setLoading(true);
    setApiKeys(data.apiKeys);
    setLoading(false);
  }, [data]);

  return (
    <div className="key-list">
      {loading && <p>Loading Api Keys ...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {apiKeys
          .sort((a, b) => a.ownerId - b.ownerId)
          .map((apiKey: ApiKey) => {
            return (
              <li
                key={apiKey.key}
                className={
                  apiKey.status === "ACTIVE" ? "key-active" : "key-inactive"
                }
              >
                <span>
                  <b>Key:</b> {apiKey.key}
                </span>
                <span>
                  <b>Usage:</b> {apiKey.usageCount}
                </span>
                <span>
                  <b>Owner ID:</b> {apiKey.ownerId}
                </span>
                <span>
                  <b>Max Requests:</b> {apiKey.maxRequests}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
