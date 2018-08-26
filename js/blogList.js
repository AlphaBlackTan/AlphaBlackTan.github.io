// JavaScript Document
blogPaths = new Array(
	"../blog/BulkLoad Can not create a path from a null string.md",
	"../blog/一小时入手ANT脚本.md"
)
blogs = new Array(2)
window.onload=function(){
	loadBlogs()
	alert(blogs[0])
	alert(blogs[1])
}

function loadBlogs() {
	for(var i = 0; i < blogPaths.length; i ++) {
		$.get(blogPath, function(result){
			blogs[i1] = result
		});
	}
}