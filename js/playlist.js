
//通过ajax获取后台数据，插入并渲染页面
let listId = location.search.substr(1)
$.get('https://oxsq8ic50.bkt.clouddn.com/G-163-playlist.json').then(function(data){
	//根据url的传值，找到json文件中对应的对象，提取数据
	let array = [data.object0,data.object1,data.object2,data.object3,data.object4,data.object5]
	let object = array[listId]
	$('title').html(object.title + ' - 歌单 - 网易云音乐')

	//header部分
	$('.header > .background').css('background-image','url(' + object.background + ')')
	$('.cover i').html(object.number1)
	$('.picture img').attr('src',object.cover)
	$('.title h2').html(object.title)
	$('.title div').after(object.name0)
	$('.title img').attr('src',object.head0)
	if(object.vip0 ==1){ $('.title img').after('<span></span>') }
	
	//标签、简介部分
	$('.label em:nth-child(1)').html(object.label1)
	$('.label em:nth-child(2)').html(object.label2)
	$('.label em:nth-child(3)').html(object.label3)
	$('.introduce span:first-child').html(object.introduction)

	//评论部分
	$('.comment > div:nth-child(1) li:nth-child(1) img').attr('src',object.head1)
	$('.comment > div:nth-child(1) li:nth-child(1) .left > div:nth-child(1)').html(object.name1)
	$('.comment > div:nth-child(1) li:nth-child(1) .left > div:nth-child(2)').html(object.date1)
	$('.comment > div:nth-child(1) li:nth-child(1) .right > span').html(object.good1)
	$('.comment > div:nth-child(1) li:nth-child(1) .text').html(object.content1)
	if(object.vip1 == 1){ $('.comment > div:nth-child(1) li:nth-child(1) img').after('<span></span>') }

	$('.comment > div:nth-child(1) li:nth-child(2) img').attr('src',object.head2)
	$('.comment > div:nth-child(1) li:nth-child(2) .left > div:nth-child(1)').html(object.name2)
	$('.comment > div:nth-child(1) li:nth-child(2) .left > div:nth-child(2)').html(object.date2)
	$('.comment > div:nth-child(1) li:nth-child(2) .right > span').html(object.good2)
	$('.comment > div:nth-child(1) li:nth-child(2) .text').html(object.content2)
	if(object.vip2 == 1){ $('.comment > div:nth-child(1) li:nth-child(2) img').after('<span></span>') }

	$('.comment > div:nth-child(2) > h3').html(object.number2)

	$('.comment > div:nth-child(2) li:nth-child(1) img').attr('src',object.head3)
	$('.comment > div:nth-child(2) li:nth-child(1) .left > div:first-child').html(object.name3)
	$('.comment > div:nth-child(2) li:nth-child(1) .right > span').html(object.good3)
	$('.comment > div:nth-child(2) li:nth-child(1) .text').html(object.content3)
	if(object.vip3 == 1){ $('.comment > div:nth-child(2) li:nth-child(1) img').after('<span></span>') }


	$('.comment > div:nth-child(2) li:nth-child(2) img').attr('src',object.head4)
	$('.comment > div:nth-child(2) li:nth-child(2) .left > div:first-child').html(object.name4)
	$('.comment > div:nth-child(2) li:nth-child(2) .right > span').html(object.good4)
	$('.comment > div:nth-child(2) li:nth-child(2) .text').html(object.content4)
	if(object.vip4 == 1){ $('.comment > div:nth-child(2) li:nth-child(2) img').after('<span></span>') }

	$('.comment > div:nth-child(2) li:nth-child(3) img').attr('src',object.head5)
	$('.comment > div:nth-child(2) li:nth-child(3) .left > div:first-child').html(object.name5)
	$('.comment > div:nth-child(2) li:nth-child(3) .right > span').html(object.good5)
	$('.comment > div:nth-child(2) li:nth-child(3) .text').html(object.content5)
	if(object.vip5 == 1){ $('.comment > div:nth-child(2) li:nth-child(3) img').after('<span></span>') }
})
if(listId == 4){
	$('.label em:nth-child(3)').remove()
	$('.introduce > .content > span').remove()
}


//歌单简介的展开、收起按钮
let $open = $('.introduce > .content > span')
let $content = $('.introduce > .content > div')
$open.on('click',function(){
	if($open.hasClass('active')){
		$open.removeClass('active')
		$content.css('-webkit-line-clamp','3')
	}else{
		$open.addClass('active')
		$content.css('-webkit-line-clamp','999')
	}
})


