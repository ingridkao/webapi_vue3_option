# webapi_vue3_option
以頁面來切開不同api

## Reqres
> 需求： 透過Reqres來複習三個寫法的差異
### ＨOW:
1. 用XMLHttpRequest取得all user
2. 用fetch API取得page2的user list
3. 用axios取得特定user
    1. 安裝：`npm install axios`
    2. 匯入：`import axios from 'axios'`

## CRUD
> 需求： 透過Reqres來試試看CRUD
### ＨOW:
1. 加入Loading
2. 使用axios取得user清單，並將params設置到data中
3. 增加分頁
4. 將user list資料整理排版
5. 加入簡易的搜尋ID功能
6. 加入CRUD，可惜Reqres API僅假資料