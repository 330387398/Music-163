
//全局Tab切换功能
let $li = $('.tabs li')
$li.on('click',function(){
	let $idx = $(this).index()
	if($(this).hasClass('active')){
		return
	}else{
		$(this).addClass('active').siblings().removeClass('active')
		$('.tab-content > li').eq($idx).addClass('active').siblings().removeClass('active')
		$(window).scrollTop(0)
		if(($idx == 2) && ($('.search').val() == '')){
			$('.search').focus()
		}
	}
})


//点击歌单标签跳转页面
$('.playlists ol:nth-child(2) > li').on('click',function(){
	let $idx = $(this).index()
	window.location.href="./html/playlist.html" + '?' + $idx
})
$('.playlists ol:nth-child(3) > li').on('click',function(){
	let $idx = $(this).index() + 3
	window.location.href="./html/playlist.html" + '?' + $idx
})


//LeanCloud   初始化
var APP_ID = '6wWVRE4dms0ACfEApceLpVHN-gzGzoHsz'
var APP_KEY = '9aTHWXTTgegNf0ErAhE2QYdp'
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
})

//获取、添加最新音乐部分歌曲
let $olSongs = $('ol#songs')
let queryA = new AV.Query('Song')
queryA.find().then(function(results){
	//移除Loading动画
	$('#spinner1').remove()

	//获取歌曲信息并插入页面
	for(let i = 0; i < 10; i++){
		let song = results[i].attributes
		let li = `
			<li>
				<div>
					<div>
						<h3>${song.name}<span>${song.note1}</span></h3><h6>${results[i].id}</h6>
						<i>${song.quality}</i><p>${song.singer} - ${song.album}</p>
					</div>
					<div><a class="playButton"></a></div>
				</div>
			</li>
		`
		$olSongs.append(li)
	}

	//修改歌曲名称备注部分的信息
	for(let i = 0; i < 10; i++){
		if($('ol#songs span')[i].innerText == 'undefined'){
			$('ol#songs span').eq(i).html('')
		}
	}

	//为高品质音乐添加sq标识
	for(let i = 0; i < 10; i++){
		if($('ol#songs i')[i].innerText == 'sq'){
			$('ol#songs i').eq(i).addClass('block').html('')
		}
	}
	
	//为歌曲标签绑定事件，点击跳转页面
	$('ol#songs > li').on('click',function(){
		let $idx = $(this).index()
		window.location.href="./html/song.html" + '?' + $('h6').eq($idx).html()
	})
},function(error){
	alert('获取歌曲失败')
})


//自动设置热歌榜更新日期
$('.month').html(new Date().getMonth() + 1)
$('.date').html(new Date().getDate())


//获取歌曲信息、数据，插入热歌榜歌曲列表
let $hotSongs = $('#hotSongs')
let queryB = new AV.Query('Song')
queryB.find().then(function(results){
	//获取歌曲信息并插入页面
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
		$hotSongs.append(li)
	}

	//设置歌曲序号
	let $num = $('#hotSongs > li > .number')
	for(let i = 0; i < 20; i++){
		if(i < 9){
			$num.eq(i).html('0' + (i + 1))
		}else{
			$num.eq(i).html(i + 1)
		}
		if(i < 3){
			$num.eq(i).css('color','#df3436')
		}else{
			$num.eq(i).css('color','#999')
		}
	}

	//设置歌曲名称备注部分的内容
	for(let i = 0; i < 20; i++){
		if($('#hotSongs span')[i].innerText == 'undefined'){
			$('#hotSongs span').eq(i).html('')
		}
	}

	//为高音质的歌曲添加sq标识
	for(let i = 0; i < 20; i++){
		if($('#hotSongs i')[i].innerText == 'sq'){
			$('#hotSongs i').eq(i).addClass('block').html('')
		}
	}
	
	//为歌曲标签绑定事件，点击跳转页面
	$('#hotSongs > li').on('click',function(){
		let $idx = $(this).index()
		window.location.href="./html/song.html" + '?' + $('h5').eq($idx).html()
	})
},function(error){
	alert('获取歌曲失败')
})





//模拟歌单原始信息备份
// var PlaylistObject = AV.Object.extend('Playlist');

// var playlistObject0 = new PlaylistObject();
// playlistObject0.set('img','https://p1.music.126.net/3LbMYwTiQD5U3MCSgDPgdA==/109951163035317628.jpg?param=180y180')
// playlistObject0.set('text','「华语」哭泣使人乞讨，思念使人奔跑')
// playlistObject0.set('number','688.7万')

// var playlistObject1 = new PlaylistObject();
// playlistObject1.set('img','https://p1.music.126.net/Rt_5QrIG--EsdlX_a6CZmA==/19210667160894372.jpg?param=180y180')
// playlistObject1.set('text','纯音乐｜安静的午后，和钢琴跳支舞吧')
// playlistObject1.set('number','102.8万')

// var playlistObject2 = new PlaylistObject();
// playlistObject2.set('img','https://p1.music.126.net/TTqO_vMw7a_PZN7hu0_LMQ==/109951163039105402.jpg?param=180y180')
// playlistObject2.set('text','没有收拾残局的能力&nbsp;就别放纵善变的情绪')
// playlistObject2.set('number','394.4万')

// var playlistObject3 = new PlaylistObject();
// playlistObject3.set('img','https://p1.music.126.net/n5BOuTlLKP0glrZ0U2iYQA==/18810444930050955.jpg?param=180y180')
// playlistObject3.set('text','华语丨你的誓言 也不过是你说的口是心非')
// playlistObject3.set('number','439万')

// var playlistObject4 = new PlaylistObject();
// playlistObject4.set('img','https://p1.music.126.net/3Jl_KQjkvRlzGxe6zHt-cA==/19171084742172302.jpg?param=180y180')
// playlistObject4.set('text','「深情男嗓」我梦如你 似清澈空灵的星河')
// playlistObject4.set('number','15.4万')

// var playlistObject5 = new PlaylistObject();
// playlistObject5.set('img','https://p1.music.126.net/Dhlp7vtct_FZE98mqKE5Vg==/109951163026151209.jpg?param=180y180')
// playlistObject5.set('text','华语||真的可以了，毕竟曾爱过。')
// playlistObject5.set('number','22.6万')

// let playlists = [playlistObject0,playlistObject1,playlistObject2,playlistObject3,playlistObject4,playlistObject5]
// AV.Object.saveAll(playlists)


//歌曲数据备份
// var SongObject = AV.Object.extend('Song');

// var songObject8 = new SongObject();
// songObject8.set('name','刚好遇见你')
// songObject8.set('quality','sq')
// songObject8.set('singer','李玉刚')
// songObject8.set('album','刚好遇见你')
// songObject8.set('address','https://oxsq8ic50.bkt.clouddn.com/%E5%88%9A%E5%A5%BD%E9%81%87%E8%A7%81%E4%BD%A0%20-%20%E6%9D%8E%E7%8E%89%E5%88%9A.mp3')
// songObject8.set('background','https://p4.music.126.net/oE2nktnzwDgYBoJhGky7EQ==/17725226951752339.jpg')
// songObject8.set('cover','https://p1.music.126.net/lDyytkTaPYVTb1Vpide6AA==/18591642115187138.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject8.set('lyric','[00:00.00] 作曲 : 高进\n[00:01.00] 作词 : 高进\n[00:12.56]我们哭了\n[00:15.27]我们笑着\n[00:18.60]我们抬头望天空\n[00:21.43]星星还亮着几颗\n[00:24.63]我们唱着\n[00:27.56]时间的歌\n[00:30.62]才懂得相互拥抱\n[00:34.00]到底是为了什么\n[00:36.94]因为我刚好遇见你\n[00:40.32]留下足迹才美丽\n[00:43.69]风吹花落泪如雨\n[00:46.48]因为不想分离\n[00:49.57]因为刚好遇见你\n[00:52.59]留下十年的期许\n[00:55.69]如果再相遇\n[00:59.15]我想我会记得你\n[01:14.28]我们哭了\n[01:16.88]我们笑着\n[01:20.29]我们抬头望天空\n[01:22.96]星星还亮着几颗\n[01:26.11]我们唱着\n[01:29.11]时间的歌\n[01:32.56]才懂得相互拥抱\n[01:35.36]到底是为了什么\n[01:38.47]因为我刚好遇见你\n[01:41.84]留下足迹才美丽\n[01:44.83]风吹花落泪如雨\n[01:47.97]因为不想分离\n[01:51.02]因为刚好遇见你\n[01:54.09]留下十年的期许\n[01:57.23]如果再相遇\n[02:00.69]我想我会记得你\n[02:03.69]因为刚好遇见你\n[02:06.43]留下足迹才美丽\n[02:09.57]风吹花落泪如雨\n[02:12.64]因为不想分离\n[02:15.76]因为刚好遇见你\n[02:18.78]留下十年的期许\n[02:21.83]如果再相遇\n[02:24.98]我想我会记得你\n[02:31.07]因为我刚好遇见你\n[02:34.13]留下足迹才美丽\n[02:37.25]风吹花落泪如雨\n[02:40.37]因为不想分离\n[02:43.43]因为刚好遇见你\n[02:46.48]留下十年的期许\n[02:49.58]如果再相遇\n[02:52.67]我想我会记得你')

