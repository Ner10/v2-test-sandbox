# Payment API Documentation

Multi-merchant ödeme sistemi için kapsamlı API dokümantasyonu. Bu proje, dış müşterilerin API'ye entegre olabilmesi için password korumalı bir dokümantasyon sistemi ve sandbox ortamı sağlar.

## Özellikler

- 🔐 **Password Korumalı Erişim**: Güvenli dokümantasyon erişimi
- 📚 **Kapsamlı API Referansı**: Tüm endpoint'ler, parametreler ve response formatları
- 🧪 **Canlı Sandbox**: Test keyleri ile gerçek API istekleri gönderme
- 🎨 **Modern UI**: Once UI sistemi ile güzel ve kullanıcı dostu arayüz
- 📱 **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- 🚀 **Vercel Ready**: Tek tıkla deployment

## Demo Bilgileri

### Giriş Şifresi
```
PaymentAPI2024!
```

### Test Merchant Credentials

**Merchant 1 - E-commerce Store A**
- Merchant ID: `merchant_001`
- API Key: `mk_1a2b3c4d5e6f7g8h9i0j`
- API Secret: `secret_key_merchant_001`

**Merchant 2 - Gaming Platform B**
- Merchant ID: `merchant_002`
- API Key: `mk_9z8y7x6w5v4u3t2s1r0q`
- API Secret: `secret_key_merchant_002`

## API Endpoints

### Pay-In (Para Yatırma)
```http
POST /pay-in
```

Desteklenen ödeme yöntemleri:
- Havale, Papel, Papara, Payco, Parazula, Parola
- Kredi Kartı, Popy, Paratim, QR, Crypto, H2H-Havale

### Pay-Out (Para Çekme)
```http
POST /pay-out
```

Desteklenen transfer yöntemleri:
- IBAN (Havale)
- Dijital Cüzdan Numaraları
- Kripto Para Adresleri (USDT)

### Transaction Status
```http
GET /transaction/{transaction_id}
```

İşlem durumu sorgulama endpoint'i.

## Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Yerel Geliştirme

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd api-docs-system
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcıda `http://localhost:3000` adresini açın.

## Vercel Deployment

### Otomatik Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/payment-api-docs)

### Manuel Deployment

1. Vercel CLI'yi yükleyin:
```bash
npm i -g vercel
```

2. Projeyi deploy edin:
```bash
vercel
```

3. Production deployment:
```bash
vercel --prod
```

## Konfigürasyon

### Environment Variables

Vercel dashboard'da aşağıdaki environment variable'ları ayarlayın:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.payment-system.com
NEXT_PUBLIC_APP_NAME=Payment API Docs
NEXT_PUBLIC_APP_DESCRIPTION=Multi-Merchant Payment System API Documentation
API_DOCS_PASSWORD=your-secure-password
NODE_ENV=production
```

### Özelleştirme

- **Tema ve Renkler**: `src/resources/once-ui.config.js`
- **API Base URL**: Environment variables
- **Password**: `src/product/RouteGuard.tsx`
- **Test Credentials**: `src/app/sandbox/page.tsx`

## Güvenlik

- **Password Protection**: Tüm dokümantasyon sayfaları password ile korunur
- **Local Storage**: Authentication durumu tarayıcıda saklanır
- **HTTPS Only**: Production'da sadece HTTPS bağlantıları kabul edilir
- **Header Security**: Güvenlik header'ları otomatik eklenir

## API Authentication

Gerçek API istekleri için HMAC-SHA256 imzalama gereklidir:

```javascript
const method = 'POST';
const path = '/pay-in';
const body = JSON.stringify(requestData);
const timestamp = Math.floor(Date.now() / 1000).toString();
const nonce = crypto.randomUUID();

const payload = `${method}|${path}|${body}|${timestamp}|${nonce}`;
const signature = crypto.createHmac('sha256', API_SECRET)
  .update(payload)
  .digest('hex');
```

## Webhook Doğrulama

Webhook'ları doğrulamak için:

```javascript
const crypto = require('crypto');

const signature = req.headers['x-webhook-signature'];
const payload = JSON.stringify(req.body);

const expectedSignature = crypto.createHmac('sha256', WEBHOOK_SECRET)
  .update(payload)
  .digest('hex');

const isValid = crypto.timingSafeEqual(
  Buffer.from(signature), 
  Buffer.from(expectedSignature)
);
```

## Destek

Teknik destek için:
- **Email**: support@payment-system.com
- **Dokümantasyon**: Bu site
- **Test Ortamı**: Sandbox sayfası

## Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

## Geliştirici Notları

- Next.js 15 ve React 19 kullanılmıştır
- Once UI component sistemi entegre edilmiştir
- TypeScript desteği mevcuttur
- Responsive tasarım için Tailwind CSS kullanılmıştır

## Changelog

### v1.0.0 (2024-01-01)
- İlk sürüm
- Password korumalı giriş sistemi
- Kapsamlı API dokümantasyonu
- Canlı sandbox ortamı
- Vercel deployment desteği