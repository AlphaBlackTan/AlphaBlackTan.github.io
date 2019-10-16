---
layout: post
title: "SparkFiles.get NullPointerException"
date: 2018-08-12
categories: 
- BigData
tags: 
- Spark
- Solution
---

# 问题现象

Spark任务抛出如下异常：

	Exception in thread "main" java.lang.NullPointerException
		at org.apache.spark.SparkFiles$.getRootDirectory(SparkFiles.scala:37)
		at org.apache.spark.SparkFiles$.get(SparkFiles.scala:31)
		...

# 可能原因

该现象为在初始化SparkContext之前调用了SparkFiles.get()。

## 问题解决方案

优先初始化SparkContext。