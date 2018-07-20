
    

    function createTable(tableName, columnsTitle) { //Создание таблицы
		
        
        var miniTable = '<table class="mini-table""><tr><td colspan="2">' + $(tableName).find('td:first').html() + '</td></tr>';

		for (var i = 0; i < columnsTitle.length; i++) {
			var title = $(columnsTitle[i]).html();
			
			var value = $(tableName).find('td:eq(' + (i + 1) + ')').html();
			
			miniTable += '<tr>' + '<th>' + title + '</th>' + '<td>' + value + '</td>' + '</tr>';
            
		}
		
		miniTable += '</table>';
        
		return miniTable;
	}

    function createTotalTable(total) {
        var table = '<table class="mini-table-total""><tr><th>Total</th><td>' + $(total).find('td:last').html() + '</td></tr></table>';
        
        return table;
    }

    $(document).ready(function() { //Таблица для Card; Проверка разрешения экрана
        var width = $(window).width();
        var decompositionOrderTable = false;
        
		function breakOrderTable() {
			var width = $(window).width();
			var newTable = '';
            
			if ((decompositionOrderTable == false) && width <= 900) { //Перегруппировка таблицы
                var allTable = $('table');
                
                for (var j = 0; j < allTable.length; j++) {
                    
                    var currentTable = '.full-table-order:eq(' + j + ')';
                    var captionTable = $(currentTable + ' caption').html();
                    
                    var rows = $(currentTable + ' tr:not(:first-child)');
                    var columns = $(currentTable + ' th:not(:first-child)');
                   
                    newTable += '<section class="sectionMiniTables"><h2>' + captionTable + '</h2>';

                    for (var i = 0; i < rows.length; i++) {
                        if (i == rows.length - 1) {
                            
                            newTable += createTotalTable(rows[i]) + '</section>';
                        } else {
                            
                            newTable += createTable(rows[i], columns);
                        }
                    }
                }
                $('#tables_container').append(newTable);

                decompositionOrderTable = true;

                $('.full-table-order').hide();
			}
			
			if ((decompositionOrderTable == true) && width > 900) {
				$('.sectionMiniTables').remove();
				$('.full-table-order').show();
				
				decompositionOrderTable = false;
			}
		}
		
		if ($('table').hasClass('full-table-order')) {
            
            if (width <= 900) {
                breakOrderTable();
            }

            $(window).resize(breakOrderTable);
        }
	});

