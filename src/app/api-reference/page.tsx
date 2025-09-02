import React from "react";
import { 
  Column, 
  Row, 
  Heading, 
  Text, 
  Button, 
  Badge,
  Meta,
  Schema,
  Icon
} from "@once-ui-system/core";
import { baseURL, meta, schema } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: meta.apiReference?.title || "API Reference",
    description: meta.apiReference?.description || "API Reference",
    baseURL: baseURL,
    path: "/api-reference",
    image: meta.apiReference?.image
  });
}

export default function APIReference() {
  return (
    <Column maxWidth={56} gap="xl">
      <Schema
        as="webPage"
        title="API Reference"
        description="Complete API reference for payment endpoints"
        baseURL={baseURL}
        path="/api-reference"
        author={{
          name: schema.name
        }}
      />
      
      {/* Header */}
      <Column fillWidth gap="l" paddingTop="l">
        <Column gap="m">
          <Row vertical="center" gap="m">
            <Icon name="book" size="l" onBackground="brand-strong" />
            <Heading variant="display-strong-s">
              API Referansı
            </Heading>
          </Row>
          <Text variant="body-default-l" onBackground="neutral-weak">
            Multi-merchant ödeme sistemi için kapsamlı API dokümantasyonu. Tüm endpointler, parametreler ve response formatları.
          </Text>
        </Column>
        
        <Row gap="m">
          <Badge>Base URL: https://api.payment-system.com</Badge>
          <Badge>Version: 1.0</Badge>
        </Row>
      </Column>

      {/* Authentication */}
      <Column fillWidth gap="l" paddingTop="l">
        <Column gap="m">
          <Row vertical="center" gap="m">
            <Icon name="shield" size="m" onBackground="brand-strong" />
            <Heading as="h2" variant="display-default-m">
              Authentication
            </Heading>
          </Row>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Tüm API istekleri HMAC-SHA256 imzalama ile korunur. Her istek için gerekli headerlar:
          </Text>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Heading as="h3" variant="heading-default-s">Required Headers</Heading>
          <Column 
            padding="m" 
            background="neutral-alpha-weak" 
            radius="m" 
            style={{ fontFamily: 'monospace', fontSize: '14px' }}
          >
            <Text variant="code-default-s">
              X-API-Key: your_merchant_api_key<br/>
              X-Signature: hmac_sha256_signature<br/>
              X-Timestamp: unix_timestamp<br/>
              X-Nonce: unique_random_string<br/>
              Content-Type: application/json
            </Text>
          </Column>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Heading as="h3" variant="heading-default-s">Signature Generation (JavaScript)</Heading>
          <Column 
            padding="m" 
            background="neutral-alpha-weak" 
            radius="m" 
            style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
          >
            <Text variant="code-default-s">
              {`const method = 'POST';
const path = '/pay-in';
const body = JSON.stringify(requestData);
const timestamp = Math.floor(Date.now() / 1000).toString();
const nonce = crypto.randomUUID();

const payload = \`\${method}|\${path}|\${body}|\${timestamp}|\${nonce}\`;
const signature = crypto.createHmac('sha256', API_SECRET)
  .update(payload)
  .digest('hex');`}
            </Text>
          </Column>
        </Column>
      </Column>

      {/* Pay-In API */}
      <Column fillWidth gap="l" paddingTop="l">
        <Column gap="m">
          <Row vertical="center" gap="m">
            <Icon name="arrowDown" size="m" onBackground="success-strong" />
            <Heading as="h2" variant="display-default-m">
              Pay-In API (Para Yatırma)
            </Heading>
          </Row>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Müşterilerden ödeme almak için kullanılan endpoint. Havale, kredi kartı ve dijital cüzdan destekli.
          </Text>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Row vertical="center" gap="m">
            <Badge>POST</Badge>
            <Text variant="code-default-m">/pay-in</Text>
          </Row>
          
          <Column gap="l">
            <Column gap="m">
              <Heading as="h4" variant="heading-default-xs">Request Body</Heading>
              <Column 
                padding="m" 
                background="neutral-alpha-weak" 
                radius="m" 
                style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
              >
                <Text variant="code-default-s">
                  {`{
  "user_id": "12345",
  "username": "johndoe", 
  "sender_full_name": "John Doe",
  "national_id": "12345678901", // nullable
  "amount": 1500.50,
  "callback_url": "https://your-domain.com/webhooks/payment-callback",
  "redirect_url": "https://your-domain.com/payment-success", 
  "payment_method": "havale", // default
  "order_id": "order_789123",
  
  // Credit card fields (payment_method: "credit_card" için)
  "card_number": "4111111111111111",
  "expiration_month": "12", 
  "expiration_year": "2027",
  "cvv": "123",
  "cardholders_name": "John Doe"
}`}
                </Text>
              </Column>

              <Column gap="xs">
                <Heading as="h4" variant="heading-default-xs">Payment Methods</Heading>
                <Row gap="xs" wrap>
                  <Badge>havale</Badge>
                  <Badge>papel</Badge>
                  <Badge>papara</Badge>
                  <Badge>payco</Badge>
                  <Badge>parazula</Badge>
                  <Badge>parola</Badge>
                  <Badge>credit_card</Badge>
                  <Badge>popy</Badge>
                  <Badge>paratim</Badge>
                  <Badge>qr</Badge>
                  <Badge>crypto</Badge>
                  <Badge>h2h-havale</Badge>
                </Row>
              </Column>
            </Column>

            <Column gap="m">
              <Heading as="h4" variant="heading-default-xs">Success Response (Normal)</Heading>
              <Column 
                padding="m" 
                background="neutral-alpha-weak" 
                radius="m" 
                style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
              >
                <Text variant="code-default-s">
                  {`{
  "success": true,
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "order_id": "order_789123",
  "status": "pending",
  "status_no": 0,
  "payment_url": "https://payment-gateway.com/pay/550e8400-e29b-41d4-a716-446655440000",
  "estimated_completion": "2-5 minutes"
}`}
                </Text>
              </Column>
            </Column>
          </Column>
        </Column>
      </Column>

      {/* Pay-Out API */}
      <Column fillWidth gap="l" paddingTop="l">
        <Column gap="m">
          <Row vertical="center" gap="m">
            <Icon name="arrowUp" size="m" onBackground="warning-strong" />
            <Heading as="h2" variant="display-default-m">
              Pay-Out API (Para Çekme)
            </Heading>
          </Row>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Müşterilere ödeme göndermek için kullanılan endpoint. IBAN ve dijital cüzdan destekli.
          </Text>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Row vertical="center" gap="m">
            <Badge>POST</Badge>
            <Text variant="code-default-m">/pay-out</Text>
          </Row>
          
          <Column gap="l">
            <Column gap="m">
              <Heading as="h4" variant="heading-default-xs">Request Body</Heading>
              <Column 
                padding="m" 
                background="neutral-alpha-weak" 
                radius="m" 
                style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
              >
                <Text variant="code-default-s">
                  {`{
  "user_id": "12345",
  "username": "johndoe",
  "recipient_full_name": "Jane Smith",
  "recipient_iban": "TR123456789012345678901234", // havale için
  "recipient_wallet_no": "5551234567", // diğer methodlar için
  "amount": 750.25,
  "callback_url": "https://your-domain.com/webhooks/payout-callback", 
  "order_id": "withdrawal_456789",
  "description": "Monthly withdrawal",
  "payment_method": "havale" // default
}`}
                </Text>
              </Column>
            </Column>

            <Column gap="m">
              <Heading as="h4" variant="heading-default-xs">Success Response</Heading>
              <Column 
                padding="m" 
                background="neutral-alpha-weak" 
                radius="m" 
                style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
              >
                <Text variant="code-default-s">
                  {`{
  "success": true,
  "transaction_id": "550e8400-e29b-41d4-a716-446655440001",
  "order_id": "withdrawal_456789",
  "status": "pending",
  "estimated_completion": "3-7 minutes"
}`}
                </Text>
              </Column>
            </Column>
          </Column>
        </Column>
      </Column>

      {/* Transaction Status */}
      <Column fillWidth gap="l" paddingTop="l">
        <Column gap="m">
          <Row vertical="center" gap="m">
            <Icon name="search" size="m" onBackground="accent-strong" />
            <Heading as="h2" variant="display-default-m">
              Transaction Status
            </Heading>
          </Row>
          <Text variant="body-default-m" onBackground="neutral-weak">
            İşlem durumunu sorgulamak için kullanılan endpoint.
          </Text>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Row vertical="center" gap="m">
            <Badge>GET</Badge>
            <Text variant="code-default-m">/transaction/{`{transaction_id}`}</Text>
          </Row>
          
          <Column gap="m">
            <Heading as="h4" variant="heading-default-xs">Success Response</Heading>
            <Column 
              padding="m" 
              background="neutral-alpha-weak" 
              radius="m" 
              style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
            >
              <Text variant="code-default-s">
                {`{
  "success": true,
  "transaction": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "pay-in",
    "status": "completed",
    "status_no": 1,
    "amount": 1500.50,
    "username": "johndoe", 
    "order_id": "order_789123",
    "created_at": "2025-08-30T10:30:00.000Z",
    "updated_at": "2025-08-30T10:33:15.000Z",
    "processed_at": "2025-08-30T10:33:15.000Z"
  }
}`}
              </Text>
            </Column>
          </Column>
        </Column>
      </Column>

      {/* Status Codes */}
      <Column fillWidth gap="l" paddingTop="l">
        <Column gap="m">
          <Row vertical="center" gap="m">
            <Icon name="info" size="m" onBackground="neutral-strong" />
            <Heading as="h2" variant="display-default-m">
              Status Codes & Error Handling
            </Heading>
          </Row>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Heading as="h3" variant="heading-default-s">Transaction Status Values</Heading>
          <Column gap="xs">
            <Row horizontal="between" paddingY="xs">
              <Badge>status_no: 0</Badge>
              <Text variant="body-default-s">pending - İşlem beklemede</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>status_no: 1</Badge>
              <Text variant="body-default-s">completed - İşlem başarıyla tamamlandı</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>status_no: 2</Badge>
              <Text variant="body-default-s">failed - İşlem başarısız oldu</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>status_no: 3</Badge>
              <Text variant="body-default-s">expired - İşlem süresi doldu (20 dakika timeout)</Text>
            </Row>
          </Column>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Heading as="h3" variant="heading-default-s">HTTP Status Codes</Heading>
          <Column gap="xs">
            <Row horizontal="between" paddingY="xs">
              <Badge>200</Badge>
              <Text variant="body-default-s">Success - İstek başarılı</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>201</Badge>
              <Text variant="body-default-s">Created - Transaction oluşturuldu</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>400</Badge>
              <Text variant="body-default-s">Bad Request - Geçersiz parametreler</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>401</Badge>
              <Text variant="body-default-s">Unauthorized - Authentication hatası</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>403</Badge>
              <Text variant="body-default-s">Forbidden - İzin yok</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>429</Badge>
              <Text variant="body-default-s">Too Many Requests - Rate limit aşıldı</Text>
            </Row>
            <Row horizontal="between" paddingY="xs">
              <Badge>500</Badge>
              <Text variant="body-default-s">Internal Server Error - Sunucu hatası</Text>
            </Row>
          </Column>
        </Column>
      </Column>

      {/* Webhooks */}
      <Column fillWidth gap="l" paddingTop="l">
        <Column gap="m">
          <Row vertical="center" gap="m">
            <Icon name="webhook" size="m" onBackground="brand-strong" />
            <Heading as="h2" variant="display-default-m">
              Webhooks
            </Heading>
          </Row>
          <Text variant="body-default-m" onBackground="neutral-weak">
            İşlem durumu değişikliklerinde otomatik bildirim almak için webhook URLi belirtebilirsiniz.
          </Text>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Heading as="h3" variant="heading-default-s">Webhook Headers</Heading>
          <Column 
            padding="m" 
            background="neutral-alpha-weak" 
            radius="m" 
            style={{ fontFamily: 'monospace', fontSize: '14px' }}
          >
            <Text variant="code-default-s">
              Content-Type: application/json<br/>
              X-Webhook-Signature: hmac_sha256_signature<br/>
              X-Webhook-Timestamp: unix_timestamp<br/>
              X-Webhook-Merchant-Id: merchant_001<br/>
              X-Webhook-Source: payment-system<br/>
              User-Agent: PaymentSystem-Webhook/1.0
            </Text>
          </Column>
        </Column>

        <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
          <Heading as="h3" variant="heading-default-s">Webhook Payload Example</Heading>
          <Column 
            padding="m" 
            background="neutral-alpha-weak" 
            radius="m" 
            style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
          >
            <Text variant="code-default-s">
              {`{
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "merchant_id": "merchant_001",
  "type": "pay-in",
  "status": "completed", 
  "status_no": 1,
  "amount": 1500.50,
  "username": "johndoe",
  "order_id": "order_789123",
  "processed_at": "2025-08-30T10:33:15.000Z"
}`}
            </Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}