// var songObjectA = new SongObject();
// songObjectA.set('name','Moonlight Shadow')
// songObjectA.set('quality','sq')
// songObjectA.set('singer','Groove Coverage')
// songObjectA.set('album','Best Of Groove Coverage')
// songObjectA.set('address','https://oxsq8ic50.bkt.clouddn.com/Moonlight%20Shadow%20-%20Groove%20Coverage.mp3')
// songObjectA.set('background','https://p4.music.126.net/u6lXIgJ0S1mGdV9anjUqEQ==/2421124604381777.jpg')
// songObjectA.set('cover','https://p1.music.126.net/8dnZQOUVyem-hM2SB45SQA==/768558627860128.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectA.set('lyric','[00:03.650]The last that ever she saw him\n[00:07.110]Carried away by a moonlight shadow\n[00:10.590]He passed on worried and warning\n[00:13.830]Carried away by a moonlight shadow.\n[00:17.340]Lost in a river last saturday night\n[00:20.720]Far away on the other side.\n[00:23.940]He was caught in the middle of a desperate fight\n[00:27.330]And she couldn\'t find how to push through\n[00:30.770]The trees that whisper in the evening\n[00:34.760]Carried away by a moonlight shadow\n[00:38.180]Sing a song of sorrow and grieving\n[00:41.640]Carried away by a moonlight shadow\n[00:45.060]All she saw was a silhouette of a gun\n[00:48.500]Far away on the other side.\n[00:51.500]He was shot six times by a man on the run\n[00:54.860]And she couldn\'t find how to push through\n[00:59.500]I stay\n[01:00.930]I pray\n[01:02.150]I see you in heaven far away\n[01:06.430]I stay\n[01:07.920]I pray\n[01:09.100]I see you in heaven one day\n[01:12.710]Four am in the morning\n[01:16.200]Carried away by a moonlight shadow\n[01:19.630]I watched your vision forming\n[01:23.120]Carried away by a moonlight shadow\n[01:26.920]Star was light in a silvery night\n[01:30.300]Far away on the other side\n[01:33.340]Will you come to talk to me this night\n[01:36.830]But she couldn\'t find how to push through\n[01:41.270]I stay\n[01:42.670]I pray\n[01:43.830]I see you in heaven far away\n[01:48.000]I stay\n[01:49.670]I pray\n[01:50.840]I see you in heaven one day')

// var songObject0 = new SongObject();
// songObject0.set('name','成都')
// songObject0.set('quality','normal')
// songObject0.set('singer','赵雷')
// songObject0.set('album','成都')
// songObject0.set('address','https://oxsq8ic50.bkt.clouddn.com/%E6%88%90%E9%83%BD%20-%20%E8%B5%B5%E9%9B%B7.mp3')
// songObject0.set('background','https://p3.music.126.net/RvTUmr9wQR-xjhAxWZ3VoA==/17702137207605115.jpg')
// songObject0.set('cover','https://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject0.set('lyric','[00:00.00] 作曲 : 赵雷\n[00:01.00] 作词 : 赵雷\n[00:16.75]让我掉下眼泪的 不止昨夜的酒\n[00:25.91]让我依依不舍的 不止你的温柔\n[00:33.91]余路还要走多久 你攥着我的手\n[00:41.70]让我感到为难的 是挣扎的自由\n[00:52.10]分别总是在九月 回忆是思念的愁\n[00:59.63]深秋嫩绿的垂柳 亲吻着我额头\n[01:07.53]在那座阴雨的小城里 我从未忘记你\n[01:15.41]成都 带不走的 只有你\n[01:23.69]和我在成都的街头走一走\n[01:31.08]直到所有的灯都熄灭了也不停留\n[01:39.69]你会挽着我的衣袖 我会把手揣进裤兜\n[01:47.08]走到玉林路的尽头 坐在(走过)小酒馆的门口\n[02:30.37]分别总是在九月 回忆是思念的愁\n[02:38.10]深秋嫩绿的垂柳 亲吻着我额头\n[02:46.13]在那座阴雨的小城里 我从未忘记你\n[02:54.02]成都 带不走的 只有你\n[03:02.34]和我在成都的街头走一走\n[03:10.41]直到所有的灯都熄灭了也不停留\n[03:18.34]你会挽着我的衣袖 我会把手揣进裤兜\n[03:25.51]走到玉林路的尽头 坐在(走过)小酒馆的门口\n[03:35.40]和我在成都的街头走一走\n[03:45.39]直到所有的灯都熄灭了也不停留\n[03:53.62]和我在成都的街头走一走\n[04:01.35]直到所有的灯都熄灭了也不停留\n[04:08.95]你会挽着我的衣袖 我会把手揣进裤兜\n[04:17.27]走到玉林路的尽头 坐在(走过)小酒馆的门口')[04:35.96]和我在成都的街头走一走\n[04:42.76]直到所有的灯都熄灭了也不停留\n

// var songObject9 = new SongObject();
// songObject9.set('name','白夜')
// songObject9.set('note1','(网剧《白夜追凶》主题曲)')
// songObject9.set('note2','（网剧《白夜追凶》主题曲）')
// songObject9.set('quality','sq')
// songObject9.set('singer','尹姝贻')
// songObject9.set('album','白夜')
// songObject9.set('address','https://oxsq8ic50.bkt.clouddn.com/%E7%99%BD%E5%A4%9C%20-%20%E5%B0%B9%E5%A7%9D%E8%B4%BB.mp3')
// songObject9.set('background','https://p3.music.126.net/W_OtlI88CPGTr6RdJ0NHqA==/109951163032618595.jpg')
// songObject9.set('cover','https://p1.music.126.net/jdVzpaknIlqAI4oBnesepw==/109951163032584409.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject9.set('lyric','[00:00.00] 作曲 : 尹姝贻\n[00:01.00] 作词 : 尹姝贻\n[00:31.880]人海茫茫\n[00:34.850]无风起浪\n[00:37.770]暗潮汹涌\n[00:40.760]此消彼长\n[00:43.730]春暖秋凉\n[00:46.790]别来无恙\n[00:49.820]明月当空\n[00:52.710]乘风破浪\n[00:55.690]谁心中有泪\n[00:58.710]挣扎于是非\n[01:01.660]还假装无谓\n[01:04.820]为爱赎罪\n[01:07.630]谁青春无悔\n[01:10.600]敬勇敢一杯\n[01:13.630]逆风踏凌霄\n[01:16.790]以光散黑\n[01:19.060]开往白天的夜\n[01:22.230]有没有终点\n[01:25.270]星光凋谢\n[01:28.200]迫在眉睫\n[01:31.410]轰轰烈烈\n[01:34.520]代价不屑\n[01:36.930]谁向谁妥协\n[01:39.970]谁跟谁告别\n[01:52.910]人海茫茫\n[01:55.820]无风起浪\n[01:58.840]暗潮汹涌\n[02:01.860]此消彼长\n[02:04.830]春暖秋凉\n[02:07.850]别来无恙\n[02:10.840]明月当空\n[02:13.750]乘风破浪\n[02:16.830]谁心中有泪\n[02:19.760]挣扎于是非\n[02:22.740]还假装无谓\n[02:25.640]为爱赎罪\n[02:28.590]谁青春无悔\n[02:31.680]敬勇敢一杯\n[02:34.780]逆风踏凌霄\n[02:37.810]以光散黑\n[02:39.940]开往白天的夜\n[02:43.290]有没有终点\n[02:46.400]星光凋谢\n[02:49.430]迫在眉睫\n[02:52.510]轰轰烈烈\n[02:55.450]代价不屑\n[02:57.990]谁向谁妥协\n[03:00.900]谁跟谁告别\n[03:13.240]开往白天的夜\n[03:16.140]有没有终点\n[03:19.160]星光凋谢\n[03:22.330]迫在眉睫\n[03:25.590]轰轰烈烈\n[03:28.430]代价不屑\n[03:30.980]谁向谁妥协\n[03:33.910]谁跟谁告别\n[03:40.090]谁跟谁告别\n[03:45.950]谁跟谁告别')

