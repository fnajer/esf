 


function createTable(tableName, columnsTitle) { //Создание таблицы для Card Product
		var miniTable = '<table class="mini-table"><tr><td colspan="2">' + $(tableName).find('td:first').html() + '</td></tr>';
		
		for (var i = 0; i < columnsTitle.length; i++) {
			var title = $(columnsTitle[i]).html();
			
			var value = $(tableName).find('td:eq(' + (i + 1) + ')').html();
			
			miniTable += '<tr>' + '<th>' + title + '</th>' + '<td>' + value + '</td>' + '</tr>';
            
		}
		
		miniTable += '</table>';
		return miniTable;
	}

	$(document).ready(function() {//Проверка разрешения экрана
        var width = $(window).width();
		var decompositionTable = false;
		
		function breakTable() {
			var width = $(window).width();
			
			if ((decompositionTable == false) && width <= 900) { //Перегруппировка таблицы
				var rows = $('#full_table_product tr:not(:first-child)');
				var columns = $('#full_table_product th:not(:first-child)');
                
				for (var i = 0; i < rows.length; i++) {
                    
					var newTable = createTable(rows[i], columns);
					
					$('#tables_container').append(newTable);
				}
				
				decompositionTable = true;
				
				$('#full_table_product').hide();
			}
			
			if ((decompositionTable == true) && width > 900) {
				$('.mini-table').remove();
				$('#full_table_product').show();
				
				decompositionTable = false;
			}
		}
		
		
         //Card Product - смещение заголовка при 900px
        function translateTitle() {
            var width = $(window).width();
            
            if (width <= 950) {

                $('#page_title').prependTo('#top_page');
                
            }
            
            if (width > 950) {          

                $('#page_title').prependTo('#initial_place_title');

            }
        }
        
        if ($('table').hasClass('full-table')) {
            
            if (width <= 950) {
                breakTable();
                translateTitle();
            }

            $(window).resize(breakTable);
            $(window).resize(translateTitle);
        }
        $(window).resize(heightGallery);
	});

    function heightGallery() {
        var width = window.innerWidth;
        var img = document.getElementsByClassName('gallery__item');
        
        $(img).css('height', width * 0.2);
    }

	$(document).ready(function() {//Card Product - всплывающее окно в top-menu
		$("#switch_next").hover(
			function(){
				$('#switch_window').css('display', 'flex');
		}, 
			function(){
				$('#switch_window').fadeOut(200);
		});
			
	});

	$(document).ready(function() { //Card Product - выбор цвета
		$(".swatches__switch-img").click(function () {
			var path = $(this).attr('src');
			var caption = $(this).attr('alt');
            
			$('.swatches__switch-img_active').removeClass('swatches__switch-img_active');
			
            $('.swatches__preview-image').attr('src', path);
            $('.swatches__preview-text').text(caption);
			
			$(this).toggleClass('swatches__switch-img_active');
		});
	});
    
    function showWindow(window) {
        $('.page-blackout').fadeIn(700);
        $(window).fadeIn(700);
    }

	$(document).ready(function() { //Card Product - всплывающее окно галереи
		$("#images_gallery img").click(function () {
	
			var path = $(this).attr('src');
			var caption = $(this).attr('alt');
            
            var folder = '/small/';
            
            if (path.indexOf(folder) != -1) {
                path = path.replace(folder, '/fullsize/');
            }
			
			$('#window_img').attr('src', path);
			$('#window_caption').text(caption);
			$('#window_img').attr('width', '700px');
			$('#window_img').attr('height', '400px');
			$('body').addClass('photo-view_stop-scrolling');
            
            showWindow($('#gallery_window'));
		})
        
        $("#button_ask").click(function () {
            showWindow($('#ask_window'));
            
            if ($(window).width() > 700) {
                
                $('#ask_window').css('position', 'fixed');
            }
        })
	});

	$(document).ready(
	  
	  function() { 
        $('.close-window').click(
			
			function() { 
				$('.page-blackout').fadeOut(700);
				$('#gallery_window, #ask_window').fadeOut(700);
				$('body').removeClass('photo-view_stop-scrolling');				
			} 	
	  ); 
    });

