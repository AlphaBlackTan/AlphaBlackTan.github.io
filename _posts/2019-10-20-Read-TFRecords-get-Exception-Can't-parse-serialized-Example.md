---
layout: post
title: "Read TFRecords get Exception Can't parse serialized Example"
date: 2010-10-20
categories: 
- BigData
- Framework
- Algorithm
tags: 
- TensorFlow
- Solution
---

# 问题现象
## Stacktrace

    InvalidArgumentError (see above for traceback): Key: features.  Can't parse serialized Example.
    	 [[node ParseSingleExample/ParseSingleExample (defined at /work/tanyan/project/foresee/model/logistic_regression_example.py:11) ]]

## 相关代码

    import tensorflow as tf
    
    record_path = '/tmp/tfrecord_write_test/part-r-00000'
    
    filename_queue = tf.train.string_input_producer([record_path])
    reader = tf.TFRecordReader()
    _, serialized_example = reader.read(filename_queue)
    features = tf.parse_single_example(serialized_example,
                                       features={
                                           'label': tf.FixedLenFeature([], tf.float32),
                                           'features': tf.FixedLenFeature([], tf.float32),
                                       })
    
    with tf.Session() as sess:
        init_op = tf.initialize_all_variables()
        sess.run(init_op)
        coord = tf.train.Coordinator()
        threads = tf.train.start_queue_runners(coord=coord)
        for i in range(2):
            example = sess.run([features])#在会话中取出image和label
            example
            print(example)


# 解决方案

代码

    tf.FixedLenFeature([], tf.float32)

需要带上对应的长度。如：

    tf.FixedLenFeature([2], tf.float32)