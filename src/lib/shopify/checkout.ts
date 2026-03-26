import { getStorefrontClient } from "@/lib/shopify";

interface CustomAttribute {
  key: string;
  value: string;
}

interface CheckoutLineItem {
  /** Shopify product variant GID, e.g. "gid://shopify/ProductVariant/12345" */
  variantId: string;
  quantity: number;
  /** Custom attributes attached to this line item (photo URLs, plaque text, etc.) */
  attributes?: CustomAttribute[];
}

interface CartCreateResult {
  checkoutUrl: string;
  cartId: string;
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Creates a Shopify cart with the given line items and returns the hosted
 * checkout URL that the buyer should be redirected to.
 */
export async function createCheckout(
  items: CheckoutLineItem[],
  note?: string,
  buyerEmail?: string
): Promise<CartCreateResult> {
  const client = getStorefrontClient();

  const lines = items.map((item) => ({
    merchandiseId: item.variantId,
    quantity: item.quantity,
    attributes: item.attributes ?? [],
  }));

  const input: Record<string, unknown> = { lines };

  if (note) {
    input.note = note;
  }

  if (buyerEmail) {
    input.buyerIdentity = { email: buyerEmail };
  }

  const { data, errors } = await client.request(CART_CREATE_MUTATION, {
    variables: { input },
  });

  if (errors) {
    const message =
      errors.graphQLErrors?.map((e: { message: string }) => e.message).join(", ") ??
      "Unknown Shopify API error";
    throw new Error(`Shopify cartCreate failed: ${message}`);
  }

  const cartCreate = data?.cartCreate;
  const userErrors = cartCreate?.userErrors;

  if (userErrors && userErrors.length > 0) {
    const messages = userErrors
      .map((e: { field: string[]; message: string }) => `${e.field.join(".")}: ${e.message}`)
      .join("; ");
    throw new Error(`Shopify cart error: ${messages}`);
  }

  const cart = cartCreate?.cart;

  if (!cart?.checkoutUrl) {
    throw new Error("Shopify cartCreate did not return a checkout URL");
  }

  return {
    checkoutUrl: cart.checkoutUrl,
    cartId: cart.id,
  };
}

export type { CheckoutLineItem, CustomAttribute, CartCreateResult };
