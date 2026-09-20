---
agent: 'agent'
description: Review code quality, naming conventions, function documentation, and potential issues.

---

# Code Review

請針對目前選取的程式碼、目前檔案，或使用者指定的程式碼範圍進行 Code Review。

Review 時請嚴格按照以下規則檢查。

## 1. Variable Naming

檢查所有變數、參數、區域變數、屬性與欄位的命名是否符合 **camelCase**。

### 規則

* 一般變數必須使用 `camelCase`
* 第一個單字使用小寫
* 後續單字的第一個字母使用大寫
* 不應使用 `snake_case`
* 不應使用 `PascalCase` 作為一般變數名稱
* 不應使用不必要的縮寫
* 名稱應具有清楚且容易理解的語意

### 範例

```text
符合：
userName
playerId
totalPoints
selectedTeam
accessToken

不符合：
user_name
player_id
total_points
SelectedTeam
access_token
```

如果發現命名不符合規範，請指出：

1. 檔案名稱
2. 行號
3. 原始名稱
4. 建議名稱
5. 為什麼需要修改

---

## 2. Function Naming

檢查所有 function / method 的命名是否符合該語言的命名慣例。

一般情況下：

* Function 名稱應使用 `camelCase`
* Function 名稱應清楚描述其用途
* 避免使用過於模糊的名稱，例如 `doSomething()`、`handle()`、`process()`
* 如果 function 會執行動作，名稱應盡量使用動詞，例如：

  * `getUser()`
  * `fetchPlayers()`
  * `calculateTotalPoints()`
  * `updateTeam()`

如果 function 命名不符合規範，請提供修改建議。

---

## 3. Function Documentation

檢查每一個公開 function / method 是否具有完整且清楚的註解。

每個 function 的註解至少應包含：

* Function 的用途
* 每個參數的名稱與型別
* 每個參數的用途
* Return value 的型別
* Return value 的用途
* 如果 function 可能拋出 exception / error，應說明可能的錯誤情況
* 如果 function 有重要的 side effect，也應該說明

### Python 範例

```python
def get_player(player_id: int) -> Player:
    """
    Retrieve a player by player ID.

    Args:
        player_id (int): The unique identifier of the player.

    Returns:
        Player: The player matching the specified player ID.

    Raises:
        PlayerNotFoundError: If the player does not exist.
    """
```

### Dart / Flutter 範例

```dart
/// Retrieves a player by their unique identifier.
///
/// [playerId] is the unique identifier of the player.
///
/// Returns the corresponding [Player] object.
///
/// Throws [PlayerNotFoundException] if the player does not exist.
Future<Player> getPlayer(int playerId) async {
  ...
}
```

### TypeScript / JavaScript 範例

```typescript
/**
 * Retrieves a player by their unique identifier.
 *
 * @param playerId - The unique identifier of the player.
 * @returns A promise containing the requested player.
 * @throws {PlayerNotFoundError} If the player does not exist.
 */
async function getPlayer(playerId: number): Promise<Player> {
  ...
}
```

### 注意

不要為非常簡單且語意已經非常清楚的 private/local function 強制產生過度冗長的註解。

但是：

* Public API
* Service
* Repository
* Controller
* Provider
* Utility function
* 複雜的 business logic

應優先要求完整 documentation。

---

## 4. Type Annotation

檢查 function 的參數與回傳值是否有明確的型別。

優先要求：

```text
function(parameter: Type): ReturnType
```

而不是只有：

```text
function(parameter)
```

或：

```text
function(...)
```

### 檢查項目

* Function parameters 是否有明確型別
* Return type 是否明確
* Nullable value 是否有正確標示
* Collection / List / Map 是否有明確 element type
* Generic type 是否合理
* 是否存在不必要的 `dynamic`、`Any` 或過於寬鬆的型別

如果語言本身具有型別推導能力，可以接受合理的 local variable type inference。

不要為了「有型別」而加入沒有必要的冗餘型別宣告。

---

## 5. Code Quality

檢查程式碼是否存在以下問題：

