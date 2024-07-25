WikiCommonsGeoCollector = function(cat, style, f_fin_ok){
	this.style = style;
	this.WikiCommonsGroup = {
		Cat : cat,
		n_xhr : 0,
		Cat_OK : {},
		Img_OK : {},
		images : [],		
		WCLG : new L.LayerGroup(),
		wikiData : {}
		};
	this.getWikiCommonsData(cat, -1);
	this.f_fin_ok = f_fin_ok;	
}

/* Реализация криптографической функции MD5 с любым аргументом */
WikiCommonsGeoCollector.prototype.MD5 =	function (d)
	{
		function M(d)
		{
			for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
			return f
		}

		function X(d)
		{
			for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
			for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
			return _
		}

		function V(d)
		{
			for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
			return _
		}

		function Y(d, _)
		{
			d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
			for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16)
			{
				var h = m,
					t = f,
					g = r,
					e = i;
					f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)
			}
			return Array(m, f, r, i)
		}

		function md5_cmn(d, _, m, f, r, i)
		{
			return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m)
		}

		function md5_ff(d, _, m, f, r, i, n)
		{
			return md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
		}

		function md5_gg(d, _, m, f, r, i, n)
		{
			return md5_cmn(_ & f | m & ~f, d, _, r, i, n)
		}

		function md5_hh(d, _, m, f, r, i, n)
		{
			return md5_cmn(_ ^ m ^ f, d, _, r, i, n)
		}

		function md5_ii(d, _, m, f, r, i, n)
		{
			return md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
		}

		function safe_add(d, _)
		{
			var m = (65535 & d) + (65535 & _);
			return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
		}

		function bit_rol(d, _)
		{
			return d << _ | d >>> 32 - _
		}

		var r = M(V(Y(X(d), 8 * d.length)));
		return r.toLowerCase()
	};


// Создаётся точечный слой Leaflet для единичного объекта, описывающего изображение на WikiCommons
WikiCommonsGeoCollector.prototype.WikiCommonsLayer = function (im_data, style) {
		if (!im_data.meta.GPSLatitude || !im_data.meta.GPSLongitude)
			return false;
		var p = {lat: im_data.meta.GPSLatitude.value, lng: im_data.meta.GPSLongitude.value};
		var l = L.circleMarker(p, style);
		l.im_data = im_data;
		var fn = im_data.title.split("File:")[1];
		fn = fn.replace(/ /g, '_');
		var norm_wikiCommons_file = unescape(encodeURIComponent(fn));
		var s_md5 = this.MD5(norm_wikiCommons_file);
		var wp = s_md5.substring(0, 1) + "/" + s_md5.substring(0, 2) + "/";
		var th_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + wp + encodeURI(fn) + '/320px-' + encodeURI(fn);
		var html = '<details><p align="center" role="popup_card">' + im_data.title +'</p><table role="popup_card"><tr><th role="popup_card">Свойство</th><th role="popup_card">Значение</th></tr>';
		for (var k in im_data.meta) {
			if (k[0] == '_' || k == 'No' || !im_data.meta[k] || im_data.meta[k] == '?' || im_data.meta[k] == '-')
				continue;
			html += '<tr role="popup_card"><td role="popup_card">' + k.replace('_', ' ').replace('_', ' ') + '</td><td role="popup_card">' + JSON.stringify(im_data.meta[k].value) + '</td></tr>';
		}
		html += '</table></details>';
		l.bindPopup('<a href="https://commons.wikimedia.org/wiki/' + encodeURI(im_data.title) + '" target="_blank"><center><img src="' + th_url + '" width="150"><p><small>' + fn + '</small></a><small><br>' + (im_data.meta.ImageDescription ?im_data.meta.ImageDescription.value : '') + '<br>' + im_data.meta.LicenseShortName.value + '<br>' + (im_data.meta.Artist ?im_data.meta.Artist.value : '') + '<br>' + (im_data.meta.DateTimeOriginal ? im_data.meta.DateTimeOriginal.value : '') + '</small></p></center>' + html);

		l.bindTooltip(im_data.meta.ImageDescription && im_data.meta.ImageDescription.value ? im_data.meta.ImageDescription.value : fn);
		l.on('mouseover', function (e) {
			var tt = e.target.getTooltip();
			if (!tt)
				return;
			tt.setLatLng(e.latlng);
			});
		return l;
}


WikiCommonsGeoCollector.prototype.addWikiCommonsCategoryData = function (xhr) {
		console.log("++ " + xhr.lv + " K " + xhr.WCcateg + " " + xhr.readyState + " " + xhr.status);
		try
		{
			var WCmeta = JSON.parse(xhr.responseText);
		}
		catch (e)
		{
			alert("Ошибка разбора данных с ВикиСклада! \n" + xhr.url);
			return;
		}
		if (WCmeta.batchcomplete != "")
		{
			console.log("Ошибка запроса данных с ВикиСклада! \n" + xhr.url);
			return;
		}

		if (!WCmeta.query)
		{
			console.log(WCmeta);
			return;
		}
		this.WikiCommonsGroup.Cat_OK[xhr.WCcateg] = true;
		for (var i in WCmeta.query.pages)
		{
			var mtobj = WCmeta.query.pages[i];
			if (mtobj.ns == 6) // file
			{
				if (!this.WikiCommonsGroup.Img_OK[mtobj.title])
				{
					this.WikiCommonsGroup.Img_OK[mtobj.title] = true;
					var ii = mtobj.imageinfo[0].extmetadata;
					delete mtobj.imageinfo;
					mtobj.meta = ii;
					this.WikiCommonsGroup.images.push(mtobj);
					this.WikiCommonsGroup.WCLG.addLayer(this.WikiCommonsLayer(mtobj, this.style));
				}
				else
					console.log(" File ++ " + mtobj.title);
			}

		if (mtobj.ns == 14) // subcat
			{
				var ct = mtobj.title;
				if (!this.WikiCommonsGroup.Cat_OK[ct])
				{
					this.getWikiCommonsData(ct, xhr.lv);
					console.log(" c+ " + xhr.lv + " K " + xhr.WCcateg + " -> " + ct);
				}
				else
					console.log(" c- " + xhr.lv + " K " + xhr.WCcateg + " -> " + ct);
			}
		}

		this.WikiCommonsGroup.n_xhr--;
		if (!this.WikiCommonsGroup.n_xhr)
		{
			console.log(' Изображений ' + this.WikiCommonsGroup.images.length);
			this.f_fin_ok(this);
		}
		return;
};

WikiCommonsGeoCollector.prototype.getWikiCommonsData = function (categ, lv) {
		var xhr = new XMLHttpRequest();
		xhr.url = "https://commons.wikimedia.org/w/api.php?origin=*&action=query&generator=categorymembers&gcmtitle=" + encodeURIComponent(categ.replace(/ /g, '_')) + "&gcmtype=subcat|file&prop=imageinfo&iiprop=timestamp|user|url|size|mime|mediatype|extmetadata&format=json&gcmlimit=500&iiextmetadatalanguage=ru";
		xhr.ini_obj = this;
		this.WikiCommonsGroup.n_xhr++;
		xhr.lv = lv + 1;
		xhr.WCcateg = categ;
		xhr.ini_obj = this;
		xhr.open('GET', xhr.url, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200 && (xhr.status != 0 || xhr.response)) {
				alert("Ошибка получения данных с ВикиСклада! " + xhr.url);
				return;
			} else {
				xhr.ini_obj.addWikiCommonsCategoryData(xhr);
			}
		}
};
