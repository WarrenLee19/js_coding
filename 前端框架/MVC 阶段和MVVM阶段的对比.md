## 前端 MVC 阶段
在对比之前，我们需要知道促使前端 MVC 阶段的背景，是因为前端脚本具备读写数据、处理数据、生成视图等功能，页面需求开始变得复杂起来。此时，前端生态迫切需要开发出轮子工具，目的是便利开发者来管理他们的代码，“时势造英雄”，属于前端的 MVC 框架诞生了。

前端MVC模式主要分为三部分：

- 视图（View）：用户界面
- 控制器（Controller）：业务逻辑
- 模型（Model）：数据模型

View 作为用户界面，发送指令给 Controller，Controller 要求 Model 改变状态，同时 Model 把更新过的数据发送给 View 反馈给用户。

2010年，第一个前端 MVC 框架 Backbone.js 诞生，此后，也有其他前端MVC模式框架出现

## 前端 MVVM阶段
MVVM 同样是一种软件架构模式，它是在 MVC 的基础上演进过来的，去掉了 MVC 中的 Controller，这个模式的特点是 View 绑定着 View Model，假设View Model中的数据发生了改变，View也随之改变，反之亦然。

前端MVVM模式主要分为四部分：

- View层：视图展示。
- View Model层：视图适配器。暴露属性与View元素显示内容或者元素状态一一对应。一般情况下View Model暴露的属性建议是readOnly的，View持有View Model，ViewModel不能依赖UI的任何属性。有两个原因：一是为了View Model可测性，即单元测试方便进行，这也是上图提到MVVM的可测试性；二是团队人员可分离开发，也是低解耦性的体现。
- Model层：数据模型与持久化抽象模型。数据模型就是从服务器请求回来的JSON数据。而持久化抽象模型暂时放在Model层，是因为MVVM诞生之初就没有对这块进行很细致的描述。按照经验，我们在业务开发时通常把数据库操作、文件操作封装成Model，并对外提供操作接口。

Binder：MVVM中的核心概念。如果MVVM没有Binder，那么它与MVC的差异不是很大。

最能代表MVVM模式的框架便是Google 公司推出的 Angular，它的核心概念便是数据的双向绑定。往后的框架借助MVVM模式的思想也逐渐迸发，在2016年中，前端框架经过多次迭代发展，业界逐渐形成三足鼎立的局势：

- React 由Facebook开发，使用方式是最接近原生JavaScript
- Vue 由华人程序员尤雨溪开发，以上手简单著称
- Angular 上面提过，由谷歌开发，由第一代框架Angular发展而来，以大而全著称

## 对比
![在这里插入图片描述](https://img-blog.csdnimg.cn/7b2bec47a8a241eca27e8afed73af39c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATGVlVGlrUGFhazE5,size_20,color_FFFFFF,t_70,g_se,x_16)
由上图可知，MVC模式下，Controller负责View和Model之间的调度，View一旦发生交互则回调给Controller，随着业务越来越复杂，视图交互越来越复杂，Controller层将变得越臃肿，从而BUG越来愈多。

为了解决MVC模式带来的问题，MVVM模式出现了。

MVVM模式改变的地方在于把MVC模式的View和Controller都放在了View层（相当于把Controller一些逻辑抽离出来），Model层依然是服务端返回的数据模型。而View Model则作为UI绑定层，也就是说View中每个UI元素都应该在View Model找到与之对应的属性。
除此之外，从Controller抽离出来的与UI有关的逻辑都放在了View Model中，这样就减轻了Controller的负担，因此也解决Controller过于臃肿的问题。