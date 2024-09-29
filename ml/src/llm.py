from fastapi import FastAPI, Query
from pydantic import BaseModel
# from langchain.chains import RetrievalQA
# from langchain.vectorstores.pgvector import PGVector
# from langchain.docstore.document import Document
# from langchain.chains import RetrievalQA
# from langchain.vectorstores import FAISS
from sentence_transformers import SentenceTransformer
# from langchain.docstore.document import Document
# from langchain.llms import HuggingFacePipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import psycopg
import numpy as np
import uvicorn
from pydantic_settings import BaseSettings
from models import Major
from pgvector.psycopg import register_vector


# Initialize FastAPI
app = FastAPI()

# Initialize the LLM (Hugging Face pipeline)
# model_name = "google/flan-t5-base"
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
# hf_pipeline = pipeline("text2text-generation", model=model, tokenizer=tokenizer)
# llm = HuggingFacePipeline(pipeline=hf_pipeline)

# # Initialize the retriever (FAISS)
# embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# # Example documents to use in the retriever
# docs = [
#     Document(page_content="Deep learning models need a lot of data."),
#     Document(page_content="Data augmentation helps improve model generalization."),
#     Document(page_content="FAISS is an efficient similarity search tool."),
#     Document(page_content="Transformers are very effective for NLP tasks."),
# ]

# # Convert documents to embeddings and index them with FAISS
# texts = [doc.page_content for doc in docs]
# doc_embeddings = embedding_model.encode(texts)
# faiss_index = FAISS.from_documents(docs, embedding_model)

# # Create the RAG system using LangChain's RetrievalQA
# qa_chain = RetrievalQA.from_chain_type(
#     llm=llm,
#     chain_type="stuff",
#     retriever=faiss_index.as_retriever()
# )
class Settings(BaseSettings):
    db_name: str
    db_user: str
    db_password: str
    db_host: str
    port: str

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
conn.execute('CREATE EXTENSION IF NOT EXISTS vector')
register_vector(conn)

# Function to query similar documents
def query_similar_documents(query, top_k=5) -> list:
    query_embedding = SentenceLatentizer.encode(query).astype(np.float32)
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT id FROM "Major"
            ORDER BY vector <-> %s
            LIMIT %s;
            """,
            (query_embedding, top_k)
        )
        return cur.fetchall()

# Create a function to retrieve documents from Postgres based on vector similarity
def retrieve_documents_from_postgres(query, top_k=5):
    results = query_similar_documents(query, top_k)
    # documents = [Document(page_content=res[0]) for res in results]
    documents = [res[0] for res in results]
    return documents

# API input model
class QueryRequest(BaseModel):
    query: str
    top_k: int = 5

# API route for querying the RAG pipeline
@app.post("/query")
def get_rag_answer(request: QueryRequest):
    # Extract the query from the request
    query = request.query
    top_k = request.top_k

    similar_documents = retrieve_documents_from_postgres(query, top_k)

    # Return the generated answer
    return {"top_k": similar_documents }

class KnnQueryRequest(BaseModel):
    major_id: int
    top_k: int = 5

@app.post("/knn")
def get_knn(request: KnnQueryRequest) -> list[int]:
    neighbors = conn.execute('SELECT id FROM "Major" WHERE id != %(id)s ORDER BY vector <=> (SELECT vector FROM "Major" WHERE id = %(id)s) LIMIT %(top_k)s', {'id': request.major_id, "top_k": request.top_k}).fetchall()

    return [neighbor[0] for neighbor in neighbors]



# Health check route
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Run the server if this file is executed directly
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
