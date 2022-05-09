const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

function check(){
	var name=document.getElementById("register_name").value;
	var password=document.getElementById("register_pwd").value;
	var password1=document.getElementById("register_pwd1").value;
	
	if(password==password1&&password!=""){
		document.getElementById("reigster_check").innerHTML="<font color='green'></font>"
		document.getElementById("register").disabled=false;
	}else if(password!=password1&&password1==""){
		document.getElementById("reigster_check").innerHTML="<font color='green'></font>"
		document.getElementById("register").disabled=true;
	}else if(password!=password1){
		document.getElementById("reigster_check").innerHTML="<font color='red'>两次密码不一致</font>"
		document.getElementById("register").disabled=true;
	}else if(name==""){
		document.getElementById("reigster_check").innerHTML="<font color='red'>用户名不能为空</font>"
		document.getElementById("register").disabled=true;
	} 
}

function register_checkbox(){
	var ckbox=document.getElementById("register_rule").checked;
	if(ckbox==false){
		document.getElementById("reigster_check").innerHTML="<font color='red'>同意遵守用户协议和隐私政策后方可注册</font>"
		document.getElementById("register").disabled=true;
	}else {
		document.getElementById("reigster_check").innerHTML="<font color='green'></font>"
		document.getElementById("register").disabled=false;
	}
}

function log_checkbox(){
	var ckbox=document.getElementById("log_rule").checked;
	if(ckbox==false){
		document.getElementById("log_check").innerHTML="<font color='red'>同意遵守用户协议和隐私政策后方可登录</font>"
		document.getElementById("register").disabled=true;
	}else {
		document.getElementById("log_check").innerHTML="<font color='green'></font>"
		document.getElementById("register").disabled=false;
	}
}

function login(){
	var name=document.getElementById("login_name").value;
	var password=document.getElementById("login_pwd").value;
	if(name==""){
		alert("用户名不能为空!");
		return false;
	}else if(password==""){
		alert("密码不能为空!");
		return false;
	}
	
}