const mongoose = require("mongoose");
const colors = require("colors");
const Schema = mongoose.Schema;

console.log(colors.gray("启动数据库..."));
mongoose.connect("mongodb://localhost/ponytowndemo").then(() => console.log(colors.gray("数据库连接成功")));

// schemas
const userSchema = new Schema({
    id:Number,
    name: String
});

// models
const User = mongoose.model("User", userSchema);

// 向module.export 对象挂载 db 方法
module.exports.addUser = (ID: number, name: string) => {
    let user = new User({
        id: ID,
        name: name
    });
    user.save().then(() => console.log(colors.blue("新增一条 user 数据")));
};
