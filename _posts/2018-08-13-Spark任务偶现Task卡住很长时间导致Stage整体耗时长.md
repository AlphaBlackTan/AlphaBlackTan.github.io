---
layout: post
title: "Spark任务偶现Task卡住很长时间导致Stage整体耗时长"
date: 2018-08-13
categories: 
- BigData
- Framework
tags: 
- Spark
- Solution
---

# 问题现象

提交大量Spark任务，概率性出现个别Task卡住一段时间，进而导致Stage整体耗时开销异常。

# 可能原因 

NodeManager FullGC

## 问题分析
### 采样Job836
异常Stage2249 -> 卡住Task8：

对应Executor日志：
	
	...
	INFO | [Executor task launch worker-78] | Running task 8.0 in stage 2249.0 (TID 222920) | org.apache.spark.Logging$class.logInfo(Logging.scala:59)
	ERROR | [shuffle-client-1] | Connection is dead; please adjust spark.network.timeout if this is wrong | org.apache.spark.network.server.TransportChannelHandler.userEventTriggered(TransportChannelHandler.java:128)
	ERROR | [shuffle-client-1] | Still have 2 requests outstanding when connection form /10.12.122.244:27337 us closed | org.apache.spark.network.server.TransportChannelHandler.channelUnregistered(TransportChannelHandler.java:102)
	INFO | [shuffle-client-1] | Retrying fetch (1/3) for 1 outstanding blocks after 5000 ms | org.apache.spark.network.shuffle.RetryingBlockFetcher.initiateRetry(RetryingBlockFetcher.java:163)
	ERROR | [shuffle-client-1] | Failed while starting block fetches | org.apache.spark.network.shuffle.OneForOneBlockFetcher$1.onFailure(OneForOneBlockFetcher.java:151)
	java.io.IOException: Connection from /10.12.122.244:27337 closed
		at org.apache.spark.network.server.TransportChannelHandler.channelUnregistered(TransportChannelHandler.java:104)
		at org.apache.spark.network.server.TransportChannelHandler.channelUnregistered(TransportChannelHandler.java:94)
		...
	INFO | [shuffle-client-1] | Retrying fetch (1/3) for 1 outstanding blocks after 5000 ms | org.apache.spark.network.shuffle.RetryingBlockFetcher.initiateRetry(RetryingBlockFetcher.java:163)
	...

查看主机10.12.122.244的端口27337发现为NodeManager。查看其内存开销发现其内存已经用尽，进一步查看其GC日志，发现NodeManager存在频繁的长时间Full GC，进而导致其在GC阶段长时间无法响应Executor的请求，进而导致Executor卡住。

## 问题解决方案

调整NodeManager堆内存，适应业务场景开销。