@echo off
title UluKontrol Mobil Web Uygulamasi
echo =========================================
echo    UluKontrol - Mobil PWA Baslatiliyor
echo =========================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
