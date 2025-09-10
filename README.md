# Chess AI Coach

Chess AI Coach, kullanıcıların satranç oynarken hem tahtayı hem de ünlü açılışları görebileceği, hamle önerileri alabileceği interaktif bir web uygulamasıdır. React ve Chess.js tabanlıdır ve tamamen client-side çalışır.  

---

## Özellikler

- **Gerçek zamanlı Satranç Tahtası**: Kullanıcı taşları sürükleyip oynayabilir.
- **Hamle Önerileri (Hint)**: FEN pozisyonuna göre API üzerinden öneri alabilirsiniz.
- **AI Rakip**: Basit bir değerlendirme fonksiyonu ile bilgisayara karşı oynayabilirsiniz.
- **Skor Takibi**: Alınan taşların değerine göre puanlama sistemi.
- **Zamanlayıcı**: Oyun süresini dakika:saniye formatında ölçer.
- **Openings Paneli**: Ünlü açılışları seçip, açıklamasını ve tahtadaki pozisyonunu görebilirsiniz.
- **Tema Desteği**: Dark ve Light temaları arasında geçiş yapılabilir.
- **Sabit Toolbar**: Sayfa scroll edilse bile üstte sabit kalan toolbar.
- **Konuşma Balonu (Speech Bubble)**: AI koç avatarının yanında gösterilir, sağ üst köşesinde kuyruk bulunur.

---

## Teknolojiler

- React (Hooks, forwardRef)
- Chessboard.js (`react-chessboard`)
- Chess.js (tahta ve hamle mantığı)
- CSS Flexbox ve Sticky Toolbar
- Basit API üzerinden hint alımı

---

## Kurulum

1. Repository’yi klonlayın:

```bash
git clone https://github.com/Zeynep-2525/Chess-Ai-Coach.git
cd Chess-Ai-Coach
Bağımlılıkları yükleyin:

bash
Kodu kopyala
npm install
Projeyi başlatın:

bash
Kodu kopyala
npm run dev
Proje Vite ile çalışmaktadır. Tarayıcıda otomatik olarak açılır (genellikle http://localhost:5173).

Dosya Yapısı
arduino
Kodu kopyala
Chess-Ai-Coach/
├─ src/
│  ├─ pages/
│  │  └─ Home.jsx
│  ├─ components/
│  │  ├─ Toolbar.jsx
│  │  ├─ ChessboardComponent.jsx
│  │  ├─ OpeningsPanel.jsx
│  │  ├─ PreviousMoves.jsx
│  │  └─ SpeechBubble.jsx
│  ├─ assets/
│  │  └─ sounds/
│  └─ App.css
├─ public/
├─ package.json
└─ vite.config.js
Kullanım
Tahta üzerinde oynayın: Taşları sürükleyerek oynayabilirsiniz.

Hint butonu: Hamle önerisi almak için tıklayın.

Openings dropdown: Toolbar’dan açılışı seçin, panelde açıklama ve pozisyon görüntülensin.

Reset / Undo: Oyunu sıfırlayın veya son hamleyi geri alın.

Tema değiştirme: Toolbar’daki Options -> Tema değiştir butonu ile temayı değiştirin.

Scroll: Sayfa aşağı kaydırılsa bile toolbar üstte sabit kalır.

AI Koç: Sağ üst köşedeki avatar ve balon ile hamle önerilerini görebilirsiniz.

Açılışlar
Mevcut açılışlar:

İspanyol Açılışı (Ruy López)

Sicilya Savunması

İtalyan Açılışı

Açılış seçildiğinde panelde hem açıklama hem tahtadaki pozisyon görünür.

Katkıda Bulunma
Katkıda bulunmak için:

Fork yapın.

Yeni branch oluşturun (git checkout -b feature/özellik)

Değişiklikleri commit edin (git commit -m 'Yeni özellik')

Branch’i push edin (git push origin feature/özellik)

Pull request oluşturun.