//LeanCloud   初始化
var APP_ID = '6wWVRE4dms0ACfEApceLpVHN-gzGzoHsz'
var APP_KEY = '9aTHWXTTgegNf0ErAhE2QYdp'
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
})

//获取歌曲信息，生成歌单列表
let $playlist = $('.playlist > ol')
let query = new AV.Query('Song')
query.find().then(function(results){
	//移除Loading动画
	$('#spinner').remove()

	//获取歌曲信息，插入页面
	for(let i = 0; i < 20; i++){
		let song = results[i].attributes
		let li = `
			<li>
				<div class="number"></div>
				<div>
					<div>
						<h3>${song.name}<span>${song.note1}</span></h3><h5>${results[i].id}</h5>
						<i>${song.quality}</i><p>${song.singer} - ${song.album}</p>
					</div>
					<div><a class="playButton"></a></div>
				</div>
			</li>
		`
		$playlist.append(li)
	}

	//添加歌曲序号
	let $num = $('.playlist li > .number')
	for(let i = 0; i < 20; i++){
		$num.eq(i).html(i + 1)
	}

	//修改音乐名称的备注
	for(let i = 0; i < 20; i++){
		if($('.playlist span')[i].innerText == 'undefined'){
			$('.playlist span').eq(i).html('')
		}
	}

	//为高品质音乐插入sq标识
	for(let i = 0; i < 20; i++){
		if($('.playlist i')[i].innerText == 'sq'){
			$('.playlist i').eq(i).addClass('block').html('')
		}
	}

	//点击歌曲标签跳转页面
	$('.playlist li').on('click',function(){
		let $idx = $(this).index()
		window.location.href="./song.html" + '?' + $('h5').eq($idx).html()
	})
},function(error){
	alert('获取歌曲失败')
})


//自动生成最新评论日期
let $date1 = $('.comment > div:nth-child(2) li:nth-child(1) .left > div:nth-child(2)')
let $date2 = $('.comment > div:nth-child(2) li:nth-child(2) .left > div:nth-child(2)')
let $date3 = $('.comment > div:nth-child(2) li:nth-child(3) .left > div:nth-child(2)')
let $newDate = new Date()
if($newDate.getMonth() > 8){
	if($newDate.getDate() > 9){
		$date1.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月' + $newDate.getDate() + '日')
		$date2.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月' + ($newDate.getDate() - 1) + '日')
		$date3.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月' + ($newDate.getDate() - 1) + '日')
	}else if(10 > $newDate.getDate() > 1){
		$date1.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月0' + $newDate.getDate() + '日')
		$date2.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月0' + ($newDate.getDate() - 1) + '日')
		$date3.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月0' + ($newDate.getDate() - 1) + '日')
	}else if($newDate.getDate() == 1){
		$date1.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月0' + $newDate.getDate() + '日')
		$date2.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月0' + $newDate.getDate() + '日')
		$date3.html($newDate.getFullYear() + '年' + ($newDate.getMonth() + 1) + '月0' + $newDate.getDate() + '日')
	}
}else{
	if($newDate.getDate() > 9){
		$date1.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月' + $newDate.getDate() + '日')
		$date2.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月' + ($newDate.getDate() - 1) + '日')
		$date3.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月' + ($newDate.getDate() - 1) + '日')
	}else if(10 > $newDate.getDate() > 1){
		$date1.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月0' + $newDate.getDate() + '日')
		$date2.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月0' + ($newDate.getDate() - 1) + '日')
		$date3.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月0' + ($newDate.getDate() - 1) + '日')
	}else if($newDate.getDate() == 1){
		$date1.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月0' + $newDate.getDate() + '日')
		$date2.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月0' + $newDate.getDate() + '日')
		$date3.html($newDate.getFullYear() + '年0' + ($newDate.getMonth() + 1) + '月0' + $newDate.getDate() + '日')
	}
}


//点赞功能
let $good = $('.right span')
$good.on('click',function(){
	if(!$(this).hasClass('active')){
		$(this).css({'background':'url(https://oxsq8ic50.bkt.clouddn.com/G-163-playlist-dianzanhou.png) 100% 0 no-repeat','background-size':'15px'}).addClass('active')
		if(!$(this).html()){
			$(this).html('1')
		}else{
			$(this).html(parseInt($(this).html()) + 1)
		}
	}
})
