---
layout: post
title: "BulkLoad Can not create a path from a null string"
date: 2018-08-11
categories: 
- BigData
tags: 
- HBase
- BulkLoad
- Solution
---

# 问题现象

高于1.0的HBase进行BulkLoad抛出异常：

	java.lang.IllegalArgumentException: Can not create a Path from a null string
		at org.apache.hadoop.fs.Path.checkPathArg(Path.java:122)
		at org.apache.hadoop.fs.Path.<init>(Path.java:134)
		at org.apache.hadoop.fs.Path.<init>(Path.java:88)
		at org.apache.hadoop.hbase.mapreduce.HFileOutputFormat2.configurePartitioner(HFileOutputFormat2.java:591)
		at org.apache.hadoop.hbase.mapreduce.HFileOutputFormat2.configureIncrementalLoad(HFileOutputFormat2.java:440)
		at org.apache.hadoop.hbase.mapreduce.HFileOutputFormat2.configureIncrementalLoad(HFileOutputFormat2.java:405)
		...

# 可能原因

HBase Client缺乏配置项hbase.fs.tmp.dir。

## 问题分析

当前HFileOutputFormat2中的代码：

	Path partitionsPath = new Path(conf.get("hbase.fs.tmp.dir"), "partitions_" + UUID.randomUUID());

当配置项hbase.fs.tmp.dir不存在时，conf.get()将返回null，从而导致上述异常。

## 问题解决方案

在代码中或配置文件中添加配置项hbase.fs.tmp.dir。