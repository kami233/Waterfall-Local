@echo off
REM ����Ƿ���ק���ļ���
if "%~1"=="" (
    echo ����קһ���ļ��е�����������ļ��������� html �ļ���
    pause
    exit /b
)

REM ��ȡ��ק�������ļ���·��
set "directory=%~1"

REM ���·���Ƿ�Ϊ�ļ���
if not exist "%directory%\*" (
    echo �����ṩ��·������һ���ļ��С�
    pause
    exit /b
)

REM ���� Python �ű����� HTTP ������
python waterfall_local.py "%directory%"

REM ��ͣ���Ա�鿴���
REM pause