* 重複程式碼
* 過長的 function
* 過深的 nested logic
* 不必要的 if/else
* 不必要的 null checking
* 不必要的 type conversion
* 不必要的 temporary variable
* Magic number / magic string
* 不清楚的 boolean 命名
* 過度複雜的條件判斷
* 可以抽取成 function 的重複邏輯
* 不必要的 exception handling
* 可能造成 runtime error 的程式碼

只提出具有實際改善價值的問題，不要為了增加 Review 數量而提出沒有意義的修改。

---

## 6. Comment Quality

檢查現有註解是否：

* 與實際程式碼行為一致
* 描述「為什麼」而不是單純重複「做了什麼」
* 沒有過時
* 沒有提供錯誤資訊
* 沒有不必要的大量註解

例如：

不推薦：

```python
# Add player to players
players.append(player)
```

推薦：

```python
# Players who have not participated in the current week are excluded
# from the fantasy ranking.
players = filter_active_players(players)
```

---

## 7. Error Handling

檢查可能發生錯誤的程式碼：

* API request
* Database operation
* File operation
* JSON parsing
* User input
* Network request
* Authentication / authorization
* Nullable data

確認是否有適當的 error handling。

同時避免：

```text
catch(Exception):
    pass
```

或其他會完全吞掉錯誤的寫法。

如果目前的 error handling 可能隱藏真正問題，請指出。

---

## 8. Security

檢查是否存在明顯的安全問題，例如：

* Hard-coded secrets
* API keys
* Passwords
* Tokens
* SQL injection
* Command injection
* 不安全的 user input
* 不必要的敏感資訊 logging
* 不安全的 authentication / authorization
* 不必要暴露內部錯誤訊息

如果發現敏感資訊，請不要在 Review 中重新完整列出 secret / token。

---

# Review Output Format

Review 完成後，請按照以下格式輸出。

## Summary

簡短說明這次 Review 的結果。

例如：

```text
Found 3 issues:
- 2 naming issues
- 1 missing function documentation
```

如果沒有問題：

```text
No significant issues found.
```

---

## Issues

按照嚴重程度排序：

### 🔴 Critical

可能造成：

* Security vulnerability
* Data loss
* Incorrect business logic
* Runtime failure

### 🟠 Major

可能造成：

* Maintainability problems
* Incorrect behavior under specific conditions
* Significant code quality issues

### 🟡 Minor

例如：

* Naming convention
* Missing documentation
* Small readability improvements

每個問題使用以下格式：

```text
[Minor] Variable naming

File: path/to/file.dart
Line: 42

Current:
user_name

Suggested:
userName

Reason:
Variable names should follow camelCase.
```

---

## Function Documentation

另外列出缺少完整 documentation 的 function：

```text
File: path/to/file.dart
Line: 42

Function:
getPlayer

Missing:
- Parameter type documentation
- Return type documentation
- Function purpose
```

如果 function 已經有完整 documentation，則不需要列出。

---

## Suggested Changes

最後提供一個簡短的修改建議清單。

例如：

```text
1. Rename `user_name` to `userName`
2. Add documentation to `getPlayer()`
3. Add explicit return type `Future<Player>`
```

不要直接修改程式碼，除非使用者另外要求你直接套用修改。

---

# Important Rules

1. 不要只檢查語法錯誤。
2. 必須檢查 variable naming。
3. 必須檢查 function documentation。
4. 必須檢查 function parameter types。
5. 必須檢查 function return types。
6. 必須檢查明顯的 code quality 問題。
7. 不要為了增加問題數量而提出沒有實際價值的建議。
8. 不要修改程式碼，除非使用者明確要求。
9. 不要重複列出相同問題。
10. Review 時優先指出會實際影響 maintainability、correctness、security 的問題。
11. 對於命名問題，必須提供目前名稱與建議名稱。
12. 對於 documentation 問題，必須明確指出缺少哪些資訊。
13. 如果 function 已經有完整且正確的 documentation，不需要要求重新撰寫。
14. 尊重該程式語言的官方命名慣例；若語言本身對某些項目有特殊命名規則，應優先遵循語言慣例。
15. 不要要求 local variable 為了型別明確而加入不必要的型別宣告。
