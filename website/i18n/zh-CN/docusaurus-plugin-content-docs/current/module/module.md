---
id: module
sidebar_position: 4
---

# 模块

在之前的文章中，我们学习了如何通过模块导出可注入对象。同时你可能注意到了，为了设置一个 HTTP 服务器，我们调用了
`createHttpModule`, 它返回了一个模块，用于管理 HTTP 请求。

你可能也注意到了，应用的入口点也是一个模块。

模块在 SenseJS 中扮演着重要的角色。它被设计用于完成以下工作：

-   提供程序入口点

-   导出可注入对象以便其他模块使用

-   初始化和销毁可注入对象所需的资源，例如创建数据库连接和建立 HTTP 监听器。

本章将会讨论模块的更多细节。


