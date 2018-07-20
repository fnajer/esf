
    var decompositionTableCart = false;


    function createTableCart(tableName, columnsTitle) { //Создание маленьких таблиц
		
        var table = '<table class="mini-table tables__any-table"><tr><td colspan="2">' + $(tableName).find('td:first').html() + '</td></tr>';
		
		outer:for (var i = 0; i < columnsTitle.length; i++) {
            
			var caption = $(columnsTitle[i]).html();
			
			var value = $(tableName).find('td:eq(' + (i + 1) + ')').html();
			
			if ($.trim(caption) == 'Name') {
				table += '<tr><td colspan="2" class="mini-table__row-left">' + value + '</td></tr>';
				continue;
			}
			if ($.trim(caption) == 'Set Configuration') {
				table += '<tr><td colspan="2" class="mini-table__row-left">' + '<span class="mini-table__color">' + caption +'</span>' + value + '</td></tr>';
				continue;
			}

			if ($.trim(caption) == 'Select') {
				table += '<tr><td colspan="2" class="mini-table__button-right">' + $('table td:last').html() + '</td></tr>';
				break outer;
			}
            
			table += '<tr>' + '<th>' + caption + '</th>' + '<td>' + value + '</td>' + '</tr>';
            
		}
		
		table += '</table>';
        
		return table;
	}

    function createTotalTableCart(total) {//Cоздание мини-таблицы Total для мобильной версии
        var table = '<table class="mini-table_footer mini-table tables__any-table"><tr><th>Total</th><td>' + $(total).find('td:eq(-2)').html() + '</td></tr></table>';
        
        return table;
    }
		
    $(document).ready(function() { //Таблица для Cart
	
		
		function breakTableCart() {//Проверяем разрешение, и вызываем создание таблиц
			var w = $(window).width();
			
			if ((decompositionTableCart == false) && w <= 900) { //Перегруппировка таблицы
				var rows = $('table tr:not(:first-child)');
				var columns = $('table th:not(:first-child)');
				
				var newTable = '<section class="sectionMiniTables">';
                
				for (var i = 0; i < rows.length; i++) {
                    if (i == rows.length - 1) {
                        
                        newTable += createTotalTableCart(rows[i]) + '</section>';
                        
                    } else {
                        
                        newTable += createTableCart(rows[i], columns);
                        
                    }
				}
                $('.main-cart__tables').append(newTable);
				
				decompositionTableCart = true;
				
				$('.full-table-cart').hide();
			}
			
			if ((decompositionTableCart == true) && w > 900) {
				$('.mini-table').remove();
				//$('.main-table').show();
				
                //$('.main-cart__tables').append(mainTable);
                $('.full-table-cart').show();
                
				decompositionTableCart = false;
			}
		}
		
		if ($('table').hasClass('full-table-cart')) {
            
            var mainTable = $('.main-cart__tables').html();
            
            if ($(window).width() <= 900) {
                breakTableCart();
            }

            $(window).resize(breakTableCart);
        }
	});

    function eventChangeTable() {
        
	   $('input[class*="data"]').on('input keyup', function() {
            
             var classTotal = $('.data-total-' + this.className.charAt(this.className.length - 1));
          
            var valuePrice = $('.data-price-' + this.className.charAt(this.className.length - 1)).html().slice(1);
            var valueQuantity = $(this).val();
           
            var rowTotal = classTotal.html('$' + (valueQuantity * valuePrice).toFixed(2));
          
            if (decompositionTableCart == false) {//Для стационарной
            
                var tableTotal =    $(this).parents('table').find('span[class^="table-total"]');
                var rowsTable = $(this).parents('table').find('tr');
                     
                var sum = 0;
                var value = '';
           
                for(var i = 1; i < rowsTable.length - 1; i++) {
                    value = $(this).parents('table').find('span[class^="data-total-' + i + '"]').html().slice(1);

                   sum = (+sum + +value).toFixed(2);
                }
                $(tableTotal).html('$' + sum);
            }
           
            else if (decompositionTableCart == true) {//Для мобильной версии
               
                var tableTotal = $(this).parents('.sectionMiniTables').find('span[class^="table-total"]');
                var rowsTable = $(this).parents('.sectionMiniTables').find('table:not(last)');
               
               
            var sum = 0;
            var value = '';
           
            for(var i = 1; i < rowsTable.length; i++) {//
                value = $(this).parents('.sectionMiniTables').find('span[class^="data-total-' + i + '"]').html().slice(1);
               
               sum = (+sum + +value).toFixed(2);
            }
           
           $(tableTotal).html('$' + sum);
           }

       });
    
    }
    $(document).ready(function() { //Обработка значений полей при вводе
        eventChangeTable();
        $(window).resize(eventChangeTable);
	   
    });
