from fastapi import APIRouter, UploadFile
from loguru import logger
import polars as pl
from pydantic import BaseModel

from schemas.dynamic_result import DynamicResult

router = APIRouter(prefix="/api")


class DataWrapper:

    def __init__(self):
        self.df: pl.DataFrame | None = None
        self.text_col_name: str | None


data = DataWrapper()


@router.post("/file_upload/")
async def receive_file_upload(file: UploadFile):

    try:
        contents = await file.read()
        data.df = pl.read_csv(contents)
    except Exception:
        return DynamicResult(
            succeed=False, message="There was an error reading uploaded file"
        )
    finally:
        await file.close()

    logger.debug(
        f"\n~~~~~~~~\nFile upload successful.\nFile name: {file.filename}\nDF Shape: {data.df.shape}\n~~~~~~~~"
    )
    return DynamicResult(
        succeed=True,
        message="File uploaded successfully",
        data={"shape": str(data.df.shape)},
    )


class TextColumnName(BaseModel):
    name: str


@router.post("/text_col_name/")
async def receive_text_col_name(name: TextColumnName):

    result = DynamicResult()

    if data.df is not None:

        if name.name not in data.df.columns:
            result.succeed = False
            result.message = "Provided text column not found in dataset"
        else:
            data.text_col_name = name.name
            result.succeed = True
            result.message = "Text column received"
            result.data = {"text_column_name": data.text_col_name}
    else:
        result.succeed = False
        result.message = "Column received but no data provided"

    return result
