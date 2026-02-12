@echo off
cd /d %~dp0\web
python -m http.server 8000
pause
