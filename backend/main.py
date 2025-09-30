from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai

app = FastAPI()

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Prod ve local frontend URL
origins = [
    "https://chess-ai-coach.netlify.app",  # prod frontend
    "http://localhost:5173",               # local test
]

# Tek middleware, preflight ve tüm method’ları kapsıyor
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BoardState(BaseModel):
    fen: str

@app.options("/hint")  # Preflight request için explicit endpoint
def hint_options():
    return {}

@app.post("/hint")
def get_hint(board: BoardState):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash-latest")
        response = model.generate_content(
            f"Bu satranç pozisyonunu analiz et: {board.fen}. "
            "1. En iyi hamleyi satranç notasyonuyla kısa yaz. "
            "2. Hamlenin neden güçlü olduğunu bir-iki cümleyle açıkla. "
            "3. Bu hamleye bağlı olası stratejik planı özetle."
        )
        return {"hint": response.text}
    except Exception as e:
        return {"error": str(e)}
