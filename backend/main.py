from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import List

from database import connect_to_mongo, close_mongo_connection
from auth import fastapi_users, auth_backend, current_active_user
from schemas import UserRead, UserCreate, UserUpdate
from ai_service import generate_lesson, generate_mcqs, answer_doubt
from models import Progress
from pydantic import BaseModel
from datetime import datetime


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(title="AI DSA Mentor - MongoDB", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173","https://ai-dsa-mentor-seven.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth routers
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

# Java DSA Learning Roadmap
ROADMAP = [
    "Java Arrays and ArrayLists",
    "Strings and String Methods in Java",
    "Java Collections - Lists",
    "Java Collections - Sets and Maps",
    "Stacks and Queues in Java",
    "Linked Lists Implementation",
    "Sorting Algorithms in Java",
    "Searching Algorithms",
    "Binary Search Trees in Java",
    "Recursion Fundamentals",
    "Graphs and Graph Traversal",
    "Dynamic Programming in Java",
    "Hash Tables and HashMap",
    "Heaps and Priority Queues",
    "Greedy Algorithms",
    "Backtracking Techniques"
]


class LessonOut(BaseModel):
    topic: str
    content: str


class MCQ(BaseModel):
    question: str
    options: List[str]
    correct: str
    explanation: str


class ProgressUpdate(BaseModel):
    topic: str
    status: str
    score: float = 0.0


class DoubtIn(BaseModel):
    doubt: str
    topic: str = ""


@app.get("/daily", response_model=LessonOut)
async def get_daily_lesson(user=Depends(current_active_user)):
    completed = await Progress.find(
        Progress.user_id == user.id,
        Progress.status == "completed"
    ).to_list()
    completed_topics = {p.topic for p in completed}

    next_topic = next(
        (t for t in ROADMAP if t not in completed_topics), ROADMAP[0])

    progress = await Progress.find_one(
        Progress.user_id == user.id,
        Progress.topic == next_topic
    )

    if not progress:
        progress = Progress(user_id=user.id, topic=next_topic)
        await progress.insert()

    content = generate_lesson(next_topic)
    return {"topic": next_topic, "content": content}


@app.get("/mcqs")
async def get_mcqs(topic: str):
    mcqs = generate_mcqs(topic, count=10)
    return mcqs


@app.get("/progress")
async def get_progress(user=Depends(current_active_user)):
    records = await Progress.find(Progress.user_id == user.id).to_list()
    return [
        {
            "topic": r.topic,
            "status": r.status,
            "score": r.mcq_score,
            "completed": r.date_completed.isoformat() if r.date_completed else None
        }
        for r in records
    ]


@app.post("/progress")
async def update_progress(data: ProgressUpdate, user=Depends(current_active_user)):
    record = await Progress.find_one(
        Progress.user_id == user.id,
        Progress.topic == data.topic
    )
    if not record:
        raise HTTPException(404, "No progress record found")

    record.status = data.status
    record.mcq_score = data.score
    if data.status == "completed":
        record.date_completed = datetime.utcnow()

    await record.save()
    return {"message": "Updated"}


@app.post("/doubt")
async def ask_doubt(data: DoubtIn):
    answer = answer_doubt(data.doubt, data.topic)
    return {"answer": answer}


@app.get("/health")
async def health():
    return {"status": "ok"}
