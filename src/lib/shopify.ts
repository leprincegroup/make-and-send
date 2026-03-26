import { createStorefrontApiClient } from "@shopify/storefront-api-client";

function getShopifyClient() {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

  if (!storeDomain) {
    throw new Error(
      "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set. Add it to your .env.local file."
    );
  }

  if (!storefrontToken) {
    throw new Error(
      "NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is not set. Add it to your .env.local file."
    );
  }

  return createStorefrontApiClient({
    storeDomain,
    apiVersion: "2025-01",
    publicAccessToken: storefrontToken,
  });
}

// Lazy initialization so env var errors only occur at runtime when actually used
let _client: ReturnType<typeof createStorefrontApiClient> | undefined;

export function getStorefrontClient() {
  if (!_client) {
    _client = getShopifyClient();
  }
  return _client;
}
