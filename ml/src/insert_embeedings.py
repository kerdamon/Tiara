from fastapi import FastAPI, Query
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain.docstore.document import Document
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import psycopg
import numpy as np
import uvicorn
from pydantic import BaseSettings
from pathlib import Path
import json

class Settings(BaseSettings):
    db_name: str
    db_user: str
    db_password: str
    db_host: str

    class Config:
        env_file = ".env"

settings = Settings()
SentenceLatentizer = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
conn = psycopg.connect(
    dbname=settings.db_name, 
    user=settings.db_user, 
    password=settings.db_password, 
    host=settings.db_host
)

def insert_document(content):
    embedding = SentenceLatentizer.encode(content).astype(np.float32)  # Create the embedding
    cur = conn.cursor()
    cur.execute("INSERT INTO documents (content, embedding) VALUES (%s, %s)", (content, embedding.tolist()))
    conn.commit()

def main():

    fields_of_study = json.loads(Path("data/input/docs.json").read_text())

    for field_name, field in fields_of_study.items():
        insert_document(field)
        # doc_embedding = SentenceLatentizer.encode(field)
        # cur = conn.cursor()
        # cur.execute("INSERT INTO fields_of_study (field, embedding) VALUES (%s, %s)", (field, doc_embedding))
        # conn.commit()

if __name__ == "__main__":
    main()
