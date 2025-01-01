from fastapi import APIRouter, File, Form, UploadFile
from loguru import logger
import polars as pl

from schemas.dynamic_result import DynamicResult

router = APIRouter(prefix="/api")


# TODO: move to own module eventually
class DataWrapper:

    def __init__(self):
        self.df: pl.DataFrame | None = None
        self.df_is_loaded = self.df != None
        self.text_col_name: str = ""


data = DataWrapper()


@router.post("/file_upload/")
async def receive_file_upload(file: UploadFile, text_field_name: str = Form(...)):
    result = DynamicResult()
    try:
        contents = await file.read()
        data.df = pl.read_csv(contents)

        data.df_is_loaded = True

        logger.debug(
            f"\n~~~~~~~~\nFile upload successful.\nFile name: {file.filename}\nDF Shape: {data.df.shape}\nText field name:{text_field_name}\n~~~~~~~~"
        )
    except Exception:
        result.succeed = False
        result.message = "There was an error reading uploaded file"
    finally:
        await file.close()

    result.succeed = True
    result.message = "File uploaded successfully"

    return result


# https://spacy.io/api/docbin
# https://github.com/eric-sclafani/langviz/tree/app-restructure/src/langviz/data_loader
