---
layout: post
title: "HBase on Spark NioWorkerPool VerifyError"
date: 2018-08-12
categories: 
- BigData
- Framework
tags: 
- HBase
- HBase on Spark
- Solution
---

# 问题现象

提交HBase on Spark的Yarn Cluster任务时，AM启动失败，抛出如下异常：

	ERROR [2016-08-22 14:54:47,127] ({sparkDriverActorSystem-akka.actor.default-dispatcher-7} Slf4jLogger.scala[apply$mcV$sp]:66) - Uncaught fatal error from thread [sparkDriverActorSystem-akka.remote.default-remote-dispatcher-8] shutting down ActorSystem [sparkDriverActorSystem]
	java.lang.VerifyError: (class: org/jboss/netty/channel/socket/nio/NioWorkerPool, method: createWorker signature: (Ljava/util/concurrent/Executor;)Lorg/jboss/netty/channel/socket/nio/AbstractNioWorker Wrong return type in function
		at akka.remote.transport.netty.NettyTransport.<init>(NettyTransport.scala:283)
		at akka.remote.transport.netty.NettyTransport.<init>(NettyTransport.scala:240)
		at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
		at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62)
		at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
		at java.lang.reflect.Constructor.newInstance(Constructor.java:423)
		at akka.actor.ReflectiveDynamicAccess$$anonfun$createInstanceFor$2.apply(DynamicAccess.scala:78)
		at scala.util.Try$.apply(Try.scala:161)
		at akka.actor.ReflectiveDynamicAccess.createInstanceFor(DynamicAccess.scala:73)
		at akka.actor.ReflectiveDynamicAccess$$anonfun$createInstanceFor$3.apply(DynamicAccess.scala:84)
		at akka.actor.ReflectiveDynamicAccess$$anonfun$createInstanceFor$3.apply(DynamicAccess.scala:84)
		at scala.util.Success.flatMap(Try.scala:200)
		...

# 可能原因

Netty包冲突。

## 问题分析

从堆栈中可以看出，问题出在NioWorker的初始化过程中，发生了调用方法得到了非预期的返回值的状况。这种状况一般出现在依赖jar与环境jar版本不一致或者lib包出现多版本冲突的时候。根据堆栈可以得出问题出在Netty包，进而通过查询可以发现Netty在两个版本间接口存在变动。

## 解决方案

排查Classpath中是否存在多版本Netty包，以及编译Netty依赖是否与环境一致。

注：Spark Assembly包中通常含有Netty包的类，注意排查。