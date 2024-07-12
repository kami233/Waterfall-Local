@echo off
REM 检查是否拖拽了文件夹
if "%~1"=="" (
    echo 请拖拽一个文件夹到这个批处理文件上来生成 html 文件。
    pause
    exit /b
)

REM 获取拖拽过来的文件夹路径
set "directory=%~1"

REM 检查路径是否为文件夹
if not exist "%directory%\*" (
    echo 错误：提供的路径不是一个文件夹。
    pause
    exit /b
)

REM 调用 Python 脚本启动 HTTP 服务器
python waterfall_local.py "%directory%"

REM 暂停，以便查看输出
REM pause
