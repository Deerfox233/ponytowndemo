const clientID = "15f99dde795d4bc02da2";
const clientSecret = "583652a80005edfb0045025532c1cfe39209bcd0";

const koa = require("koa");
const path = require("path");                        //Node.js Path 模块
const serve = require("koa-static");              //处理静态资源
const route = require("koa-route");              //路由
const axios = require("axios");                     //创建、发送请求
const db = require("./src/ts/db");                 //返回 db 的 module.exports 对象
const koaWebSocket = require("koa-websocket");          //koa专属websocket
const colors = require("colors");

const app = koaWebSocket(new koa());

const contexts: any[] = [];             //服了，不知道 koa 的 context 该用什么类型

//加载静态资源
//__dirname 表示当前项目所处目录
const main = serve(path.join(__dirname));

const oauth = async context => {
    const code = context.request.query.code;
    console.log(colors.gray("code: " + code));

    const getAccessToken = await axios({
        method: "POST",
        url: "https://github.com/login/oauth/access_token?client_id=" + `${clientID}` + "&client_secret=" + `${clientSecret}` + "&code=" + `${code}`,
        headers: {
            Accept: "application/json"
        }
    });

    const accessToken = getAccessToken.data.access_token;
    console.log(colors.gray("access token: " + accessToken));

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
    console.log(colors.gray("ID: " + ID));
    console.log(colors.gray("username: " + username));
    //写入数据库
    db.addUser(ID, username);

    //重定向
    // context.response.redirect("/public/html/Register.html?github_id=" + `${ID}`);
    context.response.redirect("/public/html/Pony.html?username=" + `${username}`);
};

const accept = (context, next) => {
    contexts.push(context);
    console.log(colors.green("[server] new connection"));
    context.websocket.on("message", message => {
        console.log(colors.yellow("%s"), message);
        for (let i: number = 0; i < contexts.length; i++) {
            contexts[i].websocket.send(message);
        }
    });
};

app.use(main);
app.use(route.get('/oauth/redirect', oauth));

app.ws.use(accept);

app.listen(8080, () => {
    console.log("[server] it's on");
});
