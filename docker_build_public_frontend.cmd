@echo off

echo ------------------------------------------------------------------------
echo PRE-REQUISITE: 
echo 1. Docker Desktop need to be installed (bios virtualization enabled) and running as Administrator.
echo 2. This script is being run in its own respective project directory.
echo.
echo This script will: 
echo 1. build the app into your 'dist' folder (a war file is also created for manual deployment if you want to)
echo 2. replace nginx.conf with the selected env nginx-*.conf and copy it over to docker image
echo 3. copy the rest of the nginx files over to docker image
echo 4. containerize and save docker image to your Docker Desktop local repository.
echo 5. run the new container with the latest docker image locally for your testing
echo 6. push (optional) the docker image to Docker HUB (prod)
echo.
echo ------------------------------------------------------------------------
echo.

SET REPO_PROD=silverguo

SET CUR_DIR=%~dp0

echo current directory is %CUR_DIR%

SET /p ENV="Enter environment [dev/prod]: "
IF NOT DEFINED ENV (
	SET ENV=dev
	echo [INFO] no option selected, default to dev
)
IF %ENV% NEQ dev IF %ENV% NEQ prod (
	echo [ERROR] invalid environment selected. Exiting...
	pause
	exit
)
echo.

SET /p PUB="Build public-frontend? [n/y]: "
IF NOT DEFINED PUB (
	SET PUB=n
	echo [INFO] no option selected, default to n
)
echo.

REM ------------------------------------------------------------------------
IF %PUB% == y (
	cd %CUR_DIR%
	echo [INFO] building public-frontend
	call del public.war
	call rmdir /Q /S dist
	IF %ENV% NEQ prod (
		call npm run build-%ENV%
	) ELSE (
		call npm run build-%ENV%uction
	)	
)

REM ------------------------------------------------------------------------
cd nginx
echo [INFO] replacing nginx.conf with nginx-%ENV%.conf
call xcopy /y nginx-%ENV%.conf nginx.conf
cd ..

REM ------------------------------------------------------------------------
echo [INFO] containerizing qp-scs-public-frontend-%ENV% (and removing old versions of it)
call docker container rm -f qp-scs-public-frontend-%ENV%
call docker rmi -f qp-scs-public-frontend-%ENV%
call docker build -t qp-scs-public-frontend-%ENV% -f Dockerfile .
REM TODO: since uat & prod images will probably fail due to unreachable environment (i.e. DB) in local Docker Desktop, consider check for %ENV%=sit or just remove 
call docker run -d -p 80:80 -p 443:443 -v C:\test\qp-scs\public\nginx:/var/log/nginx --name qp-scs-public-frontend-%ENV% qp-scs-public-frontend-%ENV%:latest

echo.
SET /p PUSH="Push docker image to [%ENV%] Docker HUB? [n/y]: "
IF NOT DEFINED PUSH (
	SET PUSH=n
	echo [INFO] no option selected, default to n
)
IF %PUSH% == n (
	echo [INFO] Build Completed.
	pause
	exit
)

REM ------------------------------------------------------------------------
REM IF %ENV% == prod (
	echo.
	echo CONFIRM PUSH TO OVERWRITE LATEST IMAGE IN DOCKER HUB PROD REPOSITORY?
	pause
	SET REPO=%REPO_PROD%
	echo [INFO] pushing qp-scs-public-frontend-%ENV% docker image to Docker HUB
REM )

REM call aws ecr get-login-password --profile hdb-cps-%ENV% --region ap-southeast-1 | docker login --username AWS --password-stdin %REPO%
call docker login -u silverguo -p dckr_pat_I4kkbP1aL3gz10oAPHdZBfRHyIw
call docker tag qp-scs-public-frontend-%ENV%:latest %REPO%/qp-scs-public-frontend-%ENV%:latest
call docker push %REPO%/qp-scs-public-frontend-%ENV%:latest
call docker tag %REPO%/qp-scs-public-frontend-%ENV%:latest qp-scs-public-frontend-%ENV%:latest
call docker rmi -f %REPO%/qp-scs-public-frontend-%ENV%:latest

echo [INFO] Build and Push Completed.
pause
exit
