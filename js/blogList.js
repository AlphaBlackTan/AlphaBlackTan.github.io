// JavaScript Document
blogMap = new Map()
window.onload=function(){
	loadBlogs()
	alert(blogMap.get("BulkLoad Can not create a path from a null string.md"))
	alert(blogMap.get("一小时入手ANT脚本.md"))
}

function loadBlogs() {
	var blogPrefix = "../blog/"
	var blogPaths = new Array(
		"BulkLoad Can not create a path from a null string.md",
		"一小时入手ANT脚本.md"
	)
	
	for(var i = 0; i < blogPaths.length; i ++) {
		var blogPath = blogPrefix + blogPaths[i]
		$.get(blogPath, function(result){
			blogMap.set(blogPath, result)
		});
	}
}