var ip = 'http://192.168.1.120:8080';

function post(url, data, callback, callback1) {
	$.ajax({
		type: "post",
		url: ip + url,
		async: true,
		data: data,
		success: function(data) {
			callback(data);
		},
		error: function() {
			new Vue().$dialog.alert({
				mes: '服务器连接失败!'
			});
			if(callback1 != null) {
				callback1();
			}
		}
	});
}