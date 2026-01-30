from fastapi import Depends
from fastapi_users import FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.manager import BaseUserManager
from fastapi_users_db_beanie import BeanieUserDatabase
from beanie import PydanticObjectId

from models import User
from schemas import UserRead, UserCreate, UserUpdate
import os

SECRET = os.getenv(
    "JWT_SECRET", "SUPER_SECRET_CHANGE_ME_IN_PRODUCTION_64_chars")

bearer_transport = BearerTransport(tokenUrl="/auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600 * 24)  # 1 day


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)


class UserManager(BaseUserManager[User, PydanticObjectId]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    def parse_id(self, id: str) -> PydanticObjectId:
        """Convert string ID from JWT token to PydanticObjectId (Beanie ObjectId)."""
        return PydanticObjectId(id)


async def get_user_db():
    yield BeanieUserDatabase(User)


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


fastapi_users = FastAPIUsers[User, PydanticObjectId](
    get_user_manager,
    [auth_backend],
)


current_active_user = fastapi_users.current_user(active=True)
