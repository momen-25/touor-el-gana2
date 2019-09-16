
Payment = new Mongo.Collection('payment');
Dates = new Mongo.Collection("dates");
Kids = new Mongo.Collection("kids");
ProfileImages = new FS.Collection("ProfileImages", {
    stores: [new FS.Store.GridFS("ProfileImages")]
});

UserImages = new Mongo.Collection("UserImages");
if (Meteor.isClient){


import 'bootstrap/dist/css/bootstrap.min.css';


   totalCost = 7000;
   console.log(totalCost);


    Template.theDay.events({
        "click .bok " : function(event){
           event.preventDefault(); 

            var dayToCome = $('#dt').val();

             var date = {
                dt : dayToCome,
                userId: Meteor.userId(),
                createdOn:new Date(),
                kidId : Kids.find({userId : Meteor.userId()}, { sort: { createdOn: 1 }}, { limit: 1}).fetch().pop()._id,


             };

             Dates.insert(date);
             console.log(date)
             Router.go('/image');

        }



});

    Template.admin.events({
        "submit #kidSc" : function(event){
            event.preventDefault();
            Router.go('/kidInfo')

        }

    });

    Template.kidInfo.helpers({
        kidNm : function (){
         var kidsNm = $('#name-of-kd').val();
         console.log(kidsNm);
         console.log(Kids.findOne({name : kidsNm}));

         return Kids.find({name : kidsNm});

        }

    });

    Template.kidInfoTheDay.helpers({
        date : function(){
            console.log(this)

            return this;

        }

    });

    Template.kidInfoTheData.helpers({
        kidData : function(){
            console.log(this)
            return this;


        },

         pay : function(){
            console.log(this._id);
            var pay =  Payment.findOne({kidId : this._id});

            console.log('pay main',pay);
            return pay;
        }

    });

        Template.kidInfoTheData.events({

            "submit .money-save" :function(event){
                event.preventDefault();
                console.log($('#tt'));
                var reg = $('.reg:checked').val();
                var payNow = $('.payNow').val() ;
                var bus = $('.bus');
                var form = $(".form")
                console.log(bus);

                console.log(payNow);
                if (reg == 1) {
                         if (bus.is(':checked')) {
                                totalCost = 2000;

                                var busCost = 1000;

                                totalCost = totalCost + busCost

                            }else{var totalCost = 2000}

                } 

                else {
                    if (reg == 2) {
                          if (bus.is(':checked')) {
                                totalCost = 3000;

                                var busCost = 1000;

                                totalCost = totalCost + busCost
                            } else{var totalCost = 3000}                       

                    
                    } 


                else {
                    if (reg==3) {
                         if (bus.is(':checked')) {
                                totalCost = 4000;

                                var busCost = 1000;

                                totalCost = totalCost + busCost
                            }else{var totalCost = 4000}
                        }
                    
                    }
                }

                if (bus.is(':checked')) {
                    var form = 550;
                    totalCost = totalCost + form;
                }
                  var payLeft = totalCost - payNow ;
                   var pay = {
                    payNow : payNow,
                    totalCost :totalCost,
                    payLeft : payLeft,
                    kidId : this._id,
                   }

                    console.log(pay);

                    Payment.insert(pay);

                    $('.money-save').hide(1000)
            },

            "submit .re-pay" : function(event){
                event.preventDefault();
                console.log('re-pay',this);
                var newPayment = $('.rePay').val();
                console.log(newPayment);
                Payment.update(this._id, {
                $set: { payLeft : this.payLeft - newPayment } });            

                Payment.update(this._id, {
                $set: { payNow : this.payNow - -newPayment } });

                return this;

            }


        });


    Template.Form.events({








        'click .js-save':function(event){

        	event.preventDefault(); 
 
   	

        	 var name = $('#name').val();

        	 var date = $('#dob').val();


        	 var Address = $('#Address').val();

        	 var number = $('#num').val();

        	 var fatherJob = $('#fj').val();

        	 var motherJob  = $('#mj').val();

        	 var fears = $('#fears').val();

        	 var favMeal = $('#fav_meal').val();

        	 var love = $('#love').val();

        	 var privConda = $('#priv').val();

        	 var pay = $('#pay').val();

        	 var moneyLeft = totalCost - pay ;

        	 var state = $('#state').val();

        	 var gender = $('#gender').val();


        	 var kid = {
        	 	name : name ,
        	 	date : date ,
        	 	Address : Address ,
        	 	phoneNumber : number ,
        	 	fJ : fatherJob ,
        	 	mJ : motherJob ,
        	 	fears : fears ,
        	 	favMeal : favMeal ,
        	 	love : love ,
        	 	private : privConda ,
        	 	pay : pay ,
        	 	moneyLeft : moneyLeft ,
        	 	gen :gender ,
        	 	state : state ,
                userId: Meteor.userId(),
                createdOn:new Date(),

        	 };

        	 Kids.insert(kid);

        	 console.log(kid)


             Router.go('/theDay');



        }

  
       
    });

Template.image.events({
    "submit .edit-profile": function(event) {
         event.preventDefault(); 

        var file = $('#profileImage').get(0).files[0];

        if (file) {

            fsFile = new FS.File(file);

            ProfileImages.insert(fsFile, function(err, result){
                if (err) {
                    throw new Meteor.Error(err);
                } else {

                    var imageLoc = '/cfs/files/ProfileImages/'+result._id;

                    var ph = {
                        userId: Meteor.userId(),
                        username: Meteor.user().username,
                        image: imageLoc,
                        createdOn:new Date(),
                        kidId : Kids.find({userId : Meteor.userId()}, { sort: { createdOn: 1 }}, { limit: 1}).fetch().pop()._id,

                        };

                        console.log(ph);

                    UserImages.insert(ph);
                    Bert.alert("Profile Update Successful!", "success", "growl-top-right");


                }
            });

        }

        return false // prevent submit
    }
});


    Template.nav.helpers({
    kid:function(){

            var username = Meteor.user().username;
            var userId = Meteor.userId();


            console.log("123");
            
            return Kids.find({userId: userId}); 

            }       

    });

    Template.nav.events({
                'click .kid-name' : function(event){
                    console.log(Kids.findOne({_id : this._id}))
                    return Kids.findOne({_id : this._id});


            

        },

    });   






    Template.kidData.helpers({
     kid:function(){
      return this;

        }


    });

    Template.profilepic.helpers({
        ph: function() {

            var username = Meteor.user().username;
            var userId = Meteor.userId();
            var URL = UserImages.find({userId: userId});
            console.log("from  main js",this);

            return URL;
    }
    });

    

    //start log in 



Template.login.rendered = function() {

}

Template.login.events({
    "submit .form-signin": function(event){
        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);

        if(isNotEmpty(email) &&
            isNotEmpty(password) &&
            isEmail(email) &&
            isValidPassword(password)){

            Meteor.loginWithPassword(email, password, function(err){
                if(err) {
                    Bert.alert(err.reason, "danger", "growl-top-right");
                    return false;
                } else {
                    Router.go("/");
                    Bert.alert("You are now logged in", "success", "growl-top-right");
                }
            });

        }

        return false // Prevent Submit
    }

});

