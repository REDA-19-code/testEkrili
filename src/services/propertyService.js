import axios from "axios";

const getApiUrl = () => process.env.REACT_APP_API_URL;

const buildAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getPropertiesPayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.properties)) {
    return payload.properties;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

export const fetchProperties = async ({ token }) => {
  const apiUrl = getApiUrl();

  if (!apiUrl || !token) {
    return [];
  }

  const response = await axios.get(`${apiUrl}/properties`, buildAuthConfig(token));
  return getPropertiesPayload(response.data);
};

export const createProperty = async ({ token, payload }) => {
  const apiUrl = getApiUrl();

  if (!apiUrl || !token) {
    throw new Error("Missing API configuration for createProperty.");
  }

  const response = await axios.post(`${apiUrl}/properties`, payload, buildAuthConfig(token));
  return response.data;
};

export const updateProperty = async ({ token, propertyId, payload }) => {
  const apiUrl = getApiUrl();

  if (!apiUrl || !token) {
    throw new Error("Missing API configuration for updateProperty.");
  }

  const response = await axios.patch(
    `${apiUrl}/properties/${propertyId}`,
    payload,
    buildAuthConfig(token)
  );

  return response.data;
};

export const pauseProperty = async ({ token, propertyId }) => {
  const apiUrl = getApiUrl();

  if (!apiUrl || !token) {
    throw new Error("Missing API configuration for pauseProperty.");
  }

  // Default assumption: pausing is a status update. Adjust endpoint/body if backend differs.
  const response = await axios.patch(
    `${apiUrl}/properties/${propertyId}/status`,
    { status: "Paused" },
    buildAuthConfig(token)
  );

  return response.data;
};

export const deleteProperty = async ({ token, propertyId }) => {
  const apiUrl = getApiUrl();

  if (!apiUrl || !token) {
    throw new Error("Missing API configuration for deleteProperty.");
  }

  const response = await axios.delete(
    `${apiUrl}/properties/${propertyId}`,
    buildAuthConfig(token)
  );

  return response.data;
};
