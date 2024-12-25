from pydantic import BaseModel
from typing import Any


class DynamicResult(BaseModel):
    succeed: bool = True
    message: str = ""
    data: Any = None
