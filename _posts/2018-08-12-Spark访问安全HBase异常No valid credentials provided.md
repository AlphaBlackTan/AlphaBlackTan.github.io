---
layout: post
title: "Spark访问安全HBase异常No valid credentials provided"
date: 2018-08-12
categories: 
- BigData
- Framework
tags: 
- Spark
- Solution
- HBase on Spark
---

# 问题现象

在Spark（cluster模式）上访问安全HBase抛出如下异常：

	...
	DEBUG | Connecting to linux18/10.75.202.18:21310 | org.apache.hadoop.hbase.ipc.RpcClientImpl$Connection.setupIOStreams(RpcClientImpl.java:713)
	INFO | RPC Server Kerberos principal name for service=MasterService is hbase/hadoop.hadoop.com@HADOOP.COM | org.apache.hadoop.hbase.ipc.RpcClientImpl$Connection.processPreambleResponse(RpcClientImpl.java:817)
	DEBUG | PrivilegedAction as:alphatan (auth:SIMPLE) from:org.apache.hadoop.hbase.ipc.RpcClientImpl$Connection.setupIOStreams(RpcClientImpl.java:741) | org.apache.hadoop.security.UserGroupInformation.logPrivilegedAction(UserGroupInformation.java:1805)
	DEBUG | Creating SASL GSSAPI client. Server's Kerberos principal name is hbase/hadoop.hadoop.com@HADOOP.COM | org.apache.hadoop.hbase.security.HBaseSaslRpcClient.<init>(HBaseSaslRpcClient.java:103)
	DEBUG | PrivilegedActionException as:alphatan (auth:SIMPLE) cause:javax.security.sasl.SaslException: GSS initiate failed [Caused by GSSException: No valid credentials provided (Mechanism level: Failed to find any Kerberos tgt)] | org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1782)
	...

如捕捉到上诉DEBUG日志，在最后将会引发一个TGT异常，因为公司保守，无法将总结带出，笔者在此全手打就不敲出完整堆栈了。

# 可能原因

HBase on Spark 兼容性缺陷。

## 问题分析

Spark作为分布式计算框架，其cluster模式业务逻辑运行于YARN集群的多个独立JAVA进程中。Spark实现会将UGI的currentUser的Auth模式设置为SIMPLE，因此即使在Spark业务代码里再次进行认证依然会抛出上诉异常。

## 问题解决方案

1. 在连接安全HBase时，使用对应ugi的doAs()接口包装连接逻辑，进而避免按照默认使用SIMPLE模式连接安全HBase。

    	ugi.doAs(new PrivilegedAction<Void>() {
    		public Void run() {
    			...
    			/* Connect HBase code */
    			...
    
    			return null;
    		}
    	});

2. 修改Spark提交实现，在提交任务时传递token给Driver。这个实现比较复杂，有兴趣的读者可以自行琢磨，笔者就不在这里过多描述了。