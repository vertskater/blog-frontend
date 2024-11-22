import { FormEvent, MouseEvent, useEffect } from "react";
import useApiKeys from "./useApiKeys.tsx";
import ApiKey from "./Classes/ApiKey.tsx";

import "../styles/KeyList.css";

export default function ApiKeys() {
  const {
    apiKeys,
    loading,
    error,
    generateNewApiKey,
    getApiKeys,
    fetchApiKeys,
    changeStatus,
    changeApiKey,
  } = useApiKeys();

  useEffect(() => {
    (async () => {
      const keys = await getApiKeys();
      if (keys.length === 0) {
        await fetchApiKeys();
      }
    })();
  }, [getApiKeys, fetchApiKeys]);

  const newKey = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await generateNewApiKey();
  };

  const handleStatus = async (
    e: MouseEvent<HTMLButtonElement>,
    apiKey: ApiKey
  ) => {
    e.preventDefault();
    const newStatus = apiKey.status === "ACTIVE" ? "REVOKED" : "ACTIVE";
    await changeStatus(newStatus, apiKey.id);
    apiKey.status = newStatus;
    changeApiKey(apiKey);
  };

  return (
    <div className="key-list">
      {loading && <p>Loading Api Keys ...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {apiKeys.map((apiKey: ApiKey) => {
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
                <b>Max Requests:</b> {apiKey.maxRequests}
              </span>
              <span>
                <b>Status:</b> {apiKey.status}
              </span>
              <div className="btn-key-status">
                <button onClick={(e) => handleStatus(e, apiKey)}>
                  {apiKey.status === "ACTIVE"
                    ? "deactivate key"
                    : "activate key"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button onClick={(e) => newKey(e)}>Generate new Key</button>
    </div>
  );
}