// var songObjectC = new SongObject();
// songObjectC.set('name','岁月神偷')
// songObjectC.set('quality','normal')
// songObjectC.set('singer','金玟岐')
// songObjectC.set('album','金玟岐作品集')
// songObjectC.set('address','https://oxsq8ic50.bkt.clouddn.com/%E5%B2%81%E6%9C%88%E7%A5%9E%E5%81%B7%20-%20%E9%87%91%E7%8E%9F%E5%B2%90.mp3')
// songObjectC.set('background','https://p3.music.126.net/QV5Qhn_Dilw-p2PiH-Aptw==/17838476649364626.jpg')
// songObjectC.set('cover','https://p1.music.126.net/54wdQi_3rpjreY2oo2jb7w==/5998935441219557.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectC.set('lyric','[00:00.00] 作曲 : 金玟岐\n[00:01.00] 作词 : 金玟岐\n[00:15.345]\n[00:20.345]能够握紧的就别放了\n[00:23.551]能够拥抱的就别拉扯\n[00:27.508]时间着急的\n[00:29.963]冲刷着\n[00:31.966]剩下了什么\n[00:35.521]原谅走过的那些曲折\n[00:39.478]原来留下的都是真的\n[00:43.590]纵然似梦啊 半醒着\n[00:47.948]笑着哭着都快活\n[00:51.904]谁让\n[00:55.359]时间是让人猝不及防的东西\n[00:59.268]晴时有风阴有时雨\n[01:03.280]争不过朝夕\n[01:05.334]又念着往昔\n[01:07.336]偷走了青丝却留住一个你\n[01:11.396]岁月是一场有去无回的旅行\n[01:15.253]好的坏的都是风景\n[01:19.260]别怪我贪心\n[01:21.263]只是不愿醒\n[01:23.167]因为你只为你愿和我一起\n[01:27.324]看云淡风轻\n[01:33.436]\n[01:43.456]时间是让人猝不及防的东西\n[01:47.214]晴时有风阴有时雨\n[01:51.170]争不过朝夕\n[01:53.323]又念着往昔\n[01:55.327]偷走了青丝却留住一个你\n[01:59.230]岁月是一场有去无回的旅行\n[02:03.483]好的坏的都是风景\n[02:07.542]别怪我贪心\n[02:09.596]只是不愿醒\n[02:11.400]因为你只为你愿和我一起\n[02:17.100]看云淡风轻\n[02:23.100]\n[02:26.345]吉他：薛峰\n[02:27.345]贝斯：郑骅骅\n[02:28.345]打击乐：王斌')

// var songObjectI = new SongObject();
// songObjectI.set('name','Shape of You')
// songObjectI.set('quality','sq')
// songObjectI.set('singer','Ed Sheeran')
// songObjectI.set('album','Shape Of You')
// songObjectI.set('address','https://oxsq8ic50.bkt.clouddn.com/Shape%20of%20You%20-%20Ed%20Sheeran.mp3')
// songObjectI.set('background','https://p3.music.126.net/plCj4jXJoiIFI1rTJp54mQ==/18278281300677550.jpg')
// songObjectI.set('cover','https://p1.music.126.net/5Zs51JS6cQzvQclW5u_J1g==/18832435162240436.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectI.set('lyric','[00:09.480]The club isn\'t the best place to find a lover\n[00:11.750]So the bar is where I go\n[00:14.590]Me and my friends at the table doing shots\n[00:16.760]Drinking faster and then we talk slow\n[00:19.500]You come over and start up a conversation with just me\n[00:21.820]And trust me I\'ll give it a chance now\n[00:24.420]Take my hand, stop, Put Van The Man on the jukebox\n[00:26.880]And then we start to dance, and now I\'m singing like\n[00:29.580]\n[00:29.820]Girl, you know I want your love\n[00:31.980]Your love was handmade for somebody like me\n[00:34.970]Come on now, follow my lead\n[00:37.010]I may be crazy, don\'t mind me, say\n[00:39.550]Boy, let\'s not talk too much\n[00:42.040]Grab on my waist and put that body on me\n[00:45.100]Come on now, follow my lead\n[00:46.880]Come—come on now, follow my lead\n[00:48.740]\n[00:50.460]I\'m in love with the shape of you\n[00:52.820]We push and pull like a magnet do\n[00:55.330]Although my heart is falling too\n[00:57.800]I\'m in love with your body\n[01:00.360]Last night you were in my room\n[01:02.940]And now my bedsheets smell like you\n[01:05.120]Every day discovering something brand new\n[01:07.830]I\'m in love with your body\n[01:09.590]Oh—i—oh—i—oh—i—oh—i\n[01:12.790]I\'m in love with your body\n[01:14.460]Oh—i—oh—i—oh—i—oh—i\n[01:17.830]I\'m in love with your body\n[01:19.420]Oh—i—oh—i—oh—i—oh—i\n[01:22.820]I\'m in love with your body\n[01:24.980]Every day discovering something brand new\n[01:27.900]I\'m in love with the shape of you\n[01:29.890]\n[01:30.070]One week in we let the story begin\n[01:31.750]We\'re going out on our first date\n[01:34.500]But you and me are thrifty so go all you can eat\n[01:36.730]Fill up your bag and I fill up a plate\n[01:39.250]We talk for hours and hours about the sweet and the sour\n[01:41.800]And how your family is doin\' okay\n[01:44.340]And leave and get in a taxi, we kiss in the backseat\n[01:46.990]Tell the driver make the radio play, and I\'m singing like\n[01:49.370]\n[01:49.610]Girl, you know I want your love\n[01:51.830]Your love was handmade for somebody like me\n[01:55.140]Come on now, follow my lead\n[01:56.980]I may be crazy, don\'t mind me, say\n[01:59.520]Boy, let\'s not talk too much\n[02:02.050]Grab on my waist and put that body on me\n[02:05.130]Come on now, follow my lead\n[02:06.850]Come—come on now, follow my lead\n[02:08.740]\n[02:10.610]I\'m in love with the shape of you\n[02:12.900]We push and pull like a magnet do\n[02:15.360]Although my heart is falling too\n[02:17.970]I\'m in love with your body\n[02:20.570]Last night you were in my room\n[02:22.940]And now my bedsheets smell like you\n[02:25.140]Every day discovering something brand new\n[02:28.050]I\'m in love with your body\n[02:29.530]Oh—i—oh—i—oh—i—oh—i\n[02:32.930]I\'m in love with your body\n[02:34.470]Oh—i—oh—i—oh—i—oh—i\n[02:37.790]I\'m in love with your body\n[02:39.510]Oh—i—oh—i—oh—i—oh—i\n[02:42.880]I\'m in love with your body\n[02:44.990]Every day discovering something brand new\n[02:48.200]I\'m in love with the shape of you\n[02:49.950]\n[02:50.150]Come on, be my baby, come on\n[02:52.340]Come on, be my baby, come on\n[02:54.840]Come on, be my baby, come on\n[02:57.300]Come on, be my baby, come on\n[02:59.820]Come on, be my baby, come on\n[03:02.350]Come on, be my baby, come on\n[03:04.820]Come on, be my baby, come on\n[03:07.340]Come on, be my baby, come on\n[03:09.410]\n[03:10.760]I\'m in love with the shape of you\n[03:12.820]We push and pull like a magnet too\n[03:15.360]Although my heart is falling too\n[03:17.960]I\'m in love with your body\n[03:20.420]Last night you were in my room\n[03:22.930]And now my bedsheets smell like you\n[03:25.060]Every day discovering something brand new\n[03:27.830] I\'m in love with your body\n[03:29.550]Come on, be my baby, come on\n[03:32.260]Come on, be my baby, come on\n[03:33.530]I\'m in love with your body\n[03:35.110]Come on, be my baby, come on\n[03:37.190]Come on, be my baby, come on\n[03:38.280]I\'m in love with your body\n[03:39.990]Come on, be my baby, come on\n[03:42.310]Come on, be my baby, come on\n[03:43.330]I\'m in love with your body\n[03:44.820]Every day discovering something brand new\n[03:48.010]I\'m in love with the shape of you')

