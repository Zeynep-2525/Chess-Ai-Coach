from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai

# FastAPI objesi ÖNCE
app = FastAPI()

origins = [
    "https://chess-ai-coach.netlify.app",  # frontend URL
    "http://localhost:5173",               # local test için
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # sadece izin verilen domain’ler
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CORS middleware HEMEN SONRA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://<your-netlify-url>"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# .env yükle
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Gemini client ayarı
genai.configure(api_key=GEMINI_API_KEY)

class BoardState(BaseModel):
    fen: str

@app.post("/hint")
def get_hint(board: BoardState):
    print("Gelen FEN:", board.fen)
    print("API Key var mı:", GEMINI_API_KEY[:10] if GEMINI_API_KEY else "None")

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  # ücretsiz hızlı model
        response = model.generate_content( f"Bu satranç pozisyonunu analiz et: {board.fen}. "
    "1. En iyi hamleyi satranç notasyonuyla açık ve kısa yaz (örn. 'At g1-f3'). "
    "2. Bu hamlenin neden güçlü olduğunu bir-iki cümleyle açıkla. "
    "3. Bu hamleye bağlı olarak oyuncunun izleyebileceği olası stratejik planı kısaca özetle.")
        ai_text = response.text
        return {"hint": ai_text}
    except Exception as e:
        print("HATA:", str(e))
        return {"error": str(e)}

print("Loaded API key:", GEMINI_API_KEY[:10] if GEMINI_API_KEY else "None")
