// This is a JavaScript file
$(window).load(function () {
    $("#partner").val(localStorage.getItem('partner'));
    $("#partner_key").val(localStorage.getItem('partner_key_hidden'));

    $("#setting_partner").val(localStorage.getItem('partner'));
    $("#setting_partner_key").val(localStorage.getItem('partner_key_hidden'));

    document.addEventListener('init', function (event) {
    if (event.target.id === 'home') {
        $("#partner").val(localStorage.getItem('partner'));
        $("#partner_key").val(localStorage.getItem('partner_key_hidden'));
    }
    else if(event.target.id === 'settings'){
        $("#setting_partner").val(localStorage.getItem('partner'));
        $("#setting_partner_key").val(localStorage.getItem('partner_key'));
    }
  
}, false);
});

function postrequest() {
  $.post( 'https://byte.money/test/new_purchase', 'partner='+ localStorage.getItem('partner') +'&partner_key='+ localStorage.getItem('partner_key') +'&customer='+$("#customer").val()+'&order_id='+$("#order_id").val()+'&description='+$("#description").val()+'&merchant='+$("#merchant").val()+'&address='+$("#address").val()+'&currency='+$("#currency").val()+'&currency_amount='+$("#currency_amount").val()+'&partner_cashback_percentage='+$("#partner_cashback_percentage").val()+'' )
    .done(function( data ) {
      //alert("Result " + data ); 
      ons.notification.confirm({
            title: 'Result',
            messageHTML: data,
            buttonLabels: ['OK'],
            animation: 'default',
            cancelable: true,
            callback: function(index) {
            }
        })
      $("#answer").val(data);
    })
};

function clearall(){
  ons.notification.confirm({
            title: 'Confirm',
            messageHTML: 'Clear all input?',
            buttonLabels: ['No', 'Yes'],
            animation: 'default',
            cancelable: true,
            callback: function(index) {
                if(index == -1) {
                } else if(index == 0) {
                } else if(index == 1) {
                    $("#customer").val("");
                    $("#order_id").val("");
                    $("#description").val("");
                    $("#merchant").val("");
                    $("#currency_amount").val("");
                    $("#partner_cashback_percentage").val("");
                    $("#unitaddress").val("");
                    $("#answer").val("");
                }
            }
        })
};

function get_qrcode(id){
  window.plugins.barcodeScanner.scan(
    function(result) {
      if (result.cancelled) {
        return;
      }
      var tex = result.text;
      if(id == "address" || id == "unitaddress"){
        //alert("address");
        tex = tex.replace("byteball:","").replace("Byteball:","").replace("ByteBall:","").replace("BYTEBALL:","").replace("byteball-tn:","").replace("mailto:","").replace("Mailto:","").replace("MailTo:","").replace("MAILTO:","");
      }
      $("#"+id).val(tex);
    },
    function(error) {
      //alert("Error: " + error );
      ons.notification.confirm({
            title: 'Error',
            messageHTML: error,
            buttonLabels: ['OK'],
            animation: 'default',
            cancelable: true,
            callback: function(index) {
            }
        })
    }
  );
};

function savesetting() {
  localStorage.setItem('partner', $("#setting_partner").val());
  localStorage.setItem('partner_key', $("#setting_partner_key").val());
  localStorage.setItem('network', $("#network").val());

  var tmp = $("#setting_partner_key").val().slice(3);
  tmp = $("#setting_partner_key").val().replace(tmp,"*".repeat(tmp.length));
  localStorage.setItem('partner_key_hidden',tmp );

  //alert( "saved setting");
  ons.notification.confirm({
            title: '',
            messageHTML: 'setting saved',
            buttonLabels: ['OK'],
            animation: 'default',
            cancelable: true,
            callback: function(index) {
            }
        })
};