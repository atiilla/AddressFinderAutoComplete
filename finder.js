
(function ($, window, document) {
  
  var address = {
      init : function(){
        var self = this;

        var $autocomplete = $('#autocomplete');
        self.component_form = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
          };

        //
        self.autocomplete = new google.maps.places.Autocomplete(($autocomplete[0]),{ types: ['geocode', 'establishment'] });

        self.events();

       

      },
    
      events : function(){
        var self = this;
        
        $('#form-submit').on('click', function(e){
          var l = Ladda.create(this);
  	 	l.start();
        });
        
       
        self.l = Ladda.create($('.button-search')[0]);

        $('input#autocomplete').on('keyup', function() {
      	 	self.l.start();       
        });
        google.maps.event.addListener(self.autocomplete, 'place_changed', function() { 
            var place = self.autocomplete.getPlace();
            
            	
            
            // kill all input values
            $('.text-inputs .form-control').val('');
            
            
            for (var i = 0; i < place.address_components.length; i++) {
                var address_type = place.address_components[i].types[0];
                if (self.component_form[address_type]) {
                  var val = place.address_components[i][self.component_form[address_type]];
                  
                  $('.text-inputs .' + address_type).val(val);
                  
                }
              }
          
         console.log(place);
            self.l.stop();
          });
      }
   }

  address.init();

})(jQuery, window, document);
