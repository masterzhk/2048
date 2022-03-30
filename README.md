# 2048小游戏

## 游戏说明

在一个4*4的方阵里，通过**键盘**、**鼠标**、**手势**控制数字**往四边移动**，相邻且**相同的数字会合并**，每移动一次，会在方阵的空闲位置随机添加一个数字2，游戏目标就是**合成一个2048**。当方阵里填满数字且无法移动合并时，游戏结束。

这里支持的最大数字是8192，两个8192合并变0，两个0合并还是0:sunglasses:。

可以到这里在线体验一下[2048小游戏](https://masterzhk.github.io/2048/)。

## 项目说明

整个游戏使用HTML、CSS、JavaScript实现。用HTML定义出页面的各部分内容，用CSS渲染成想要的布局效果，用JS来驱动主要的游戏逻辑。

关于HTML、CSS、JavaScript的学习，可以参数[MDN文档](https://developer.mozilla.org/en-US/)。

## 项目部署

整个项目没有任何的后端交互逻辑，所以只需要满足支持静态文档的部署方式即可。

这里使用的是[GitHub Pages](https://pages.github.com/)来部署。

## 相关实现说明

### 数字方阵

数字方阵使用一个div容器内嵌16个div元素来表示，各元素加上对应的id、class属性，用于CSS渲染和JS定位交互。

使用CSS的[Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)布局来渲染出4*4的方阵效果。

数字方块使用CSS的[aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)属性来保持1:1的横宽比。

### 自适应大小

在flex布局下设置div容器的width为100%，另外设置max-width为75vh、min-width为5cm来控制容器跟着视图大小自动调整，且不至于过大或过小。

方块里的数字字体的大小没找到较好的纯CSS的方案，所以使用JS监听窗体的resize事件，来实时计算出相对合适的大小。

### 居中显示

[参考这里](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Center_an_element)。

### 键鼠控制

**鼠标滑动**效果使用JS监听[mousedown](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event)、[mouseup](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event)事件，计算坐标差来判断滑动操作。

**手势滑动**效果使用JS监听[touchstart](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event)、[touchend](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event)事件，计算坐标差来判断滑动操作。

**键盘控制**效果使用JS监听[keyup](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event)事件来判断键盘操作。

### 渐变效果

使用CSS的[transition](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)实现简单的渐变。

## TODO（可能永远也不会DO :joy:）

* 方块滑动动画
* 音效
* 自定义方块内容
