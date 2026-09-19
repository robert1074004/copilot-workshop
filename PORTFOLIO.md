![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案從基本的待辦管理功能開始，逐步加入深色模式、清單篩選與批次清除功能，並透過 GitHub Issue 與 Pull Request 管理需求和修正。

## 線上展示

[GitHub Pages](https://robert1074004.github.io/copilot-workshop/)



## 功能

- 新增待辦事項，空白內容不會被加入。
- 勾選或取消勾選待辦事項，完成項目會顯示刪除線並淡化。
- 逐筆刪除待辦事項。
- 顯示整體清單的未完成項目數量。
- 清單為空時顯示提示文字。
- 使用 `localStorage` 保存待辦資料，重新整理後仍可保留。
- 支援淺色與深色模式切換。
- 未手動設定主題時，會依照作業系統的深淺色偏好顯示。
- 記住使用者選擇的主題偏好。
- 支援「全部」、「未完成」與「已完成」篩選。
- 篩選結果為空時顯示對應提示，並說明資料仍保留在完整清單中。
- 一次清除所有已完成項目，執行前會顯示確認對話框。
- 沒有已完成項目時，「清除已完成」按鈕會停用。
- 支援手機螢幕的響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何框架、套件或外部 CDN。
- 資料透過瀏覽器的 `localStorage` 保存。
- CSS 顏色集中使用 CSS 變數管理，並提供淺色與深色主題。
- 可直接離線開啟根目錄的 `index.html` 使用。

## 開發方式

- 使用 GitHub Copilot Agent Mode，從需求描述開始建立待辦清單的 HTML、CSS 與 JavaScript。
- 使用 Microsoft Learn MCP 查詢 `prefers-color-scheme` 與網頁無障礙色彩對比的官方文件，作為深色模式與配色檢查的參考。
- 使用 GitHub MCP 讀取 repository 的 Issues，依照 issue 內容處理篩選提示與清除已完成項目等需求。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義處理 Issue 的 agentic workflow，依序完成讀取 Issue、提出計畫、建立分支、修改、驗證、提交推送與建立 Pull Request。
- 使用 GitHub Pull Request 管理每項功能修正，並在瀏覽器中驗證實際操作流程。

## 我學到什麼

- 如何用原生 JavaScript 管理 DOM、事件與 `localStorage` 資料。
- 如何設計篩選狀態與渲染流程，讓畫面顯示與完整資料保持一致。
- 如何使用 CSS 變數與系統偏好完成可保存的淺色／深色模式。
- 如何透過 GitHub Issue、分支、commit 與 Pull Request 管理開發工作。
- 如何結合 Copilot Agent Mode、MCP 與 agentic workflow，將需求、文件查詢、實作和驗證串成完整流程。
