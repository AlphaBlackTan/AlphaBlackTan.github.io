---
layout: post
title: "HDFS读取append中文件发生异常can't locate block"
date: 2018-08-16
categories: 
- BigData
- Framework
tags: 
- HDFS
---

# 问题现象

HDFS读取文件偶现失败，均为append中文件，抛出cant't locate block异常。

# 问题分析

HDFS2.7.2及以前版本对Append操作处理存在实现缺陷。Append数据在写最后一个Block时，NameNode会刷新其Block Id，而DataNode会在写完后才刷新Block Id，在此期间如果业务侧同时读取该文件，并读到该Block，且其处在DataNode还没更新Block Id之前，则会出现该异常。

# 问题解决方案

调整业务逻辑，避免读取Append中文件末尾Block。