// var songObject2 = new SongObject();
// songObject2.set('name','好久不见')
// songObject2.set('quality','sq')
// songObject2.set('singer','陈奕迅')
// songObject2.set('album','认了吧')
// songObject2.set('address','https://oxsq8ic50.bkt.clouddn.com/%E5%A5%BD%E4%B9%85%E4%B8%8D%E8%A7%81%20-%20%E9%99%88%E5%A5%95%E8%BF%85.mp3')
// songObject2.set('background','https://p4.music.126.net/CAje2-wQO-54kDbXgQnWiA==/17831879579690867.jpg')
// songObject2.set('cover','https://p1.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject2.set('lyric','[00:00.00] 作曲 : 陈小霞\n[00:01.00] 作词 : 施立\n[00:14.530]我来到 你的城市\n[00:22.150]走过你来时的路\n[00:28.470]想像着 没我的日子\n[00:34.640]你是怎样的孤独\n[00:40.050]\n[00:42.270]拿着你 给的照片\n[00:48.560]熟悉的那一条街\n[00:54.540]只是没了你的画面\n[01:00.590]我们回不到那天\n[01:05.200]\n[01:07.750]你会不会忽然的出现\n[01:14.600]在街角的咖啡店\n[01:20.660]我会带着笑脸 挥手寒暄\n[01:26.670]和你 坐着聊聊天\n[01:33.800]我多么想和你见一面\n[01:40.470]看看你最近改变\n[01:46.700]不再去说从前 只是寒暄\n[01:53.070]对你说一句 只是说一句\n[02:01.770]好久不见\n[02:04.960]\n[02:20.640]拿着你 给的照片\n[02:27.320]熟悉的那一条街\n[02:33.470]只是没了你的画面\n[02:39.290]我们回不到那天\n[02:44.010]\n[02:46.100]你会不会忽然的出现\n[02:52.970]在街角的咖啡店\n[02:58.870]我会带着笑脸 挥手寒暄\n[03:05.470]和你 坐着聊聊天\n[03:11.870]我多么想和你见一面\n[03:18.610]看看你最近改变\n[03:24.500]不再去说从前 只是寒暄\n[03:31.070]对你说一句 只是说一句\n[03:40.370]好久不见')

// var songObjectD = new SongObject();
// songObjectD.set('name','理想三旬(Live)')
// songObjectD.set('quality','sq')
// songObjectD.set('singer','谢春花')
// songObjectD.set('album','音乐好朋友 第一季')
// songObjectD.set('address','https://oxsq8ic50.bkt.clouddn.com/%E7%90%86%E6%83%B3%E4%B8%89%E6%97%AC%28Live%29%20-%20%E8%B0%A2%E6%98%A5%E8%8A%B1.mp3')
// songObjectD.set('background','https://p3.music.126.net/JwYPzSk-VVKDGgsUadkuxQ==/109951163044134701.jpg')
// songObjectD.set('cover','https://p1.music.126.net/MqEwyPK1SKmSFuq07BhkDg==/109951163044129482.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectD.set('lyric','[00:00.00] 作曲 : 陈鸿宇\n[00:00.671] 作词 : 唐映枫\n[00:02.14]编曲：谢春花与乐队\n[00:03.14]雨后有车驶来\n[00:04.96]驶过暮色苍白\n[00:06.92]旧铁皮往南开 恋人已不在\n[00:10.64]收听浓烟下的 诗歌电台\n[00:14.65]不动情的咳嗽 至少看起来\n[00:18.69]归途也还可爱\n[00:20.45]琴弦少了姿态\n[00:22.36]再不见那夜里 听歌的小孩\n[00:26.22]时光匆匆独白\n[00:28.13]将颠沛磨成卡带\n[00:30.14]已枯卷的情怀 踏碎成年代\n[00:49.70]就老去吧 孤独别醒来\n[00:55.15]你渴望的离开\n[00:58.63]只是无处停摆\n[01:01.57]就歌唱吧 眼睛眯起来\n[01:06.30]而热泪的崩坏\n[01:10.10]只是没抵达的存在\n[01:28.48]青春又醉倒在\n[01:30.10]籍籍无名的怀\n[01:32.08]靠嬉笑来虚度 聚散得慷慨\n[01:35.98]辗转却去不到 对的站台\n[01:39.79]如果漂泊是成长 必经的路牌\n[01:43.73]你迷醒岁月中\n[01:45.62]那贫瘠的未来\n[01:47.58]像遗憾季节里 未结果的爱\n[01:51.42]弄脏了每一页诗\n[01:53.23]吻最疼痛的告白\n[01:55.27]而风声吹到这 已无需释怀\n[02:14.93]就老去吧 孤独别醒来\n[02:19.93]你渴望的离开\n[02:23.44]只是无处停摆\n[02:26.32]就歌唱吧 眼睛眯起来\n[02:31.33]而热泪的崩坏\n[02:35.36]只是没抵达的存在')

// var songObjectE = new SongObject();
// songObjectE.set('name','永不消逝')
// songObjectE.set('note1','(电影《密战》片尾曲)')
// songObjectE.set('note2','（电影《密战》片尾曲）')
// songObjectE.set('quality','sq')
// songObjectE.set('singer','金志文')
// songObjectE.set('album','永不消逝')
// songObjectE.set('address','https://oxsq8ic50.bkt.clouddn.com/%E6%B0%B8%E4%B8%8D%E6%B6%88%E9%80%9D%20-%20%E9%87%91%E5%BF%97%E6%96%87.mp3')
// songObjectE.set('background','https://p4.music.126.net/1fp5VXbpbQuMkno_W4t1BQ==/109951163044311806.jpg')
// songObjectE.set('cover','https://p1.music.126.net/eOI31GDuOeAiVj-qSmkFdQ==/109951163044301475.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectE.set('lyric','[00:00.00] 作曲 : 金志文\n[00:00.334] 作词 : 边疆\n[00:01.04]编曲：金志文\n[00:02.16]\n[00:02.35]继续走 是呼吸 在颤抖\n[00:13.78]继续走 是眼泪 不肯流\n[00:23.01]穿过黑暗等待破晓的光\n[00:27.81]尽管匆匆\n[00:30.39]从未这样从容\n[00:33.73]孤独就算比想象可怕\n[00:39.01]你爱的人\n[00:41.52]等你回家\n[00:44.95]究竟要有多勇敢坚定\n[00:50.16]抛下所有一切 在刀尖游走\n[00:55.98]耳边还有希望在滴答\n[01:00.95]又怎能倒下 紧握着的手\n[01:07.23]已准备好继续走\n[01:09.91]一直走到最后黎明唤醒夜空\n[01:14.90]鲜血不再流\n[01:17.56]永不消逝\n[01:19.26]追寻光的出口\n[01:23.10]时间不等候\n[01:25.86]信念还在守\n[01:28.71]继续走\n[01:39.18]\n[01:41.22]穿过黑暗等破晓的光\n[01:45.99]尽管匆匆\n[01:48.56]从未这样从容\n[01:52.00]孤独就算比想象可怕\n[01:57.11]你爱的人\n[02:00.00]等你回家\n[02:03.16]究竟要有多勇敢坚定\n[02:07.41]抛下所有一切 在刀尖游走\n[02:14.24]耳边还有希望在滴答\n[02:19.12]又怎能倒下 紧握着的手\n[02:25.13]已准备好继续走\n[02:27.86]一直走到最后黎明唤醒夜空\n[02:33.00]鲜血不再流\n[02:35.72]永不消逝\n[02:37.46]追寻光的出口\n[02:41.23]时间不等候\n[02:44.09]信念还在守\n[02:47.12]继续走\n[03:02.29]\n[03:11.91]短暂的漫长的无声的时光\n[03:22.04]遥远的身边的沉默的力量\n[03:30.85]就在拥抱后\n[03:32.69]继续走\n[03:34.80]一直走到最后黎明唤醒夜空\n[03:40.03]鲜血不再流\n[03:42.80]永不消逝\n[03:44.47]追寻光的出口\n[03:48.26]时间不等候\n[03:51.00]信念还在守\n[03:54.18]继续走\n[03:59.64]一直走到最后黎明唤醒夜空\n[04:02.39]鲜血不再流\n[04:05.23]永不消逝\n[04:07.47]追寻光的出口\n[04:10.64]时间不等候\n[04:13.52]信念还在守\n[04:17.55]继续走\n[04:23.60]\n[04:24.92]制作人Producer：金志文\n[04:25.78]经纪人Artist Management ：刘金剑\n[04:26.60]制作统筹Producer Coordinator：刘昊昱\n[04:27.38]鼓Durms：祁大为\n[04:28.05]吉他Lead Guitar：金志文 金天\n[04:28.75]贝斯Bass：王佳林\n[04:29.55]合声编写Backing Vocals Arrangement：金志文\n[04:30.30]合声Backing Vocals：金志文\n[04:31.00]录音棚 Recording Studio：金志文工作室\n[04:31.68]混音工程师Mixing Engineer：黄钦胜\n[04:32.35]音乐发行：自在天浩')

