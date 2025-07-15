from fastapi import FastAPI, UploadFile, APIRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
router = APIRouter(prefix="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@router.post("/fileupload/")
async def file_upload(file: UploadFile):
    return {"fileName": file.filename}


app.include_router(router)
