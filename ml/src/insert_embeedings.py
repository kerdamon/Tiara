from fastapi import FastAPI, Query
from pydantic import BaseModel
# from langchain.chains import RetrievalQA
# from langchain.docstore.document import Document
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import psycopg
import numpy as np
import uvicorn
from pydantic_settings import BaseSettings
from pathlib import Path
import json
from db import connection_factory
from models import Major

SentenceLatentizer = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def insert_major(major):
    print(major)
    return
    embedding = SentenceLatentizer.encode(major, convert_to_numpy=True).astype(np.float32)  # Create the embedding
    with connection_factory() as conn:
        cur = conn.cursor()
        cur.execute('INSERT INTO "Major" (vector) VALUES (%s)', (embedding,))
        conn.commit()

def main():

    fields_of_study = json.loads(Path("data/input/initial_input.json").read_text(encoding='utf-8'))

    for field_name, field in fields_of_study.items():
        # field_text = json.dumps(field, ensure_ascii=False).encode('utf8')
        # print(field_text)
        # field = "Test test test raz dwa trzy cztery."
        insert_major(Major(**field))
        # insert_major(field)
        # doc_embedding = SentenceLatentizer.encode(field)
        # cur = conn.cursor()
        # cur.execute("INSERT INTO fields_of_study (field, embedding) VALUES (%s, %s)", (field, doc_embedding))
        # conn.commit()

if __name__ == "__main__":
    main()