// var songObjectG = new SongObject();
// songObjectG.set('name','Time')
// songObjectG.set('quality','normal')
// songObjectG.set('singer','MKJ')
// songObjectG.set('album','Time')
// songObjectG.set('address','https://oxsq8ic50.bkt.clouddn.com/Time%20-%20MKJ.mp3')
// songObjectG.set('background','https://p4.music.126.net/pUWpza3woeQ4UDsNz0oqdg==/18196917439716312.jpg')
// songObjectG.set('cover','https://p1.music.126.net/c7vJlx2v-J4gIk67zs2ZDw==/7941772488435204.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectG.set('lyric','[00:16.50]Money is not evil by itself\n[00:18.20]Its just paper with perceived value to obtain other things we value in other ways\n[00:23.40]If not money – what is evil you may ask?\n[00:27.40]Evil is the unquenchable, obsessive and moral bending desire for more\n[00:32.30]Evil is the bottomless, soulless and obsessive-compulsive pursuit of some pot of gold\n[00:37.70]at the end of some rainbow which doesn’t exist\n[00:40.70]Evil is having a price tag for your heart and soul in exchange for financial success at any cost\n[00:48.10]Evil is trying to buy happiness, again and again\n[00:51.60]until all of those fake, short lived mirages of emotions are gone\n[01:27.70]Make more time\n[02:01.30]I’m not saying you can’t be financially successful\n[02:04.50]I’m saying have a greater purpose in life well beyond the pursuit of financial success\n[02:10.30]Your soul is screaming for you to answer your true calling\n[02:14.60]You can change today if you redefine what success is to you\n[02:17.90]You can transform your damaged relationships and build new ones\n[02:21.10]You can forgive yourself and others who’ve hurt you\n[02:24.50]You can become a leader by mentoring with others who you aspire to be like\n[02:29.80]You can re-balance your priorities in life\n[02:32.80]You can heal your marriage and recreate a stronger love than you ever thought possible\n[02:37.80]You can become the best parent possible at any age – even 86\n[02:42.80]but don’t wait until then…\n[02:44.80]You will always be able to make more money\n[02:47.30]But you cannot make more time')

// var songObject1 = new SongObject();
// songObject1.set('name','带你去旅行')
// songObject1.set('quality','sq')
// songObject1.set('singer','校长')
// songObject1.set('album','带你去旅行')
// songObject1.set('address','https://oxsq8ic50.bkt.clouddn.com/%E5%B8%A6%E4%BD%A0%E5%8E%BB%E6%97%85%E8%A1%8C%20-%20%E6%A0%A1%E9%95%BF.mp3')
// songObject1.set('background','https://p3.music.126.net/otcH5YalFi7199iCCAynpg==/109951163009986654.jpg')
// songObject1.set('cover','https://p1.music.126.net/Y1M_jMalH6bWa6OydUeU2A==/18555358232355277.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject1.set('lyric','[00:00.00] 作曲 : 朱贺\n[00:01.00] 作词 : 朱贺\n[00:03.64]编曲 : 王柏鸿\n[00:19.04]今天妆令人特别着迷\n[00:21.00]oh我说baby\n[00:23.02]出门前换上新的心情\n[00:25.27]oh我的lady\n[00:27.13]你喜欢有小情绪\n[00:30.31]像晴天的乌云\n[00:35.24]头发长见识短的惊奇\n[00:37.56]表情丰富令人着迷\n[00:39.86]你的一切我都好奇像秘密\n[00:43.54]安全带系好带你去旅行\n[00:47.55]穿过风和雨\n[00:51.53]我想要带你去浪漫的土耳其\n[00:55.47]然后一起去东京和巴黎\n[00:59.58]其实我特别喜欢迈阿密\n[01:04.00]和有黑人的洛杉矶\n[01:08.59]其实亲爱的你不必太过惊奇\n[01:12.14]一起去繁华的上海和北京\n[01:16.36]还有云南的大理保留着回忆\n[01:20.63]这样才有意义\n[01:43.30]今天妆令人特别着迷\n[01:45.58]oh我说baby\n[01:47.23]出门前换上新的心情\n[01:50.21]oh我的lady\n[01:51.17]你喜欢有小情绪\n[01:54.84]像晴天的乌云\n[01:59.52]头发长见识短的惊奇\n[02:02.47]表情丰富令人着迷\n[02:04.23]你的一切我都好奇像秘密\n[02:07.86]安全带系好带你去旅行\n[02:11.74]穿过风和雨\n[02:15.76]我想要带你去浪漫的土耳其\n[02:19.58]然后一起去东京和巴黎\n[02:23.61]其实我特别喜欢迈阿密\n[02:27.83]和有黑人的洛杉矶\n[02:32.06]其实亲爱的你不必太过惊奇\n[02:36.39]一起去繁华的上海和北京\n[02:40.41]还有云南的大理保留着回忆\n[02:45.19]这样才有意义\n[02:49.26]我想带要你去浪漫的土耳其\n[02:53.18]然后一起去东京和巴黎\n[02:57.21]其实我特别喜欢迈阿密\n[03:01.48]和有黑人的洛杉矶\n[03:06.15]其实亲爱的你不必太过惊奇\n[03:10.23]一起去繁华的上海和北京\n[03:14.36]还有云南的大理保留着回忆\n[03:18.79]这样才有意义\n[03:28.05]还有云南的大理保留着回忆\n[03:36.05]\n[03:36.85]缩混：王柏鸿\n[03:37.02]监制：三千\n[03:38.32]制作人：王柏鸿+朱贺\n[03:39.63]和声/和声编写：王柏鸿\n[03:40.93]录音室：Hot Music Studio\n[03:41.20]混音室：Hot Music Studio\n[03:42.59]OP/SP：千和世纪')

// var songObjectH = new SongObject();
// songObjectH.set('name','How Long')
// songObjectH.set('quality','sq')
// songObjectH.set('singer','Charlie Puth')
// songObjectH.set('album','How Long')
// songObjectH.set('address','https://oxsq8ic50.bkt.clouddn.com/How%20Long%20-%20Charlie%20Puth.mp3')
// songObjectH.set('background','https://p4.music.126.net/Ep8Hw8xv3Fx_EuENNazX8Q==/109951163037746918.jpg')
// songObjectH.set('cover','https://p1.music.126.net/quPVbyAS9qaBz1LCkAqkag==/109951163037746910.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectH.set('lyric','[00:11.43]I\'ll admit I was wrong\n[00:13.55]What else can I say girl\n[00:15.39]Can\'t you blame my head and not my heart\n[00:18.44]\n[00:20.07]I was drunk I was gone\n[00:22.16]That don\'t make it right but\n[00:23.99]Promise there were no feelings involved\n[00:26.85]\n[00:28.76]She said boy tell me honestly\n[00:33.20]Was it real or just for show\n[00:35.96]\n[00:37.47]She said save your apologies\n[00:42.20]Baby I just got to know\n[00:45.26]How long has this been goin\' on\n[00:49.67]You\'ve been creepin\' round on me\n[00:51.97]While you\'re calling me baby\n[00:54.00]How long has this been goin\' on\n[00:58.39]You\'ve been acting so shady\n[01:00.71]I\'ve been feeling it lately baby\n[01:03.70]\n[01:12.47]I\'ll admit it\'s my fault\n[01:14.61]But you gotta believe me\n[01:16.56]When I say it only happened once\n[01:19.42]\n[01:21.15]I try and I try but you\'ll never see that\n[01:25.14]You\'re the only one I wanna love\n[01:27.92]\n[01:29.86]She said boy tell me honestly\n[01:34.50]Was it real or just for show\n[01:37.08]\n[01:38.57]She said save your apologies\n[01:43.33]Baby I just got to know\n[01:46.39]How long has this been goin\' on\n[01:50.86]You\'ve been creepin\' round on me\n[01:53.14]While you\'re calling me baby\n[01:55.07]How long has this been goin\' on\n[01:59.50]You\'ve been acting so shady\n[02:02.02]I\'ve been feeling it lately baby\n[02:04.78]\n[02:11.13]How long has this been goin\' on baby\n[02:13.68]\n[02:16.48]You gonna go tell me now\n[02:17.62]\n[02:22.13]She said boy tell me honestly\n[02:26.84]Was it real or just for show\n[02:29.30]\n[02:30.92]She said save your apologies\n[02:35.67]Baby I just got to know\n[02:38.68]How long has this been goin\' on\n[02:45.47]You\'ve been creepin\' round on me\n[02:47.52]While you\'re calling me baby\n[02:49.62]How long has this been goin\' on\n[02:54.01]You\'ve been acting so shady\n[02:56.21]I\'ve been feeling it lately baby\n[02:58.55]How long has this been goin\' on\n[03:02.75]You\'ve been creepin\' round on me\n[03:04.74]\n[03:05.68]How long has this been goin\' on baby\n[03:07.60]How long has this been goin\' on\n[03:11.49]You gonna go tell me now\n[03:11.65]You\'ve been acting so shady\n[03:13.60]I\'ve been feeling it lately baby')

