(function($){
    $(window).load(function(){
      /* initialize scrollbar */
      $("#twitter-widget-holder").mCustomScrollbar({
        theme:"dark-3",
        scrollButtons:{enable:true}
      });
      /* insert twitter widget js in window load fn */
      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    setTimeout(function(){
        loadLatestTweet();
    },500)
        
    });
  })(jQuery);


  

