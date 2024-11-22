import useApiKeys from "./useApiKeys.tsx";
import { useEffect } from "react";
export default function Blog() {
  const { apiKeys, getApiKeys } = useApiKeys();
  useEffect(() => {
    (async () => {
      await getApiKeys();
    })();
  }, [getApiKeys]);
  console.log(apiKeys);
  return <h2>Blog</h2>;
}
