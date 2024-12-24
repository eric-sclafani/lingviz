from contextlib import asynccontextmanager
import os
from fastapi import FastAPI
import uvicorn
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from api.endpoints import router


@asynccontextmanager
async def app_lifespan(app: FastAPI):
    # await init_db()
    yield


origins = [
    "http://localhost:4200/",
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
]


app = FastAPI(lifespan=app_lifespan, middleware=middleware)

app.include_router(router)


def main():
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="localhost", port=port, reload=True)


if __name__ == "__main__":
    main()
