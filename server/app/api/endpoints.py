from fastapi import APIRouter, UploadFile
from loguru import logger
import polars as pl

from schemas.text_col_name import TextColumnName
from schemas.dynamic_result import DynamicResult

router = APIRouter(prefix="/api")


class DataWrapper:

    def __init__(self):
        self.df: pl.DataFrame | None = None
        self.df_is_loaded = self.df != None
        self.text_col_name: str = ""


data = DataWrapper()


@router.post("/file_upload/")
async def receive_file_upload(file: UploadFile):
    result = DynamicResult()
    try:
        contents = await file.read()
        data.df = pl.read_csv(contents)
        logger.debug(
            f"\n~~~~~~~~\nFile upload successful.\nFile name: {file.filename}\nDF Shape: {data.df.shape}\n~~~~~~~~"
        )
    except Exception:
        result.succeed = False
        result.message = "There was an error reading uploaded file"
    finally:
        await file.close()

    result.succeed = True
    result.message = "File uploaded successfully"

    return result


@router.post("/text_col_name/")
async def receive_text_col_name(col_name: TextColumnName):

    result = DynamicResult()

    if data.df is not None and col_name.name not in data.df.columns:
        result.succeed = False
        result.message = "Provided text column not found in dataset"
    else:
        data.text_col_name = col_name.name
        result.succeed = True
        result.message = "Text column received"
        result.data = {"text_column_name": data.text_col_name}

    return result
