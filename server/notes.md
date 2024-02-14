- [x] 1. Add Async Handler
- [x] 2. Add Global Error Handler
- [x] 3. Send Proper Data With Structure
- [ ] 4. Dependency Injection -> API Testing
- [ ] 5. Docker Deployment Of API only
- [ ] 6. Github Workflow For Backend Only
- [ ] 7. Use Redis For Caching. Use Docker only
- [ ] 8. Documentation using SWAGGER UI
- [ ] 9. Add Redux Code
- [ ] 10. Possible CONSTANTS & Utils Code
- [ ] 11. Expense Planner


----
docker run --name my-redis-container -d -p 6379:6379 redis
docker exec -it my-redis-container redis-cli

```redis
# Start redis-cli in interactive mode
docker exec -it my-redis-container redis-cli

# SET: Set the value of a key
SET mykey "Hello"

# GET: Get the value of a key
GET mykey

# DEL: Delete a key
DEL mykey

# EXISTS: Check if a key exists
EXISTS mykey

# FLUSHDB: Remove all keys from the current database
FLUSHDB

# FLUSHALL: Remove all keys from all databases
FLUSHALL

# KEYS: Find all keys matching a pattern
KEYS *

# HSET: Set the field in a hash stored at the key to the value
HSET myhash field1 "value1"

# HGET: Get the value associated with the specified field in a hash
HGET myhash field1

# HGETALL: Get all the fields and values in a hash
HGETALL myhash


```

