import { useRouteError } from "react-router-dom";

export default function ErrorComponent() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      {error instanceof Error ? (
        <a href="/blog" type="button">
          Back Home
        </a>
      ) : (
        <p>An unexpected error occurred.</p>
      )}
    </div>
  );
}