// var songObject5 = new SongObject();
// songObject5.set('name','安和桥')
// songObject5.set('quality','sq')
// songObject5.set('singer','宋冬野')
// songObject5.set('album','安和桥北')
// songObject5.set('address','https://oxsq8ic50.bkt.clouddn.com/%E5%AE%89%E5%92%8C%E6%A1%A5%20-%20%E5%AE%8B%E5%86%AC%E9%87%8E.mp3')
// songObject5.set('background','https://p4.music.126.net/0JhbAgmcKnwo1GxiWpl3LQ==/2518981139310302.jpg')
// songObject5.set('cover','https://p1.music.126.net/mPlr0GoQU2Wl_aZzIgIJ6A==/1984618488161733.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject5.set('lyric','[00:37.496]让我再看你一遍\n[00:38.694]从南到北\n[00:44.476]像是被五环路蒙住的双眼\n[00:52.659]请你再讲一遍\n[00:54.496]关于那天\n[00:58.496]抱着盒子的姑娘\n[01:03.300]和擦汗的男人\n[01:06.780]我知道 那些夏天\n[01:09.780]就像青春一样回不来\n[01:13.360]代替梦想的也只能是勉为其难\n[01:20.379]我知道 吹过的牛逼\n[01:24.180]也会随青春一笑了之\n[01:28.480]让我困在城市里\n[01:31.769]纪念你\n[01:36.370]让我再尝一口\n[01:39.500]秋天的酒\n[01:44.185]一直往南方开\n[01:46.117]不会太久\n[01:52.669]让我再听一遍\n[01:53.495]最美的那一句\n[01:58.400]你回家了\n[02:01.680]我在等你呢\n[02:35.299]我知道 那些夏天\n[02:38.752]就像青春一样回不来\n[02:43.075]代替梦想的也只能是勉为其难\n[02:50.949]我知道 吹过的牛逼\n[02:52.998]也会随青春一笑了之\n[02:59.299]让我困在城市里 纪念你\n[03:04.778]我知道 那些夏天\n[03:08.849]就像你一样回不来\n[03:12.187]我也不会再对谁满怀期待\n[03:19.798]我知道 这个世界\n[03:22.898]每天都有太多遗憾\n[03:27.357]所以你好 再见')

// var songObjectJ = new SongObject();
// songObjectJ.set('name','追光者')
// songObjectJ.set('note1','(电视剧《夏至未至》插曲)')
// songObjectJ.set('note2','（电视剧《夏至未至》插曲）')
// songObjectJ.set('quality','sq')
// songObjectJ.set('singer','岑宁儿')
// songObjectJ.set('album','夏至未至 影视原声带')
// songObjectJ	.set('address','https://oxsq8ic50.bkt.clouddn.com/%E8%BF%BD%E5%85%89%E8%80%85%20-%20%E5%B2%91%E5%AE%81%E5%84%BF.mp3')
// songObjectJ.set('background','https://p4.music.126.net/iMEpR_WRMEZv48G3DB6sMw==/18225504742568899.jpg')
// songObjectJ.set('cover','https://p1.music.126.net/ZZAQGWl9mR7g5xCyWWH3Pw==/19149094509535913.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectJ.set('lyric','[00:00.00] 作曲 : 马敬\n[00:01.00] 作词 : 唐恬\n[00:09.320]编曲 : 黎偌天\n[00:24.650]如果说你是海上的烟火\n[00:29.640]我是浪花的泡沫\n[00:33.200]某一刻你的光照亮了我\n[00:38.080]如果说你是遥远的星河\n[00:42.960]耀眼得让人想哭\n[00:48.450]我是追逐着你的眼眸\n[00:51.600]总在孤单时候眺望夜空\n[01:00.880]我可以跟在你身后\n[01:04.130]像影子追着光梦游\n[01:07.530]我可以等在这路口\n[01:10.870]不管你会不会经过\n[01:14.300]每当我为你抬起头\n[01:17.600]连眼泪都觉得自由\n[01:20.680]有的爱像阳光倾落边拥有边失去着\n[01:41.300]如果说你是夏夜的萤火\n[01:46.220]孩子们为你唱歌\n[01:49.930]那么我是想要画你的手\n[01:54.640]你看我多么渺小一个我\n[01:59.510]因为你有梦可做\n[02:05.120]也许你不会为我停留\n[02:08.360]那就让我站在你的背后\n[02:14.290]我可以跟在你身后\n[02:17.460]像影子追着光梦游\n[02:20.770]我可以等在这路口\n[02:24.110]不管你会不会经过\n[02:27.490]每当我为你抬起头\n[02:30.840]连眼泪都觉得自由\n[02:34.520]有的爱像大雨滂沱却依然相信彩虹\n[03:07.590]我可以跟在你身后\n[03:10.870]像影子追着光梦游\n[03:14.440]我可以等在这路口\n[03:17.580]不管你会不会经过\n[03:20.890]每当我为你抬起头\n[03:24.130]连眼泪都觉得自由\n[03:27.760]有的爱像大雨滂沱却依然相信彩虹\n[03:37.010]\n[03:37.110]制作人 : 黎偌天\n[03:37.420]吉他 : 劳国贤\n[03:37.700]弦乐 : 国际首席爱乐乐团\n[03:38.050]Bass : 大宇\n[03:38.460]监制 : 宋鹏飞\n[03:38.800]音乐出品发行公司 : 听见时代传媒')

// var songObject6 = new SongObject();
// songObject6.set('name','在路上')
// songObject6.set('quality','normal')
// songObject6.set('singer','花粥')
// songObject6.set('album','早年间的一些歌')
// songObject6.set('address','https://oxsq8ic50.bkt.clouddn.com/%E5%9C%A8%E8%B7%AF%E4%B8%8A%20-%20%E8%8A%B1%E7%B2%A5.mp3')
// songObject6.set('background','https://p3.music.126.net/yJ_9E6p7bYhS9fs2HK_vkA==/18163932091573846.jpg')
// songObject6.set('cover','https://p1.music.126.net/EJU-z9ykcq95uqruhUpb0Q==/2532175281754058.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject6.set('lyric','[00:08.94]亲爱的你来听我讲\n[00:12.74]我要陪在你身旁\n[00:16.64]要是你在家闷得慌\n[00:20.54]咱们就到处逛一逛\n[00:26.40]我想和你去丽江\n[00:30.25]一边弹琴一边唱\n[00:34.00]我想带你回新疆\n[00:38.00]十串烤肉一个馕\n[00:43.81]lailailailailailailai\n[01:00.93]我要把好吃的消灭光\n[01:04.52]你可千万不要嫌我胖\n[01:08.22]瘦姑娘抱起来咯得慌\n[01:11.81]不如我健康又漂亮\n[01:17.78]你喜欢我的花衣裳\n[01:21.13]我也喜欢你耍流氓\n[01:25.11]我们喝的是鸡蛋汤\n[01:28.81]我们吃的是泡泡糖\n[01:34.53]lailailailailailailai\n[01:59.34]每一天我们都在路上\n[02:02.84]唱唱小歌晒晒太阳')

