let boxs=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let mainbox=document.querySelector(".mainbox");

let count=0;
let turnx=true;
let winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turnx=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
    mainbox.classList.remove("hide");
    resetbtn.classList.remove("hide");
}

boxs.forEach((box)=> {
    box.addEventListener("click",()=>{
        if (box.innerText !== "") return; // Prevent overwriting

        if (turnx) {
            box.innerText = "X";
            turnx = false;
        } else {
            box.innerText = "O";
            turnx = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});



const disableboxes =()=>{
    for (let box of boxs){
        box.disabled=true;
    }
}

const enableBoxes =()=>{
    for (let box of boxs){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner =(winner)=>{
    msg.innerText=`Congragulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
}

const checkWinner = (() => {
    let winnerFound = false;

    for (let pattern of winningPatterns) {
        let pos1val = boxs[pattern[0]].innerText;
        let pos2val = boxs[pattern[1]].innerText;
        let pos3val = boxs[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                winnerFound = true;
                showWinner(pos1val);
                mainbox.classList.add("hide");
                resetbtn.classList.add("hide");
                return;
            }
        }
    }

    if (count === 9 && !winnerFound) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        mainbox.classList.add("hide");
        resetbtn.classList.add("hide");
    }
});


newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);


