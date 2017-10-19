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

function QueryString()
{
    var name,value,i;
    var str=location.href;
    var num=str.indexOf("?")
    str=str.substr(num+1);
    var arrtmp=str.split("&");
    for(i=0;i < arrtmp.length;i++){
        num=arrtmp[i].indexOf("=");
        if(num>0){
            name=arrtmp[i].substring(0,num);
            value=arrtmp[i].substr(num+1);
            this[name]=value;
        }
    }
}