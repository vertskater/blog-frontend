import { FormEvent } from "react";
import useApiKeys from "./useApiKeys.tsx";
import ApiKey from "./Classes/ApiKey.tsx";
import "../styles/KeyList.css";
import { NavLink } from "react-router-dom";

export default function ApiKeys() {
  const [apiKeys, error, generateNewApiKey]: [
    ApiKey[],
    Error | null,
    () => Promise<void>
  ] = useApiKeys();

  const newKey = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await generateNewApiKey();
  };
  if (error) {
    return (
      <>
        <h1>Sorry, something hasn't worked out!</h1>
        <p className="error">{error.message}</p>
        <NavLink to={"/blog"}>Back to Blog</NavLink>
      </>
    );
  } else {
    return (
      <div className="key-list">
        {apiKeys.length === 0 ? (
          <p>currently no API-Keys bound to this Account</p>
        ) : (
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
                </li>
              );
            })}
          </ul>
        )}
        <button onClick={(e) => newKey(e)}>Generate new Key</button>
      </div>
    );
  }
}
