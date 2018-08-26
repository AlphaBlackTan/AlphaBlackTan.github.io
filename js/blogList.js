// JavaScript Document
window.onload=function(){
	var blogPaths = loadBlogs()
	var blogs = getBlogs(blogPaths)
	alert(blogs)
}

function loadBlogs() {
	var blogPrefix = "../blog/"
	var blogs = new Array(
		"BulkLoad Can not create a path from a null string.md",
		"一小时入手ANT脚本.md"
	)
	
	for(var i = 0; i < blogs.length; i ++) {
		blogs[i] = blogPrefix + blogs[i]
	}
	
	return blogs
}

function getBlogs(blogPaths) {
	var blogs = new Array(blogPaths.length)
	
	for(var i = 0; i < blogs.length; i ++) {
		blogs[i] = openBlog(blogPaths[i])
	}
	return blogs
}
	
function openBlog(blogPath) {
	$.get(blogPath, function(result){
		return result;
	});
}