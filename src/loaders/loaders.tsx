import ApiKey from "../components/Classes/ApiKey.tsx";

export async function usersLoader(jwt: string | null) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
    },
  };
  const response = await fetch(
    "https://blog-api-production-2436.up.railway.app/admin/users",
    options
  );
  return await response.json();
}

export async function commentsLoader(jwt: string | null, apiKeys: ApiKey[]) {
  const keys = apiKeys.filter(
    (key) => key.status === "ACTIVE" && key.usageCount < 1001
  );

  if (keys.length === 0)
    return { msg: "no active api key found or usage limit exhausted" };
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": keys[0]?.key,
      Authorization: `${jwt}`,
    },
  };

  const response = await fetch(
    "https://blog-api-production-2436.up.railway.app/admin/posts/comments",
    options
  );
  return await response.json();
}

export async function postsLoader(jwt: string | null, apiKeys: ApiKey[]) {
  const keys = apiKeys.filter(
    (key) => key.status === "ACTIVE" && key.usageCount < 1001
  );
  if (keys.length === 0)
    return { msg: "no active api key found or usage limit exhausted" };
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": keys[0]?.key,
      Authorization: `${jwt}`,
    },
  };

  const response = await fetch(
    "https://blog-api-production-2436.up.railway.app/admin/posts",
    options
  );
  return await response.json();
}

export async function apiKeysLoader(jwt: string | null) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
    },
  };
  const response = await fetch(
    "https://blog-api-production-2436.up.railway.app/admin/keys/",
    options
  );
  return await response.json();
}
