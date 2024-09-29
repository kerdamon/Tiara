from pydantic_settings import BaseSettings 
import psycopg
from pgvector.psycopg import register_vector

class Settings(BaseSettings):
    db_name: str
    db_user: str
    db_password: str
    db_host: str
    port: str

    class Config:
        env_file = ".env"

SETTINGS = Settings()

def connection_factory(): 
    conn = psycopg.connect(
        dbname=SETTINGS.db_name, 
        user=SETTINGS.db_user, 
        password=SETTINGS.db_password, 
        host=SETTINGS.db_host,
        port=SETTINGS.port
    )


