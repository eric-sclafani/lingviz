from fastapi import APIRouter, UploadFile
from loguru import logger
import polars as pl

from schemas.dynamic_result import DynamicResult

router = APIRouter(prefix="/api")


@router.post("/file_upload/")
async def file_upload(file: UploadFile):

    try:
        contents = await file.read()
        df = pl.read_csv(contents)
        logger.info(df)
    except Exception:
        return DynamicResult(
            succeed=False, message="There was an error reading uploaded file"
        )
    finally:
        await file.close()

    logger.debug(f"File upload successfull: {file.filename}")
    return DynamicResult(
        succeed=True,
        message="File uploaded successfully",
        data={"fileName": file.filename, "contents": contents.decode()},
    )
