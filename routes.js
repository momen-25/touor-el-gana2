Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('nav' ,{to : 'ph'});
    this.render('home',{to : 'aside'});//space to every route becouse it render kidData evey where 

});

Router.route('/image', function () {
    this.render('image' ,{to : 'ph'});
    this.render('space',{to : 'aside'});


});

Router.route('/login', function () {
    this.render('login' ,{to : 'ph'});
    this.render('space',{to : 'aside'});


	
});


Router.route('/signup', function () {
    this.render('signup',{to : 'ph'});
    this.render('space',{to : 'aside'});

	
});

Router.route('/form', function () {
    this.render('Form',{to : 'ph'});
    this.render('space',{to : 'aside'});

	
});


Router.route('/theDay', function () {
    this.render('theDay',{to : 'ph'});
    this.render('space',{to : 'aside'});

  
});

Router.route('/profile/:_id', function () {
  this.render('profilepic', {
  	to : "ph",
    data: function () {
      console.log("2from router ",this.params._id);
      	var img =  UserImages.findOne({kidId: this.params._id });
        console.log("img from router",img);

      return img ;

    }



  });

    this.render('kidData', {
    to : 'aside',
    data: function () {
      	var kd =  Kids.findOne({_id : this.params._id});
              console.log("this is from route" ,kd);


      return kd ;

    }



  })



});

Router.route('/kidInfo/:_id', function () {
  this.render('kidInfoTheDay', {
    to : "ph",
    data: function () {
      console.log("this from router",this.params._id);
      console.log("from router",Dates.findOne({kidId: this.params._id}));
        var date =  Dates.findOne({kidId: this.params._id});

      return date ;

    }



  });

    this.render('kidInfoTheData', {
    to : 'aside',
    data: function () {
      console.log("this is" ,this.params._id);
        var kd =  Kids.findOne({_id : this.params._id});

      return kd ;

    }



  });






});

Router.route('/admin', function () {
    this.render('admin',{to : 'ph'});
    this.render('kidInfo',{to : 'aside'});

  
});
Router.route('/kidInfo', function () {
    this.render('kidInfo',{to : 'ph'});
    this.render('space',{to : 'aside'});

  
});
console.log("asd"); 
