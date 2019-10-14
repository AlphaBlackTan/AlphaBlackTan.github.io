---
layout: post
title: "HDFS Client UnknownHostException NAMESERVICE"
date: 2018-08-12
categories: 
- BigData
tags: 
- Hive
- Solution
---

# 问题现象

Hive JDBC维持一个Connection长连接，在业务闲置一段时间后，执行SQL抛出如下异常：

	org.apache.hive.service.cli.HiveSQLException: Invalid SessionHandle [9ae14bf7-f921-4bf1-a616-0537132ce156]
		at org.apache.hive.jdbc.Utils.verifySuccess(Utils.java:262)
		at org.apache.hive.jdbc.Utils.verifySuccessWithInfo(Utils.java:248)
		at org.apache.hive.jdbc.HiveStatement.runAsyncOnServer(HiveStatement.java:300)
		at org.apache.hive.jdbc.HiveStatement.execute(HiveStatement.java:241)
	Caused by org.apache.hive.service.cli.HiveSQLException: Invalid SessionHandle [9ae14bf7-f921-4bf1-a616-0537132ce156]
	    org.apache.hive.service.cli.session.SessionManager.getSession(SessionManager.java:341)
	    org.apache.hive.service.cli.CLIService.executeStatementAsync(CLIService.java:309)
	    org.apache.hive.service.cli.thrift.ThriftCLIService.ExecuteStatement(ThriftCLIService.java:509)
	    org.apache.hive.service.cli.thrift.TCLIService$Processor$ExecuteStatement.getResult(TCLIService.java:1317)
	    ...

刷新客户端连接方可恢复

# 可能原因

Hive连接超过时间限制

## 问题分析

Hive存在一些配置项：

* hive.server2.idle.session.timeout
Session will be closed  when not aaccessed for this duration of time, in milliseconds. Disable by setting to zero or a negative value.

* hive.server2.session.check.interval
The check interval for session/operation timeout, in milliseconds. Disable by setting to zero or a negative value.

即在每个hive.server2.session.check.interval周期，Hive Server会对所有的session进行检查，Timeout掉超出阈值的session。此时对应Client再去连接Hive Server则会抛出上诉异常

## 问题解决方案

* 修改客户端实现，周期性检查连接池并刷新失效Connection
* 修改客户端实现，catch到SessionHandle异常，刷新对应Connection，重新执行SQL。
* 修改服务端配置，将上诉两个配置中，任一配置Disable掉。