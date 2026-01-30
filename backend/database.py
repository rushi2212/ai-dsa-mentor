import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie, Document
from models import User, Progress

client: AsyncIOMotorClient = None
db = None


async def connect_to_mongo():
    global client, db
    mongodb_url = os.getenv(
        "MONGODB_URL", "mongodb://localhost:27017/ai_dsa_mentor")
    client = AsyncIOMotorClient(mongodb_url)
    # Extract database name from URL or use default
    if "/" in mongodb_url and mongodb_url.split("/")[-1]:
        db = client[mongodb_url.split("/")[-1].split("?")[0]]
    else:
        db = client["ai_dsa_mentor"]
    await init_beanie(
        database=db,
        document_models=[User, Progress],
    )


async def close_mongo_connection():
    global client
    if client:
        client.close()
