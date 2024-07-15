// sanity/sanity.client.ts

import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "ve46wkxw",
  dataset: "production",
  apiVersion: "2024-07-15",
  useCdn: false,
};

const client = createClient(config);

export default client;