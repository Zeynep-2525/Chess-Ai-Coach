# Chess AI Coach

**Chess AI Coach**, kullanıcıların satranç oynarken taşları sürükleyip bırakabileceği, ünlü açılışları görebileceği, hamle (hint) önerileri alabileceği ve basit bir AI rakibe karşı oynayabileceği interaktif bir web uygulamasıdır.  

Frontend **React (Vite + react-chessboard + chess.js)** tabanlıdır.  
Backend **FastAPI** ile kurulmuş olup **Google Gemini API** üzerinden hamle önerileri sağlar.  

---

## 🚀 Özellikler
- **Gerçek Zamanlı Satranç Tahtası**: Taşları sürükleyip oynayabilirsiniz.  
- **Hamle Önerileri (Hint)**: FEN pozisyonuna göre backend API’sinden öneri alınır.  
- **AI Rakip**: Basit bir değerlendirme fonksiyonu ile bilgisayara karşı oynayabilirsiniz.  
- **Skor Takibi**: Alınan taşların değerine göre puanlama sistemi.  
- **Zamanlayıcı**: Oyun süresini dakika:saniye formatında gösterir.  
- **Openings Paneli**: Ünlü açılışların tahtadaki pozisyonlarını ve açıklamalarını görebilirsiniz.  
- **Tema Desteği**: Dark ve Light temaları arasında geçiş yapılabilir.  
- **Toolbar**: Reset / Undo, Hint, Options, Openings butonları.  
- **AI Koç Avatarlı Konuşma Balonu**: Hamle tavsiyelerini kullanıcıya iletir.  
- **Mobil Uyumluluk**: Responsive CSS ile mobil ekranlarda da çalışır.  

---

## 🛠 Teknolojiler
- **Frontend**: React, Vite, Hooks, `react-chessboard`, Chess.js, CSS Flexbox  
- **Backend**: FastAPI, Pydantic, CORS Middleware, Google Gemini API (`google-generativeai`)  
- **Diğer**: dotenv (API key saklama), Netlify (frontend deploy), Render (backend deploy)  

---

## 📦 Kurulum

### 1. Reposu Klonla
```bash
git clone https://github.com/Zeynep-2525/Chess-Ai-Coach.git
cd Chess-Ai-Coach
```

### 2. Frontend (React - Vite)
```bash
npm install
npm run dev       # geliştirme için (http://localhost:5173)
npm run build     # prod build (dist/ klasöründe oluşur)
```

### 3. Backend (FastAPI)
```bash
cd backend  # eğer ayrı klasördeyse
python -m venv .venv
source .venv/bin/activate   # (Windows: .venv\Scripts\activate)
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend test: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🔑 API Key Kullanımı (.env Dosyası)

### Backend `.env`
```
GEMINI_API_KEY=your_google_gemini_api_key_here
```

- `.env` dosyası **asla GitHub’a yüklenmemelidir** → `.gitignore` içine eklenmeli.  
- Render deploy sırasında API key’i Render Dashboard üzerinden **Environment Variables** kısmına ekleyin.  

### Frontend `.env` (Vite)
```
VITE_API_URL=http://localhost:8000
```

- Production’da bu URL’yi Render’ın verdiği backend adresi ile değiştirin.  
- Kodda erişim:
```js
const API_URL = import.meta.env.VITE_API_URL;
```
## 📂 Dosya Yapısı
```
Chess-Ai-Coach/
├─ dist/
├─ node_modules/
├─ public/
├─ src/
│  ├─ assets/
│  │  ├─ sounds/
│  │  │  └─ move.mp3
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ AICoach.jsx
│  │  ├─ ButtonPanel.jsx
│  │  ├─ ChessboardComponent.jsx
│  │  ├─ GameArea.jsx
│  │  ├─ OpeningsPanel.jsx
│  │  ├─ PreviousMoves.jsx
│  │  ├─ SpeechBubble.jsx
│  │  ├─ Splashscreen.jsx
│  │  └─ Toolbar.jsx
│  ├─ data/
│  ├─ images/
│  │  ├─ avataaars.png
│  │  └─ craiyon_190748_draw.png
│  ├─ pages/
│  │  └─ App.jsx
│  ├─ App.css
│  ├─ index.css
│  └─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ LICENSE
├─ package-lock.json
└─ package.json

```

---

## 🎮 Kullanım
- **Oyna**: Taşları sürükleyip bırakın.  
- **Hint**: Tahtadaki mevcut pozisyona göre öneri alın.  
- **Openings**: Dropdown’dan açılış seç → açıklama + tahtada pozisyon gelir.  
- **Reset / Undo**: Oyun sıfırlama veya son hamleyi geri alma.  
- **Tema**: Options → Tema değiştir.  
- **AI Koç**: Sağ üst köşede avatar + konuşma balonu öneriler verir.  

---

## 📌 Bilinen Eksikler & TODO
- [ ] Chessboard responsive boardWidth ayarı  
- [ ] CORS production’da sadece Netlify domainine açılmalı  
- [ ] Unit test & integration test eksik  
- [ ] Mobil cihazlarda drag/drop testleri yapılmalı  
- [ ] Rate limiting eklenmeli (API spam için)  

---

## 🤝 Katkıda Bulunma
1. Repo’yu forkla.  
2. Yeni branch aç:  
   ```bash
   git checkout -b feature/özellik
   ```  
3. Değişiklik yap → commit → push.  
4. GitHub’dan **Pull Request** aç.  

Kodlama standartları:  
- Frontend → React Hooks, fonksiyonel componentler.  
- Backend → Tipli Pydantic modelleri, hataları yakala ve logla.  

---

## 📜 Lisans
MIT Lisansı altında dağıtılmaktadır.  

---

## 📧 İletişim
- GitHub: [Zeynep-2525](https://github.com/Zeynep-2525)  
- E-posta:zezetopal.zeynep@gmail.com
