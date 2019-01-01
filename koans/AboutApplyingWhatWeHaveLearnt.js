var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
       // productsICanEat = _(products).filter(function (x) { if(!x.containsNuts && _(x.ingredients).all(y => y!== 'mushrooms')){ return x;}});
      productsICanEat = _(products).filter(x => !x.containsNuts && _(x.ingredients).all(y => y!== 'mushrooms'));


      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    
    var sum = _(_.range(1000)).chain()
                .filter(x => (x%3 === 0 || x%5 ===0))
                .reduce((sum, y)=> sum+y)
                .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain()
      .map(function(val){return val.ingredients;})
      .flatten()
      .reduce(function(count, val) { count[val] = (count[val] || 0) + 1; return count;},{})
      .value();
      

    expect(2).toBe(ingredientCount['mushrooms']);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
      var isPrime = num => {
        if(num === 2) return true;
        if(num %2 === 0) return false;
        for(let i = 3; i <= Math.sqrt(num); i+=2) {
          if (num%i === 0) return false;
        }
        return num !== 1 && num !== 0;
      };

      var largestPrimeFactor = function(val){
        let num = Math.floor(val/2);
        num++;
        for(let i = num; i > 1; i--){
          if(val %i === 0 && isPrime(i)) {
            return i;
          }
        }
        return 1;
      }

    expect(3).toBe(largestPrimeFactor(12));  

  });


  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var isPalindrome = function(x){
      if(x.length === 0) return false;
      let left = 0;
      let right = x.length - 1;
      while(left < right){
        if(x[left] !== x[right]) return false;
        left ++;
        right --;
      }
      return true;
    }

    var largest = function(x){
      let lower = Number("1".padEnd(x,"0"));
      let higher = Number("9".padEnd(x,"9"));
      let result = 0;

      for(let i = higher; i>=lower; i--){
        for(let j = i; j>=lower; j--){
          let product = i * j;
          if(product < result) break;
          if(isPalindrome(product.toString())) result = product;
        }
      }
      return result;
    }

    expect(largest(3)).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var lcm = function(x){
      let result = 1;
      for(let i =1; i <= x; i++){
        result = (result * i)/gcd(result,i);
      }
      return result;
    }
    var gcd = function(y,z){
      if(y%z !== 0){
        return gcd(z, y%z);
      } else {
        return z;
      }
    }

    expect(lcm(20)).toBe(232792560);
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var sumOfSquares = function(x){
      let result = 0;
      while(x>0){
        result+= Math.pow(x,2);
        x--;
      }
      return result;
    }
    var squareOfSums = function(y){
      let result = 0;
      while(y>0){
        result+= y;
        y--;
      }
      return Math.pow(result,2);
    }
    let diff = function(z){
      return squareOfSums(z) - sumOfSquares(z);
    }
     // expect((sumOfSquares(10) - squareOfSums(10)).toBe(2640);
     expect(diff(10)).toBe(2640);
    
  });

  it("should find the 10001st prime", function () {
      var isPrime = num => {
        if(num === 2) return true;
        if(num %2 === 0) return false;
        for(let i = 3; i <= Math.sqrt(num); i+=2) {
          if (num%i === 0) return false;
        }
        return num !== 1 && num !== 0;
      };

     let count = 0;
     let index = 2;
     while(count < 10001){
      if (isPrime(index)) count++;
      index++;
     } 
     index--;

     expect(index).toBe(104743);
  });
  
});
