// JavaScript Document

function loadBlogs() {
	var blogPrefix = "https://alphablacktan.github.io/blog/"
	var blogPaths = new Array(
		"BulkLoad Can not create a path from a null string.md",
		"一小时入手ANT脚本.md"
	)
	
	for(var i = 0; i < blogPaths.length; i ++) {
		var blogPath = encodeURI(blogPrefix + blogPaths[i])
		$.get(blogPath, function(result){
			blogMap.set(blogPaths[i], result)
		});
	}
}


var blogMap = new Map()

window.onload=function(){
	$.ajaxSetup({
		async:false
	});
	loadBlogs()
}