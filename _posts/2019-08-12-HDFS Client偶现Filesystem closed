---
layout: post
title: "HDFS Client偶现Filesystem closed"
date: 2018-08-11
categories: 
- BigData
tags: 
- Hadoop
- HDFS
- BulkLoad
- Solution
---

# 问题现象

不定期偶现同一进程内所有业务访问HDFS抛出如下异常：

	java.io.IOException: Filesystem closed
    	at org.apache.hadoop.hdfs.DFSClient.checkOpen(DFSClient.java:703)
    	at org.apache.hadoop.hdfs.DFSInputStream.readWithStrategy(DFSInputStream.java:779)
    	at org.apache.hadoop.hdfs.DFSInputStream.read(DFSInputStream.java:840)
    	at java.io.DataInputStream.read(DataInputStream.java:149)
    	...

# 可能原因

Hadoop2.7.1版本Bug。

## 问题分析

经过对源码的分析发现Hadoop2.7.1及以前版本实现存在逻辑缺陷：

	org.apache.hadoop.hdfs.client.impl.LeaseRenewer:
		run():
			在发生SocketTimeoutException异常时会触发abort()。
			该abort()函数会将FileSystem下的负责与HDFS Server进行通信的DFSClient置为不可用状态，而FileSystem却无法感知这个状态进行重新初始化，从而导致了FileSystem的持续不可用。同时，因为FileSystem对象默认进程唯一，所以导致了进程内所有HDFS相关业务异常。

## 问题解决方案

升级为Hadoop2.7.2

