let animationPhase: number = 0;
let isReverse: boolean;

function moveEvent(event): void {
    let move = document.getElementById("move");
    let ori = document.getElementById("ori");
    switch (event.keyCode) {
        case 37:
            isReverse = false;
            ori.style.backgroundImage = "url(assets/images/character/ori_walk.png)";
            move.style.left = move.offsetLeft - 5 + "px";       //left
            animationPhase -= 80;
            break;
        case 38:
            move.style.top = move.offsetTop - 5 + "px";         //up
            if (isReverse) {
                animationPhase += 80;
            } else {
                animationPhase -= 80;
            }
            break;
        case 39:
            isReverse = true;
            ori.style.backgroundImage = "url(assets/images/character/ori_walk_reverse.png)";
            move.style.left = move.offsetLeft + 5 + "px";       //right
            animationPhase += 80;
            break;
        case 40:
            move.style.top = move.offsetTop + 5 + "px";     //down
            if (isReverse) {
                animationPhase += 80;
            } else {
                animationPhase -= 80;
            }
            break;
    }
    ori.style.backgroundPosition = animationPhase + "px";
}
