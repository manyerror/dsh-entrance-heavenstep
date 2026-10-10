# 更新记录

## v1.0.0 — 2026-10-10

`dsh-entrance-heavenstep` 的首个版本，衍生自 [AAAholic/dsh-entrance](https://github.com/AAAholic/dsh-entrance)。

- 新作品「水光之下」：冷银蓝水光场景的分层登场，跃水鱼群与冷色光点，退出仍由
  `welcomeWaterWaves()` 同一几何驱动水体与欢迎层遮罩。
- 主视觉为使用者提供的完整场景图（`lib/assets/entrance/20261010/hero.jpg`），按原比例整层呈现；
  无挥手、眨眼等局部动作，也未做抠图。
- 插件标识改为 `dsh-entrance-heavenstep`：包名、Cordis patch、两个入口、ModuleLoader ID、
  资源前缀 `/dsh-entrance-heavenstep/assets`、偏好键与 DOM 标记同步；并加入与上游
  `dsh-entrance` 的并存避让。
- 设置面板隐藏本作品不支持的挥手与飘带控件（偏好字段保留兼容）。
- 字号改用 `min(cqw, vh)` 自适应，修复矮宽窗口下副题与品牌重叠；主标题去掉标点。
- 新增演示素材 `docs/media/heavenstep-*.{jpg,gif}`，并在 `LICENSE-ASSETS` 记录哈希。

检查结果：构建一致性、单元测试 `16/16`、浏览器检查 `36/36`、安装包源文件与素材哈希校验通过
（Windows / Node v22.20.0）。来源、设计与未验证项见 [个人入场记录](docs/PERSONAL-ENTRANCE.md)。

## 上游历史（dsh-entrance）

## v1.0.2 — 2026-10-08

- 右上角两个常驻按钮合并为低对比度的“动画设置”，重播移入设置面板；默认宵宫作品继续随包提供。
- README 优先展示演示与安装；DIY 明确为用户主动提出才启用的实验性能力，使用完整 Git 克隆。
- 根据三轮 DS 试用缩短创作指引，删除默认偏好式示例，允许有依据的联想；记录第三轮视觉不通过及技术、原生、视觉证据边界。
- CI 系统依赖改用官方 HTTPS 镜像，为 APT 和浏览器下载设置有限重试与分步超时，避免网络故障长时间无输出。

验证范围见 [本版记录](docs/validation-1.0.2.json) 和 [版本说明](docs/releases/v1.0.2.md)，不继承旧版本的通过结论。

## v1.0.1

修复自动发布的标签判断和草稿 Release 查询，附件校验后公开；动画运行时代码与素材沿用 v1.0.0。详见 [版本说明](docs/releases/v1.0.1.md)。

## v1.0.0

首个独立安装包：宵宫分层登场、局部动作、游鱼、飘带和水波退出，附构建、浏览器与安装包检查。详见 [版本说明](docs/releases/v1.0.0.md) 和 [历史验证](docs/validation-1.0.0.json)。
