var mongoose=require('mongoose');
var _=require('underscore');

module.exports=function(wagner){
	mongoose.connect('mongodb://localhost:27017/two');

	var Category=mongoose.model('Category',require('./category'),'categories');
	var Product=mongoose.model('Product',require('./product'),'products');
	var User=mongoose.model('User',require('./user'),'users');

	var PRODUCT_ID = '000000000000000000000001';
	var categories = [
      { _id: 'Electronics' },
      { _id: 'Phones', parent: 'Electronics' },
      { _id: 'Laptops', parent: 'Electronics' },
      { _id: 'Bacon' }
    ];

    var products = [
      {
        name: 'LG G4',
        category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
        price: {
          amount: 300,
          currency: 'USD'
        }
      },
      {
        _id: PRODUCT_ID,
        name: 'Asus Zenbook Prime',
        category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
        price: {
          amount: 2000,
          currency: 'USD'
        }
      },
      {
        name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
        category: { _id: 'Bacon', ancestors: ['Bacon'] },
        price: {
          amount: 20,
          currency: 'USD'
        }
      }
    ];

    var users = [{
      profile: {
        username: 'kripesh',
        picture: 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
      },
      data: {
        oauth: 'invalid',
        cart: [{product:PRODUCT_ID,quantity: 1}]
      }
    }];

    Category.create(categories,function(error){
    	Product.create(products,function(error){
    		User.create(users,function(error){

    		});
    	});
    });
	var models={
		Category:Category,
		Product:Product,
		User:User
	};

	_.each(models,function(value,key){
		wagner.factory(key,function(){
			return value;
		});
	});

	return models;
};