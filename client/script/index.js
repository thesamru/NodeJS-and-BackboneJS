      
 $(window).scroll(function(){
            var scrollTop = 70;
            
            if($(window).width()>768&& $(window).scrollTop() >= scrollTop){
               //console.log("hello");
                $('#sidebar').addClass('navbar1');
            }
             if( $(window).scrollTop() <= scrollTop){
               // console.log("yello");
                $("#sidebar").removeClass('navbar1');
                
            }
        
        });

// $(function(){
//      $(".datepicker").each(function() {
//         $(this).datepicker();
//     });
// });
//    