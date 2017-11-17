
//播放键，点击后先转动磁头，.5s后开始播放
let $playbtn = $('.disc > .playbtn')
$playbtn.on('click',function(){
	$playbtn.removeClass('active')
	$('.disc > .disc-head').removeClass('paused')
	setTimeout(function(){ 
    	$pausebtn.addClass('active')
		$('.record > .circle').removeClass('paused')
		$('.disc-container .cover').removeClass('paused')
		audio.play()
    },500)
})

//暂停键，点击后立即停止，再转动磁头
let $pausebtn = $('.disc > .pausebtn')
$pausebtn.on('click',function(){
	$pausebtn.removeClass('active')
	$('.disc > .disc-head').addClass('paused')
	$('.record > .circle').addClass('paused')
	$('.disc-container .cover').addClass('paused')
	audio.pause()
	setTimeout(function(){ 
		$playbtn.addClass('active')
	},500)
})


//LeanCloud   初始化
var APP_ID = '6wWVRE4dms0ACfEApceLpVHN-gzGzoHsz'
var APP_KEY = '9aTHWXTTgegNf0ErAhE2QYdp'
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
})

//根据id获取歌曲的各项属性，加入页面的相应位置并渲染
let objectId = location.search.substr(1)
let query = new AV.Query('Song')
query.get(objectId).then(function(song){
	//获取各项基础属性并渲染页面
	let name = song.get('name')
	let note = song.get('note2')
	let singer = song.get('singer')

	//判断歌名中是否带有备注
	if(note == undefined){
		$('title').html(name + ' - ' + singer + ' - 单曲 - 网易云音乐')
		$('h2 > span:nth-child(1)').html(name)
	}else{
		$('title').html(name + note + ' - ' + singer + ' - 单曲 - 网易云音乐')
		$('h2 > span:nth-child(1)').html(name + note)
	}
	$('h2 > span:nth-child(2)').html(singer)

	//获取和添加播放页背景及唱片封面
	let background = song.get('background')
	let cover = song.get('cover')
	$('.background').css('background-image','url(' + background + ')')
	$('.disc-container img').attr('src',cover)

	//获取歌词并插入页面
	let lyric = song.get('lyric')
	let array = []
	let parts = lyric.split('\n')
	//将歌词展示的时间统一改为以“秒”为单位
	parts.forEach(function(string,index){
		let objectLyric = string.split(']')
		objectLyric[0] = objectLyric[0].substring(1)
		let regex = /(\d+):([\d.]+)/
		let matches = objectLyric[0].match(regex)
		let minute = +matches[1]
		let seconds = +matches[2]
		array.push({
			time: minute * 60 + seconds,
			lyric: objectLyric[1] 
		})
	})

	//为每行歌词创建p标签并插入页面相应位置
	let $lyric = $('.lyric')
	for(let i = 0; i < array.length; i++){
		let $p = $('</p>')
		$p.text(array[i].lyric).attr('data-time',array[i].time)
		$p.appendTo($lyric)
	}
	$('.lyric > p').eq(0).addClass('active')

	//设置歌词随时间的变化而滚动
	setInterval(function(){
		let current = audio.currentTime
		let $container = $('.song-description > div > div')
		let $p = $('.lyric > p')
		let $height = parseInt($p.css('height'))
		let $audioEnd = audio.ended
		if(current >= array[0].time && !audio.ended){
			for(let i = 0; i < array.length; i++){
				//为配合css响应式部分所设置的不同滚动距离
				let scroll = -(i - 1) * $height + 'px'
				let scroll2 = -i * $height + 'px'
				
				//当歌词进行到最后一句时的效果渲染
				if(i === array.length - 1){
					$p.eq(i).addClass('active').siblings().removeClass('active')
					//页面响应式下的滚动
					if(window.screen.width < 606){
						$container.css('transform','translateY(' + scroll + ')')
					}else{
						$container.css('transform','translateY(' + scroll2 + ')')
					}
				}else if(array[i].time <= current && array[i + 1].time > current){
					$p.eq(i).addClass('active').siblings().removeClass('active')
					//页面响应式下的滚动
					if(i > 0 && window.screen.width < 606){
						$container.css('transform','translateY(' + scroll + ')')
					}else if(i > 0 && window.screen.width >= 606){
						$container.css('transform','translateY(' + scroll2 + ')')
					}
				break
				}
			}
		}

		//播放完毕后自动初始化页面样式
		if($audioEnd && $('.disc > .pausebtn').hasClass('active')){
			$('.disc > .playbtn').addClass('active')
			$('.disc > .pausebtn').removeClass('active')
			$('.disc > .disc-head').addClass('paused')
			$('.record > .circle').addClass('paused')
			$('.disc-container .cover').addClass('paused')
			$('.song-description > div > div').css('transform','translateY(0)')
			$('.lyric > p').eq(0).addClass('active').siblings().removeClass('active')
		}
	},500)

	//获取歌曲、自动播放
	window.audio = document.createElement('audio')
	audio.src = song.get('address')
	audio.oncanplay = function(){
		$('.loading').remove()
		audio.play()
	}
})





//从本地歌词范例文件中获取、添加歌词，已改用LeanCloud在线获取
// $(function(){
// 	$.get('../json/lyric-ex.json').then(function(object){
// 		let {lyric} = object
// 		let array = lyric.split('\n')
// 		let regex = /^\[(.+)\](.*)$/
// 		array = array.map(function(string,index){
// 			let matches = string.match(regex)
// 			if(matches){
// 				return{time:matches[1],words:matches[2]}
// 			}
// 		})
// 		let $lyric = $('.lyric')
// 		array.map(function(object){
// 			if(!object){
// 				return
// 			}
// 			let $p = $('</p>')
// 			$p.attr('data-time',object.time).text(object.words)
// 			$p.appendTo($lyric)
// 		})
// 	})
// })
