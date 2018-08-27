const puppeteer = require('puppeteer');
const config = require('./config/config');
const srcToImg = require('./helper/srcToImg');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://image.baidu.com/');
	console.log('go to https://image.baidu.com/');
	await page.setViewport({
		width: 1920,
		height: 1080
	});
	console.log('reset viewpoint');
	await page.focus('#kw');
	await page.keyboard.sendCharacter('抢票回家');
	await page.click('.s_search');
       
	console.log('go to searchlist');
	page.on('load', async () => {
		console.log('page loading done,start fetch.........');
		const srcs = await page.evaluate(() => {
			/*eslint no-undef: "off"*/
			const images = document.querySelectorAll('img.main_img');
			//调用call的对象必须是个函数function，call的第一个参数是function改变上下文后指向的对象，如果不传，默认为全局对象
			//
			return Array.prototype.map.call(images, img => img.src);  // 把NodeList转化成Array
		});
		srcs.forEach(src => {
			srcToImg(src,config.imgUrl);
		});

		await browser.close();
	});
})();
