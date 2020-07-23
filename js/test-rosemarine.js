
(function ($) {

	var JUST_NAME_VARIABLE = function () {
		
		var $sel = {};
		$sel.window = $(window);
		$sel.html = $("html");
		$sel.body = $("body", $sel.html);

		
		return {
			
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
						url: $map.data("icon"),
						scaledSize: new google.maps.Size(50, 50),
					},
					draggable: true,
					title: "BUY OUR SERVICES",
				});
			},
			slick: function () {
				$(".main-slide").slick({
					appendArrows: $(".main-slide-item__arrows"),
					prevArrow:
						'<div class="slick-arrow-prev"><span>След</span><svg width="67" height="24" viewBox="0 0 67 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M66.0607 10.9393C66.6464 11.5251 66.6464 12.4749 66.0607 13.0607L56.5147 22.6066C55.9289 23.1924 54.9792 23.1924 54.3934 22.6066C53.8076 22.0208 53.8076 21.0711 54.3934 20.4853L62.8787 12L54.3934 3.51471C53.8076 2.92893 53.8076 1.97918 54.3934 1.39339C54.9792 0.807607 55.9289 0.807607 56.5147 1.39339L66.0607 10.9393ZM-1.31134e-07 10.5L65 10.5L65 13.5L1.31134e-07 13.5L-1.31134e-07 10.5Z" fill="#C8A35F"/></svg></div>',
					nextArrow:
						'<div class="slick-arrow-next"> <svg width="67" height="24" viewBox="0 0 67 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51471C13.1924 2.92893 13.1924 1.97918 12.6066 1.39339C12.0208 0.807607 11.0711 0.807607 10.4853 1.39339L0.939339 10.9393ZM67 10.5L2 10.5L2 13.5L67 13.5L67 10.5Z" fill="#C8A35F"/></svg><span>Назад</span></div>',
				});
			},
			modal: function () {
				$(".open-modal").magnificPopup({
					type: "inline",
					mainClass: "mfp-fade",
					closeMarkup:
						`<button title="%title%" class="mfp-close">` +
						`<img src="assets/close.svg" width="20" height="20" class="mfp-close-icn mfp-close"/>` +
						`</button>`,
					removalDelay: 300,
				});
			},
			validate: function () {
				var self = this;
				$form = $(".form", $sel.body);

				$form.each(function () {
					(function ($form) {
						var $formFields = $form.find("[data-error]"),
							formParams = {
								rules: {},
								messages: {},
							};
							
						$formFields.each(function () {
							var $field = $(this),
								fieldError = $field.data("error");
							
							if (fieldError) {
								formParams.messages[$field.attr("name")] = $field.data("error");
							} else {
								formParams.messages[$field.attr("name")] = "Ошибка заполнения";
							}
						});

						if ($form.data("success")) {
							formParams.submitHandler = function (form) {
								$.magnificPopup.close();
								event.preventDefault();
								alert('All good')
							};
						}

						$form.validate(formParams);

					})($(this));
				});
			},
		};
	};

	$(document).ready(function () {
		
		JUST_NAME_VARIABLE().map();
		JUST_NAME_VARIABLE().slick();
		JUST_NAME_VARIABLE().modal();
		JUST_NAME_VARIABLE().validate();
	});
})(jQuery);

