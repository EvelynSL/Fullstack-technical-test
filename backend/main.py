from fastapi import FastAPI
from routes import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Items API",
    description="REST API for item management - Technical Test",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


app.include_router(router)