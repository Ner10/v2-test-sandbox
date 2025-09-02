import React from "react";
import { 
  Column, 
  Row, 
  Heading, 
  Text, 
  Button, 
  Grid,
  Badge,
  Tag,
  Meta,
  Schema,
  Icon,
  Card
} from "@once-ui-system/core";
import { baseURL, meta, schema, routes } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    image: meta.home.image
  });
}

export default function Home() {
  return (
    <Column maxWidth={56} gap="xl">
      <Schema
        as="webPage"
        title={meta.home.title}
        description={meta.home.description}
        baseURL={baseURL}
        path={meta.home.path}
        author={{
          name: schema.name
        }}
      />
      
      {/* Hero Section */}
      <Column fillWidth gap="l" paddingTop="l">
        <Row fillWidth gap="l">
          <Column maxWidth="xs" gap="12">
          <Badge
              background="overlay"
              paddingLeft="4"
              paddingRight="16"
              paddingY="4"
              border="neutral-alpha-medium"
              href="/api-reference"
              vertical="center"
              marginBottom="12"
            >
                <Tag marginRight="12">API</Tag>
                <Text
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Güvenli ödeme sistemi
                </Text>
            </Badge>
            <Heading variant="display-strong-s">
              Payment API Docs
            </Heading>
            <Text wrap="balance" onBackground="neutral-weak" variant="body-default-xl" marginBottom="20">
              Multi-merchant ödeme sistemi API dokümantasyonu. Güvenli pay-in ve pay-out işlemleri için kapsamlı rehber.
            </Text>
            <Row gap="m">
              <Button data-border="rounded" size="s" href="/api-reference" variant="secondary" arrowIcon id="api-reference">
                API Referansı
              </Button>
              <Button data-border="rounded" size="s" href="/sandbox" variant="tertiary" arrowIcon id="sandbox">
                Sandbox Test
              </Button>
            </Row>
          </Column>
        </Row>
      </Column>

      {/* API Özellikleri */}
      <Column fillWidth gap="l">
        <Column fillWidth>
          <Text 
            variant="display-default-s" 
            onBackground="neutral-strong"
          >
            API Özellikleri
          </Text>
          <Text
            onBackground="neutral-weak"
            marginTop="8"
          >
            Güvenli ve ölçeklenebilir ödeme çözümleri
          </Text>
        </Column>
        
        <Grid fillWidth columns="2" s={{columns: "1"}} gap="l" marginTop="24">
          {/* Pay-In */}
          <Column 
            padding="l" 
            radius="l" 
            border="neutral-alpha-weak" 
            background="overlay"
            gap="m"
          >
            <Row vertical="center" gap="m">
              <Icon name="arrowDown" size="l" onBackground="success-strong" />
              <Column gap="xs">
                <Heading as="h3" variant="heading-default-m">
                  Pay-In (Para Yatırma)
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Havale, kredi kartı, dijital cüzdan ve kripto para ile güvenli ödeme alma
                </Text>
              </Column>
            </Row>
            <Column gap="xs">
              <Text variant="label-default-s" onBackground="neutral-weak">Desteklenen Yöntemler:</Text>
              <Row gap="xs" wrap>
                <Badge>Havale</Badge>
                <Badge>Kredi Kartı</Badge>
                <Badge>Papara</Badge>
                <Badge>Crypto</Badge>
                <Badge>+7 Daha</Badge>
              </Row>
            </Column>
          </Column>

          {/* Pay-Out */}
          <Column 
            padding="l" 
            radius="l" 
            border="neutral-alpha-weak" 
            background="overlay"
            gap="m"
          >
            <Row vertical="center" gap="m">
              <Icon name="arrowUp" size="l" onBackground="warning-strong" />
              <Column gap="xs">
                <Heading as="h3" variant="heading-default-m">
                  Pay-Out (Para Çekme)
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  IBAN, dijital cüzdan ve kripto adreslere hızlı para transferi
                </Text>
              </Column>
            </Row>
            <Column gap="xs">
              <Text variant="label-default-s" onBackground="neutral-weak">Transfer Seçenekleri:</Text>
              <Row gap="xs" wrap>
                <Badge>IBAN</Badge>
                <Badge>Papara</Badge>
                <Badge>USDT</Badge>
                <Badge>Wallet</Badge>
              </Row>
            </Column>
          </Column>

          {/* Güvenlik */}
          <Column 
            padding="l" 
            radius="l" 
            border="neutral-alpha-weak" 
            background="overlay"
            gap="m"
          >
            <Row vertical="center" gap="m">
              <Icon name="shield" size="l" onBackground="brand-strong" />
              <Column gap="xs">
                <Heading as="h3" variant="heading-default-m">
                  Güvenlik & Authentication
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  HMAC-SHA256 imzalama, API key yönetimi ve webhook doğrulama
                </Text>
              </Column>
            </Row>
            <Column gap="xs">
              <Text variant="label-default-s" onBackground="neutral-weak">Güvenlik Özellikleri:</Text>
              <Row gap="xs" wrap>
                <Badge>HMAC-SHA256</Badge>
                <Badge>API Keys</Badge>
                <Badge>Webhooks</Badge>
                <Badge>Rate Limiting</Badge>
              </Row>
            </Column>
          </Column>

          {/* Multi-Merchant */}
          <Column 
            padding="l" 
            radius="l" 
            border="neutral-alpha-weak" 
            background="overlay"
            gap="m"
          >
            <Row vertical="center" gap="m">
              <Icon name="users" size="l" onBackground="accent-strong" />
              <Column gap="xs">
                <Heading as="h3" variant="heading-default-m">
                  Multi-Merchant Destek
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Birden fazla merchant için ayrı API credentials ve rate limits
                </Text>
              </Column>
            </Row>
            <Column gap="xs">
              <Text variant="label-default-s" onBackground="neutral-weak">Merchant Özellikleri:</Text>
              <Row gap="xs" wrap>
                <Badge>Ayrı API Keys</Badge>
                <Badge>Custom Limits</Badge>
                <Badge>Webhook URLs</Badge>
              </Row>
            </Column>
          </Column>
        </Grid>
      </Column>

      {/* Test Credentials */}
      <Column 
        maxWidth={56}
        background="overlay"
        radius="l"
        border="neutral-alpha-weak"
        padding="l"
        gap="m"
      >
        <Row fillWidth vertical="center" horizontal="between" gap="16" wrap>
          <Column gap="xs">
            <Heading as="h2" variant="display-default-xs">
              Test Credentials
            </Heading>
            <Text variant="label-default-s" onBackground="neutral-weak">
              Sandbox ortamında test etmek için kullanabileceğiniz API bilgileri
            </Text>
          </Column>
          <Button data-border="rounded" weight="default" variant="secondary" href="/sandbox" size="s" suffixIcon="chevronRight">
            Sandboxa Git
          </Button>
        </Row>
        
        <Grid fillWidth columns="2" s={{columns: "1"}} gap="m" marginTop="m">
          <Column gap="s">
            <Text variant="label-default-s" onBackground="neutral-strong">Merchant 1 - E-commerce Store</Text>
            <Column gap="xs" padding="m" background="neutral-alpha-weak" radius="m">
              <Row horizontal="between">
                <Text variant="body-default-xs" onBackground="neutral-weak">API Key:</Text>
                <Text variant="code-default-xs">mk_1a2b3c4d5e6f7g8h9i0j</Text>
              </Row>
              <Row horizontal="between">
                <Text variant="body-default-xs" onBackground="neutral-weak">Merchant ID:</Text>
                <Text variant="code-default-xs">merchant_001</Text>
              </Row>
            </Column>
          </Column>
          
          <Column gap="s">
            <Text variant="label-default-s" onBackground="neutral-strong">Merchant 2 - Gaming Platform</Text>
            <Column gap="xs" padding="m" background="neutral-alpha-weak" radius="m">
              <Row horizontal="between">
                <Text variant="body-default-xs" onBackground="neutral-weak">API Key:</Text>
                <Text variant="code-default-xs">mk_9z8y7x6w5v4u3t2s1r0q</Text>
              </Row>
              <Row horizontal="between">
                <Text variant="body-default-xs" onBackground="neutral-weak">Merchant ID:</Text>
                <Text variant="code-default-xs">merchant_002</Text>
              </Row>
            </Column>
          </Column>
        </Grid>
      </Column>
    </Column>
  );
}
