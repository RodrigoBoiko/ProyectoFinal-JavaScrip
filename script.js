var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){
  $scope.app = "Ecomerce";
  $scope.nav = "home";
  $scope.total = 0;
  $scope.setNav = function(x){
    $scope.nav = x;
  }
  $scope.orderId = 0;
  $scope.cart = [
    {id: 1, nof: 0},
    {id: 2, nof: 0},
    {id: 3, nof: 0},
    {id: 4, nof: 0},
    {id: 5, nof: 0},
    {id: 6, nof: 0},
    {id: 7, nof: 0},
  ];
  $scope.products = [
    {id: 1, name: "Laptop", price: 25000},
    {id: 2, name: "Mouse", price: 500},
    {id: 3, name: "Keyboard", price: 1200},
    {id: 4, name: "Smartphone", price: 10000},
    {id: 5, name: "Mac Book", price: 80000},
    {id: 6, name: "iPhone", price: 70000},
    {id: 7, name: "Headset", price: 2000}
  ]
  $scope.orders = [];
  $scope.addOne = function(index){
    $scope.cart[index].nof++;
    $scope.total += $scope.products[index].price;
  }
  $scope.removeOne = function(index){
    if($scope.cart[index].nof > 0){
      $scope.cart[index].nof--;
      $scope.total -= $scope.products[index].price;
    }
  }
  $scope.filterCart = function(item){
    return item.nof > 0;
  }
  $scope.placeOrder = function(){
    $scope.orderId += 1;
    $scope.orders.unshift({
      id: $scope.orderId,
      date: Date(),
      cart: $scope.cart,
      total: $scope.total
    })
    $scope.cart = [
      {id: 1, nof: 0},
      {id: 2, nof: 0},
      {id: 3, nof: 0},
      {id: 4, nof: 0},
      {id: 5, nof: 0},
      {id: 6, nof: 0},
      {id: 7, nof: 0},
    ];
    $scope.total = 0;
    alert("Order Placed Successfully!!!");
    
  }
})