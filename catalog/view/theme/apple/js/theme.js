$(function () {

    // Купить в один клик
    $('.product-layout > .product-thumb').each(function (e) {
        e += 1;

        //app popup
        var img_url = $(this).find('.img-responsive').attr('src'),
            item_name = $(this).find('h4 a').text(),
            item_price = $(this).find('.price').html(),
            admin = $('#callback [name=admin_email]').val();
        
        $(this).after('<div id="pp-item-' + e + '" class= "product-popup">\
            <h2>Купить в один клик</h2>\
            <div class="pp-img-wrap"><img src="' + img_url + '" alt="Айфонсервис"></div>\
            <div class="pp-content">\
                <h3>'+ item_name +'</h3>\
                <p>'+ item_price +'</p>\
                <form class="ajax-form">\
                    <input type="hidden" name="project_name" value="IphoneService">\
                    <input type="hidden" name="admin_email" value="' + admin + '">\
                    <input type="hidden" name="form_subject" value="Заявка с сайта Айфонсервис">\
                    <input type="hidden" name="product" value="' + item_name + '">\
                    <input class="form-control" type="text" name="Телефон" placeholder="Введите ваш телефон..." required>\
                    <button class="btn btn-primary">Заказать</button>\
                </form>\
                <div class="success">Спасибо за заявку!</div>\
            </div>\
        </div>');

        $(this).find('.button-group button:first').after('<a class="button toClick" href="#pp-item-' + e + '">Купить в один клик</a>');
    });

    // меняем отображение колличества товаров с 4 едениц на 3
    $('.product-layout > .product-thumb').each(function (e) {
        e += 1;
        $(this).parent().attr({
            'class': 'product-layout col-lg-4 col-md-4 col-sm-6 col-xs-12'
        });
    });

    //настраиваем equalHeights

    $('.product-thumb h4').css('height', '').equalHeight();

    //Подключаем magnifick popup к кнопкам

    $('.toClick, .callback').magnificPopup({
        mainClass: 'mfp-zoom-in',
        removalDelay: 500
    });

    //E-mail Ajax Send
	$(".ajax-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/catalog/view/theme/apple/mail.php", //Change
			data: th.serialize()
		}).done(function() {
            var pp_suc = th.closest('.product-popup').find('.success');
            pp_suc.fadeIn();
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
                pp_suc.fadeOut();
                $.magnificPopup.close();
			}, 3000);
		});
		return false;
	});


});