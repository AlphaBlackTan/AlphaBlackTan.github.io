# 问题现象

HDFS Client抛出如下异常：

	java.lang.RuntimeException: java.io.IOException: Couldn't create proxy provider class org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider
		at org.apache.hadoop.hdfs.NameNodeProxies.createFailoverProxyProvider(NameNodeProxies.java: 587)
		at org.apache.hadoop.hdfs.NameNodeProxies.createProxy(NameNodeProxies.java: 164)
		at org.apache.hadoop.hdfs.DFSClient.<init>(DFSClient.java: 359)
		at org.apache.hadoop.hdfs.DFSClient.<init>(DFSClient.java: 293)

# 问题分析

Classpath缺乏Hadoop Client关键Jar包hadoop-hdfs-*.jar。

# 问题解决方案

在Classpath下添加对应Jar（注意分布式环境在不同classloader下不同的加载机制）。