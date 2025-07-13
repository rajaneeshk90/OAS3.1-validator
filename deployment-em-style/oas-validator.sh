cd OAS3.1-validator/. #this code is pulled inside a directory named this.
git stash && git pull
cp ./deployment-em-style/Dockerfile ./Dockerfile
docker build -t oas-validator .
docker stop oas-validator && docker rm  oas-validator
docker run -itd -p 4000:3000 --name oas-validator  oas-validator
