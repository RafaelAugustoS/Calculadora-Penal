$(function(){
	var url = 'http://iorder.com.br/calc/';
    $('.date').mask('00/00/0000');
    
	// Variaveis
	var anoGlobal = 0;
	var mesGlobal = 0;
	var diaGlobal = 0;
	var InicioPena = 0;
	var AnoI = 0;
	var MesI = 0;
	var DiaI = 0;
	var remidos = 0;


	function calcular(ano,mes,dia,dataInicio,AnoI,MesI,DiaI,remidos){
		$.ajax({
			type: 'POST',
			url: url+'calculo.php',
			data: {
				acao: 'calculo',
				ano: ano,
				mes: mes,
				dia: dia,
				dataInicio: dataInicio,
				intAno: AnoI,
				intMes: MesI,
				intDia: DiaI,
				remidos: remidos
			},
			dataType: 'json',
			success: function(data){
				$('.resultTermino').html(data.data);
				console.log(data);
			}
		});
	}

	$('.selecionar').on('blur', function(){
		anoGlobal = $('#anoGlobal').val();
		mesGlobal = $('#mesGlobal').val();
		diaGlobal = $('#diaGlobal').val();
		InicioPena = $('input[name=dataInicioPena]').val();
		AnoI = $('input[name=intAno]').val();
		MesI = $('input[name=intMes]').val();
		DiaI = $('input[name=intDia]').val();
		remidos = $('input[name=remidos]').val();
		console.log(remidos);
		calcular(anoGlobal,mesGlobal,diaGlobal,InicioPena,AnoI,MesI,DiaI,remidos);
	});



	$('.click').on('click', function(){
		var fracao = $(this).attr('data-valor');
		var result = $('.resultTermino').text();
		var solto  = result.split('/');

		var anoS = solto[2];
		var mesS = solto[1];
		var diaS = solto[0];

		anoGlobal = $('#anoGlobal').val();
		mesGlobal = $('#mesGlobal').val();
		diaGlobal = $('#diaGlobal').val();

		$.ajax({
			type: 'POST',
			url: url+'calculo.php',
			data: {
				acao: 'fracao',
				ano: anoGlobal,
				mes: mesGlobal,
				dia: diaGlobal,
				fracao: fracao
			},
			dataType: 'json',
			success: function(data){
				console.log(data);
				$('.resultTermino').html(data.data);
			}
		});
	});
});