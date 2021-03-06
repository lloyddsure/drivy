'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];


//Exercice 6

for(var i=0;i<rentalModifications.length;i++)
{
	for(var j=0;j<rentals.length;j++)
	{
		if(rentalModifications[i].rentalId == rentals[j].id)
		{
			if(typeof rentalModifications[i].returnDate != "undefined")
				rentals[j].returnDate = rentalModifications[i].returnDate;
			if(typeof rentalModifications[i].pickupDate != "undefined")
				rentals[j].pickupDate = rentalModifications[i].pickupDate;
			if(typeof rentalModifications[i].distance != "undefined")
				rentals[j].distance = rentalModifications[i].distance;
		}
	}
}




//Exercice 1

for(var i = 0; i < rentals.length;i++)
{
	var time;
	var distance
	for(var j = 0; j<cars.length;j++)
	{
		if(rentals[i].carId == cars[j].id) //find the car of the rentals
		{
			distance = cars[j].pricePerKm * rentals[i].distance; // price for distance
			var date = (new Date(rentals[i].returnDate)-new Date(rentals[i].pickupDate))/86400000;
			time = cars[j].pricePerDay*(date+1); //price for time
			rentals[i].price = distance+time;
			//Exercie 2
			rentals[i].price = distance+cars[j].pricePerDay;
			var rest_of_time = date;
			if(date>1)
			{
				for(var y = 1; y<4&&rest_of_time>0;y++)
				{
					rentals[i].price += cars[j].pricePerDay*0.9;
					rest_of_time--;
				}
				if(date>4)
				{
					for(var y = 4; y<10&&rest_of_time>0;y++)
					{
						rentals[i].price += cars[j].pricePerDay*0.7;
						rest_of_time--;
					}
					if(date>10)
					{
						rentals[i].price += rest_of_time*cars[j].pricePerDay/2;
					}
				}
			}
			//Exercice 3
			rentals[i].commission.insurance = 0.3*rentals[i].price/2;
			rentals[i].commission.assistance = ((new Date(rentals[i].returnDate)-new Date(rentals[i].pickupDate))/86400000)+1;
			rentals[i].commission.drivy = 0.3*rentals[i].price - rentals[i].commission.insurance - rentals[i].commission.assistance;
			//Exercice 4
			if(rentals[i].options.deductibleReduction)
			{
				rentals[i].price = rentals[i].price+4*(((new Date(rentals[i].returnDate)-new Date(rentals[i].pickupDate))/86400000)+1);
				rentals[i].commission.drivy = rentals[i].commission.drivy+4*(((new Date(rentals[i].returnDate)-new Date(rentals[i].pickupDate))/86400000)+1);
			}
		}
	}
	//Exercice5
	for(var j=0;j<actors.length;j++)
	{
		if(rentals[i].id==actors[j].rentalId)
		{
			for(var x=0;x<actors[j].payment.length;x++)
			{
				if(actors[j].payment[x].who=="driver")
					actors[j].payment[x].amount = rentals[i].price;
				if(actors[j].payment[x].who=="owner")
					actors[j].payment[x].amount = rentals[i].price - rentals[i].commission.insurance - rentals[i].commission.assistance - rentals[i].commission.drivy;
				if(actors[j].payment[x].who=="insurance")
					actors[j].payment[x].amount = rentals[i].commission.insurance;
				if(actors[j].payment[x].who=="assistance")
					actors[j].payment[x].amount = rentals[i].commission.assistance;
				if(actors[j].payment[x].who=="drivy")
					actors[j].payment[x].amount = rentals[i].commission.drivy;
			}
		}
	}
}



console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
