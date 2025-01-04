from fastapi import APIRouter, Form, UploadFile
from loguru import logger
import polars as pl

from schemas.dynamic_result import DynamicResult
from schemas.corpus import Corpus
import services.processing as processing

router = APIRouter(prefix="/api")


# TODO: move to own module eventually
class DataWrapper:

    def __init__(self):
        self.df: pl.DataFrame | None = None
        self.text_field_name: str = ""


# https://spacy.io/api/docbin
# https://github.com/eric-sclafani/langviz/tree/app-restructure/src/langviz/data_loader
data = DataWrapper()


@router.post("/file_upload/")
async def receive_file_upload(file: UploadFile, text_field_name: str = Form(...)):
    result = DynamicResult()
    try:
        contents = await file.read()
        df = pl.read_csv(contents)
        validate_file_upload(df, text_field_name)

        data.df = df
        data.text_field_name = text_field_name

        result.succeed = True
        result.message = "File uploaded successfully"

    except Exception as e:
        result.succeed = False
        result.message = f"Error reading file: {str(e)}"

    finally:
        await file.close()

    return result


def validate_file_upload(df: pl.DataFrame, text_field_name: str) -> bool:

    headers = df.columns
    if text_field_name not in headers:
        raise ValueError(
            f"Text field '{text_field_name}' not found in provided dataset"
        )

    if df.shape[0] == 0:
        raise ValueError("Provided dataset is empty!")

    return True


@router.get("/corpus_data/")
async def create_corpus():
    df = pl.read_csv("../data/toy_user_reviews.csv")
    text_data = df["user_review"]
    pipe = processing.create_nlp_pipe("en_core_web_sm", text_data)
    if pipe:
        pass

    # TODO: step 1 = implement simple corpus calculations
    return "hello"
