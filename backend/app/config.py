from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    aws_session_token: str = ""
    aws_default_region: str = "us-west-2"
    google_credentials_path: str = "credentials/service-account.json"
    claude_model: str = "us.anthropic.claude-sonnet-4-20250514-v1:0"
    max_prospects: int = 30
    cors_origins: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"


settings = Settings()
