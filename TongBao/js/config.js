//var ip = 'http://www.cnsyear.cn';
var ip = 'http://192.168.1.120:8080';

var vm = new Vue();

$(function() {
	localStorage.userId = 85;

	var urlStr = window.location.href;
	if(urlStr.indexOf('userInfoJson=') > 0) {
		var str = decodeURI(urlStr);
		var userInfo = JSON.parse(str.split('userInfoJson=')[1]);
		localStorage.userId = userInfo.userId;
		return;
	}

	if(!localStorage.userId) {
		wxAuthorization(window.location.href, function(data) {
			window.location.href = data.result;
		})
	}
})

/**
 * 网络请求 * @param {Object} url	链接
 * @param {Object} data	 请求参数
 * @param {Object} callback  请求成功回调
 * @param {Object} callback1  请求失败回调
 */
function post(url, data, callback, callback1) {
	vm.$dialog.loading.open('');
	$.ajax({
		type: "post",
		url: ip + url,
		async: true,
		traditional: true,
		data: data,
		success: function(data) {
			log(url + "==>>" + JSON.stringify(data));
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

function post1(url, async, data, callback) {
	vm.$dialog.loading.open('');
	$.ajax({
		type: "post",
		url: ip + url,
		async: async,
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
		}
	});
}

function QueryString() {
	var name, value, i;
	var str = decodeURI(location.href);
	var num = str.indexOf("?")
	str = str.substr(num + 1);
	var arrtmp = str.split("&");
	for(i = 0; i < arrtmp.length; i++) {
		num = arrtmp[i].indexOf("=");
		if(num > 0) {
			name = arrtmp[i].substring(0, num);
			value = arrtmp[i].substr(num + 1);
			this[name] = value;
		}
	}
}

/**
 * 将文本转义字符替换为HTML可识别的字符
 * @param {Object} str
 */
function strReplace(str) {
	if(str) {
		return str.replace(/\ /g, "&nbsp;").replace(/\n/g, "<br/>");
	}
}

/**
 * 隐藏第一位之后的文字
 * @param {Object} str
 */
function hideStr(str) {
	if(str) {
		var s = str[0];
		for(var i = 0; i < str.length; i++) {
			if(i > 0) {
				s += '*';
			}
		}
		return s;
	}
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

/**
 * 获取城市列表
 * @param {Object} callback
 */
function getCity(callback) {
	vm.$dialog.loading.open('');
	$.ajax({
		type: "post",
		url: ip + '/webItem/allCity',
		async: false,
		data: {},
		success: function(data) {
			console.log(data);
			vm.$dialog.loading.close();
			if(data.result_code != 1) {
				new Vue().$dialog.alert({
					mes: data.reason
				});
				return;
			}
			var list = data.result;
			var province = [];
			var city = [];
			var cityM = {};
			for(var i = 0; i < list.length; i++) {
				var obj = list[i];
				if(obj.deep == 1) {
					province.push(obj);
				} else if(obj.deep == 2) {
					city.push(obj);
				}
			}
			for(var i = 0; i < province.length; i++) {
				var array = [];
				array.push({
					'name': '全' + province[i].name,
					'id': province[i].id
				});
				for(var j = 0; j < city.length; j++) {
					if(city[j].parentId == i + 1) {
						array.push(city[j]);
						cityM['' + (i + 1)] = array;
					}
				}
			}
			callback(province, cityM);
		},
		error: function() {
			vm.$dialog.loading.close();
			vm.$dialog.alert({
				mes: '服务器连接失败!'
			});
		}
	});
}

function getDicTable(async, classId, callback) {
	vm.$dialog.loading.open('');
	$.ajax({
		type: "post",
		url: ip + '/webItem/ItemData',
		async: async,
		data: {
			classId: classId
		},
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
		}
	});
}

//设备分类
function getClassifyTable(async, classType, callback) {
	vm.$dialog.loading.open('');
	$.ajax({
		type: "post",
		url: ip + '/webItem/getCategoryList',
		async: async,
		data: {
			type: classType
		},
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
		}
	});
}

/**
 * 获取用户信息
 * @param {Object} userId
 * @param {Object} callback
 */
function getUserInfo(userId, callback) {
	if(userId) {
		post('/webUser/findUserMessage', {
			userId: userId
		}, function(data) {
			callback(data);
		})
	}
}

function wxAuthorization(url, callback) {
	post('/weixinCon/getAuthorizationUrl', {
		callbackUrl: url
	}, function(data) {
		callback(data);
	})
}

function log(str) {
	if(true) {
		console.log(str);
	}
}