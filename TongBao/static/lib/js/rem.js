function rem(){
	//获取屏幕的宽度
	var width = document.documentElement.offsetWidth;
	//总来的来就是监听当然窗口的变化，一旦有变化就需要重新设置根字体的值,
	//以标准的320计算  320/20 = 16px(网页默认字体大小),为了方便计算 16*0.625 = 10px; 1rem以10px为基本单位
	if(width >= 300 && width <= 640){
		document.documentElement.style.fontSize = (width/20)*0.625+'px';
	}else{
		document.documentElement.style.fontSize = 12+'px';
	}
};

window.onorientationchange=window.onresize=rem;
document.addEventListener('DOMContentLoaded', rem, false);