---
layout: post
title: "HDFS Client UnknownHostException NAMESERVICE"
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

HDFS Client抛出如下异常：

	java.net.UnknownHostException: NAMESERVICE
		at org.apache.hadoop.security.SecurityUtil.buildTokenService(SecurityUtil.java:374)
		at org.apache.hadoop.hdfs.NameNodeProxies.createNonHAProxy(NameNodeProxies.java:312)
		at org.apache.hadoop.hdfs.NameNodeProxies.createProxy(NameNodeProxies.java:178)
		at org.apache.hadoop.hdfs.DFSClient.<init>(DFSClient.java:665)
		at org.apache.hadoop.hdfs.DFSClient.<init>(DFSClient.java:601)

# 可能原因

Configuration实例缺乏配置项dfs.client.failover.proxy.provider.NAMESERVICE。

## 解决方案

在Configuration实例或其加载的配置文件中添加对应配置项。