// Validation Rules

// Trim Helper
var trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(value){
    if (value && value !== ''){
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right");
    return false;
};

// Validate Email
isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(value)) {
        return true;
    }
    Bert.alert("Please use a valid email address", "danger", "growl-top-right");
    return false;
};

// Check Password Field
isValidPassword = function(password){
    if(password.length <6) {
        Bert.alert("Password must be at least 6 characters", "danger", "growl-top-right");
        return false;
    }
    return true;
};

//start signup 
Template.signup.rendered = function() {

}

Template.signup.events({
    "submit .form-signup": function(event){
        var username = trimInput(event.target.username.value);
        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);
        var password2 = trimInput(event.target.password2.value);

        if(isNotEmpty(email) &&
            isNotEmpty(username) &&
            isNotEmpty(password) &&
            isEmail(email) &&
            areValidPasswords(password, password2)) {

            Accounts.createUser({
                username: username,
                email: email,
                password: password,
                profile: {
                    laughScore: 0,
                    frownScore: 0,
                    pukeScore: 0,
                    voted: [],
                }
            }, function(err){
                if(err){
                    Bert.alert(err.reason, "danger", "growl-top-right");
                } else {
                    Bert.alert("Account Created! You Are Now Logged In", "success", "growl-top-right");
                    Router.go("/");

                }
            });
            
        }

        return false; // prevent submit

    }
});

// Validation Rules

// Trim Helper
var trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(value){
    if (value && value !== ''){
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right");
    return false;
};

// Validate Email
isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(value)) {
        return true;
    }
    Bert.alert("Please use a valid email address", "danger", "growl-top-right");
    return false;
};

// Check Password Field
isValidPassword = function(password){
    if(password.length <6) {
        Bert.alert("Password must be at least 6 characters", "danger", "growl-top-right");
        return false;
    }
    return true;
};

// Match Password
areValidPasswords = function(password, confirm) {
    if(!isValidPassword(password)) {
        return false;
    }
    if(password !== confirm) {
        Bert.alert("Passwords do not match", "danger", "growl-top-right");
        return false;
    }
    return true;
};

//log out 

Template.ApplicationLayout.rendered = function(){

}
Template.ApplicationLayout.events({
    "click .logout": function(event){
        Meteor.logout(function(err){
            if(err) {
                Bert.alert(err.reason, "danger", "growl-top-right");
            } else {
                Bert.alert("you Are Now Logged Out", "success", "growl-top-right");
                location.reload();
            }
        });
    },
});
//for hide the nav
Template.admin.rendered = function(){ 
    var hsc = ($(window).height() - $('#kidSc').height())/2 ;
    console.log(hsc);
    var wsc = ($(window).width() - $('#kidSc').width())/2;
    console.log(wsc);
    $('#kidSc').css('margin-top',hsc);


}

