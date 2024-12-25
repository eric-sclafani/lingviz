from pydantic import BaseModel


class TextColumnName(BaseModel):
    name: str
