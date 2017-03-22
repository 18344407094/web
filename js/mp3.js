 (function(window, document){
            // 获取要操作的元素
            var mp3 = document.getElementById("mp3");
            var mp3Controls = document.getElementById("mp3Controls");
            var mp3Container = document.getElementById("mp3Container");
            var playBtn = document.getElementById("playBtn");
            var progressWrap = document.getElementById("progressWrap");
            var playProgress = document.getElementById("playProgress");
            var progressFlag;

            // 创建我们的操作对象，我们的所有操作都在这个对象上。
            var mp3Player = {
                init: function(){
                    var that = this;
                    mp3.removeAttribute("controls");
                    bindEvent(mp3, "loadeddata", mp3Player.initControls);
                    mp3Player.operateControls();
                },
                initControls: function(){
                    mp3Player.showHideControls();
                },
                showHideControls: function(){
                    bindEvent(mp3, "mouseover", showControls);
                    bindEvent(mp3Controls, "mouseover", showControls);
                    bindEvent(mp3, "mouseout", hideControls);
                    bindEvent(mp3Controls, "mouseout", hideControls);
                },
                operateControls: function(){
                    bindEvent(playBtn, "click", play);
                    bindEvent(mp3, "click", play);
                    bindEvent(progressWrap, "mousedown", mp3Seek);
                }
            }

            mp3Player.init();

            // 原生的JavaScript事件绑定函数
            function bindEvent(ele, eventName, func){
                if(window.addEventListener){
                    ele.addEventListener(eventName, func);
                }
                else{
                    ele.attachEvent('on' + eventName, func);
                }
            }
            // 显示mp3的控制面板
            function showControls(){
                mp3Controls.style.opacity = 1;
            }
            // 隐藏mp3的控制面板
            function hideControls(){
                // 为了让控制面板一直出现，我把mp3Controls.style.opacity的值改为1
                mp3Controls.style.opacity = 1;
            }
            // 控制mp3的播放
            function play(){
                if ( mp3.paused || mp3.ended ){              
                    if ( mp3.ended ){ 
                        mp3.currentTime = 0;
                        } 
                    mp3.play();
                    play.src="./picture/play.jpg" 
                    progressFlag = setInterval(getProgress, 60);
                } 
                else{ 
                    mp3.pause(); 
                    play.src="./picture/puase.jpg"
                    clearInterval(progressFlag);
                } 
            }
            // mp3的播放条
            function getProgress(){
                var percent = mp3.currentTime / mp3.duration;
                playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
            }
            // 鼠标在播放条上点击时进行捕获并进行处理
            function mp3Seek(e){
                if(mp3.paused || mp3.ended){
                    play();
                    enhancemp3Seek(e);
                }
                else{
                    enhancemp3Seek(e);
                }

            }
            function enhancemp3Seek(e){
                clearInterval(progressFlag);
                var length = e.pageX - progressWrap.offsetLeft;
                var percent = length / progressWrap.offsetWidth;
                playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
                mp3.currentTime = percent * mp3.duration;
                progressFlag = setInterval(getProgress, 60);
            }

        }(this, document))