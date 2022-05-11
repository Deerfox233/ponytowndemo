const webSocket: WebSocket = new WebSocket("ws://10.62.48.132:8080");

let chatBox: HTMLElement = document.getElementById("div_chatBox");
let chatArea = document.getElementById("chatArea_text");

webSocket.onopen = function (event): void {
    console.log("websocket connection established");
};

webSocket.onmessage = function (event): void {
    let chars: number[];
    chars = JSON.parse(event.data).data;
    let s: string = "";
    for (let i: number = 0; i < chars.length; i++) {
        s += String.fromCharCode(chars[i]);
    }
    chatArea.innerHTML += "<span>" + s + "</span><br>";
};

function sendMessage(): void {
    let message: string = (chatBox as HTMLInputElement).value;
    webSocket.send(message);
    (chatBox as HTMLInputElement).value = "";
}
