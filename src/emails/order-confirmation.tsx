import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
  Row,
  Column,
} from "@react-email/components";

interface OrderItem {
  recipientName: string;
  plaqueText: string | null;
  unitPrice: number;
}

interface OrderConfirmationEmailProps {
  orderNumber: string;
  buyerEmail: string;
  items: OrderItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  isGift: boolean;
  giftMessage: string | null;
  siteUrl: string;
}

export default function OrderConfirmationEmail({
  orderNumber = "MAS-2026-XXXXX",
  buyerEmail = "customer@example.com",
  items = [{ recipientName: "John Doe", plaqueText: "World's Best Boss", unitPrice: 129 }],
  subtotal = 129,
  discountPercent = 0,
  discountAmount = 0,
  total = 129,
  isGift = false,
  giftMessage = null,
  siteUrl = "http://localhost:3003",
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Make &amp; Send order {orderNumber} is confirmed!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>Make &amp; Send</Text>
          </Section>

          {/* Confirmation */}
          <Section style={content}>
            <Heading style={h1}>Order confirmed!</Heading>
            <Text style={paragraph}>
              Thanks for your order, {buyerEmail}. Your custom bobbleheads are on
              their way to being sculpted.
            </Text>
            <Text style={orderNumberStyle}>
              Order #{orderNumber}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Items */}
          <Section style={content}>
            <Heading as="h2" style={h2}>
              Your bobbleheads ({items.length})
            </Heading>
            {items.map((item, i) => (
              <Row key={i} style={itemRow}>
                <Column>
                  <Text style={itemName}>{item.recipientName}</Text>
                  {item.plaqueText && (
                    <Text style={itemPlaque}>&ldquo;{item.plaqueText}&rdquo;</Text>
                  )}
                </Column>
                <Column align="right">
                  <Text style={itemPrice}>${item.unitPrice}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Totals */}
          <Section style={content}>
            <Row>
              <Column><Text style={totalLabel}>Subtotal</Text></Column>
              <Column align="right"><Text style={totalValue}>${subtotal}</Text></Column>
            </Row>
            {discountAmount > 0 && (
              <Row>
                <Column>
                  <Text style={discountLabel}>
                    Bulk discount ({discountPercent}% off)
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={discountValue}>-${discountAmount}</Text>
                </Column>
              </Row>
            )}
            <Row>
              <Column><Text style={grandTotalLabel}>Total</Text></Column>
              <Column align="right"><Text style={grandTotalValue}>${total}</Text></Column>
            </Row>
          </Section>

          {/* Gift message */}
          {isGift && giftMessage && (
            <>
              <Hr style={divider} />
              <Section style={content}>
                <Heading as="h2" style={h2}>Gift message</Heading>
                <Text style={giftMessageStyle}>&ldquo;{giftMessage}&rdquo;</Text>
              </Section>
            </>
          )}

          <Hr style={divider} />

          {/* What's next */}
          <Section style={content}>
            <Heading as="h2" style={h2}>What happens next</Heading>
            <Text style={paragraph}>
              <strong>1. We sculpt it</strong> — Our artists begin work within 24 hours.
            </Text>
            <Text style={paragraph}>
              <strong>2. You approve</strong> — We&apos;ll email you a digital proof. Free
              revisions until you&apos;re happy.
            </Text>
            <Text style={paragraph}>
              <strong>3. We ship it</strong> — Gift-wrapped and delivered with tracking.
            </Text>
          </Section>

          {/* CTA */}
          <Section style={{ ...content, textAlign: "center" as const }}>
            <Link href={`${siteUrl}/dashboard/orders?email=${encodeURIComponent(buyerEmail)}`} style={button}>
              Track Your Order
            </Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Make &amp; Send — Custom bobbleheads for every occasion
            </Text>
            <Text style={footerText}>
              Questions? Reply to this email and we&apos;ll help.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#FAF8F3",
  fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const header = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const logoText = {
  fontSize: "28px",
  fontWeight: "700" as const,
  color: "#4A3728",
  margin: "0",
};

const content = {
  padding: "0 20px",
};

const h1 = {
  fontSize: "28px",
  fontWeight: "700" as const,
  color: "#4A3728",
  margin: "24px 0 8px",
  textAlign: "center" as const,
};

const h2 = {
  fontSize: "16px",
  fontWeight: "600" as const,
  color: "#4A3728",
  margin: "16px 0 12px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#4A3728",
  opacity: 0.7,
  margin: "8px 0",
};

const orderNumberStyle = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#4A3728",
  textAlign: "center" as const,
  backgroundColor: "#F0EBE0",
  borderRadius: "8px",
  padding: "8px 16px",
  margin: "16px auto",
  display: "inline-block" as const,
};

const divider = {
  borderColor: "#E8E0D4",
  margin: "24px 20px",
};

const itemRow = {
  padding: "8px 0",
};

const itemName = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#4A3728",
  margin: "0",
};

const itemPlaque = {
  fontSize: "13px",
  fontStyle: "italic" as const,
  color: "#4A3728",
  opacity: 0.5,
  margin: "2px 0 0",
};

const itemPrice = {
  fontSize: "14px",
  color: "#4A3728",
  margin: "0",
};

const totalLabel = {
  fontSize: "14px",
  color: "#4A3728",
  opacity: 0.6,
  margin: "4px 0",
};

const totalValue = {
  fontSize: "14px",
  color: "#4A3728",
  margin: "4px 0",
};

const discountLabel = {
  fontSize: "14px",
  color: "#6B8F71",
  margin: "4px 0",
};

const discountValue = {
  fontSize: "14px",
  color: "#6B8F71",
  fontWeight: "600" as const,
  margin: "4px 0",
};

const grandTotalLabel = {
  fontSize: "16px",
  fontWeight: "700" as const,
  color: "#4A3728",
  margin: "8px 0",
};

const grandTotalValue = {
  fontSize: "16px",
  fontWeight: "700" as const,
  color: "#4A3728",
  margin: "8px 0",
};

const giftMessageStyle = {
  fontSize: "14px",
  fontStyle: "italic" as const,
  color: "#4A3728",
  backgroundColor: "#F0EBE0",
  borderRadius: "12px",
  padding: "16px",
  margin: "8px 0",
};

const button = {
  backgroundColor: "#C4975A",
  borderRadius: "24px",
  color: "#4A3728",
  display: "inline-block" as const,
  fontSize: "14px",
  fontWeight: "600" as const,
  padding: "12px 32px",
  textDecoration: "none",
  textAlign: "center" as const,
  margin: "16px 0",
};

const footer = {
  padding: "20px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#4A3728",
  opacity: 0.4,
  margin: "4px 0",
};
