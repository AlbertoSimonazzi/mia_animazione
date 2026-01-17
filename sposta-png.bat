@echo off
echo Spostamento PNG dalla cartella Downloads...
echo.

REM Sposta tutti i PNG dalla Downloads alla cartella components
move /Y "%USERPROFILE%\Downloads\70000*.png" "images\components\"

echo.
echo Fatto! PNG spostati in images\components\
echo.
pause
