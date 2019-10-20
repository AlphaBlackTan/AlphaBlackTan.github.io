---
layout: post
title: "Windows提交MapReduce异常，提示Shell output main command provided 1"
date: 2018-08-16
categories: 
- Framework
tags: 
- ClassLoader
---

# ClassLoader原理

ClassLoader使用双亲委托模型来对类进行搜索加载。除了最基础的BootStrap ClassLoader以外，每个ClassLoader实例都有一个父类加载器的引用（不是继承关系，是一个包含的关系）。当一个ClassLoader实例需要加载某个类时，他会优先使用父ClassLoader尝试对这个类进行加载，如果父ClassLoader没有找到对应的类才会尝试自己加载该类，如果都没有找到，则会抛出ClassNotFoundException异常。如果ClassLoader找到该类，则会将其加载到内存中，并返回一个该类的Class对象。

## ClassLoader类区分

因为笔者曾在这里吃过苦头，所以单独提出来讲一讲。JVM在判定两个class是否相同时，不仅要判断两个类名是否相同，而且需要判断是否由同一个ClassLoader进行加载。就算两个class字节码完全一致，如果由不同的ClassLoader加载，JVM也会认为它们是两个不同的类。

## ClassLoader与线程

每个运行中的线程都有一个成员contextClassLoader，默认情况下用来在运行时动态的载入其它类。可以使用currentThread的方法setContextClassLoader()更改当前线程的ClassLoader，进而改变它的类载入规则。

## ClassLoader与类

对于一般的JAVA类而言，如下两个方法获取到的ClassLoader应该一致：

	this.getClass.getClassLoader(); // 获取载入该类的ClassLoader
	Thread.currentThread().getContextClassLoader();

也许这是很不经意，甚至理所当然的一点，但因为笔者在这里也踩过坑，所以认为有必要提及一下。由于类对象的线程共通性，所以有时候类的载入ClassLoader与线程的ClassLoader并不一致。

