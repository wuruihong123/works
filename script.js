// 定义单词列表和按钮列表
const words = ['安保部员工//', '情报部员工//', '培训部员工//', '研发部员工//', '记录部员工//'];
const buttons = ['A', 'B', 'C', 'D', 'E'];

// 初始化变量
let score = 0; // 得分
let currentWords = []; // 当前出现的单词
let timer; // 定时器

// 绑定开始和结束按钮的点击事件
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('end').addEventListener('click', endGame);

// 绑定按钮的点击事件
buttons.forEach(button => {
    document.getElementById(button).addEventListener('click', () => checkWord(button));
});

// 开始游戏函数
function startGame() {
    score = 0;// 初始化得分为0
    document.getElementById('score').innerText = '得分: ' + score; // 显示得分
    generateWords(); // 生成单词
    timer = setTimeout(endGame, 5000); // 开始倒计时定时器，5秒后游戏结束
}

// 结束游戏函数
function endGame() {
    clearTimeout(timer); // 清除定时器
    alert('游戏结束，你的得分是：' + score); // 弹出游戏结束提示，并显示得分
}

// 生成单词函数
function generateWords() {
    currentWords = []; // 清空当前单词列表
    for (let i = 0; i < 3; i++) {
        currentWords.push(words[Math.floor(Math.random() * words.length)]); // 随机选取3个单词加入当前单词列表
    }
    document.getElementById('words').innerText = currentWords.join(' '); // 显示当前单词列表
}

// 检查单词函数
function checkWord(button) {
    const word = words[buttons.indexOf(button)]; // 根据按钮获取对应的单词
    const index = currentWords.indexOf(word); // 查找单词在当前单词列表中的索引
    if (index !== -1) {
        currentWords.splice(index, 1); // 从当前单词列表中移除匹配的单词
        if (currentWords.length === 0) {
            score++; // 如果当前单词列表为空，则表示成功匹配了所有单词，增加得分
            document.getElementById('score').innerText = '得分: ' + score; // 更新得分显示
            clearTimeout(timer); // 清除定时器
            generateWords(); // 生成新的单词
            {
                let audio = new Audio('提示音.mp3');
                audio.play();
            }
            if (score > 10 && score < 20) {
                timer = setTimeout(endGame, 4000); // 当得分在10到20之间时，将定时器设置为4秒后游戏结束
            } else if (score > 20) {
                timer = setTimeout(endGame, 3000); // 当得分大于20时，将定时器设置为3秒后游戏结束
            } else {
                timer = setTimeout(endGame, 5000); // 其他得分情况下，定时器设为5秒后游戏结束
            }
        }
    } else {
        endGame(); // 如果点击的单词不在当前单词列表中，则游戏结束
    }
}

// 绑定圆圈的点击事件
let circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    circle.addEventListener('click', function() {
        this.classList.add('clicked'); // 添加"clicked"类，显示点击效果
        setTimeout(() => {
            this.classList.remove('clicked'); // 0.1秒后移除"clicked"类，恢复原始样式
        }, 100);
    });
});

window.onload = function() {
    var userConfirmation = confirm("点击开始游戏后，员工栏会出现三个员工，依据员工数量及分类点击相应部门，时间限制内点击完成得分，失败游戏结束");
    if (!userConfirmation) {
        // 用户点击了取消按钮，关闭网页
        window.close();
    }
}
