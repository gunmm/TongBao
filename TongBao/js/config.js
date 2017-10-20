var ip = 'http://192.168.1.120:8080';

var vm = new Vue();

/**
 * 网络请求
 * @param {Object} url	链接
 * @param {Object} data	 请求参数
 * @param {Object} callback  请求成功回调
 * @param {Object} callback1  请求失败回调
 */
function post(url, data, callback, callback1) {
	vm.$dialog.loading.open('');
	$.ajax({
		type: "post",
		url: ip + url,
		async: false,
		data: data,
		success: function(data) {
			vm.$dialog.loading.close();
			if(data.result_code != 1) {
				new Vue().$dialog.alert({
					mes: data.reason
				});
				return;
			}
			callback(data);
		},
		error: function() {
			vm.$dialog.loading.close();
			vm.$dialog.alert({
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

/**
 * 将文本转义字符替换为HTML可识别的字符
 * @param {Object} str
 */
function strReplace(str) {
	return str.replace(/\ /g, "&nbsp;").replace(/\n/g, "<br/>");
}

Array.prototype.indexOf = function(val) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) return i;
	}
	return -1;
};

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};


/*自定义容器Map*/
function Map(){
    /*创建构造器，有key和value*/
    var struct = function(key , value){
        this.key = key;
        this.value = value ;
    }
    /*在容器中放入值*/
    var put = function(key , value){
        for(var x=0;x<this.arr.length;x++){
            if(this.arr[x].key == key){
                this.arr[x].value=value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key , value);
    }
    /*根据容器获取容器中的值*/
    var get = function(key){
        // for(var x=0;x<this.arr.length;x++){
        //     if(this.arr[x].key == key){
        //         return this.arr[x].value;
        //     }
        // }
        // return null;
		return "1111";
    }

    var na = function (key) {
        for(var x=0;x<this.arr.length;x++){
            if(this.arr[x].key == key){
                return this.arr[x].value;
            }
        }
        return null;
    }
    /*构建数组*/
    this.arr = new Array();
    this.get = get;
    this.na = na;

    this.put = put;
}
