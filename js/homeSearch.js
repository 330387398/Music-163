
//监听搜索栏，当内容发生变化时产生响应
$('.search').bind('input propertychange',function(){
	if($('.search').val()){
		$('.searchAll').css('display','none')
		$('.close').css('display','inline-block')
		$('.page-3 > div').css('display','none')
		$('.page-3 > ol').css('display','none')
		$('.page-3 section:nth-child(4)').css('display','inline')
		$('h4 > p').html($('.search').val().trim())
		$('.searchPreview').empty()
		$('.searchResult').empty()
		if(!$('.search').val().trim()){
			$('.page-3 section:nth-child(4)').css('display','none')
		}
	}else{
		clearSearch()
	}
})
//搜索栏的关闭/清空按钮
$('.close').on('click',function(){
	$('.search').val('')
	clearSearch()
})
function clearSearch(){
	$('.searchAll').css('display','block')
	$('.close').css('display','none')
	$('.page-3 > div').css('display','block')
	$('.page-3 > ol').css('display','block')
	$('.page-3 section:nth-child(4)').css('display','none')
	$('h4 > p').html('')
	$('.searchPreview').empty()
	$('.searchResult').empty()
}


//LeanCloud   初始化
var APP_ID = '6wWVRE4dms0ACfEApceLpVHN-gzGzoHsz'
var APP_KEY = '9aTHWXTTgegNf0ErAhE2QYdp'
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
})

//搜索预览功能
let timer = null     //设置函数节流，限制向服务器发送请求的次数，节省网络资源
$('.search').on('input',function(e){
	if(timer){
		window.clearTimeout(timer)
	}
	timer = setTimeout(function(){
		timer = null
		let $input = $(e.currentTarget)
		let value = $input.val().trim()
		if(value === ''){ return }

		//设置搜索范围，这里可以从歌名和歌手中检索
		let priorityQuery = new AV.Query('Song');
		priorityQuery.contains('name',value);
		let statusQuery = new AV.Query('Song');
		statusQuery.contains('singer',value);
		let query = AV.Query.or(priorityQuery,statusQuery);
		query.find().then(function(results){
			$('.searchPreview').empty()

			//根据搜索结果添加标签，插入页面
			for(let i = 0; i < results.length; i++){
				let song = results[i].attributes
				let li = `
					<li data-id="${song.objectId}"><i></i><span>${song.name} - ${song.singer}</span></li>
				`
				$('.searchPreview').append(li)
			}

			//为预览标签绑定事件，点击时触发搜索功能(3/5)
			$('.searchPreview > li').on('click',function(){
			    let name = $(this).children('span').html().split(' - ')[0]
			    let singer = $(this).children('span').html().split(' - ')[1]
			    let reg = new RegExp(value);
			    if(name.match(reg)){
			    	search(name)
			    }else{
			    	search(singer)
			    }
			})
		})
	},500)
})

//监听搜索栏，当按下回车键时触发搜索功能(1/5)
$('.search').on('keypress',function(e){
	let value = $(this).val()
	let keycode = e.keyCode
	if(keycode == '13'){
		e.preventDefault()
		if(value == ''){
			$('.search').blur()
			return
		}
		search(value)
	}
})

//点击搜索按钮，触发搜索功能(2/5)
$('h4').on('click',function(){
	let value = $('h4 > p').html()
	search(value)
})

//点击热门搜索标签，触发搜索功能(4/5)
$('.page-3 > div > ul > li').on('click',function(){
	let value = $(this).children().html()
	search(value)
})

//搜索前的样式重置
function searchReady(){
	$('.search').blur().attr('readOnly','readOnly')
	$('.searchAll').css('display','none')
	$('.close').css('display','inline-block').unbind('click')
	$('.page-3 > div').css('display','none')
	$('.page-3 > ol').css('display','none')
	$('.page-3 section:nth-child(4)').css('display','none')
	$('h4 > p').html('')
	$('.searchPreview').empty()
	$('#spinner3').css('display','block')
	$('.searchResult').empty()
}

//搜索功能函数
function search(value){
	$('.search').val(value)
	searchReady()
	let priorityQuery = new AV.Query('Song');
	priorityQuery.contains('name',value);
	let statusQuery = new AV.Query('Song');
	statusQuery.contains('singer',value);
	let query = AV.Query.or(priorityQuery,statusQuery);

	//等待预览功能返回数据，再进行搜索
	setTimeout(function(){
		$('#spinner3').css('display','none')
		query.find().then(function(results){
			//获取数据，添加标签插入页面
			for(let i = 0; i < results.length; i++){
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
				$('.searchResult').append(li)
			}

			if($('.searchResult').html() == ''){
				//当搜索不到相关数据时调用的函数
				alert('对不起，没有找到相关内容。\n\n请重新输入关键字或点击热门搜索标签进行搜索。谢谢 ^ ^')
				clearSearch()
				$('.search').val('').focus()
			}else{
				//恢复搜索栏相关功能
				$('.search').removeAttr('readOnly').blur()
				$('.close').on('click',function(){
					$('.search').val('')
					clearSearch()
				})

				//修改歌曲名称备注部分的内容
				for(let i = 0; i < results.length; i++){
					if($('.searchResult span')[i].innerText == 'undefined'){
						$('.searchResult span').eq(i).html('')
					}
				}

				//为高品质音乐添加sq标识
				for(let i = 0; i < results.length; i++){
					if($('.searchResult i')[i].innerText == 'sq'){
						$('.searchResult i').eq(i).addClass('block').html('')
					}
				}

				//为歌曲标签绑定事件，点击跳转页面
				$('.searchResult > li').on('click',function(){
					let $idx = $(this).index()
					window.location.href="./html/song.html" + '?' + $('.searchResult h6').eq($idx).html()
				})

				//检索相同的搜索记录并移除
				for(let i = 0; i < $('.page-3 > ol > li').length; i++){
					if($('.page-3 > ol > li > div > span').eq(i).html() == $('.search').val()){
						$('.page-3 > ol > li').eq(i).remove()
					}
				}

				//生成搜索记录并插入页面
				let li = `<li><i></i><div><span>` + $('.search').val() + `</span><div><i></i></div></div></li>`
				$('.page-3 > ol').prepend(li)

				//为搜索记录标签绑定事件，点击触发搜索功能(5/5)
				$('.page-3 > ol > li').on('click',function(){
					let value = $(this).find('span').html()
					search(value)
				})

				//设置移除搜索记录按钮
				$('.page-3 > ol > li > div > div').on('click',function(){
					$(this).parent().parent().remove()
				})		
			}
		},function(error){
			alert('获取歌曲失败')
		})
	},500)
}
