from beanie import Document, Indexed, PydanticObjectId
from pydantic import EmailStr, Field
from datetime import datetime


class User(Document):
    email: Indexed(EmailStr, unique=True)
    hashed_password: str
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    class Settings:
        name = "users"
        use_state_management = True
        email_collation = None


class Progress(Document):
    user_id: PydanticObjectId = Field(indexed=True)
    topic: Indexed(str)
    status: str = "not_started"  # not_started | in_progress | completed
    mcq_score: float = 0.0
    date_completed: datetime | None = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "progress"
        use_state_management = True
