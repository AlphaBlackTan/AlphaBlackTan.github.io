---
layout: post
title: "Spark任务异常The auxService spaark_shuffle does not exist"
date: 2018-08-14
categories: 
- BigData
tags: 
- Spark
- Solution
- Shuffle
---

# 问题现象

Spark任务抛出如下异常：

	org.apache.hadoop.yarm.exception.InvalidAuxServiceException: The auxService:spark_shuffle does not exist

## 问题解决方案

于yarn-site.xml修改或添加如下配置：

	<property>
		<name>yarn.nodemanager.aux-services</name>
		<value>spark_shuffle,mapreduce_shuffle</value>
	</property>
	<property>
		<name>yarn.nodemanager.aux-services.spark_shuffle.class</name>
		<value>org.apache.spark.network.yarn.YarnShuffleService</value>
	</property>