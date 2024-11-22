import { useState, useCallback } from "react";
import { useAuth } from "./useAuth.tsx";
import ApiKey from "./Classes/ApiKey.tsx";

export default function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { jwt } = useAuth();

  const changeApiKey = (updatedKey: ApiKey) => {
    setApiKeys((prev) =>
      prev.map((key) => (key.id === updatedKey.id ? updatedKey : key))
    );
  };

  const fetchApiKeys = useCallback(async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    };
    try {
      const response = await fetch(
        "https://blog-api-production-2436.up.railway.app/users/api-keys",
        options
      );
      const { keys, msg, success } = await response.json();
      if (!success) {
        return setError(new Error(msg));
      }
      setApiKeys([...keys]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [jwt]);

  const getApiKeys = useCallback(async () => {
    if (apiKeys.length === 0) {
      await fetchApiKeys();
    }
    return apiKeys;
  }, [apiKeys, fetchApiKeys]);

  const generateNewApiKey = useCallback(async () => {
    setLoading(true);
    console.log(jwt);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    };
    try {
      const response = await fetch(
        "https://blog-api-production-2436.up.railway.app/users/api-key/new",
        options
      );

      const { key, metaData, success, msg } = await response.json();
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
    } finally {
      setLoading(false);
    }
  }, [jwt]);

  const changeStatus = useCallback(
    async (status: string, keyId: number) => {
      setLoading(true);
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${jwt}`,
        },
        body: JSON.stringify({ status: status, apiId: keyId }),
      };
      try {
        const response = await fetch(
          "https://blog-api-production-2436.up.railway.app/users/api-key-status",
          options
        );
        return await response.json();
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [jwt]
  );
  return {
    apiKeys,
    loading,
    error,
    generateNewApiKey,
    getApiKeys,
    fetchApiKeys,
    changeStatus,
    changeApiKey,
  };
}
