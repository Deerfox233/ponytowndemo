const clientID = "15f99dde795d4bc02da2";
const clientSecret = "583652a80005edfb0045025532c1cfe39209bcd0";

const Koa = require("koa");
const path = require("path");                        //Node.js Path 模块
const serve = require("koa-static");              //处理静态资源
const route = require("koa-route");              //路由
const axios = require("axios");                     //创建、发送请求
const db = require("./src/ts/db");

const app = new Koa();

const main = serve(path.join(__dirname));

const oauth = async context => {
    const code = context.request.query.code;
    console.log("code: " + code);

    const getAccessToken = await axios({
        method: "POST",
        url: "https://github.com/login/oauth/access_token?client_id=" + `${clientID}` + "&client_secret=" + `${clientSecret}` + "&code=" + `${code}`,
        headers: {
            Accept: "application/json"
        }
    });

    const accessToken = getAccessToken.data.access_token;
    console.log("access token: " + accessToken);

    const result = await axios({
        method: 'GET',
        url: "https://api.github.com/user",
        headers: {
            Accept: "application/json",
            Authorization: "token " + `${accessToken}`
        }
    });

    const username = result.data.login;
    const ID = result.data.id;
    console.log("ID: " + ID);
    console.log("username: " + username);
    //写入数据库
    db(ID, username);

    //重定向
    // context.response.redirect("/public/html/Register.html?github_id=" + `${ID}`);
    context.response.redirect("/public/html/Pony.html?username=" + `${username}`);
};

app.use(main);
app.use(route.get('/oauth/redirect', oauth));
app.listen(8080);
