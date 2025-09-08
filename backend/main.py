from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai

# FastAPI objesi ÖNCE
app = FastAPI()

# CORS middleware HEMEN SONRA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # önce test için herkese aç
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
    "Sadece en iyi hamleyi açık şekilde ve kısa olarak söyle, "
    "örn. 'At g1-f3'. Ardından kısaca neden iyi olduğunu bir cümleyle ekle.")
        ai_text = response.text
        return {"hint": ai_text}
    except Exception as e:
        print("HATA:", str(e))
        return {"error": str(e)}

print("Loaded API key:", GEMINI_API_KEY[:10] if GEMINI_API_KEY else "None")
