from pydantic import BaseModel
from typing import Any


class DynamicResult(BaseModel):
    succeed: bool
    message: str
    data: Any = None
