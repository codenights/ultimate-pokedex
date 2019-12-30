import fetch from "isomorphic-unfetch";

const MAP_ERRORS = {
  NOT_FOUND: 404
};

const throwIfUnhandledErrors = (errors = []) => {
  errors.forEach(error => {
    if (error.extensions.code !== "NOT_FOUND") {
      throw error;
    }
  });
};

const getStatusCode = errors => {
  if (!errors) {
    return 200;
  }

  const [err] = errors;

  return MAP_ERRORS[err.extensions.code];
};

export const executeQuery = async (query, req, getResults) => {
  const baseUrl = req ? `http://${req.headers.host}` : "";
  const response = await fetch(`${baseUrl}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const { data, errors } = await response.json();

  throwIfUnhandledErrors(errors);

  return {
    ...getResults(data || {}),
    statusCode: getStatusCode(errors)
  };
};
