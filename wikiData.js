WikiData = {};
// XML ответ WikiData разбирается на части
WikiData.XML2JSobj = function (wikiDataXml) {
		function getBindNode(xml, name, tag) {
			for (var cn in xml.childNodes)
			{
				var n = xml.childNodes[cn]
				if (n.nodeName != 'binding')
					continue;
				if (n.getAttribute("name") == name)
					return n.getElementsByTagName(tag)[0].textContent;
			}
			return null;
		}

		var Res0 = wikiDataXml.getElementsByTagName('sparql')[0].getElementsByTagName('results')[0].getElementsByTagName('result')[0];
		if (!Res0)
		{
			console.log('Данные по WikiData пусты');
			return;
		}
		return {
			uri : getBindNode(Res0, 'item', 'uri'),
			CommonsCat : getBindNode(Res0, 'wdComCat', 'literal'),
			Name : getBindNode(Res0, 'itemLabel', 'literal'),
			Geo : getBindNode(Res0, 'geoCoord', 'literal')
		};
};

// Получаем свойства WikiData на основании Q кода
WikiData.getWikiData_Q = function (Q, lang, f_res) {
		var xhr = new XMLHttpRequest();
		xhr.url = "https://query.wikidata.org/sparql?query=";
		var SPQL = "SELECT ?item ?itemLabel ?wdComCat ?geoCoord " +
				   "WHERE " +
				   "{" +
				   "  wd:" + Q + " wdt:P373 ?wdComCat. " +
				   "  ?item wdt:P373 ?wdComCat. " +
				   "  OPTIONAL { ?item wdt:P625 ?geoCoord.} " +
				   "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + lang + "\". }" +
				   "}";
		xhr.ini_obj = this;
		xhr.url += SPQL;
			xhr.open('GET', xhr.url, true);
			xhr.send();
			xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200 && (xhr.status != 0 || xhr.response)) {
				alert("Ошибка WikiDataSparQL! " + xhr.url);
				return;
			} else {
				f_res(WikiData.XML2JSobj(xhr.responseXML));
			}
		}
};

// Получаем свойства WikiData на основании OSM типа и кода объекта
WikiData.getWikiData_OSM = function (osm_type, osm_id, lang, f_res) {
		var xhr = new XMLHttpRequest();
		xhr.url = "https://query.wikidata.org/sparql?query=";
		var WikiDataOsmP = { 'relation' : 'P402', 'way' : 'P10689', 'node' : 'P11693'};
		var SPQL = "SELECT ?item ?itemLabel ?wdComCat ?geoCoord " +
				   "WHERE " +
				   "{" +
				   "  ?item wdt:P373 ?wdComCat." +
				   "  ?item p:" + WikiDataOsmP[osm_type] + " ?statement0." +
				   "  ?statement0 (ps:" + WikiDataOsmP[osm_type] + ") \"" + osm_id + "\".  " +
  				   "  OPTIONAL { ?item wdt:P625 ?geoCoord.} " +
				   "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + lang + "\". }" +
				   "}";
		xhr.ini_obj = this;
		xhr.url += SPQL;
		xhr.open('GET', xhr.url, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200 && (xhr.status != 0 || xhr.response)) {
				alert("Ошибка WikiDataSparQL! " + xhr.url);
				return;
			} else {
				f_res(WikiData.XML2JSobj(xhr.responseXML));
			}
		}
};

