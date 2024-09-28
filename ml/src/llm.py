from fastapi import FastAPI, Query
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from sentence_transformers import SentenceTransformer
from langchain.docstore.document import Document
from langchain.llms import HuggingFacePipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import uvicorn

# Initialize FastAPI
app = FastAPI()

# Initialize the LLM (Hugging Face pipeline)
model_name = "google/flan-t5-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
hf_pipeline = pipeline("text2text-generation", model=model, tokenizer=tokenizer)
llm = HuggingFacePipeline(pipeline=hf_pipeline)

# Initialize the retriever (FAISS)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Example documents to use in the retriever
docs = [
    Document(page_content="Deep learning models need a lot of data."),
    Document(page_content="Data augmentation helps improve model generalization."),
    Document(page_content="FAISS is an efficient similarity search tool."),
    Document(page_content="Transformers are very effective for NLP tasks."),
]

# Convert documents to embeddings and index them with FAISS
texts = [doc.page_content for doc in docs]
doc_embeddings = embedding_model.encode(texts)
faiss_index = FAISS.from_documents(docs, embedding_model)

# Create the RAG system using LangChain's RetrievalQA
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=faiss_index.as_retriever()
)

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

    # Query the RAG pipeline
    answer = qa_chain.run(query)

    # Return the generated answer
    return {"query": query, "answer": answer}


# Health check route
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Run the server if this file is executed directly
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
