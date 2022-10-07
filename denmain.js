$(document).ready(function ($) {
	let n1;　//1番目の数値
	let n2;　//2番目の数値
	let operator;　　//演算子が格納される
	let minus;　//マイナス値から計算する時に使用する
	let operator_count; //演算子の連続入力防止
	let conma_count;    //小数点連続防止
	
	n1 = null;
	n2 = null;
	operator = null;
	minus = false;
	operator_count = 0;
	conma_count = 0;
	
	
	//数値と演算子の入力を処理する関数
	$(".click_dentaku").on('click',function(){
	
		//最初の入力をチェックする処理
		//（+、*、/、0、00）が入力されたら変数を初期化して終了する
		if(n1 == null && operator == null){
			if($(this).val() == "+" || $(this).val() == "×" || $(this).val() == "÷" ){
				operator = null;
				n1 = null;
				n2 = null;
				minus = false;
				operator_count = 0;
				
				return;
			}else{
				
				//マイナスから始める時
				if($(this).val() == "-"){
					minus = true;
					n1 = "-";
				}
			}
		}
	
	
		//数値が入力された時の処理
		if($(this).attr('data-role') != 'den_operator'){
		
			 
			
			//最初がマイナス値の時はマイナスを数値につけてn1に格納する
			if(minus){
				n1 = n1 + $(this).val();
				$(".dipl").val($(".dipl").val()+$(this).val());
				operator_count = 0;
				
				minus = false;
				return;
			}
			
			 //最初に小数点が入力された時の処理
			 if(n1 == null && $(this).val() == "."){
			 	  if($(this).val() == "."){
				     conma_count ++ ;
			         if(conma_count == 2 ){
				   
				       conma_count = 1;
				       return;
			        
			       }
			    
			     }   
				  n1 = n1 + 0 + $(this).val();
				
				  $(".dipl").val(n1);	
				  operator_count = 0;
				
				  minus = false;
				  return;
			}
			
			
			 
			  
			//入力された数値を変数n1、n2に格納し、電卓に表示する
			 if(n1 == null && operator == null  ){
				
			
				    $(".dipl").val('');			
				    $(".dipl").val($(".dipl").val()+$(this).val());
				    
				    operator_count = 0;
				
				n1 = $(this).val();
			
			
			}else if(n1 != null && operator == null ){	
				
				 if($(this).val() == "."){
				 conma_count ++ ;
			      if(conma_count == 2 ){
				   
				       conma_count = 1;
				       return;
			        
			      }
			    
			  }   
				 
				 
				 
				 if( n1 == "0" || n1 == "00" ){
				 	    if($(this).val() == "." ){
					 	  $(".dipl").val($(".dipl").val()+$(this).val());
				      operator_count = 0;
				      
			        n1 = n1 + $(this).val();
					
				     }
					    
				  }
				  
				 else{
				 $(".dipl").val($(".dipl").val()+$(this).val());
				 operator_count = 0;
				 
				 n1 = n1 + $(this).val();
				}
			
			
			}else if(n2 == null && operator != null ){
				  
				  
				  if( $(this).val() == "."){
				  	  
			      
			     
			    	 $(".dipl").val($(".dipl").val()+ 0 + $(this).val());
				     operator_count = 0;
				    
				       n2 =  0 + $(this).val();
				
			    
				  }
				  else{
				  	$(".dipl").val($(".dipl").val() + $(this).val());
				    operator_count = 0;	
				    
			    	n2 = $(this).val();
			    	
			    }
			    
			    
			  
			    	
			}else if(n2 != null && operator != null ){
				 
				if($(this).val() == "."){
				 conma_count ++ ;
			      if(conma_count == 2 ){
				   
				       conma_count = 1;
				       return;
			        
			      }
			    
			   }     
				
				
				if( n2 == "0" || n2 == "00" ){
				 	       if($(this).val() == "." ){
					 	     $(".dipl").val($(".dipl").val()+$(this).val());
				         operator_count = 0;
				      
			            n2 = n2 + $(this).val();
					
				          }
				          	
				}
				
				else {
				$(".dipl").val($(".dipl").val()+$(this).val());
				operator_count = 0;
				
				n2 = n2 + $(this).val();
				}
				
			  
			}else{
				return;
			}
			
			

		
		//演算子が入力された時の処理
		}else{
			conma_count = 0;
			operator_count ++;
			if(operator_count == 2 ){
				operator_count = 1;
			
			      
				 
			}else if(minus){
				$(".dipl").val('');
				$(".dipl").val($(".dipl").val()+$(this).val());
			}else if(operator_count == 1 && n1 != null && n2 == null) {
				operator = $(this).val();
				$(".dipl").val($(".dipl").val()+$(this).val());
		
				
				
			
			}else if(operator_count == 1 && n1 != null && n2 != null){
				
				
				//	二項演算子をcalculate()で計算する
				calculate();
			  
				if(operator = $(this).val()){
					   $(".dipl").val('');
		         $(".dipl").val(n1);
		         n2 = null;
		         operator = $(this).val();
		         $(".dipl").val($(".dipl").val()+$(this).val());
		         operator_count = 1;
				}
				else{
					return;
				}
				
			}else{
				return;
			}	
		}
	});
	
	
	
	//四則演算子で計算する関数
	function calculate(){
		switch (operator){
			case "÷":
				n1 = Number(n1) / Number(n2);
				break;
			case "×":
				n1 = Number(n1) * Number(n2);
				break;
			case "-":
				n1 = Number(n1) - Number(n2);
				break;	
			case "+":
				n1 = Number(n1) + Number(n2);
				break;
			default:
				break;
		 }
    }
	
	
	//イコールキー
	$(".equal_b").on('click',function(){
		calculate();
		$(".dipl").val('');
		$(".dipl").val(n1);
		operator = null;
		n2 = null;
	  minus = false;
		operator_count = 0;
		conma_count = 0;
	});	
	
	
	//クリアキー
	$(".clear_b").on('click',function(){
		$(".dipl").val('');
		operator = null;
		n1 = null;
		n2 = null;
		minus = false;
		operator_count = 0;
		conma_count = 0;
		
	});
	
	
	
});