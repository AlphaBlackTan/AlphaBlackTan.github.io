---
layout: post
title: "HDFS No Common protection layer between client and server"
date: 2018-08-12
categories: 
- BigData
- Framework
tags: 
- Hadoop
- HDFS
- HDFS Client
- Solution
---

# 问题现象

HDFS Client访问Server出现如下异常：

	...
	Caused by: javax.security.sasl.SaslException: No common protection layer between client and server
        at com.sun.security.sasl.gsskerb.GssKrb5Client.doFinalHandshake(GssKrb5Client.java:251)
        at com.sun.security.sasl.gsskerb.GssKrb5Client.evaluateChallenge(GssKrb5Client.java:186)
        at org.apache.hadoop.security.SaslRpcClient.saslEvaluateToken(SaslRpcClient.java:483)
        at org.apache.hadoop.security.SaslRpcClient.saslConnect(SaslRpcClient.java:427)
        at org.apache.hadoop.ipc.Client$Connection.setupSaslConnection(Client.java:552)
        at org.apache.hadoop.ipc.Client$Connection.access$1800(Client.java:367)
        at org.apache.hadoop.ipc.Client$Connection$2.run(Client.java:717)
        at org.apache.hadoop.ipc.Client$Connection$2.run(Client.java:713)
        at java.security.AccessController.doPrivileged(Native Method)
        at javax.security.auth.Subject.doAs(Subject.java:422)
        at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1614)
        at org.apache.hadoop.ipc.Client$Connection.setupIOstreams(Client.java:712)
        ... 34 more

# 可能原因

该异常由服务端与客户端配置项hadoop.rpc.protection不一致导致。

# 问题解决方案

修正服务端或客户端hadoop.rpc.protection配置，确保两端一致。如修改服务端需重启服务。