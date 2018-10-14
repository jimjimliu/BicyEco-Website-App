import threading as thd
import time
import psycopg2
import random

#get query result;
#does not close connection here;
def retrieveQuery(query):
    cur.execute(query)
    rows=cur.fetchall()
    for r in rows:
        print ("id=",r[0],",email:",r[1],",password:",r[2],"firstname:",r[3],"\n")

    
#return a connection object
def dbConnection():
    hostname = 'localhost'
    database = ''
    port = '5432'
    username = 'postgres'
    password = ''

    connection = psycopg2.connect(host=hostname, database=database, user=username,
                              password=password,port=port)
    print ('connect successful!')
    return connection


def insert(conn):
    speed = random.randint(0,17)
    cur.execute("insert into project4900.test values(%s)", [speed])
    conn.commit()
   



def fn(conn):
    insert(conn)
    global t
    t = thd.Timer(1,fn,(conn,))
    t.start()
    



connector = dbConnection()
cur = connector.cursor()
##retrieveQuery("select*from project4900.users")
fn(connector)
time.sleep(60*30)
t.cancel()

##connector.close()
