# @codegenius/template-plugin

基于 **CodeGenius** 内置模板快速创建新项目, 仅支持询问模式;

使用场景: 用于创建青睐 **CodeGenius** 模板的新的项目 (目前模板为 `vitejs` 内置, 主要在模拟功能, 模板后续更新后可用).

## 安装

``` bash
npm i @codegenius/template-plugin -D
```

```javascript
import { defineConfig } from "code-genius";
import { templateInstaller } from "@codegenius/template-plugin";

export default defineConfig({
  plugins: [
    templateInstaller(),
  ],
});
```

## 使用

### 询问模式

```bash
# 启动询问模式(默认)
codeg template
```

```
# 询问过程
1. 请输入项目名称
2. 请输入 package name
3. 请选择下列的有效模板
4. 请选择下列的有效变体
```

```bash
# 启动询问模式(带参)
codeg template -n project-salkdyfT -f vue
```

| 选项                                | 描述     |
| ----------------------------------- | -------- |
| -n, --project-name \<project-name\> | 项目名称 |
| -f, --framework \<framework\>       | 项目框架 |

```
# 询问过程
1. 请输入项目名称 (-n 输入则仅需确认)
2. 请输入 package name
3. 请选择下列的有效模板 (-f 输入有效则跳过)
4. 请选择下列的有效变体
```
