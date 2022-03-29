const mongoose = require("mongoose");
const Schema = mongoose.Schema;

console.log("启动数据库...");
mongoose.connect("mongodb://localhost/ponytowndemo").then(() => console.log("数据库连接成功"));

// schemas
const userSchema = new Schema({
    id:Number,
    name: String
});

// models
const User = mongoose.model("User", userSchema);

module.exports = (ID: number, name: string) => {
    new User({
        id: ID,
        name: name
    }).save().then(() => console.log("新增一条 user 数据"));
};
