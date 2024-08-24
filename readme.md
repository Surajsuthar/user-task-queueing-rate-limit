# Project Title
User Task Queuing with Rate Limiting
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
## Installation
1. Clone the repository:
```
 git clone https://github.com/Surajsuthar/user-task-queueing-rate-limit.git
```

2. Install dependencies:
```
 npm install
 ```
3. Start redis server with docker:
```
docker run --name my-redis -p 6379:6379 -d redis
```
## Usage
To run the project, use the following command:
```bash
pm2 start ecosystem.config.js
```
