//歌单数组
var array = ["./lists/Someone You Loved.mp3", "./lists/不知所措 - 王靖雯不胖.mp3"]
//获取audio元素
var currAudio = document.getElementById("audio");
//选择播放歌曲
currAudio.src = array[0];
//歌词
var str = `
[00:00.00]Someone You Loved - Lewis Capaldi
[00:03.08]Lyrics by：Lewis Capaldi
[00:06.17]Composed by：Lewis Capaldi
[00:09.25]I'm going under and this time
[00:11.19]I fear there's no one to save me
[00:18.01]This all or nothing really got
[00:20.25]A way of driving me crazy
[00:24.55]I need somebody to heal
[00:27.39]Somebody to know
[00:29.42]Somebody to have
[00:31.56]Somebody to hold
[00:33.77]It's easy to say
[00:35.90]But it's never the same
[00:38.06]I guess I kinda liked the way you numbed
[00:40.95]All the pain
[00:42.34]Now the day bleeds
[00:44.54]Into nightfall
[00:46.54]And you're not here
[00:48.69]To get me through it all
[00:50.79]I let my guard down
[00:53.00]And then you pulled the rug
[00:55.23]I was getting kinda used to being someone
[00:58.73]You loved
[01:01.63]I'm going under and this time
[01:03.71]I fear there's no one to turn to
[01:10.32]This all or nothing way of loving got me
[01:13.44]Sleeping without you
[01:16.88]Now I need somebody to know
[01:19.74]Somebody to heal
[01:21.82]Somebody to have
[01:23.86]Just to know how it feels
[01:26.18]It's easy to say but it's never the same
[01:30.54]I guess I kinda liked the way
[01:32.72]You helped me escape
[01:34.71]Now the day bleeds
[01:36.74]Into nightfall
[01:38.94]And you're not here
[01:40.97]To get me through it all
[01:43.17]I let my guard down
[01:45.29]And then you pulled the rug
[01:47.55]I was getting kinda used to being
[01:50.35]Someone you loved
[01:53.51]And I tend to close my eyes
[01:57.43]When it hurts sometimes
[01:59.62]I fall into your arms
[02:03.95]I'll be safe in your sound
[02:05.96]'Til I come back around
[02:09.20]For now the day bleeds
[02:11.80]Into nightfall
[02:13.89]And you're not here
[02:15.95]To get me through it all
[02:18.12]I let my guard down
[02:20.30]And then you pulled the rug
[02:22.55]I was getting kinda used to being someone
[02:26.05]You loved
[02:26.98]But now the day bleeds
[02:29.11]Into nightfall
[02:31.36]And you're not here
[02:33.40]To get me through it all
[02:35.48]I let my guard down
[02:37.64]And then you pulled the rug
[02:39.83]I was getting kinda used to being someone you loved
[02:44.40]I let my guard down
[02:46.54]And then you pulled the rug
[02:48.89]I was getting kinda used to being someone you loved";`;
var r = str.split(/\s*\n*\[.*?\]\s*/).filter(v => !!v) //歌词
var ti = str.match(/\d{2}:\d{2}/g); //时间

var Arr1 = [];
for(let i in ti){
    Arr1[i]=ti[i]+r[i];
}

// console.log(Arr1);

var lr = document.getElementById("text");
for (let v in r) {
    var p = document.createElement('p');
    p.innerHTML = r[v];
    lr.appendChild(p);
}
var allp = lr.getElementsByTagName('p');
var temp =allp[0].offsetTop;
var Top=document.getElementById("text").offsetTop;
console.log(Top);
//音乐播放时触发
currAudio.addEventListener("timeupdate", () => {
    // console.log(currAudio.currentTime);
    var percent = currAudio.currentTime / currAudio.duration;
    document.getElementById("currentTime").style.width = percent * 100 + "%";
    //显示当前时间
    var minCur = parseInt(currAudio.currentTime / 60); //分种
    if (minCur < 10) {
        minCur = "0" + minCur;
    }
    var secCur; //秒钟X
    if (parseInt(currAudio.currentTime % 60) < 10) {
        secCur = "0" + parseInt(currAudio.currentTime % 60);
    } else {
        secCur = parseInt(currAudio.currentTime % 60);
    }
    var getT = document.getElementById("current").innerHTML = minCur + ":" + secCur;
    

    clearP = () => {
        for (let v in r) {
            allp[v].style.backgroundColor = "pink";
        }
    }
    // console.log(getT+allp[10].innerHTML);
    for (let v in ti) {
        if (getT+allp[v].innerHTML===Arr1[v]){
            clearP();
            allp[v].style.backgroundColor = "white";
            var mT=allp[v].offsetTop;
            if(temp!=mT){
                console.log("?");
                temp=mT;
             document.getElementById("text").style.top=Top-mT+"px";
            }
        }    
    }

    //显示总时间
    var minDur = parseInt(currAudio.duration / 60);
    var secDur = parseInt(currAudio.duration % 60);
    if (minDur < 10) {
        minDur = "0" + minDur;
    }
    if (secDur < 10) {
        secDur = "0" + secDur;
    }
    document.getElementById("duration").innerHTML = minDur + ":" + secDur;
})

    
    


//点击播放按钮时触发
var play = document.getElementById("play");
play.addEventListener("click", () => {
    if (currAudio.paused) {
        currAudio.play();
        document.getElementById("playI").setAttribute("class", "iconfont icon-bofangqi-zanting");

    } else {
        currAudio.pause();
        document.getElementById("playI").setAttribute("class", "iconfont icon-bofangqi-bofang");


    }
})
//进度条
mUp = (e) => {
    var all = document.getElementById("timeLine").offsetWidth;
    var p = e.offsetX / all;
    document.getElementById("currentTime").style.width = p * 100 + "%";
    currAudio.currentTime = currAudio.duration * p;

}
//显示
ballShow = () => {
    document.getElementById("timeLine").style.height = "7px";
}
ballHide = () => {
    document.getElementById("timeLine").style.height = "5px";
}

