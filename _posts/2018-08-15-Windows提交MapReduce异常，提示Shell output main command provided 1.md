---
layout: post
title: "Windows提交MapReduce异常，提示Shell output main command provided 1"
date: 2018-08-15
categories: 
- BigData
- Framework
tags: 
- MapReduce
- Solution
---

# 问题现象

Windows下提交MapReduce任务抛出如下异常：

	Diagnostics Exception from container-launch.
	Container id container_e06_1501570910088_0010_02_000001
	Exit code 1
	Stack trace ExitCodeException exitCode=1:
		at org.apache.hadoop.util.Shell.runCommand(Shell.java:628)
		at org.apache.hadoop.util.Shell.run(Shell.java:525)
		at org.apache.hadoop.util.Shell$ShellCommandExecutor.execute(Shell.java:819)
		at org.apache.hadoop.yarn.server.nodemanager.LinuxContainerExecutor.launchContainer(LinuxContainerExecutor.java:388)
		at org.apache.hadoop.yarn.server.nodemanager.containermanager.launcher.ContainerLaunch.call(ContainerLaunch.java:313)
		at org.apache.hadoop.yarn.server.nodemanager.containermanager.launcher.ContainerLaunch.call(ContainerLaunch.java:88)
		at java.util.concurrent.FutureTask.run(FutureTask.java:266)
		at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
		at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
		at java.lang.Thread.run(Thread.java:748)
		Shell output main command provided 1
		main: run as user is alphatan
		main: requested yarn user is alphatan
		Before Going to create dir
		Container exited with a non-zero exit code 1
		Failing this attempt, Failing the application.

## 可能原因

客户端配置缺乏配置项mapreduce.app-submission.cross-platform。

### 解决方案

在Configuration实例或者mapred-site.xml、user-mapred-site.xml中添加配置项mapreduce.app-submission.cross-platform，取值为true。