Template.home.rendered = function(){
    var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset ;
  if (prevScrollpos  > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-110px";

  }
  prevScrollpos = currentScrollPos ;
} ;
            var ws = $(window).width();
            if (ws<=500) {
                $('.card').css('margin','0px');
                $('.gellary .card').css({
                    'width':'47%',
                    'height':'230px',
                    'margin':'2px 3px'
                });
                $('.gellary .btn-group').css({
                    'margin ': '10px auto',
                    'padding-bottom': '25px'
                });
                $('.gellary .btn-toolbar ').css({
                    'margin-top':' 10px',
                    'margin-right': '-5px',
                    'padding-bottom': '25px'
                });
                $('.header .imG').css('margin-top','36px');
                
                var marChi = ($(window).width() - $('.child span ').width());
                console.log('the width is',marChi)
                $('.child span ').css({
                    'position':'absolute',
                    'right': '32.5px',
                    'font-size':'160px',

                });

                $('.cont1').css({
                    "font-size":"14px",
                });

                $('.cont1 span').css({
                    'font-size':'35px ',
                })

            }

        $('.firstG').addClass("vis");
        $('.firstG').siblings().removeClass('vis');

        $(window).on('scroll',function(){ 
            var sc = $(window).scrollTop();
            console.log(sc)
$('.cardvs').animate({opacity:'0'},10)
            if (sc >= 900) {
            $('.card-main').animate(
            {
              height:'630px',
            },

            2200)
            }

            if (sc >= 399) {
                
                    $('.text-home').slideDown(1000,function(){

                                    });
                 $('.line1').animate({width:"60%"},2000)
                
            } 

            if (sc >= 1523) {
                $('.card').animate({opacity:"1"},1500)
            }

            if (sc >= 2760) {
                $('.footer .infoRaw').animate({opacity:"1"},1500,function(){
                    $('.ver-line').animate({height:'214px'},1000,function(){
                        $('.h-line').animate({width:"8%"},1000)
                    })
                })
            }


        });



}



Template.home.events({
    'click .firstB': function (){
        $('.firstG').addClass("vis");
        $('.firstG').siblings().removeClass('vis')

    },
    'click .secB': function(){
        $('.secG').addClass('vis');
        $('.secG').siblings().removeClass('vis')

    }

});

Template.theDay.rendered = function(){

    var hsc = (($(window).height() - $('.dayBox').height())/2) ;
    console.log(hsc);
    var wsc = ($(window).width() - $('.dayBox').width())/2;
    console.log(wsc);

    $('.dayBox').css('margin-top',hsc)
   

    $(window).on('resize' , function(){

    var hsc = (($(window).height() - $('.dayBox').height())/2)-120 ;
    console.log(hsc);
    var wsc = ($(window).width() - $('.dayBox').width())/2;
    console.log(wsc);

    $('.dayBox').css('margin-top',hsc)
    });
}
Template.Form.rendered = function(){


     var ws = $(window).width();
     console.log(ws);
     if (ws < 500) {
        var hsc = (($(window).height() - $('.nextPic').height())/2)+260 ;
        console.log(hsc);
        var wsc = ($(window).width() - $('.nextPic').width())/2;
        console.log(wsc);
        $('.nextPic').css('margin-top',hsc);
        $(".nextPic ").css({
            'left':'-2px',
        });
        $('.nextPic span').css({
            'font-size' : '75px',

        });
        $('.nextPic div').css({
            'font-size': '20px',
            'margin-top' : '45px',
        })


     } else {
    var hsc = (($(window).height() - $('.nextPic').height())/2)+120 ;
    console.log(hsc);
    var wsc = ($(window).width() - $('.nextPic').width())/2;
    console.log(wsc);
    $('.nextPic').css('margin-top',hsc)

     }


}
Template.image.rendered = function(){
    var hsc = ($(window).height() - $('.nextPic').height())/2 ;
    console.log(hsc);
    var wsc = ($(window).width() - $('.nextPic').width())/2;
    console.log(wsc);
    $('.nextPic').css('margin-top',hsc)

}
// gellary slide 
Template.nav.rendered = function(){
    console.log('ouhodsh');
        var ws = $(window).width();
        if (ws<=500) {
            $('.dark').remove();
            $('.ico span').css({
                'margin-right':'-16px',
                'margin-left' : '18px',
            });
            if (Meteor.userId()===null) {
                $('.main-nav-js .ico').append('<div><a class="btn btn-success btnSmall" href="/login" id="login-link" type="button"><i class="fa fa-sign-in"></i>تسجيل الدخول</a></div>')
        }
        else{ 
            $('.main-nav-js .ico').append('<div><a class="link-purple btn btn-danger logout btnSmall" href="#" id="logout-link" type="button"><i class="fa fa-sign-out"></i>تسجيل الخروج</a></div>')
        }
}

}

}