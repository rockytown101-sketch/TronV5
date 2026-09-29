# TRON Permission Control V5.0.2

这是从 V4.1.x 迁移到生产架构的 V5 基础包：**Electron 本地客户端 + 中央服务器 + PostgreSQL + TRON 链**。

## 已落实的核心规则
- C 分成两个完全独立来源：`MANUAL` 批量手动 C、`AUTO_TRANSFER` 自动发现 C。
- 自动发现：任何地址向配置的一个“被监控收款地址”发生成功的原生 TRX TransferContract 后，付款地址可作为新的 C 触发独立 Request ID。
- 权限变更目标是完整替换，不是追加。
- ContractType 46；默认 Owner/Active 为 A+B、threshold 2。
- C 不参与权限变更签名。
- A/B 私钥只在桌面客户端本地使用，服务器不接收私钥。
- 广播后必须链上验证权限才允许 `COMPLETED`；服务器状态 API 禁止直接设置 `COMPLETED`。
- 每个 C 独立失败；批量任务互不影响。
- C 端待处理申请保持 PENDING；“稍后处理”不会完成申请，15 秒后重新检查。
- PostgreSQL 存请求和审计日志，适合多设备，不再使用 V4 的本地 JSON 数据库。

## 给非工程师的部署方式
1. 安装 Docker Desktop。
2. 打开 `.env`，只需要设置密码、API_KEY 和监控收款地址。
3. Windows 运行 `deploy/install.ps1`；Linux/macOS 运行 `deploy/install.sh`。
4. 服务器健康检查：`http://服务器地址:8787/api/health`。
5. Electron 客户端中填写服务器地址。

## 重要测试边界
本版本增加了核心闭环检查：A+B 本地分步签名、getSignWeight 门槛、广播后链上权限验证、C 窗口级强制提示/15 秒暂缓，以及 A/B 签名必须属于同一 txID 的服务端约束。当前环境仍无法完成真实 Electron GUI 点击、Windows/macOS 原生安装包构建、PostgreSQL/Docker 实机部署，也没有在 TRON Testnet 上广播真实权限交易，因此这些项目仍未声称实机验证。
