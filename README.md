# 🍽️ Acıktım - Restoran Keşif Uygulaması

Modern ve şık bir React Native uygulaması ile civarınızdaki en iyi restoranları keşfedin! Yelp API'sini kullanarak gerçek zamanlı restoran verilerine erişin.

## 📱 Uygulama Önizleme

Acıktım, kullanıcıların kolayca restoran arayabileceği, filtreleyebileceği ve detaylarını görüntüleyebileceği modern bir mobil uygulamadır.

### 📸 Ekran Görüntüleri

<div align="center">
  <img src="assets/Ekran görüntüsü 2025-08-06 163028.png" alt="Ana Sayfa - Restoran Listesi" width="250" style="margin: 10px;">
  <img src="assets/Ekran görüntüsü 2025-08-06 163053.png" alt="Arama Özelliği" width="250" style="margin: 10px;">
  <img src="assets/Ekran görüntüsü 2025-08-06 163151.png" alt="Restoran Detay Sayfası" width="250" style="margin: 10px;">
</div>

<p align="center">
  <em>Soldan sağa: Ana sayfa ile kategori bazlı restoran listesi, canlı arama özelliği, detaylı restoran bilgileri</em>
</p>

### ✨ Özellikler

- 🔍 **Akıllı Arama**: Restoran, yemek türü veya cafe adı ile arama
- 💰 **Fiyat Filtreleme**: Ekonomik, uygun ve premium kategorilerde filtreleme
- ⭐ **Detaylı Bilgiler**: Rating, fotoğraf, adres ve iletişim bilgileri
- 📍 **Konum Entegrasyonu**: Haritada görüntüleme ve telefon arama
- 🎨 **Modern UI/UX**: Gradient arka planlar ve smooth animasyonlar
- 📱 **Responsive Tasarım**: Tüm ekran boyutlarında mükemmel görünüm

## 🛠️ Kullanılan Teknolojiler

### Frontend
- **React Native 0.79.5** - Mobil uygulama geliştirme framework'ü
- **Expo ~53.0.20** - React Native geliştirme platformu
- **React 19.0.0** - UI kütüphanesi

### Navigation
- **@react-navigation/native** - Navigasyon yönetimi
- **@react-navigation/native-stack** - Stack navigasyon
- **react-native-screens** - Native ekran bileşenleri

### UI & Animasyonlar
- **expo-linear-gradient** - Gradient arka planlar
- **react-native-gesture-handler** - Dokunma hareketleri
- **Animated API** - Smooth animasyonlar
- **FontAwesome Icons** - Icon set

### API & State Management
- **Axios** - HTTP client
- **React Hooks** - State ve lifecycle yönetimi
- **Custom Hooks** - useResult hook ile API yönetimi

### External APIs
- **Yelp Fusion API** - Restoran verileri

## 📁 Proje Yapısı

```
RestaurantApp/
│
├── src/
│   └── screens/
│       ├── SearchScreen.jsx      # Ana arama ekranı
│       └── ResultShowScreen.jsx  # Restoran detay ekranı
│
├── components/
│   ├── SearchBar.jsx            # Arama çubuğu bileşeni
│   ├── ResultsList.jsx          # Restoran listesi bileşeni
│   └── ResultDetail.jsx         # Restoran kartı bileşeni
│
├── hooks/
│   └── useResult.jsx            # API çağrıları için custom hook
│
├── api/
│   └── yelp.jsx                 # Yelp API konfigürasyonu
│
├── assets/                      # Görseller ve iconlar
├── App.jsx                      # Ana uygulama bileşeni
└── package.json                 # Bağımlılıklar ve scriptler
```

## 🚀 Kurulum ve Çalıştırma

### Ön Gereksinimler
- Node.js (14.0.0 veya üzeri)
- npm veya yarn
- Expo CLI
- Android Studio (Android için) veya Xcode (iOS için)

### Kurulum Adımları

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/kullaniciadi/RestaurantApp.git
cd RestaurantApp
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Uygulamayı başlatın:**
```bash
npm start
```

4. **Platform seçin:**
```bash
# Android için
npm run android

# iOS için  
npm run ios

# Web için
npm run web
```


## 🎯 Uygulama Akışı

### 1. Ana Ekran (SearchScreen)
- Gradient arka plan ile modern tasarım
- Animasyonlu giriş efektleri
- Kategori bazlı restoran listeleri
- Gerçek zamanlı arama özelliği

### 2. Arama İşlevi
- `useResult` custom hook ile API yönetimi
- Debounced arama ile performans optimizasyonu
- Error handling ve loading states

### 3. Restoran Kartları (ResultDetail)
- Resim, rating ve fiyat bilgisi
- Touch animasyonları
- Kategori etiketleri
- Mesafe hesaplama

### 4. Detay Sayfası (ResultShowScreen)
- Tam ekran hero image
- Detaylı restoran bilgileri
- Harita ve telefon entegrasyonu
- Smooth scroll animasyonları

## 🎨 Tasarım Özellikleri

- **Modern Gradient**: Mavi-mor-pembe geçişli arka planlar
- **Glassmorphism**: Yarı saydam cam efektleri
- **Smooth Animasyonlar**: Fade, scale ve slide efektleri
- **Typography**: Bold fontlar ve text shadows
- **Color Palette**: Tutarlı renk şeması
- **Responsive**: Tüm ekran boyutlarında uyumlu

## 📊 Performance Optimizasyonları

- **Native Driver**: Animasyonlar için native driver kullanımı
- **Lazy Loading**: Resimler için optimized loading
- **Memory Management**: Component lifecycle optimizasyonu
- **API Caching**: Gereksiz API çağrılarının önlenmesi

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

⭐ Bu projeyi beğendiyseniz star vermeyi unutmayın!
