const webSocket: WebSocket = new WebSocket("ws://10.62.48.174:8080");

let chatBox: HTMLElement = document.getElementById("div_chatBox");

webSocket.onopen = function (event): void {
    console.log("websocket connection established");
};

webSocket.onmessage = function (event): void {

};

function sendMessage(): void {
    let message: string = (chatBox as HTMLInputElement).value;
    webSocket.send(message);
    (chatBox as HTMLInputElement).value = "";
}
