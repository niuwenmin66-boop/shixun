@echo off
cd /d %~dp0

echo Using Python:
py --version

echo Checking uvicorn:
py -m pip show uvicorn

echo Starting backend...
py -m uvicorn app_pc:app --host 0.0.0.0 --port 8005

pause
