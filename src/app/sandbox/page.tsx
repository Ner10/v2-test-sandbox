"use client";

import React, { useState } from "react";
import { 
  Column, 
  Row, 
  Heading, 
  Text, 
  Button, 
  Badge,
  Icon
} from "@once-ui-system/core";

interface APIResponse {
  success: boolean;
  [key: string]: any;
}

export default function Sandbox() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('pay-in');
  const [selectedMerchant, setSelectedMerchant] = useState('merchant_001');
  const [paymentMethod, setPaymentMethod] = useState('havale');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Test credentials
  const merchants = {
    merchant_001: {
      id: 'merchant_001',
      name: 'E-commerce Store A',
      api_key: 'mk_1a2b3c4d5e6f7g8h9i0j',
      api_secret: 'secret_key_merchant_001'
    },
    merchant_002: {
      id: 'merchant_002', 
      name: 'Gaming Platform B',
      api_key: 'mk_9z8y7x6w5v4u3t2s1r0q',
      api_secret: 'secret_key_merchant_002'
    }
  };

  // Form states
  const [formData, setFormData] = useState({
    user_id: 'test_user_123',
    username: 'testuser',
    sender_full_name: 'Test User',
    amount: '1000.00',
    callback_url: 'https://webhook.site/unique-id',
    redirect_url: 'https://merchant.com/success',
    order_id: 'test_order_001',
    recipient_full_name: 'Jane Smith',
    recipient_iban: 'TR123456789012345678901234',
    description: 'Test withdrawal',
    transaction_id: '550e8400-e29b-41d4-a716-446655440000'
  });

  const makeAPIRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Demo response simülasyonu
      setTimeout(() => {
        let mockResponse: APIResponse;

        if (selectedEndpoint === 'pay-in') {
          mockResponse = {
            success: true,
            transaction_id: `550e8400-e29b-41d4-a716-${Date.now()}`,
            order_id: formData.order_id,
            status: 'pending',
            status_no: 0,
            payment_url: `https://payment-gateway.com/pay/550e8400-e29b-41d4-a716-${Date.now()}`,
            estimated_completion: '2-5 minutes'
          };
        } else if (selectedEndpoint === 'pay-out') {
          mockResponse = {
            success: true,
            transaction_id: `550e8400-e29b-41d4-a716-${Date.now()}`,
            order_id: formData.order_id,
            status: 'pending',
            estimated_completion: '3-7 minutes'
          };
        } else {
          mockResponse = {
            success: true,
            transaction: {
              id: formData.transaction_id,
              type: 'pay-in',
              status: 'completed',
              status_no: 1,
              amount: 1500.50,
              username: 'johndoe',
              order_id: 'order_789123',
              created_at: '2025-08-30T10:30:00.000Z',
              updated_at: '2025-08-30T10:33:15.000Z',
              processed_at: '2025-08-30T10:33:15.000Z'
            }
          };
        }

        setResponse(mockResponse);
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata oluştu');
      setLoading(false);
    }
  };

  const generateCurlCommand = () => {
    const merchant = merchants[selectedMerchant as keyof typeof merchants];
    const timestamp = Math.floor(Date.now() / 1000).toString();
    
    let endpoint = '';
    let method = 'POST';
    let requestBody: any = {};

    if (selectedEndpoint === 'pay-in') {
      endpoint = '/pay-in';
      requestBody = {
        user_id: formData.user_id,
        username: formData.username,
        sender_full_name: formData.sender_full_name,
        amount: parseFloat(formData.amount),
        callback_url: formData.callback_url,
        redirect_url: formData.redirect_url,
        payment_method: paymentMethod,
        order_id: formData.order_id
      };
    } else if (selectedEndpoint === 'pay-out') {
      endpoint = '/pay-out';
      requestBody = {
        user_id: formData.user_id,
        username: formData.username,
        recipient_full_name: formData.recipient_full_name,
        recipient_iban: formData.recipient_iban,
        amount: parseFloat(formData.amount),
        callback_url: formData.callback_url,
        order_id: formData.order_id,
        description: formData.description,
        payment_method: paymentMethod
      };
    } else if (selectedEndpoint === 'transaction') {
      endpoint = `/transaction/${formData.transaction_id}`;
      method = 'GET';
    }

    const bodyString = method === 'GET' ? '' : JSON.stringify(requestBody, null, 2);
    
    let curlCommand = `curl -X ${method} https://api.payment-system.com${endpoint} \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${merchant.api_key}" \\
  -H "X-Signature: demo_signature_123" \\
  -H "X-Timestamp: ${timestamp}" \\
  -H "X-Nonce: demo-nonce-123"`;

    if (method !== 'GET' && bodyString) {
      curlCommand += ` \\\n  -d '${bodyString}'`;
    }

    return curlCommand;
  };

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--neutral-alpha-medium)',
    backgroundColor: 'var(--neutral-alpha-weak)',
    color: 'var(--neutral-on-background-strong)',
    width: '100%',
    fontSize: '14px'
  };

  const selectStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--neutral-alpha-medium)',
    backgroundColor: 'var(--neutral-alpha-weak)',
    color: 'var(--neutral-on-background-strong)',
    width: '100%',
    fontSize: '14px'
  };

  return (
    <Column maxWidth={56} gap="xl">
      {/* Header */}
      <Column fillWidth gap="l" paddingTop="l">
        <Column gap="m">
          <Row vertical="center" gap="m">
            <Icon name="play" size="l" onBackground="brand-strong" />
            <Heading variant="display-strong-s">
              API Sandbox
            </Heading>
          </Row>
          <Text variant="body-default-l" onBackground="neutral-weak">
            Test keyleri ile canlı API istekleri gönderebilir ve responseları görebilirsiniz.
          </Text>
        </Column>
        
        <Row gap="m">
          <Badge>Demo Environment</Badge>
          <Badge>Test Credentials</Badge>
        </Row>
      </Column>

      <Row fillWidth gap="l">
        {/* Left Panel - Request Builder */}
        <Column flex={1} gap="l">
          <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
            <Heading as="h2" variant="display-default-s">
              Request Builder
            </Heading>
            
            {/* Merchant Selection */}
            <Column gap="xs">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Merchant
              </Text>
              <select
                value={selectedMerchant}
                onChange={(e) => setSelectedMerchant(e.target.value)}
                style={selectStyle}
              >
                {Object.entries(merchants).map(([key, merchant]) => (
                  <option key={key} value={key}>
                    {merchant.name} ({merchant.id})
                  </option>
                ))}
              </select>
            </Column>

            {/* Endpoint Selection */}
            <Column gap="xs">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Endpoint
              </Text>
              <select
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value)}
                style={selectStyle}
              >
                <option value="pay-in">POST /pay-in</option>
                <option value="pay-out">POST /pay-out</option>
                <option value="transaction">GET /transaction/id</option>
              </select>
            </Column>

            {/* Payment Method */}
            {(selectedEndpoint === 'pay-in' || selectedEndpoint === 'pay-out') && (
              <Column gap="xs">
                <Text variant="label-default-s" onBackground="neutral-strong">
                  Payment Method
                </Text>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={selectStyle}
                >
                  <option value="havale">Havale</option>
                  <option value="papara">Papara</option>
                  <option value="papel">Papel</option>
                  <option value="crypto">Crypto</option>
                </select>
              </Column>
            )}

            {/* Form Fields */}
            <Column gap="l">
              {selectedEndpoint !== 'transaction' && (
                <Column gap="m">
                  <Row gap="m">
                    <Column flex={1} gap="xs">
                      <Text variant="label-default-s" onBackground="neutral-strong">
                        User ID
                      </Text>
                      <input
                        type="text"
                        value={formData.user_id}
                        onChange={(e) => setFormData({...formData, user_id: e.target.value})}
                        style={inputStyle}
                      />
                    </Column>
                    <Column flex={1} gap="xs">
                      <Text variant="label-default-s" onBackground="neutral-strong">
                        Username
                      </Text>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        style={inputStyle}
                      />
                    </Column>
                  </Row>

                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Amount
                    </Text>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      style={inputStyle}
                    />
                  </Column>

                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Callback URL
                    </Text>
                    <input
                      type="text"
                      value={formData.callback_url}
                      onChange={(e) => setFormData({...formData, callback_url: e.target.value})}
                      style={inputStyle}
                    />
                  </Column>

                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Order ID
                    </Text>
                    <input
                      type="text"
                      value={formData.order_id}
                      onChange={(e) => setFormData({...formData, order_id: e.target.value})}
                      style={inputStyle}
                    />
                  </Column>
                </Column>
              )}

              {selectedEndpoint === 'pay-in' && (
                <Column gap="m">
                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Sender Full Name
                    </Text>
                    <input
                      type="text"
                      value={formData.sender_full_name}
                      onChange={(e) => setFormData({...formData, sender_full_name: e.target.value})}
                      style={inputStyle}
                    />
                  </Column>

                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Redirect URL
                    </Text>
                    <input
                      type="text"
                      value={formData.redirect_url}
                      onChange={(e) => setFormData({...formData, redirect_url: e.target.value})}
                      style={inputStyle}
                    />
                  </Column>
                </Column>
              )}

              {selectedEndpoint === 'pay-out' && (
                <Column gap="m">
                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Recipient Full Name
                    </Text>
                    <input
                      type="text"
                      value={formData.recipient_full_name}
                      onChange={(e) => setFormData({...formData, recipient_full_name: e.target.value})}
                      style={inputStyle}
                    />
                  </Column>

                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Recipient IBAN
                    </Text>
                    <input
                      type="text"
                      value={formData.recipient_iban}
                      onChange={(e) => setFormData({...formData, recipient_iban: e.target.value})}
                      placeholder="TR ile başlayan 26 haneli IBAN"
                      style={inputStyle}
                    />
                  </Column>

                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Description
                    </Text>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      style={inputStyle}
                    />
                  </Column>
                </Column>
              )}

              {selectedEndpoint === 'transaction' && (
                <Column gap="m">
                  <Column gap="xs">
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      Transaction ID
                    </Text>
                    <input
                      type="text"
                      value={formData.transaction_id}
                      onChange={(e) => setFormData({...formData, transaction_id: e.target.value})}
                      placeholder="UUID format transaction ID"
                      style={inputStyle}
                    />
                  </Column>
                </Column>
              )}
            </Column>

            {/* Send Request Button */}
            <Button 
              variant="primary" 
              size="m" 
              onClick={makeAPIRequest}
              disabled={loading}
              fillWidth
            >
              {loading ? 'Sending...' : 'Send Request'}
            </Button>
          </Column>

          {/* cURL Command */}
          <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-default-s">
              cURL Command
            </Heading>
            <Column 
              padding="m" 
              background="neutral-alpha-weak" 
              radius="m" 
              style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
            >
              <Text variant="code-default-s">
                {generateCurlCommand()}
              </Text>
            </Column>
          </Column>
        </Column>

        {/* Right Panel - Response */}
        <Column flex={1} gap="l">
          <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
            <Row vertical="center" horizontal="between">
              <Heading as="h2" variant="display-default-s">
                Response
              </Heading>
              {response && (
                <Badge>
                  {response.success ? "Success" : "Error"}
                </Badge>
              )}
            </Row>

            {loading && (
              <Column gap="m" horizontal="center" paddingY="xl">
                <Icon name="loader" size="l" onBackground="neutral-weak" />
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Sending request...
                </Text>
              </Column>
            )}

            {error && (
              <Column gap="m" padding="m" background="danger-alpha-weak" radius="m" border="danger-alpha-medium">
                <Row vertical="center" gap="s">
                  <Icon name="alertCircle" size="s" onBackground="danger-strong" />
                  <Text variant="body-default-s" onBackground="danger-strong">
                    Error
                  </Text>
                </Row>
                <Text variant="body-default-s" onBackground="danger-weak">
                  {error}
                </Text>
              </Column>
            )}

            {response && (
              <Column gap="m">
                <Column 
                  padding="m" 
                  background="neutral-alpha-weak" 
                  radius="m" 
                  style={{ fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}
                >
                  <Text variant="code-default-s">
                    {JSON.stringify(response, null, 2)}
                  </Text>
                </Column>
                
                {response.payment_url && (
                  <Column gap="s" padding="m" background="brand-alpha-weak" radius="m" border="brand-alpha-medium">
                    <Text variant="label-default-s" onBackground="brand-strong">
                      Payment URL
                    </Text>
                    <Button 
                      variant="secondary" 
                      size="s" 
                      href={response.payment_url}
                      target="_blank"
                      suffixIcon="externalLink"
                    >
                      Open Payment Page
                    </Button>
                  </Column>
                )}
              </Column>
            )}

            {!response && !loading && !error && (
              <Column gap="m" horizontal="center" paddingY="xl">
                <Icon name="send" size="l" onBackground="neutral-weak" />
                <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                  İstek gönderin ve responseı burada görün
                </Text>
              </Column>
            )}
          </Column>

          {/* Test Credentials */}
          <Column gap="m" padding="l" background="overlay" radius="l" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-default-s">
              Current Test Credentials
            </Heading>
            <Column gap="s">
              <Row horizontal="between">
                <Text variant="body-default-xs" onBackground="neutral-weak">Merchant:</Text>
                <Text variant="body-default-xs">{merchants[selectedMerchant as keyof typeof merchants].name}</Text>
              </Row>
              <Row horizontal="between">
                <Text variant="body-default-xs" onBackground="neutral-weak">API Key:</Text>
                <Text variant="code-default-xs">{merchants[selectedMerchant as keyof typeof merchants].api_key}</Text>
              </Row>
              <Row horizontal="between">
                <Text variant="body-default-xs" onBackground="neutral-weak">Merchant ID:</Text>
                <Text variant="code-default-xs">{merchants[selectedMerchant as keyof typeof merchants].id}</Text>
              </Row>
            </Column>
          </Column>
        </Column>
      </Row>
    </Column>
  );
}