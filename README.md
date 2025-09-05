# Chess AI Coach 🎯

## 📌 Proje Amacı
Bu projenin amacı:  
- Kullanıcıların tarayıcı üzerinden satranç oynayabilmesi,  
- Yapay zeka (AI) desteği ile **en iyi hamle önerilerini** alabilmesi,  
- Açılış hamlelerini ve satranç stratejilerini öğrenebilmesi.  

Uzun vadede amaç: **AI destekli bir koç** gibi çalışarak oyuncuya öneriler sunmak.

---

## ✅ Şu Ana Kadar Yapılanlar
- **Frontend (React)** oluşturuldu.  
- **Satranç tahtası (react-chessboard + chess.js)** entegre edildi.  
- **Hamle geçmişi** kaydediliyor ve ekranda görünüyor.  
- **Undo / Reset** fonksiyonları eklendi.  
- **Toolbar** (Hint, Options, Openings, Reset, Undo) tasarlandı.  
- **Options menüsü için dropdown** oluşturuldu.  
- **Splash screen (karşılama ekranı)** eklendi.  
- **AI Coach bölümü** için avatar ve speech bubble componentleri hazırlandı.  

---

## 🔜 Sonraki Adımlar
- **Openings (açılışlar)** listesini JSON / backend üzerinden almak.  
- **Backend (FastAPI)** ile API kurmak.  
  - Açılış hamleleri için endpoint.  
  - İleride en iyi hamle önerisi için AI entegrasyonu.  
- **AI hamle önerisi**: Chess motoru (örn. Stockfish) veya yapay zeka modelinden alınan öneriyi frontend’de göstermek.  

---

## 📖 Not
Proje şu an temel satranç işlevlerini destekliyor. Backend ve AI entegrasyonu sonrası gerçek "koç" işlevi kazandırılacak.
