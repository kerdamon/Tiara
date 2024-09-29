from fastapi import FastAPI, Query
from pydantic import BaseModel
# from langchain.chains import RetrievalQA
# from langchain.docstore.document import Document
from sentence_transformers import SentenceTransformer, util
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import psycopg
import numpy as np
import uvicorn
from pydantic_settings import BaseSettings
from pathlib import Path
import json
from db import connection_factory
from models import Major
import random

SentenceLatentizer = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def insert_major(major):
    embedding = SentenceLatentizer.encode(str(major))  # Create the embedding
    with connection_factory() as conn:
        #cur = conn.cursor()
        print(embedding.shape)
        conn.execute('INSERT INTO "embeddings" (id, embedding) VALUES (%s, %s)', (major.id, embedding))
        conn.execute('''
            INSERT INTO "Major" (
                id, majorname, studyfield, studylevel, voivodeship, studyform, studyprofile, semesters, faculty, numberofgraduates, employmentsalary, timeoflookingforjob, universityid, description, ranking, vector
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            )
        ''', (
            major.id, major.majorName, major.studyField, major.studyLevel, major.voivodeship, major.studyForm, major.studyProfile, major.semesters, major.faculty, major.numberOfGraduates, major.employmentSalary, major.timeOfLookingForJob, major.universityId, major.description, major.ranking, embedding.tolist()
        ))
        #conn.commit()

def main():

    fields_of_study = json.loads(Path("data/input/initial_input.json").read_text(encoding='utf-8'))

    for field_name, field in fields_of_study.items():
        # field_text = json.dumps(field, ensure_ascii=False).encode('utf8')
        # print(field_text)
        # field = "Test test test raz dwa trzy cztery."
        insert_major(Major(**{
            "id": random.randint(1, 1000000),
            "universityId": random.randint(1, 1000000),
            **field
        }))
        # insert_major(field)
        # doc_embedding = SentenceLatentizer.encode(field)
        # cur = conn.cursor()
        # cur.execute("INSERT INTO fields_of_study (field, embedding) VALUES (%s, %s)", (field, doc_embedding))
        # conn.commit()

if __name__ == "__main__":
    main()
