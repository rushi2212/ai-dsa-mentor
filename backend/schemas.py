from fastapi_users import schemas
from beanie import PydanticObjectId
from pydantic import EmailStr, ConfigDict


class UserRead(schemas.BaseUser[PydanticObjectId]):
    model_config = ConfigDict(from_attributes=True)
    id: PydanticObjectId
    email: EmailStr
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    password: str


class UserUpdate(schemas.BaseUserUpdate):
    pass  # can add more fields later
