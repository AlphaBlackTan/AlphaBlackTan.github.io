---
layout: post
title: "SpringBoot基础工程搭建"
date: 2018-01-13
categories: 
- Back End
- Framework
tags: 
- Spring
- JAVA
- Spring Boot
photos:
- https://alphablacktan.github.io/images/post/spring.jpeg
---

# 写在前面

前日里心血来潮，学习了一下Spring Boot框架。但是因为笔者智商有限，在浏览许多教程时，倍感吃力。于是写下本文，旨在快速的指导搭建一个最简易的Spring Boot Hello World工程，帮助那些像笔者一样不知从何下手的新人迈出第一步。

# 构建Maven工程

首先我们需要建立一个Maven工程（读者们可以选用自己喜欢的IDE，笔者采用的是IDEA）：

![Maven工程](https://alphablacktan.github.io/images/post/1.png)

许多有资深经验的朋友也许会推荐一些Spring Boot的工程构建工具，但笔者认为对于我们这种新手来说，这样反而增大了入门的难度，过大的信息量会让理解变得困难。

然后我们需要为该Maven工程添加Spring Boot所必需的依赖项：

![这里写图片描述](https://alphablacktan.github.io/images/post/2.png)

在入门阶段，笔者认为最简单的就是设置parent为spring-boot-starter-parent，最简化maven的配置，在以后读者们可以随着进一步的深入对依赖进行裁剪或者根据需求进行追加，但笔者认为现在没有必要在此纠结。

# 编写启动器类

接下来，如果是以前的开发模式，读者们就得开始从事将其部署到服务器上等一系列繁琐的工作。幸运的是SpringBoot提供了这样一个非常便捷的启动器，我们只需要几行代码，便可以让SpringBoot自己跑起来：

![这里写图片描述](https://alphablacktan.github.io/images/post/3.png)

此时，虽然基本上还什么都没写，但已经可以让工程跑起来爽一下了：

![这里写图片描述](https://alphablacktan.github.io/images/post/4.png)

从日志中，我们大致可以看出来，其实SpringBoot的启动器也是找了个Tomcat进行了一番默认的配置然后启动运作。实际上我们写的启动器类大致就是做了这样一些事情，在此我们没有必要进行深究。
从上文图中的代码可以看出，该类非常简单，即调用一个启动函数，至于它如何实现的，暂时并不需要关心。同时，可以看见类的头上还有一个奇怪的注解“@SpringBootApplication”，它实际上为“@ComponentScan”，“@Configuration”和“@EnableAutoConfiguration”三个注解的整合。它为我们的工程提供了自动配置和组件扫描的能力。当然，目前我们还完全不需要关注配置（这个能力是SpringBoot比较引以为豪的优势，即大幅简化了开发初期的配置和部署等困难，但笔者认为在大中型项目的开发中后期，这将是个巨坑）。关于其提供的组件扫描功能，我们在下文中便可以进行体验，不得不说这个功能简化了许多无意义的配置。即SpringBoot会自动去寻找我们定义在下级包中的bean组件（说到bean，作为Spring的核心架构，认真解释起来就比较冗长了，在此读者们可以理解为一个任务的执行者。下文中的Controller也是bean的一种）。

# 编写控制器

接下来，我们需要编写传统MVC结构中的Controller，以便让这个Demo具有实际的功能（在此解释一下所谓的Controller，读者可以理解为，当用户通过请求访问后台时，Controller负责对特定的请求进行处理，并返回处理结果）。

![这里写图片描述](https://alphablacktan.github.io/images/post/5.png)

这个DemoController类即是一个最简单的Controller类（@Controller注解存在的意义就是向上文中被整合的@ComponentScan注解表明自己的身份，以便自己可以被正确的扫描到），它所承载的功能即是当用户访问http://localhost:8080/（该部分由注解@RequestMapping决定，读者可以根据自己的喜好更换）时便会返回一个程序员的信仰（Hello World!）。

![这里写图片描述](https://alphablacktan.github.io/images/post/6.png)

如此，一个最为简单的SpringBoot工程变宣告完工了，相信通过这样一个简单的过程，大家已经对SpringBoot擅长做的事情已经有了一个最初步的概念，即请求的处理。对于各个注解的含义以及开发的一些方法，并非本文致力解决的问题，在此变不再花大段的文字进行解释了（在后面的文章中笔者将会对其进行整合）。

# 写在后面

其实笔者是一个非常懒惰的人，不喜欢做花费时间和体力的事情，其实自笔者自开始认知SpringBoot到现在，已经弃坑好几次了，每次重拾都会在最基础的工程构建上卡一阵子（网上各位大咖的文章貌似都比较复杂，笔者实在难以理解吸收）。所以笔者决定写下这篇文章，给各位与笔者类似的同胞们，同时也是给下一次弃坑后重新入坑的自己，一个最简单的参考。

在最后，写下笔者对于开发、学习以及生活的一些反思。扯一个看似无关的话题即是，笔者喜欢沉溺于动漫的世界，类似于许多朋友们沉溺于游戏的世界里一样，它能让我的头脑放松下来，陷入一个简单的模式。许多时候笔者都会思考，为什么动漫以及游戏不需要花太多的头脑呢（当然，排除少数BT玩家，能玩游戏玩到拯救世界），有一次在一部名叫《刀剑神域》的动漫里我得到了一个比较认同的答案：情报量的不同。面对现实生活中无比庞大且与日俱增的情报量，我们会疲惫，会困惑，会选择向一个情报量较少的世界逃避。无论是只需要考虑这一局如何操作的游戏，或者是简单到只需要对别人的生活进行欣赏的动漫，都是我逃避复杂的现实生活的一个理想的世界。那么生活姑且不论，在工作与学习中我们有着不得不去面对的庞大的情报量。此时我们应该如何去面对呢？

目前笔者的思路即是针对需要解决的问题对情报进行切分抽取，其它的暂时先无视或者顶多扔到某个地方堆起来。即仅针对当前的情报进行收集，整合吸收。然后解决眼前的问题，对收获进行归档分享。就像这篇文章一样，目的仅仅是跑个SpringBoot来爽一爽，对其最本质，最核心的功能进行最简单的认知和体验。在不贪心其它知识点的前提下，以最少的时间换取最大的收获。