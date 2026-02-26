@echo off
cd /d %~dp0


start "" server_keras_infer.exe


cd web
py -m http.server 8000