// var songObjectB = new SongObject();
// songObjectB.set('name','She')
// songObjectB.set('quality','sq')
// songObjectB.set('singer','Groove Coverage')
// songObjectB.set('album','Best Of Groove Coverage')
// songObjectB.set('address','https://oxsq8ic50.bkt.clouddn.com/She%20-%20Groove%20Coverage.mp3')
// songObjectB.set('background','https://p4.music.126.net/u6lXIgJ0S1mGdV9anjUqEQ==/2421124604381777.jpg')
// songObjectB.set('cover','https://p1.music.126.net/8dnZQOUVyem-hM2SB45SQA==/768558627860128.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectB.set('lyric','[00:18.088]She hangs out every day nearby the beach\n[00:22.518]Havin\' a Heineken fallin\' asleep\n[00:27.998]She looks so sexy when she\'s walking the sand\n[00:32.178]Nobody ever put a ring on her hand\n[00:36.978]Swim to the oceanshore fish in the sea\n[00:41.508]She is the story the story is she\n[00:46.378]She sings to the moon and the stars in the sky\n[00:50.648]Shining from high above you shouldn\'t ask why\n[00:56.089]She is the one that you never forget\n[01:00.508]She is the heaven-sent angel you met\n[01:06.099]Oh, she must be the reason why God made a girl\n[01:10.838]She is so pretty all over the world\n[01:16.189]She puts the rhythm, the beat in the drum\n[01:20.248]She comes in the morning, in the evening she\'s gone\n[01:25.198]Every little hour every second you live\n[01:29.798]Trust in eternity that\'s what she gives\n[01:34.758]She looks like Marilyn, walks likeSuzanne\n[01:39.276]She talks like Monica and Marianne\n[01:44.276]She wins in everything that she might do\n[01:48.758]And she will respect you forever just you\n[01:53.597]She is the one that you never forget\n[01:58.238]She is the heaven-sent angel you met\n[02:03.148]Oh, she must be the reason why God made a girl\n[02:08.397]She is so pretty all over the world\n[02:13.198]She is so pretty all over the world\n[02:20.278]She is so pretty\n[02:24.588]She is like you and me\n[02:29.198]Like them like we\n[02:32.170]She is in you and me\n[02:37.058]She is the one that you never forget\n[02:40.827]She is the heaven-sent angel you met\n[02:45.919]Oh, she must be the reason why God made a girl\n[02:50.718]She is so pretty all over the world\n[02:55.398](She is the one) She is the one\n[02:57.419](That you never forget) That you never forget\n[03:00.438]She is the heaven-sent angel you met\n[03:04.990]She\'s the reason (oh she must be the reason) why God made a girl\n[03:08.928]She is so pretty all over the world (oh...)\n[03:13.998]Na na na na na …')

// var songObject7 = new SongObject();
// songObject7.set('name','红玫瑰')
// songObject7.set('quality','sq')
// songObject7.set('singer','陈奕迅')
// songObject7.set('album','认了吧')
// songObject7.set('address','https://oxsq8ic50.bkt.clouddn.com/%E7%BA%A2%E7%8E%AB%E7%91%B0%20-%20%E9%99%88%E5%A5%95%E8%BF%85.mp3')
// songObject7.set('background','https://p4.music.126.net/CAje2-wQO-54kDbXgQnWiA==/17831879579690867.jpg')
// songObject7.set('cover','https://p1.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject7.set('lyric','[00:00.00] 作曲 : 梁翘柏\n[00:01.00] 作词 : 李焯雄\n[00:15.548]梦里梦到醒不来的梦\n[00:18.109]红线里被软禁的红\n[00:22.980]所有刺激剩下疲乏的痛 再无动于衷\n[00:29.699]从背后抱你的时候 期待的却是她的面容\n[00:37.128]说来实在嘲讽 我不太懂 偏渴望你懂\n[00:44.179]是否幸福轻得太沉重\n[00:47.929]过度使用不痒不痛 烂熟透红空洞了的瞳孔\n[00:55.710]终于掏空 终于有始无终\n[00:59.179]得不到的永远在骚动\n[01:02.949]被偏爱的 都有恃无恐\n[01:06.650]玫瑰的红 容易受伤的梦\n[01:10.910]握在手中却流失于指缝\n[01:14.189]又落空\n[01:16.669]\n[01:30.900]红是朱砂痣烙印心口\n[01:33.088]红是蚊子血般平庸\n[01:37.930]时间美化那仅有的悸动 也磨平激动\n[01:45.300]从背后抱你的时候 期待的却是她的面容\n[01:52.300]说来实在嘲讽 我不太懂 偏渴望你懂\n[01:59.070]是否幸福轻得太沉重\n[02:03.389]过度使用 不痒不痛\n[02:06.400]烂熟透红空洞了的瞳孔\n[02:11.349]终于掏空 终于有始无终\n[02:14.768]得不到的永远在骚动\n[02:18.898]被偏爱的都有恃无恐\n[02:22.818]玫瑰的红 容易受伤的梦\n[02:27.990]握在手中却流失于指缝\n[02:30.300]又落空\n[02:34.300]\n[02:45.308]是否说爱都太过沉重\n[02:49.498]过度使用不痒不痛\n[02:52.509]烧得火红 蛇行缠绕心中\n[02:56.868]终于冷冻终于有始无终\n[03:00.288]得不到的永远在骚动\n[03:03.979]被偏爱的都有恃无恐\n[03:08.408]玫瑰的红 容易受伤的梦\n[03:14.189]握在手中却流失于指缝\n[03:16.400]得不到的永远在骚动\n[03:19.758]被偏爱的 都有恃无恐\n[03:23.328]玫瑰的红 伤口绽放的梦\n[03:27.558]握在手中却流失于指缝\n[03:30.960]再落空')

// var songObjectF = new SongObject();
// songObjectF.set('name','Panama')
// songObjectF.set('quality','normal')
// songObjectF.set('singer','Matteo')
// songObjectF.set('album','Panama')
// songObjectF.set('address','https://oxsq8ic50.bkt.clouddn.com/Panama%20-%20Matteo.mp3')
// songObjectF.set('background','https://p3.music.126.net/-l2rk74khHZkFNyDaQU1Fw==/17639465044486775.jpg')
// songObjectF.set('cover','https://p1.music.126.net/Fq1Ypau-g86ZtotF4wPEKw==/7867005697927440.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObjectF.set('lyric','[00:00.790]若是你不喜欢这地方\n[00:02.590]那就飞往巴拿马吧\n[00:05.900]日复一日 亲爱的我用尽全力拼搏着\n[00:07.990]不辞辛劳 勇往直前\n[00:10.530]我要赠予你一份礼物\n[00:12.660]与我而言珍贵无比 无法衡量\n[00:15.370]与他人而言 却是一文不值\n[00:17.750]只有你知晓如何让我展翅高飞\n[00:19.890]在牙买加 在智利 智利\n[00:22.250]这颗心只为你怦然心动\n[00:24.740]\n[00:28.230]只是为你\n[00:29.630]\n[00:34.040]你不愿接我电话\n[00:36.090]但也无所谓 我在阳台上找到你\n[00:38.640]你会亲眼看到\n[00:40.950]我是如何手捧鲜花 赠予你\n[00:43.400]我弹奏着吉他 为你献上一曲\n[00:48.220]若是你不喜欢这地方\n[00:50.360]那就飞往巴拿马吧\n[00:53.090]到底怎么回事\n[00:54.790]飞往巴拿马\n[00:59.000]飞往那里 我该做些什么\n[01:04.230]飞往巴拿马\n[01:09.110]让我们携手共进\n[01:12.760]我气势汹汹一路向前\n[01:15.330]无论怎样 亲爱的 我并非无用之人\n[01:17.690]我想念着你 愿你重回我身边\n[01:19.970]准时回家 沉浸在温暖的时光中\n[01:22.600]赚再多钱又有何用\n[01:24.540]若是你能够给我暖暖的爱我会日日将其珍藏\n[01:27.130]就像邦妮克莱德只有你我两人\n[01:29.450]我们一同观看喜欢的电影\n[01:32.370]\n[01:35.200]共享恋爱 好似电影中的场景\n[01:36.780]\n[01:41.300]你不愿接我电话\n[01:42.930]但也无所谓 我在阳台上找到你\n[01:45.770]你会亲眼看到\n[01:47.960]我是如何手捧鲜花 赠予你\n[01:50.600]我弹奏着吉他 为你献上一曲\n[01:55.390]若是你不喜欢这地方\n[01:57.630]飞往巴拿马 这究竟是为何\n[02:01.520]飞往巴拿马\n[02:06.420]飞往那里 我该做些什么\n[02:11.390]飞往巴拿马\n[02:15.990]天啊\n[02:20.930]亲爱的\n[02:25.320]我爱你 也愿你能爱着我\n[02:30.050]亲爱的女孩 我的爱\n[02:34.270]如此美好\n[02:39.040]你不愿接我电话\n[02:40.860]但也无所谓 我在阳台上找到你\n[02:43.380]你会亲眼看到\n[02:45.520]我是如何手捧鲜花 赠予你\n[02:48.110]我弹奏着吉他 为你献上一曲\n[02:52.920]若是你不喜欢这地方\n[02:55.350]那就飞往巴拿马吧 这究竟是为何\n[02:59.230]飞往巴拿马\n[03:04.060]飞往那里 我该做些什么\n[03:09.090]飞往巴拿马\n[03:13.970]心中的激情在燃烧')

