from fastapi import FastAPI, UploadFile, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi import status, HTTPException
from text_processor import TextProcessor
import pandas as pd

app = FastAPI()
router = APIRouter(prefix="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

processor = TextProcessor()


def read_file_as_df(file: UploadFile) -> pd.DataFrame:
    df = pd.read_csv(file.file)
    file.file.close()
    return df


@router.post("/dataUpload/")
async def data_upload(file: UploadFile, textColName: str, idColName: str):
    df = read_file_as_df(file)

    if textColName not in df.columns:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Text column '{textColName}' not found in provided dataset",
        )
    if idColName not in df.columns:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unique ID column '{idColName}' not found in provided dataset",
        )

    processor.raw_docs = df[textColName]
    processor.raw_ids = df[idColName]
    processor.process_raw_documents()

    return {"file": file.filename}


app.include_router(router)
