# ADVANCED SOFTWARE TECHNOLOGY
This is source backend for project: "Mua He Xanh Online Register System" 

## Vision
We would like to have a tool to help coordinate between universities and the local communities to maximize matching between community's needs and student abilities.

Community leaders can share about the projects that they need help with.

University administrator staff can verify and approve suitable projects.

Students can apply for projects that match their ability.

Community leaders should be able to reject un-qualified applicants.

## Prepare for running project
- Installing NodeJS v.16 or v.18, you can access link: [https://www.bing.com/ck/a?!&&p=8a4fbb3f0a6369cbJmltdHM9MTY5OTQ4ODAwMCZpZ3VpZD0xZWM2NjgwOC1mNTJkLTZmZDItMWY0Zi03Yjk4ZjQyNTZlM2MmaW5zaWQ9NTIwMQ&ptn=3&hsh=3&fclid=1ec66808-f52d-6fd2-1f4f-7b98f4256e3c&psq=install+nodejs&u=a1aHR0cHM6Ly9ub2RlanMub3JnL2VuL2Rvd25sb2Fk&ntb=1](https://nodejs.org/en/download)
- Installing MySQL: https://dev.mysql.com/downloads/workbench/

## How to run project 
1. Git clone: https://github.com/DucHuy2801/MuaHeXanhOnline.git
2. npm install
3. Create .env file follows .env.example
4. npm run start

##Build docker
1. Install docker desktop
2. Navigate to the place where the docker-compose.yml file exist
3. Open terminal and enter: docker compose -p docker-mhx up -d
4. Turn of greensummerapp (BE) Wait for mysql server to be ready, turn BE on again
5. Test api with postman
