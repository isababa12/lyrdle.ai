import os
from pyscopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
# QUESTION: Does it matter that both users and lyrics have the same "DATABASE_URL" key?

