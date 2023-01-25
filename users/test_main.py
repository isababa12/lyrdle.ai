from fastapi.testclient import TestClient
from queries.users import UserOut, UserQueries
from authenticator import authenticator
from main import app

client = TestClient(app)

user = UserOut(
        id = 1,
        email = "Harry@gmail.com",
        username = "Tommy",
        hashed_password = "hahahah1414141",
    )
class UserRepo:
    def get_all(self):
        return [UserOut]

def test_get_all_user():
    app.dependency_override[UserQueries] = UserRepo
    response = client.get("/api/users")
    assert response.status_code == 200
    assert response.json() == [UserOut.dict()]