// var songObject3 = new SongObject();
// songObject3.set('name','青蛇')
// songObject3.set('quality','sq')
// songObject3.set('singer','七朵组合')
// songObject3.set('album','青蛇')
// songObject3.set('address','https://oxsq8ic50.bkt.clouddn.com/%E9%9D%92%E8%9B%87%20-%20%E4%B8%83%E6%9C%B5%E7%BB%84%E5%90%88.mp3')
// songObject3.set('background','https://p4.music.126.net/d6UYwGVWQCWK1GcyKqomMA==/109951163016425171.jpg')
// songObject3.set('cover','https://p1.music.126.net/XPTwmSBHWMq8ROGzHWL1YA==/109951163016417405.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject3.set('lyric','[00:00.00] 作曲 : 邹梓骅\n[00:00.30] 作词 : 邹梓骅\n[00:00.90]编曲：邹梓骅\n[00:01.10]制作人：何亮\n[00:01.30]混音：何亮\n[00:19.25]喻筱博：\n[00:24.21]青岑可浪碧海可尘\n[00:27.20]只一片云烟\n[00:30.91]徒留下一言无尽的轻叹\n[00:36.73]吴圆圆：\n[00:37.68]若是没有湖边邂逅了许仙\n[00:44.47]也不必与宿命纠缠\n[00:49.17]合：\n[00:49.54]梦回到\n[00:51.18]青儿你请看\n[00:52.93]姐姐修炼为了爱在青山间\n[00:57.96]修炼千年脱去鳞片\n[01:00.96]盼来到人间\n[01:03.10]又回到\n[01:04.62]青儿你马上施法呼风唤雨\n[01:07.63]借这把油纸伞\n[01:09.79]再交还许仙\n[01:11.06]韦欢：\n[01:11.44]前世牧童再与你相见\n[01:16.14]合：\n[01:16.53]你看这\n[01:18.17]夕阳映着西湖边\n[01:20.74]片片柳荫不成眠\n[01:24.71]我却只盼与你相见\n[01:27.07]偏偏难\n[01:31.74]泪沾青衣诉塔前\n[01:34.34]我似等待了千年\n[01:38.48]惜夜繁星仍点点\n[01:59.02]颜灵兰：\n[02:02.21]月下铜镜青丝\n[02:04.03]难捋镜中泪眼\n[02:08.99]琴瑟它再婉转终是空谈\n[02:14.21]刘木子：\n[02:14.34]若梦见\n[02:15.92]若梦见\n[02:18.21]烟雨江南\n[02:22.52]缘分落在哪个湖畔\n[02:26.93]合：\n[02:27.48]梦回到\n[02:28.35]你曾对我说不管\n[02:30.39]踏遍天涯到哪里\n[02:32.25]韦欢：\n[02:32.35]可现在我只能够\n[02:33.91]咫尺天涯地守着你\n[02:34.99]合：\n[02:35.05]在洞中千年却为今天呐\n[02:38.30]韦欢：\n[02:38.40]而我却只能远远地远远地\n[02:41.11]远远地守望着你\n[02:42.04]合：\n[02:42.10]我不能再这样无能为力\n[02:44.18]感受你的痛\n[02:45.82]在我的心上\n[02:47.04]韦欢：\n[02:47.47]在我心上刻画哀伤\n[02:49.19]待我修炼归来之日\n[02:50.97]若法海仍执意阻挡\n[02:52.55]等待那么漫长\n[02:54.47]你看这\n[02:54.91]合：\n[02:55.18]你看这\n[02:56.15]夕阳映着西湖边\n[02:58.75]片片柳荫不成眠\n[03:02.94]我却只盼与你相见\n[03:05.11]偏偏难\n[03:09.74]泪沾青衣诉塔前\n[03:12.32]我似等待了千年\n[03:16.48]惜夜繁星仍点点\n[03:23.30]夕阳已然落西边\n[03:25.79]不知今夕是何年\n[03:29.85]我却仍盼与你相见\n[03:31.89]偏偏难\n[03:36.81]泪沾青衣诉塔前\n[03:39.37]我似等待了千年\n[03:43.51]惜夜繁星仍点点')

// var songObject4 = new SongObject();
// songObject4.set('name','演员')
// songObject4.set('quality','sq')
// songObject4.set('singer','薛之谦')
// songObject4.set('album','绅士')
// songObject4.set('address','https://oxsq8ic50.bkt.clouddn.com/%E6%BC%94%E5%91%98%20-%20%E8%96%9B%E4%B9%8B%E8%B0%A6.mp3')
// songObject4.set('background','https://p3.music.126.net/GZdp-Q4YwN-DuchTzyeJlA==/16666397253916977.jpg')
// songObject4.set('cover','https://p1.music.126.net/qpvBqYIqkRhO9Ry2qOCdJQ==/2942293117852634.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0')
// songObject4.set('lyric','[00:00.00] 作曲 : 薛之谦\n[00:01.00] 作词 : 薛之谦\n[00:04.200]\n[00:21.120]简单点说话的方式简单点\n[00:28.560]\n[00:30.200]递进的情绪请省略\n[00:33.640]你又不是个演员\n[00:36.380]别设计那些情节\n[00:39.360]\n[00:41.930]没意见我只想看看你怎么圆\n[00:50.410]\n[00:51.540]你难过的太表面 像没天赋的演员\n[00:57.150]观众一眼能看见\n[01:00.190]\n[01:02.220]该配合你演出的我演视而不见\n[01:07.680]在逼一个最爱你的人即兴表演\n[01:12.900]什么时候我们开始收起了底线\n[01:18.020]顺应时代的改变看那些拙劣的表演\n[01:23.420]可你曾经那么爱我干嘛演出细节\n[01:28.630]我该变成什么样子才能延缓厌倦\n[01:33.870]原来当爱放下防备后的这些那些\n[01:39.370]才是考验\n[01:41.970]\n[01:44.600]没意见你想怎样我都随便\n[01:52.890]\n[01:54.530]你演技也有限\n[01:57.580]又不用说感言\n[02:00.150]分开就平淡些\n[02:02.990]\n[02:05.000]该配合你演出的我演视而不见\n[02:10.530]别逼一个最爱你的人即兴表演\n[02:15.810]什么时候我们开始没有了底线\n[02:21.010]顺着别人的谎言被动就不显得可怜\n[02:26.430]可你曾经那么爱我干嘛演出细节\n[02:31.520]我该变成什么样子才能配合出演\n[02:36.720]原来当爱放下防备后的这些那些\n[02:41.860]都有个期限\n[02:44.600]\n[02:47.560]其实台下的观众就我一个\n[02:53.040]其实我也看出你有点不舍\n[02:58.340]场景也习惯我们来回拉扯\n[03:02.930]还计较着什么\n[03:07.390]\n[03:08.710]其实说分不开的也不见得\n[03:14.040]其实感情最怕的就是拖着\n[03:19.210]越演到重场戏越哭不出了\n[03:24.070]是否还值得\n[03:28.120]\n[03:29.070]该配合你演出的我尽力在表演\n[03:34.390]像情感节目里的嘉宾任人挑选\n[03:39.680]如果还能看出我有爱你的那面\n[03:44.820]请剪掉那些情节让我看上去体面\n[03:50.040]可你曾经那么爱我干嘛演出细节\n[03:55.310]不在意的样子是我最后的表演\n[04:01.050]是因为爱你我才选择表演 这种成全')

// let songs = [songObject8,songObjectA,songObject0,songObject9,songObjectC,songObjectI,songObject2,songObjectD,songObjectE,songObjectG,songObject1,songObjectH,songObject5,songObjectJ,songObject6,songObjectB,songObject7,songObjectF,songObject3,songObject4]
// AV.Object.saveAll(songs)
