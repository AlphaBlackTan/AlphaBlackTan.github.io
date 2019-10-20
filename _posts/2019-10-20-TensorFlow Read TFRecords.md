---
layout: post
title: "TensorFlow Read TFRecords"
date: 2019-10-20
categories: 
- BigData
- Framework
- Algorithm
tags: 
- TensorFlow
- Useage
---

Example Code:

    import tensorflow as tf
    
    record_path = '/tmp/tfrecord_write_test/part-r-00000'
    
    filename_queue = tf.train.string_input_producer([record_path])
    reader = tf.TFRecordReader()
    _, serialized_example = reader.read(filename_queue)
    features = tf.parse_single_example(serialized_example,
                                       features={
                                           'label': tf.FixedLenFeature([], tf.float32),
                                           'features': tf.FixedLenFeature([2], tf.float32),
                                       })
    
    with tf.Session() as sess:
        init_op = tf.initialize_all_variables()
        sess.run(init_op)
        coord = tf.train.Coordinator()
        threads = tf.train.start_queue_runners(coord=coord)
        for i in range(2):
            example = sess.run([features])#在会话中取出image和label
            print(example)

Example Data: [https://alphablacktan.github.io/resource/post_attachment/tfrecord_write_test](https://alphablacktan.github.io/resource/post_attachment/tfrecord_write_test)