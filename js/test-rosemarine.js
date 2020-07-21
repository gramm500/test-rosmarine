/**
 *  Это функцция самовызова или замыкание или imediately-invoked function expressions )
 *  Это нужно для того чтобы ограничить видимость своих переменных и функций от других кодов
 *  https://learn.javascript.ru/closure
 */
(function ($) {
	/**
	 * Это просто переменная, которая определена как функция, которая возвращает объект
	 */
	var JUST_NAME_VARIABLE = function () {
		// Тут создаются "Глобальные переменные для этой функции"
		// Они просто нужно для того, чтобы не дублировать код
		var $sel = {};
		$sel.window = $(window);
		$sel.html = $("html");
		$sel.body = $("body", $sel.html);

		/**
		 *  Собственно возвращение функции
		 *  И тут возвращается объект, которы содержит объект map, который содержить функцию init ))))
		 *  Тут можно чтоб объект map был просто функцией и выщывать его так JUST_NAME_VARIABLE.map()
		 */
		return {
			// Объект
			map: function () {
				// Тута я тяну карту из DOM и свойства
				var $map = $("#map"),
					// Тут ты видишь две полоски || (САМОЕ СТРАШНОЕ НА СВЕТЕ екеек), это просто логический оператор или.
					// интерпретировать можно это так: ЕСЛИ УСЛОВИЕ НЕ ВЫПОЛНИЛОСЬ СЛЕВА, ТО ЭТО ПРАВО
					// for ex: var a = 5; var c = a === 6 || 0;
					// Тут c будет равно = 0
					lng = parseFloat($map.data("lng"), 10) || 0,
					lat = parseFloat($map.data("lat"), 10) || 0,
					zoom = parseInt($map.data("zoom"));

				// Параметры для гугл карты, по сути тебе нужны только center и zoom
				var options = {
					center: new google.maps.LatLng(lat, lng),
					zoom: zoom,
					mapTypeControl: false,
					panControl: false,
					zoomControl: true,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.LARGE,
						position: google.maps.ControlPosition.TOP_RIGHT,
					},
					scaleControl: true,
					streetViewControl: true,
					streetViewControlOptions: {
						position: google.maps.ControlPosition.TOP_RIGHT,
					},
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					
				};

				// Тут я создаю новый объект гугл map api куда передаю объект DOM и параметры
				

				// А тут я рисую маркер на карте)))
				new google.maps.Marker({
					position: new google.maps.LatLng(lat, lng),
					map: new google.maps.Map($map[0], options),
                    icon: {
                        url:$map.data("icon"),
                        scaledSize: new google.maps.Size(50, 50),
                    } ,
                    draggable : true,
                    title : "BUY OUR SERVICES",
				});
			},
		};
	};

	// Тут просто вызов функции)
    JUST_NAME_VARIABLE().map();
	
})(jQuery);
